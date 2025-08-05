import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, Database, Zap, AlertTriangle } from 'lucide-react'

const SystemStatus = () => {
  const [status, setStatus] = useState({
    connection: 'online',
    database: 'connected',
    ai: 'active',
    lastUpdate: new Date()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastUpdate: new Date()
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'active':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'offline':
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (type, status) => {
    const iconClass = `${getStatusColor(status)} w-4 h-4`
    
    switch (type) {
      case 'connection':
        return <Wifi className={iconClass} />
      case 'database':
        return <Database className={iconClass} />
      case 'ai':
        return <Zap className={iconClass} />
      default:
        return <AlertTriangle className={iconClass} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-30 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-lg"
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {getStatusIcon('connection', status.connection)}
          <span className="text-xs text-gray-300">Network</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {getStatusIcon('database', status.database)}
          <span className="text-xs text-gray-300">Database</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {getStatusIcon('ai', status.ai)}
          <span className="text-xs text-gray-300">AI</span>
        </div>
        
        <div className="text-xs text-gray-400">
          {status.lastUpdate.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatus
