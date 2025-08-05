import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Zap, Clock, CheckCircle } from 'lucide-react'

const AgentStatus = () => {
  const [isActive, setIsActive] = useState(true)
  const [currentTask, setCurrentTask] = useState('')
  const [taskQueue, setTaskQueue] = useState([])

  useEffect(() => {
    // Simulate agent activity
    const tasks = [
      'Analyzing lead conversion patterns...',
      'Preparing quote for Jessica Martinez...',
      'Scheduling follow-up reminders...',
      'Updating job status for #CC-2024-001...',
      'Generating performance insights...'
    ]

    const interval = setInterval(() => {
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)]
      setCurrentTask(randomTask)
      
      // Simulate task completion
      setTimeout(() => {
        setCurrentTask('')
      }, 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Simulate task queue
    setTaskQueue([
      { id: 1, task: 'Send SMS to Mike Johnson', priority: 'high', eta: '2 min' },
      { id: 2, task: 'Post Before/After to GMB', priority: 'medium', eta: '5 min' },
      { id: 3, task: 'Update CCC system', priority: 'low', eta: '10 min' }
    ])
  }, [])

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-dark-card/80 backdrop-blur-md border border-dark-border rounded-lg px-4 py-2 shadow-lg"
      >
        <div className="flex items-center space-x-3">
          {/* Agent Status Indicator */}
          <div className="flex items-center space-x-2">
            <motion.div
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-3 h-3 rounded-full ${
                isActive ? 'bg-neon-green' : 'bg-red-400'
              }`}
            />
            <span className="text-sm font-medium text-white">
              Agent {isActive ? 'Active' : 'Idle'}
            </span>
          </div>

          {/* Current Task */}
          <AnimatePresence mode="wait">
            {currentTask && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Bot size={16} className="text-neon-blue" />
                </motion.div>
                <span className="text-xs text-dark-muted max-w-48 truncate">
                  {currentTask}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Task Queue Indicator */}
          {taskQueue.length > 0 && (
            <div className="flex items-center space-x-1">
              <Clock size={14} className="text-yellow-400" />
              <span className="text-xs text-yellow-400">
                {taskQueue.length} queued
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AgentStatus
