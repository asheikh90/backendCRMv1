import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Edit, Thermometer } from 'lucide-react'

const ContextualTooltip = ({ 
  children, 
  content, 
  actions = [], 
  hoverDelay = 2000,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverTimer, setHoverTimer] = useState(null)

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
      }, hoverDelay)
      setHoverTimer(timer)
    } else {
      if (hoverTimer) {
        clearTimeout(hoverTimer)
      }
      setShowTooltip(false)
    }

    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer)
      }
    }
  }, [isHovered, hoverDelay])

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-dark-card/95 backdrop-blur-md border border-neon-blue/30 rounded-lg p-3 shadow-2xl min-w-48">
              <p className="text-white text-sm mb-2">{content}</p>
              
              {actions.length > 0 && (
                <div className="flex space-x-2">
                  {actions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={action.onClick}
                        className="flex items-center space-x-1 px-2 py-1 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded text-xs transition-colors"
                      >
                        <Icon size={12} />
                        <span>{action.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              )}
            </div>
            
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-4 border-transparent border-t-dark-card/95"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContextualTooltip
