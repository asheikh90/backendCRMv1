import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Upload, MessageSquare, Search } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      title: 'New Quote',
      description: 'Start AI quote engine',
      icon: Plus,
      color: 'neon-blue',
      action: () => console.log('New quote')
    },
    {
      title: 'Upload Photos',
      description: 'Visual proof engine',
      icon: Upload,
      color: 'neon-green',
      action: () => console.log('Upload photos')
    },
    {
      title: 'Follow Up',
      description: 'Send automated SMS',
      icon: MessageSquare,
      color: 'yellow-400',
      action: () => console.log('Follow up')
    },
    {
      title: 'Search Jobs',
      description: 'Find by phone/VIN',
      icon: Search,
      color: 'purple-400',
      action: () => console.log('Search')
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.title}
              onClick={action.action}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-dark-bg hover:bg-opacity-80 transition-all duration-200 group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg bg-${action.color} bg-opacity-20`}>
                <Icon className={`text-${action.color}`} size={16} />
              </div>
              <div className="text-left">
                <p className="font-medium text-white group-hover:text-neon-blue">
                  {action.title}
                </p>
                <p className="text-xs text-dark-muted">{action.description}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
