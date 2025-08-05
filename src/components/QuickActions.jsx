import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Upload, MessageSquare, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ActionButton from './ActionButton'
import toast from 'react-hot-toast'

const QuickActions = () => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'New Quote',
      description: 'Start AI quote engine',
      icon: Plus,
      color: 'neon-blue',
      action: () => {
        navigate('/quotes')
        toast.success('Opening AI Quote Engine')
      }
    },
    {
      title: 'Upload Photos',
      description: 'Visual proof engine',
      icon: Upload,
      color: 'neon-green',
      action: () => {
        navigate('/proof')
        toast.success('Opening Visual Proof Engine')
      }
    },
    {
      title: 'Follow Up',
      description: 'Send automated SMS',
      icon: MessageSquare,
      color: 'yellow-400',
      action: () => {
        navigate('/leads')
        toast.success('Opening Lead Tracker')
      }
    },
    {
      title: 'Search Jobs',
      description: 'Find by phone/VIN',
      icon: Search,
      color: 'purple-400',
      action: () => {
        navigate('/pipeline')
        toast.success('Opening Job Pipeline')
      }
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ActionButton
                onClick={action.action}
                variant="ghost"
                className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-dark-bg hover:bg-opacity-80 transition-all duration-200 group justify-start`}
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
              </ActionButton>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
