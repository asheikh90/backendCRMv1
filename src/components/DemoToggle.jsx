import React from 'react'
import { motion } from 'framer-motion'
import { Play, Square } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'

const DemoToggle = () => {
  const { isDemoMode, toggleDemoMode } = useDemoStore()

  return (
    <motion.button
      onClick={toggleDemoMode}
      className={`fixed top-4 right-4 z-40 flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isDemoMode
          ? 'bg-neon-green text-dark-bg shadow-neon-green'
          : 'bg-dark-card border border-dark-border text-dark-muted hover:text-white hover:border-neon-blue'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDemoMode ? <Square size={16} /> : <Play size={16} />}
      <span className="text-sm">
        {isDemoMode ? 'Exit Demo' : 'Demo Mode'}
      </span>
    </motion.button>
  )
}

export default DemoToggle
