import React from 'react'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, AlertTriangle } from 'lucide-react'

const SmartActionHint = ({ type, data, className = "" }) => {
  const getHintContent = () => {
    switch (type) {
      case 'lastUpdate':
        return {
          icon: Clock,
          text: `Last update: ${data}`,
          color: 'text-dark-muted'
        }
      case 'trend':
        return {
          icon: TrendingUp,
          text: `${data.direction} ${data.percentage}% this week`,
          color: data.direction === 'up' ? 'text-neon-green' : 'text-red-400'
        }
      case 'urgent':
        return {
          icon: AlertTriangle,
          text: data,
          color: 'text-yellow-400'
        }
      default:
        return null
    }
  }

  const hint = getHintContent()
  if (!hint) return null

  const Icon = hint.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center space-x-1 text-xs ${hint.color} ${className}`}
    >
      <Icon size={12} />
      <span>{hint.text}</span>
    </motion.div>
  )
}

export default SmartActionHint
