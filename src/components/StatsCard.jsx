import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+')
  
  return (
    <motion.div 
      className="card-hover"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dark-muted text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className={`text-sm mt-1 ${
            isPositive ? 'text-neon-green' : 'text-red-400'
          }`}>
            {change} from yesterday
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-${color} bg-opacity-20`}>
          <Icon className={`text-${color}`} size={24} />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
