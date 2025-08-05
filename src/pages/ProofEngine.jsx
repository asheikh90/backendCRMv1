import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, Share2, Download, Eye } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Visual Proof Engine</h1>
          <p className="text-dark-muted">Create before/after proofs with automatic watermarking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Camera className="text-neon-green" size={24} />
          <span className="text-neon-green font-semibold">AUTO-WATERMARK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Before Images */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-white">Before Photos</h3>
            
            <div
              {...beforeDropzone.getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                beforeDropzone.isDragActive 
                  ? 'border-red-400 bg-red-400 bg-opacity-10' 
                  : 'border-dark-border hover:border-red-400'
              }`}
            >
              <input {...beforeDropzone.getInputProps()} />
              <Upload className="mx-auto mb-2 text-dark-muted" size={32} />
              <p className="text-white text-sm">Drop before photos here</p>
            </div>

            {beforeImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {beforeImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt="Before"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      BEFORE
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* After Images */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-white">After Photos</h3>
            
            <div
              {...afterDropzone.getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                afterDropzone.isDragActive 
                  ? 'border-neon-green bg-neon-green bg-opacity-10' 
                  : 'border-dark-border hover:border-neon-green'
              }`}
            >
              <input {...afterDropzone.getInputProps()} />
              <Upload className="mx-auto mb-2 text-dark-muted" size={32} />
              <p className="text-white text-sm">Drop after photos here</p>
            </div>

            {afterImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {afterImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt="After"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 left-1 bg-neon-green text-dark-bg text-xs px-2 py-1 rounded">
                      AFTER
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button */}
          {beforeImages.length > 0 && afterImages.length > 0 && (
            <motion.button
              onClick={generateProof}
              className="w-full btn-primary py-4 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate Watermarked Proof
            </motion.button>
          )}
        </div>

        {/* Generated Proofs */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-white">Generated Proofs</h3>
            
            {allProofs.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="mx-auto mb-4 text-dark-muted" size={48} />
                <p className="text-dark-muted">No proofs generated yet</p>
                <p className="text-dark-muted text-sm">Upload before/after photos to get started</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                {allProofs.map((proof) => (
                  <motion.div
                    key={proof.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-bg p-4 rounded-lg"
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
                      <div className="relative">
                        <img
                          src={proof.beforeImage}
                          alt="Before"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          BEFORE
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={proof.afterImage}
                          alt="After"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-neon-green text-dark-bg text-xs px-2 py-1 rounded">
                          AFTER
                        </div>
                        {/* Watermark Overlay */}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {proof.service} - {proof.price}
                        </div>
                      </div>
                    </div>

                    {/* Social Media Status */}
                    {proof.posted && (
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-dark-muted text-sm">Posted to:</span>
                        <div className="flex space-x-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            proof.posted.gmb ? 'bg-blue-500 text-white' : 'bg-dark-border text-dark-muted'
                          }`}>
                            GMB
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            proof.posted.facebook ? 'bg-blue-600 text-white' : 'bg-dark-border text-dark-muted'
                          }`}>
                            Facebook
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            proof.posted.instagram ? 'bg-pink-500 text-white' : 'bg-dark-border text-dark-muted'
                          }`}>
                            Instagram
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-3 py-1 flex items-center space-x-1">
                        <Share2 size={12} />
                        <span>Share</span>
                      </button>
                      <button className="btn-primary text-xs px-3 py-1 flex items-center space-x-1">
                        <Download size={12} />
                        <span>Download</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProofEngine
