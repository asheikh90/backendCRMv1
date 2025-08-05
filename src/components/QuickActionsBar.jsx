import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Users, 
  Calendar, 
  Camera, 
  Calculator,
  Zap,
  X
} from 'lucide-react'
import { buttonPress } from '../utils/animations'
import toast from 'react-hot-toast'

const QuickActionsBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    {
      icon: Calculator,
      label: 'New Quote',
      color: 'from-blue-500 to-blue-600',
      action: () => toast.success('Opening AI Quote Engine')
    },
    {
      icon: Users,
      label: 'New Lead',
      color: 'from-green-500 to-green-600',
      action: () => toast.success('Adding new lead')
    },
    {
      icon: Calendar,
      label: 'Schedule Job',
      color: 'from-purple-500 to-purple-600',
      action: () => toast.success('Opening scheduler')
    },
    {
      icon: Camera,
      label: 'Upload Photos',
      color: 'from-orange-500 to-orange-600',
      action: () => toast.success('Opening photo uploader')
    }
  ]

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, ...buttonPress.whileHover.transition }}
    >
      <div className="flex items-center space-x-2">
        <AnimatePresence>
          {isExpanded && (
            <>
              {actions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    initial={{ scale: 0, x: 50 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 50 }}
                    transition={{ delay: index * 0.1 }}
                    {...buttonPress}
                    onClick={action.action}
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-full shadow-lg flex items-center justify-center group relative`}
                  >
                    <Icon className="text-white" size={20} />
                    
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 bg-gray-900/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap pointer-events-none"
                    >
                      {action.label}
                    </motion.div>
                  </motion.button>
                )
              })}
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          {...buttonPress}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center"
          style={{
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)"
          }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <X className="text-white" size={24} /> : <Zap className="text-white" size={24} />}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default QuickActionsBar
