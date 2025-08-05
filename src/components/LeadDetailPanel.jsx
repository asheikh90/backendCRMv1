import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  DollarSign,
  User,
  Car,
  Clock,
  MapPin,
  Star,
  Send,
  CreditCard,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { AIAgent } from '../services/aiAgent'
import { buttonPress, slideIn } from '../utils/animations'
import toast from 'react-hot-toast'

const LeadDetailPanel = ({ lead, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [leadScore, setLeadScore] = useState(null)
  const [schedulingDate, setSchedulingDate] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  useEffect(() => {
    if (isOpen && lead) {
      // Generate lead score when panel opens
      generateLeadScore()
      
      // Pre-fill SMS message
      setSmsMessage(`Hi ${lead.name}! Thanks for your interest in collision repair for your ${lead.vehicle}. We'd love to schedule a time to discuss your needs. When works best for you?`)
    }
  }, [isOpen, lead])

  const generateLeadScore = async () => {
    if (!lead) return
    
    setIsLoading(true)
    try {
      const score = await AIAgent.scoreLeadConversion({
        responseTime: Math.floor(Math.random() * 300) + 30, // 30-330 minutes
        source: lead.source,
        estimatedValue: lead.estimatedValue,
        engagement: lead.status === 'Hot' ? 'high' : lead.status === 'Warm' ? 'medium' : 'low'
      })
      setLeadScore(score)
    } catch (error) {
      console.error('Lead scoring error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendSMS = async () => {
    if (!smsMessage.trim()) {
      toast.error('Please enter a message')
      return
    }

    setIsLoading(true)
    try {
      await AIAgent.sendSMS(lead.phone, smsMessage)
      toast.success('SMS sent successfully!')
      setSmsMessage('')
      
      // Update lead's last contact
      if (onUpdate) {
        onUpdate(lead.id, { lastContact: new Date().toISOString() })
      }
    } catch (error) {
      toast.error('Failed to send SMS')
    } finally {
      setIsLoading(false)
    }
  }

  const handleScheduleAppointment = async () => {
    if (!schedulingDate) {
      toast.error('Please select a date')
      return
    }

    setIsLoading(true)
    try {
      await AIAgent.scheduleAppointment(
        { name: lead.name, phone: lead.phone, email: lead.email },
        'inspection',
        schedulingDate
      )
      toast.success('Appointment scheduled!')
      setSchedulingDate('')
      
      if (onUpdate) {
        onUpdate(lead.id, { 
          status: 'Scheduled',
          nextFollowUp: schedulingDate 
        })
      }
    } catch (error) {
      toast.error('Failed to schedule appointment')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestDeposit = async () => {
    if (!depositAmount) {
      toast.error('Please enter deposit amount')
      return
    }

    const message = `Hi ${lead.name}! To secure your repair slot for your ${lead.vehicle}, we're requesting a deposit of $${depositAmount}. You can pay securely via this link: [payment-link]. Thank you!`
    
    setIsLoading(true)
    try {
      await AIAgent.sendSMS(lead.phone, message)
      toast.success('Deposit request sent!')
      setDepositAmount('')
      
      if (onUpdate) {
        onUpdate(lead.id, { 
          status: 'Deposit Requested',
          depositAmount: parseFloat(depositAmount)
        })
      }
    } catch (error) {
      toast.error('Failed to send deposit request')
    } finally {
      setIsLoading(false)
    }
  }

  if (!lead) return null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'actions', label: 'Actions', icon: CheckCircle }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'text-red-400 bg-red-500/20'
      case 'Warm': return 'text-yellow-400 bg-yellow-500/20'
      case 'Cold': return 'text-blue-400 bg-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex"
          onClick={onClose}
        >
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="ml-auto w-full max-w-2xl bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{lead.name}</h2>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className="text-gray-400 text-sm">{lead.id}</span>
                    </div>
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

              {/* Tabs */}
              <div className="flex space-x-1 mt-6 bg-white/5 rounded-xl p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      {...buttonPress}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Lead Score */}
                  {leadScore && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">AI Conversion Score</h3>
                        <div className="text-right">
                          <span className={`text-3xl font-bold ${getScoreColor(leadScore.score)}`}>
                            {leadScore.score}%
                          </span>
                          <p className="text-gray-400 text-sm">Confidence: {leadScore.confidence}%</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {Object.entries(leadScore.factors).map(([factor, score]) => (
                          <div key={factor} className="bg-white/5 rounded-lg p-3">
                            <p className="text-gray-400 text-sm capitalize">
                              {factor.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-white font-semibold">{score} pts</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Recommended Actions:</h4>
                        {leadScore.suggestedActions.map((action, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-gray-300 text-sm">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="text-blue-400" size={18} />
                        <span className="text-white">{lead.phone}</span>
                        <motion.button
                          {...buttonPress}
                          onClick={() => toast.success(`Calling ${lead.name}`)}
                          className="ml-auto bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          Call
                        </motion.button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="text-green-400" size={18} />
                        <span className="text-white">{lead.email}</span>
                        <motion.button
                          {...buttonPress}
                          onClick={() => toast.success(`Opening email to ${lead.name}`)}
                          className="ml-auto bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          Email
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Car size={20} />
                      <span>Vehicle & Damage</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Vehicle</p>
                        <p className="text-white font-medium">{lead.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Issue</p>
                        <p className="text-white font-medium">{lead.issue}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Estimated Value</p>
                        <p className="text-green-400 font-bold text-lg">
                          ${lead.estimatedValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Source</p>
                        <p className="text-white font-medium">{lead.source}</p>
                      </div>
                    </div>
                    
                    {lead.notes && (
                      <div className="mt-4">
                        <p className="text-gray-400 text-sm">Notes</p>
                        <p className="text-white">{lead.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Clock size={20} />
                      <span>Timeline</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created</span>
                        <span className="text-white">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Contact</span>
                        <span className="text-white">
                          {new Date(lead.lastContact).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Follow-up</span>
                        <span className={`font-medium ${
                          new Date(lead.nextFollowUp) < new Date() ? 'text-red-400' : 'text-white'
                        }`}>
                          {new Date(lead.nextFollowUp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'communication' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Send SMS */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <MessageSquare size={20} />
                      <span>Send SMS</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <textarea
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                        placeholder="Type your message..."
                      />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">
                          {smsMessage.length}/160 characters
                        </span>
                        <motion.button
                          {...buttonPress}
                          onClick={handleSendSMS}
                          disabled={isLoading || !smsMessage.trim()}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                        >
                          <Send size={16} />
                          <span>Send SMS</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Communication History */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Communication History</h3>
                    
                    <div className="space-y-4">
                      {/* Mock communication history */}
                      <div className="border-l-2 border-blue-500 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="text-blue-400" size={14} />
                          <span className="text-blue-400 text-sm font-medium">SMS Sent</span>
                          <span className="text-gray-400 text-xs">2 hours ago</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          "Hi {lead.name}! Thanks for your inquiry about collision repair..."
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-green-500 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Phone className="text-green-400" size={14} />
                          <span className="text-green-400 text-sm font-medium">Call Made</span>
                          <span className="text-gray-400 text-xs">1 day ago</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Initial contact call - discussed damage and scheduling
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-purple-500 pl-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Mail className="text-purple-400" size={14} />
                          <span className="text-purple-400 text-sm font-medium">Email Sent</span>
                          <span className="text-gray-400 text-xs">2 days ago</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Welcome email with company information and next steps
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'actions' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Schedule Appointment */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Calendar size={20} />
                      <span>Schedule Appointment</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <input
                        type="datetime-local"
                        value={schedulingDate}
                        onChange={(e) => setSchedulingDate(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                      />
                      
                      <motion.button
                        {...buttonPress}
                        onClick={handleScheduleAppointment}
                        disabled={isLoading || !schedulingDate}
                        className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <Calendar size={18} />
                        <span>Schedule Inspection</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Request Deposit */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <CreditCard size={20} />
                      <span>Request Deposit</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="Enter deposit amount"
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <motion.button
                        {...buttonPress}
                        onClick={handleRequestDeposit}
                        disabled={isLoading || !depositAmount}
                        className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <CreditCard size={18} />
                        <span>Send Deposit Request</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <motion.button
                        {...buttonPress}
                        onClick={() => {
                          if (onUpdate) {
                            onUpdate(lead.id, { status: 'Hot' })
                          }
                          toast.success('Lead marked as Hot')
                        }}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Star size={18} />
                        <span>Mark as Hot Lead</span>
                      </motion.button>
                      
                      <motion.button
                        {...buttonPress}
                        onClick={() => {
                          if (onUpdate) {
                            onUpdate(lead.id, { 
                              nextFollowUp: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
                            })
                          }
                          toast.success('Follow-up scheduled for tomorrow')
                        }}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Clock size={18} />
                        <span>Schedule Follow-up</span>
                      </motion.button>
                      
                      <motion.button
                        {...buttonPress}
                        onClick={() => {
                          if (onUpdate) {
                            onUpdate(lead.id, { status: 'Cold' })
                          }
                          toast.success('Lead moved to nurture campaign')
                        }}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <AlertTriangle size={18} />
                        <span>Move to Nurture</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LeadDetailPanel
