import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageSquare, FileText, Phone, CheckCircle } from 'lucide-react'

const AgentOverlay = () => {
  const [agentLogs, setAgentLogs] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate agent activity logs
    const logs = [
      {
        id: 1,
        action: 'SMS sent to Jessica Martinez',
        details: 'Quote reminder - "Hi Jessica, just checking if you had questions about your Honda Civic repair quote..."',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        icon: MessageSquare,
        status: 'completed'
      },
      {
        id: 2,
        action: 'Quote generated for Mike Johnson',
        details: 'Toyota Camry door repair - $1,850 with OEM parts',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        icon: FileText,
        status: 'completed'
      },
      {
        id: 3,
        action: 'Follow-up scheduled',
        details: 'Sarah Wilson - BMW repair follow-up in 2 days',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        icon: Phone,
        status: 'scheduled'
      }
    ]

    setAgentLogs(logs)

    // Show overlay periodically
    const interval = setInterval(() => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed bottom-20 right-6 w-80 bg-dark-card/90 backdrop-blur-md border border-neon-blue/30 rounded-lg shadow-2xl z-40"
        >
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="text-neon-blue" size={20} />
              </motion.div>
              <h3 className="text-white font-semibold">Agent Activity</h3>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
              {agentLogs.map((log, index) => {
                const Icon = log.icon
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-2 bg-dark-bg/50 rounded-lg"
                  >
                    <div className={`p-1 rounded ${
                      log.status === 'completed' ? 'bg-neon-green/20' : 'bg-yellow-400/20'
                    }`}>
                      <Icon size={14} className={
                        log.status === 'completed' ? 'text-neon-green' : 'text-yellow-400'
                      } />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{log.action}</p>
                      <p className="text-dark-muted text-xs mt-1 line-clamp-2">{log.details}</p>
                      <p className="text-dark-muted text-xs mt-1">
                        {log.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {log.status === 'completed' && (
                      <CheckCircle size={14} className="text-neon-green flex-shrink-0" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AgentOverlay
