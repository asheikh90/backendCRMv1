import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Zap, Download, Copy, Brain } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

const QuoteEngine = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState(null)
  const [generatedQuote, setGeneratedQuote] = useState(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.pdf'],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0])
      processCompetitorQuote(acceptedFiles[0])
    }
  })

  const processCompetitorQuote = async (file) => {
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setExtractedData({
        competitor: 'AutoBody Plus',
        vehicle: '2022 Honda Civic',
        damage: 'Rear bumper replacement + paint',
        laborHours: 8,
        partsCost: 450,
        paintCost: 200,
        totalEstimate: 1250
      })
      
      generateCollisionClubQuote()
    }, 2000)
  }

  const generateCollisionClubQuote = () => {
    setTimeout(() => {
      setGeneratedQuote({
        jobId: '#CC-2024-' + Math.floor(Math.random() * 1000),
        vehicle: '2022 Honda Civic',
        damage: 'Rear bumper replacement + paint',
        
        // Labor breakdown
        labor: {
          removal: { hours: 1.5, rate: 85, total: 127.50 },
          bodywork: { hours: 3, rate: 85, total: 255 },
          paint: { hours: 4, rate: 85, total: 340 },
          reassembly: { hours: 1, rate: 85, total: 85 }
        },
        
        // Parts with Collision Club markup
        parts: {
          bumperCover: { cost: 380, markup: 1.3, total: 494 },
          clips: { cost: 25, markup: 1.3, total: 32.50 },
          foam: { cost: 45, markup: 1.3, total: 58.50 }
        },
        
        // Paint & materials (Sherwin-Williams)
        paint: {
          basecoat: { cost: 85, total: 85 },
          clearcoat: { cost: 65, total: 65 },
          primer: { cost: 35, total: 35 },
          supplies: { cost: 45, total: 45 }
        },
        
        // Upsells
        upsells: {
          headlightRestore: { price: 150, recommended: true },
          trimBlackout: { price: 75, recommended: true },
          sealerUpgrade: { price: 100, recommended: false }
        },
        
        // Warranty tiers
        warranty: {
          standard: { months: 12, price: 0 },
          premium: { months: 24, price: 150 },
          lifetime: { months: 'lifetime', price: 300 }
        },
        
        subtotal: 1622,
        tax: 129.76,
        total: 1751.76,
        
        // Competitive analysis
        competitive: {
          ourPrice: 1751.76,
          competitorPrice: 1250,
          difference: 501.76,
          valueProps: [
            'OEM parts guarantee',
            'Sherwin-Williams paint system',
            'Lifetime warranty available',
            'Free headlight restoration'
          ]
        }
      })
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">AI Quote Engine</h1>
          <p className="text-dark-muted">Upload competitor quotes → Generate Collision Club quotes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="text-neon-blue" size={24} />
          <span className="text-neon-blue font-semibold">AI POWERED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 text-white">Upload Competitor Quote</h3>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? 'border-neon-blue bg-neon-blue bg-opacity-10' 
                  : 'border-dark-border hover:border-neon-blue'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-4 text-dark-muted" size={48} />
              {isDragActive ? (
                <p className="text-neon-blue">Drop the quote here...</p>
              ) : (
                <div>
                  <p className="text-white mb-2">Drag & drop competitor quote here</p>
                  <p className="text-dark-muted text-sm">Supports PDF, JPG, PNG</p>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="mt-4 p-3 bg-dark-bg rounded-lg">
                <p className="text-white font-medium">Uploaded: {uploadedFile.name}</p>
                <p className="text-dark-muted text-sm">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            )}
          </div>

          {/* Extracted Data */}
          {extractedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2">
                <Zap className="text-yellow-400" size={20} />
                <span>Extracted Data</span>
              </h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-dark-muted text-sm">Competitor</p>
                    <p className="text-white font-medium">{extractedData.competitor}</p>
                  </div>
                  <div>
                    <p className="text-dark-muted text-sm">Vehicle</p>
                    <p className="text-white font-medium">{extractedData.vehicle}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-dark-muted text-sm">Damage Description</p>
                  <p className="text-white font-medium">{extractedData.damage}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-dark-muted text-sm">Labor Hours</p>
                    <p className="text-neon-blue font-bold">{extractedData.laborHours}h</p>
                  </div>
                  <div>
                    <p className="text-dark-muted text-sm">Parts Cost</p>
                    <p className="text-neon-green font-bold">${extractedData.partsCost}</p>
                  </div>
                  <div>
                    <p className="text-dark-muted text-sm">Their Total</p>
                    <p className="text-yellow-400 font-bold">${extractedData.totalEstimate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Generated Quote */}
        <div className="space-y-6">
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card text-center"
            >
              <div className="animate-spin mx-auto mb-4 text-neon-blue">
                <Brain size={48} />
              </div>
              <p className="text-white font-medium">AI is analyzing the quote...</p>
              <p className="text-dark-muted text-sm">Applying Collision Club logic</p>
            </motion.div>
          )}

          {generatedQuote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Collision Club Quote</h3>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">
                    <Copy size={16} className="mr-1" />
                    Copy
                  </button>
                  <button className="btn-primary text-sm">
                    <Download size={16} className="mr-1" />
                    Export
                  </button>
                </div>
              </div>

              {/* Quote Header */}
              <div className="bg-dark-bg p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-neon-blue font-mono font-bold">{generatedQuote.jobId}</p>
                    <p className="text-white font-medium">{generatedQuote.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neon-green text-2xl font-bold">${generatedQuote.total}</p>
                    <p className="text-dark-muted text-sm">Total Estimate</p>
                  </div>
                </div>
              </div>

              {/* Labor Breakdown */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Labor Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(generatedQuote.labor).map(([key, labor]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-dark-muted capitalize">{key}</span>
                      <span className="text-white">{labor.hours}h × ${labor.rate} = ${labor.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parts */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">OEM Parts</h4>
                <div className="space-y-2">
                  {Object.entries(generatedQuote.parts).map(([key, part]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-dark-muted capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white">${part.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paint & Materials */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Sherwin-Williams Paint System</h4>
                <div className="space-y-2">
                  {Object.entries(generatedQuote.paint).map(([key, paint]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-dark-muted capitalize">{key}</span>
                      <span className="text-white">${paint.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Upsells */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Recommended Add-ons</h4>
                <div className="space-y-2">
                  {Object.entries(generatedQuote.upsells).map(([key, upsell]) => (
                    <div key={key} className={`flex justify-between text-sm p-2 rounded ${
                      upsell.recommended ? 'bg-neon-green bg-opacity-10 border border-neon-green' : 'bg-dark-bg'
                    }`}>
                      <span className={upsell.recommended ? 'text-neon-green' : 'text-dark-muted'}>
                        {key.replace(/([A-Z])/g, ' $1')} {upsell.recommended && '(Recommended)'}
                      </span>
                      <span className="text-white">${upsell.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Analysis */}
              <div className="bg-dark-bg p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Competitive Analysis</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-dark-muted text-sm">Our Quote</p>
                    <p className="text-neon-green text-xl font-bold">${generatedQuote.competitive.ourPrice}</p>
                  </div>
                  <div>
                    <p className="text-dark-muted text-sm">Competitor</p>
                    <p className="text-red-400 text-xl font-bold">${generatedQuote.competitive.competitorPrice}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-dark-muted text-sm">Price Difference</p>
                  <p className="text-yellow-400 font-bold">+${generatedQuote.competitive.difference}</p>
                </div>

                <div>
                  <p className="text-dark-muted text-sm mb-2">Our Value Advantages:</p>
                  <ul className="space-y-1">
                    {generatedQuote.competitive.valueProps.map((prop, index) => (
                      <li key={index} className="text-neon-blue text-sm">• {prop}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuoteEngine
