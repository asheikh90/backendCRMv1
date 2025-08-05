import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Camera, 
  X, 
  Edit3, 
  Trash2,
  Zap,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react'
import { useImageUpload } from '../hooks/useImageUpload'
import { useWebcam } from '../hooks/useWebcam'
import { AIAgent } from '../services/aiAgent'
import { buttonPress, cardHover } from '../utils/animations'
import toast from 'react-hot-toast'

const ImageUploadPanel = ({ onAnalysisComplete, vehicleInfo = {} }) => {
  const [showWebcam, setShowWebcam] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const {
    images,
    isUploading,
    uploadProgress,
    getRootProps,
    getInputProps,
    isDragActive,
    removeImage,
    updateImageLabel,
    clearImages
  } = useImageUpload({ maxFiles: 8 })

  const {
    isActive: webcamActive,
    capturedImages,
    error: webcamError,
    videoRef,
    canvasRef,
    startWebcam,
    stopWebcam,
    captureImage,
    clearCapturedImages
  } = useWebcam()

  const allImages = [...images, ...capturedImages]

  const handleAnalyzeDamage = async () => {
    if (allImages.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsAnalyzing(true)
    try {
      const analysisResult = await AIAgent.analyzeDamage(allImages, vehicleInfo)
      setAnalysis(analysisResult)
      setShowAnalysis(true)
      
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult)
      }
      
      toast.success('Damage analysis complete!')
    } catch (error) {
      toast.error('Analysis failed. Please try again.')
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSaveQuote = () => {
    if (!analysis) return

    // Save to localStorage (mock database)
    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]')
    const quoteData = {
      id: analysis.id,
      timestamp: analysis.timestamp,
      vehicleInfo,
      analysis,
      images: allImages.map(img => ({
        id: img.id,
        name: img.name,
        label: img.label,
        preview: img.preview
      }))
    }
    
    savedQuotes.push(quoteData)
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes))
    
    toast.success('Quote saved successfully!')
  }

  const handleWebcamCapture = async () => {
    const capturedImage = await captureImage()
    if (capturedImage) {
      toast.success('Image captured!')
    }
  }

  const labelOptions = [
    'Front Bumper', 'Rear Bumper', 'Driver Side', 'Passenger Side',
    'Hood', 'Trunk', 'Wheel/Tire', 'Interior', 'Detail Shot', 'Other'
  ]

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drag & Drop Upload */}
        <motion.div
          variants={cardHover}
          whileHover="hover"
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Upload size={20} />
            <span>Upload Photos</span>
          </h3>

          <motion.div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-blue-400 bg-blue-400/10' 
                : 'border-gray-600 hover:border-blue-400 hover:bg-blue-400/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              className="space-y-4"
            >
              <Upload className="mx-auto text-gray-400" size={48} />
              <div>
                <p className="text-white font-medium">
                  {isDragActive ? 'Drop images here' : 'Drag & drop damage photos'}
                </p>
                <p className="text-gray-400 text-sm">or click to browse</p>
                <p className="text-gray-500 text-xs mt-2">
                  Supports JPG, PNG, WebP • Max 10MB per file
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Upload Progress */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Uploading...</span>
                    <span className="text-blue-400 text-sm">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Webcam Capture */}
        <motion.div
          variants={cardHover}
          whileHover="hover"
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Camera size={20} />
            <span>Live Camera</span>
          </h3>

          {!webcamActive ? (
            <motion.button
              {...buttonPress}
              onClick={startWebcam}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-8 rounded-xl font-medium shadow-lg flex flex-col items-center space-y-2"
            >
              <Camera size={32} />
              <span>Start Camera</span>
              <span className="text-sm opacity-80">Capture damage photos live</span>
            </motion.button>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-48 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  {...buttonPress}
                  onClick={handleWebcamCapture}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Capture
                </motion.button>
                <motion.button
                  {...buttonPress}
                  onClick={stopWebcam}
                  className="px-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>
          )}

          {webcamError && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-red-400" size={16} />
                <p className="text-red-400 text-sm">{webcamError}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Image Gallery */}
      <AnimatePresence>
        {allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Uploaded Images ({allImages.length})
              </h3>
              <div className="flex space-x-2">
                <motion.button
                  {...buttonPress}
                  onClick={handleAnalyzeDamage}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg flex items-center space-x-2 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap size={16} />
                    </motion.div>
                  ) : (
                    <Zap size={16} />
                  )}
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Damage'}</span>
                </motion.button>
                
                <motion.button
                  {...buttonPress}
                  onClick={() => {
                    clearImages()
                    clearCapturedImages()
                  }}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors"
                >
                  Clear All
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative bg-white/5 rounded-xl overflow-hidden">
                    <img
                      src={image.preview}
                      alt={image.label}
                      className="w-full h-32 object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                      <motion.button
                        {...buttonPress}
                        onClick={() => {
                          // Open image in modal (implement if needed)
                          toast.success('Image viewer coming soon')
                        }}
                        className="p-2 bg-white/20 rounded-lg"
                      >
                        <Eye className="text-white" size={16} />
                      </motion.button>
                      <motion.button
                        {...buttonPress}
                        onClick={() => removeImage(image.id)}
                        className="p-2 bg-red-500/20 rounded-lg"
                      >
                        <Trash2 className="text-red-400" size={16} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-2">
                    <select
                      value={image.label}
                      onChange={(e) => updateImageLabel(image.id, e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-xs focus:border-blue-400 focus:outline-none"
                    >
                      {labelOptions.map(option => (
                        <option key={option} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {showAnalysis && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center"
                >
                  <Zap className="text-white" size={16} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white">AI Damage Analysis</h3>
                  <p className="text-gray-400 text-sm">
                    Confidence: {analysis.pricing.confidence}% • {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  {...buttonPress}
                  onClick={handleSaveQuote}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Save Quote</span>
                </motion.button>
                <motion.button
                  {...buttonPress}
                  onClick={() => setShowAnalysis(false)}
                  className="bg-white/10 hover:bg-white/20 text-gray-400 p-2 rounded-lg transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Damage Assessment */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Damage Summary</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {analysis.damageAssessment.summary}
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">Affected Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.damageAssessment.affectedAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Repair Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Repair Type:</span>
                      <span className="text-white">{analysis.damageAssessment.repairType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Hours:</span>
                      <span className="text-white">{analysis.damageAssessment.estimatedHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Severity:</span>
                      <span className={`capitalize ${
                        analysis.damageAssessment.severity === 'moderate' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {analysis.damageAssessment.severity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">Estimated Pricing</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Price Range:</span>
                      <span className="text-2xl font-bold text-green-400">
                        ${analysis.pricing.estimatedRange.min.toLocaleString()} - ${analysis.pricing.estimatedRange.max.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm border-t border-white/10 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Labor:</span>
                        <span className="text-white">${analysis.pricing.breakdown.labor.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Parts:</span>
                        <span className="text-white">${analysis.pricing.breakdown.parts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Materials:</span>
                        <span className="text-white">${analysis.pricing.breakdown.materials.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={14} />
                        <span className="text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">Next Steps</h4>
                  <ul className="space-y-2">
                    {analysis.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageUploadPanel
