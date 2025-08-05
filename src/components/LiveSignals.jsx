import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, X } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'

const LiveSignals = () => {
  const navigate = useNavigate()
  const { isDemoMode, getDemoSignals } = useDemoStore()
  const [currentSignal, setCurrentSignal] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [signals, setSignals] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      setSignals(getDemoSignals())
    } else {
      // In real mode, you'd fetch from API
      setSignals([])
    }
  }, [isDemoMode, getDemoSignals])

  useEffect(() => {
    if (signals.length === 0) return

    const interval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % signals.length)
    }, 10000) // Rotate every 10 seconds

    return () => clearInterval(interval)
  }, [signals.length])

  if (!isVisible || signals.length === 0) return null

  const signal = signals[currentSignal]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-400 bg-opacity-10 text-red-400'
      case 'medium': return 'border-yellow-400 bg-yellow-400 bg-opacity-10 text-yellow-400'
      case 'low': return 'border-green-400 bg-green-400 bg-opacity-10 text-green-400'
      default: return 'border-neon-blue bg-neon-blue bg-opacity-10 text-neon-blue'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-30 border-b ${getPriorityColor(signal.priority)}`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="text-2xl animate-pulse">{signal.icon}</div>
            <div>
              <p className="font-medium">{signal.message}</p>
              <div className="flex items-center space-x-2 text-xs opacity-75">
                <span>Live Signal {currentSignal + 1}/{signals.length}</span>
                <span>•</span>
                <span>Updates every 10s</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => navigate(signal.route)}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-current bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">View</span>
              <ChevronRight size={14} />
            </motion.button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded hover:bg-current hover:bg-opacity-20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <motion.div
          className="h-1 bg-current bg-opacity-50"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 10, ease: 'linear' }}
          key={currentSignal}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default LiveSignals
