import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, X, ArrowRight } from 'lucide-react'
import { slideInVariants } from '../utils/animationVariants'

const SuggestedNextStep = ({ suggestions, onAction, onDismiss }) => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || !suggestions || suggestions.length === 0) return null

  const handleDismiss = () => {
    setDismissed(true)
    if (onDismiss) onDismiss()
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-gradient-to-r from-neon-blue/10 to-neon-green/10 border border-neon-blue/30 rounded-lg p-4 mb-6 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="p-2 bg-neon-blue/20 rounded-lg"
            >
              <Lightbulb className="text-neon-blue" size={20} />
            </motion.div>
            
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">🤖 AI Suggested Next Steps</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-dark-bg/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-white">{suggestion.text}</span>
                      {suggestion.priority === 'high' && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                          HIGH
                        </span>
                      )}
                    </div>
                    
                    {suggestion.action && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onAction && onAction(suggestion)}
                        className="flex items-center space-x-1 px-3 py-1 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg text-sm transition-colors"
                      >
                        <span>Do It</span>
                        <ArrowRight size={12} />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-dark-bg/50 rounded-lg transition-colors"
          >
            <X size={16} className="text-dark-muted" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SuggestedNextStep
