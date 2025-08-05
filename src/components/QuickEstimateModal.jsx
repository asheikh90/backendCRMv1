import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Calculator, 
  Send, 
  Save, 
  Phone, 
  Mail,
  CheckCircle,
  Zap,
  Upload,
  User,
  Car
} from 'lucide-react'
import { AIAgent } from '../services/aiAgent'
import { useImageUpload } from '../hooks/useImageUpload'
import { buttonPress, modalVariants } from '../utils/animations'
import toast from 'react-hot-toast'

const QuickEstimateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    year: '',
    make: '',
    model: '',
    damageType: '',
    notes: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [quote, setQuote] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const [sentStatus, setSentStatus] = useState(null)

  const {
    images,
    getRootProps,
    getInputProps,
    isDragActive,
    removeImage
  } = useImageUpload({ maxFiles: 5 })

  const damageTypes = [
    'Minor Scratches',
    'Dent Repair',
    'Bumper Damage',
    'Panel Replacement',
    'Paint Touch-up',
    'Collision Repair',
    'Hail Damage',
    'Vandalism',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenerateQuote = async () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.damageType) {
      toast.error('Please fill in required fields')
      return
    }

    setIsGenerating(true)
    try {
      const quoteResult = await AIAgent.generateQuote(formData, formData.damageType, images)
      setQuote(quoteResult)
      toast.success('Quote generated successfully!')
    } catch (error) {
      toast.error('Failed to generate quote')
      console.error('Quote generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendToCustomer = async (method) => {
    if (!quote) return

    setIsSending(true)
    try {
      if (method === 'sms') {
        const message = `Hi ${formData.name}! Your collision repair estimate for your ${formData.year} ${formData.make} ${formData.model} is ready. Total: $${quote.estimate.total.toLocaleString()}. View details: [link]. Questions? Call us!`
        await AIAgent.sendSMS(formData.phone, message, quote.attachments)
        toast.success('Quote sent via SMS!')
      } else if (method === 'email') {
        const subject = `Your Collision Repair Estimate - ${formData.year} ${formData.make} ${formData.model}`
        const body = `Dear ${formData.name},\n\nThank you for choosing us for your collision repair needs. Please find your detailed estimate attached.\n\nEstimate Total: $${quote.estimate.total.toLocaleString()}\nValid Until: ${new Date(quote.validUntil).toLocaleDateString()}\n\nWe look forward to serving you!\n\nBest regards,\nCollision Club Team`
        await AIAgent.sendEmail(formData.email, subject, body, quote.attachments)
        toast.success('Quote sent via email!')
      }
      
      setSentStatus(method)
      
      // Save to localStorage
      const sentQuotes = JSON.parse(localStorage.getItem('sentQuotes') || '[]')
      sentQuotes.push({
        ...quote,
        sentAt: new Date().toISOString(),
        sentVia: method,
        status: 'sent'
      })
      localStorage.setItem('sentQuotes', JSON.stringify(sentQuotes))
      
    } catch (error) {
      toast.error(`Failed to send quote via ${method}`)
      console.error('Send error:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleSaveQuote = () => {
    if (!quote) return

    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    savedQuotes.push({
      ...quote,
      savedAt: new Date().toISOString(),
      status: 'draft'
    })
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes))
    
    toast.success('Quote saved as draft!')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      year: '',
      make: '',
      model: '',
      damageType: '',
      notes: ''
    })
    setQuote(null)
    setSentStatus(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Calculator className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Quick Estimate</h2>
                    <p className="text-gray-400">Generate AI-powered collision repair quotes</p>
                  </div>
                </div>
                <motion.button
                  {...buttonPress}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={24} />
                </motion.button>
              </div>
            </div>

            <div className="p-6">
              {!quote ? (
                /* Quote Generation Form */
                <div className="space-y-6">
                  {/* Customer Information */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <User size={20} />
                      <span>Customer Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="Customer name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="customer@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Car size={20} />
                      <span>Vehicle Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="2020"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Make
                        </label>
                        <input
                          type="text"
                          name="make"
                          value={formData.make}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="Honda"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Model
                        </label>
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                          placeholder="Civic"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Damage Information */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Damage Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Damage Type *
                        </label>
                        <select
                          name="damageType"
                          value={formData.damageType}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none transition-colors"
                        >
                          <option value="" className="bg-gray-800">Select damage type</option>
                          {damageTypes.map(type => (
                            <option key={type} value={type} className="bg-gray-800">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                          placeholder="Additional details about the damage..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Damage Photos</h3>
                    
                    <motion.div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragActive 
                          ? 'border-blue-400 bg-blue-400/10' 
                          : 'border-gray-600 hover:border-blue-400'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-white">
                        {isDragActive ? 'Drop photos here' : 'Upload damage photos'}
                      </p>
                      <p className="text-gray-400 text-sm">Optional but recommended for accuracy</p>
                    </motion.div>

                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.preview}
                              alt={`Damage ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                            >
                              <X className="text-white" size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Generate Button */}
                  <motion.button
                    {...buttonPress}
                    onClick={handleGenerateQuote}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap size={20} />
                      </motion.div>
                    ) : (
                      <Calculator size={20} />
                    )}
                    <span>{isGenerating ? 'Generating Quote...' : 'Generate AI Quote'}</span>
                  </motion.button>
                </div>
              ) : (
                /* Generated Quote Display */
                <div className="space-y-6">
                  {/* Quote Header */}
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-400" size={24} />
                        <div>
                          <h3 className="text-xl font-semibold text-white">Quote Generated</h3>
                          <p className="text-gray-400">Quote ID: {quote.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-400">
                          ${quote.estimate.total.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Valid until {new Date(quote.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-400">Customer</p>
                        <p className="text-white font-medium">{quote.customer.name}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-400">Vehicle</p>
                        <p className="text-white font-medium">
                          {quote.vehicle.year} {quote.vehicle.make} {quote.vehicle.model}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-400">Confidence</p>
                        <p className="text-white font-medium">{quote.confidence}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Quote Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">
                            Labor ({quote.estimate.labor.hours} hrs @ ${quote.estimate.labor.rate}/hr)
                          </span>
                          <span className="text-white font-medium">
                            ${quote.estimate.labor.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Parts</span>
                          <span className="text-white font-medium">
                            ${quote.estimate.parts.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Materials</span>
                          <span className="text-white font-medium">
                            ${quote.estimate.materials.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-white/10 pt-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white font-medium">
                              ${quote.estimate.subtotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tax</span>
                            <span className="text-white font-medium">
                              ${quote.estimate.tax.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 mt-2">
                            <span className="text-white">Total</span>
                            <span className="text-green-400">
                              ${quote.estimate.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Warranty</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Labor:</span>
                            <span className="text-white">{quote.warranty.labor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Parts:</span>
                            <span className="text-white">{quote.warranty.parts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Paint:</span>
                            <span className="text-white">{quote.warranty.paint}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Timeline</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Inspection:</span>
                            <span className="text-white">{quote.timeline.inspection}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Parts Delivery:</span>
                            <span className="text-white">{quote.timeline.parts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Repair Time:</span>
                            <span className="text-white">{quote.timeline.repair}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      {...buttonPress}
                      onClick={() => handleSendToCustomer('sms')}
                      disabled={isSending || !formData.phone}
                      className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Phone size={18} />
                      <span>{sentStatus === 'sms' ? 'Sent via SMS ✓' : 'Send SMS'}</span>
                    </motion.button>
                    
                    <motion.button
                      {...buttonPress}
                      onClick={() => handleSendToCustomer('email')}
                      disabled={isSending || !formData.email}
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Mail size={18} />
                      <span>{sentStatus === 'email' ? 'Sent via Email ✓' : 'Send Email'}</span>
                    </motion.button>
                    
                    <motion.button
                      {...buttonPress}
                      onClick={handleSaveQuote}
                      className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save size={18} />
                      <span>Save Quote</span>
                    </motion.button>
                  </div>

                  {/* New Quote Button */}
                  <motion.button
                    {...buttonPress}
                    onClick={resetForm}
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    Create New Quote
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default QuickEstimateModal
