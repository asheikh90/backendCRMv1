import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, Share2, Download, Eye } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import SuggestedNextStep from '../components/SuggestedNextStep'
import { cardVariants } from '../utils/animationVariants'
import toast from 'react-hot-toast'

const ProofEngine = () => {
  const [beforeImages, setBeforeImages] = useState([])
  const [afterImages, setAfterImages] = useState([])
  const [generatedProofs, setGeneratedProofs] = useState([])

  const beforeDropzone = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    onDrop: (acceptedFiles) => {
      setBeforeImages(prev => [...prev, ...acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }))])
      toast.success(`${acceptedFiles.length} before photo(s) uploaded`)
    }
  })

  const afterDropzone = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    onDrop: (acceptedFiles) => {
      setAfterImages(prev => [...prev, ...acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      }))])
      toast.success(`${acceptedFiles.length} after photo(s) uploaded`)
    }
  })

  const generateProof = () => {
    if (beforeImages.length > 0 && afterImages.length > 0) {
      const newProof = {
        id: Math.random().toString(36).substr(2, 9),
        jobId: '#CC-2024-' + Math.floor(Math.random() * 1000),
        customer: 'Jessica Martinez',
        vehicle: '2022 Honda Civic',
        service: 'Rear Bumper Repair & Paint',
        price: '$2,450',
        warranty: '3-Year Warranty',
        beforeImage: beforeImages[0].preview,
        afterImage: afterImages[0].preview,
        createdAt: new Date().toISOString(),
        watermarked: true
      }
      
      setGeneratedProofs(prev => [newProof, ...prev])
      toast.success('Watermarked proof generated!')
    }
  }

  const mockProofs = [
    {
      id: '1',
      jobId: '#CC-2024-001',
      customer: 'Mike Johnson',
      vehicle: '2021 Toyota Camry',
      service: 'Door Dent Removal',
      price: '$1,850',
      warranty: '2-Year Warranty',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      createdAt: '2024-01-14T10:30:00Z',
      watermarked: true,
      posted: {
        gmb: true,
        facebook: true,
        instagram: false
      }
    },
    {
      id: '2',
      jobId: '#CC-2024-002',
      customer: 'Sarah Wilson',
      vehicle: '2020 BMW 3 Series',
      service: 'Front End Collision Repair',
      price: '$3,200',
      warranty: 'Lifetime Warranty',
      beforeImage: '/api/placeholder/300/200',
      afterImage: '/api/placeholder/300/200',
      createdAt: '2024-01-13T15:45:00Z',
      watermarked: true,
      posted: {
        gmb: true,
        facebook: true,
        instagram: true
      }
    }
  ]

  const allProofs = [...generatedProofs, ...mockProofs]

  const suggestions = [
    {
      text: "5 jobs missing Before/After photos",
      priority: "high",
      action: () => toast.success("Opening job list for photo upload")
    },
    {
      text: "Auto-post 3 completed proofs to GMB",
      priority: "medium",
      action: () => toast.success("Scheduling GMB posts")
    },
    {
      text: "Generate social media content from recent proofs",
      priority: "low",
      action: () => toast.success("Creating social media posts")
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold neon-text">Visual Proof Engine</h1>
          <p className="text-dark-muted">Create before/after proofs with automatic watermarking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="text-neon-green" size={24} />
          <span className="text-neon-green font-semibold">AUTO-WATERMARK</span>
        </div>
      </motion.div>

      {/* AI Suggested Next Steps */}
      <SuggestedNextStep 
        suggestions={suggestions}
        onAction={(suggestion) => suggestion.action()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Before Images */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Before Photos</h3>
            
            <motion.div
              {...beforeDropzone.getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                beforeDropzone.isDragActive 
                  ? 'border-red-400 bg-red-400/10 backdrop-blur-sm' 
                  : 'border-dark-border hover:border-red-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...beforeDropzone.getInputProps()} />
              <motion.div
                animate={beforeDropzone.isDragActive ? { scale: 1.1 } : { scale: 1 }}
              >
                <Upload className="mx-auto mb-2 text-dark-muted" size={32} />
              </motion.div>
              <p className="text-white text-sm">Drop before photos here</p>
            </motion.div>

            {beforeImages.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-2 mt-4"
              >
                {beforeImages.map((image, index) => (
                  <motion.div 
                    key={image.id} 
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={image.preview}
                      alt="Before"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      BEFORE
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* After Images */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="card"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">After Photos</h3>
            
            <motion.div
              {...afterDropzone.getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                afterDropzone.isDragActive 
                  ? 'border-neon-green bg-neon-green/10 backdrop-blur-sm' 
                  : 'border-dark-border hover:border-neon-green'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...afterDropzone.getInputProps()} />
              <motion.div
                animate={afterDropzone.isDragActive ? { scale: 1.1 } : { scale: 1 }}
              >
                <Upload className="mx-auto mb-2 text-dark-muted" size={32} />
              </motion.div>
              <p className="text-white text-sm">Drop after photos here</p>
            </motion.div>

            {afterImages.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-2 mt-4"
              >
                {afterImages.map((image, index) => (
                  <motion.div 
                    key={image.id} 
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={image.preview}
                      alt="After"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 left-1 bg-neon-green text-dark-bg text-xs px-2 py-1 rounded">
                      AFTER
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Generate Button */}
          {beforeImages.length > 0 && afterImages.length > 0 && (
            <motion.button
              onClick={generateProof}
              className="w-full btn-primary py-4 text-lg"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Generate Watermarked Proof
            </motion.button>
          )}
        </div>

        {/* Generated Proofs */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-white">Generated Proofs</h3>
            
            {allProofs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Eye className="mx-auto mb-4 text-dark-muted" size={48} />
                <p className="text-dark-muted">No proofs generated yet</p>
                <p className="text-dark-muted text-sm">Upload before/after photos to get started</p>
              </motion.div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                {allProofs.map((proof, index) => (
                  <motion.div
                    key={proof.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-dark-bg/50 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-80 transition-all duration-200"
                  >
                    {/* Proof Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-neon-blue font-mono font-semibold">{proof.jobId}</p>
                        <p className="text-white font-medium">{proof.customer}</p>
                        <p className="text-dark-muted text-sm">{proof.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-green font-bold">{proof.price}</p>
                        <p className="text-dark-muted text-sm">{proof.warranty}</p>
                      </div>
                    </div>

                    {/* Before/After Images */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={proof.beforeImage}
                          alt="Before"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          BEFORE
                        </div>
                      </motion.div>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={proof.afterImage}
                          alt="After"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-neon-green text-dark-bg text-xs px-2 py-1 rounded">
                          AFTER
                        </div>
                        {/* Watermark Overlay */}
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                          {proof.service} - {proof.price}
                        </div>
                      </motion.div>
                    </div>

                    {/* Social Media Status */}
                    {proof.posted && (
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-dark-muted text-sm">Posted to:</span>
                        <div className="flex space-x-2">
                          {Object.entries(proof.posted).map(([platform, posted]) => (
                            <motion.span
                              key={platform}
                              className={`text-xs px-2 py-1 rounded ${
                                posted ? 'bg-neon-green/20 text-neon-green' : 'bg-dark-border text-dark-muted'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {platform.toUpperCase()}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <motion.button 
                        className="btn-secondary text-xs px-3 py-1 flex items-center space-x-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.success('Proof shared to social media')}
                      >
                        <Share2 size={12} />
                        <span>Share</span>
                      </motion.button>
                      <motion.button 
                        className="btn-primary text-xs px-3 py-1 flex items-center space-x-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.success('Proof downloaded')}
                      >
                        <Download size={12} />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProofEngine
