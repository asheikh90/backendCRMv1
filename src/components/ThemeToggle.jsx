import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { buttonPress } from '../utils/animations'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <motion.button
      {...buttonPress}
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-30 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center shadow-lg"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="text-blue-400" size={20} />
        ) : (
          <Sun className="text-yellow-400" size={20} />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
