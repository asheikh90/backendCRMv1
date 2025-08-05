import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { 
  Clock, 
  DollarSign, 
  User, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Phone,
  MessageSquare
} from 'lucide-react'
import { cardHover, buttonPress } from '../utils/animations'
import toast from 'react-hot-toast'

const KanbanBoard = ({ jobs = [], onJobUpdate }) => {
  const [columns, setColumns] = useState({
    'new-inquiry': {
      id: 'new-inquiry',
      title: 'New Inquiry',
      color: 'from-gray-500 to-gray-600',
      jobs: jobs.filter(job => job.status === 'New Inquiry')
    },
    'estimate-sent': {
      id: 'estimate-sent',
      title: 'Estimate Sent',
      color: 'from-blue-500 to-blue-600',
      jobs: jobs.filter(job => job.status === 'Estimate')
    },
    'job-scheduled': {
      id: 'job-scheduled',
      title: 'Job Scheduled',
      color: 'from-yellow-500 to-yellow-600',
      jobs: jobs.filter(job => job.status === 'Scheduled')
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      color: 'from-orange-500 to-orange-600',
      jobs: jobs.filter(job => job.status === 'In Progress')
    },
    'complete': {
      id: 'complete',
      title: 'Complete',
      color: 'from-green-500 to-green-600',
      jobs: jobs.filter(job => job.status === 'Delivered')
    }
  })

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    if (start === finish) {
      const newJobIds = Array.from(start.jobs)
      const [removed] = newJobIds.splice(source.index, 1)
      newJobIds.splice(destination.index, 0, removed)

      const newColumn = {
        ...start,
        jobs: newJobIds
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn
      })
    } else {
      const startJobIds = Array.from(start.jobs)
      const [removed] = startJobIds.splice(source.index, 1)
      const newStart = {
        ...start,
        jobs: startJobIds
      }

      const finishJobIds = Array.from(finish.jobs)
      finishJobIds.splice(destination.index, 0, removed)
      const newFinish = {
        ...finish,
        jobs: finishJobIds
      }

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      })

      // Update job status
      const statusMap = {
        'new-inquiry': 'New Inquiry',
        'estimate-sent': 'Estimate',
        'job-scheduled': 'Scheduled',
        'in-progress': 'In Progress',
        'complete': 'Delivered'
      }

      toast.success(`Job moved to ${finish.title}`)
      if (onJobUpdate) {
        onJobUpdate(draggableId, statusMap[destination.droppableId])
      }
    }
  }

  const getUrgencyColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getConfidenceScore = (job) => {
    // AI confidence score based on various factors
    const factors = {
      responseTime: job.responseTime < 2 ? 20 : 10,
      leadSource: job.source === 'Referrals' ? 25 : job.source === 'Dealers' ? 20 : 15,
      estimatedValue: job.estimatedValue > 2000 ? 20 : 15,
      followUpConsistency: job.followUps > 2 ? 15 : 10,
      customerEngagement: job.engagement === 'high' ? 20 : 10
    }
    
    return Math.min(100, Object.values(factors).reduce((sum, score) => sum + score, 0))
  }

  return (
    <div className="p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-r ${column.color} rounded-xl p-4 text-white`}
              >
                <h3 className="font-semibold text-center">{column.title}</h3>
                <p className="text-center text-sm opacity-80">{column.jobs.length} jobs</p>
              </motion.div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[500px] rounded-xl p-2 transition-all duration-200 ${
                      snapshot.isDraggingOver 
                        ? 'bg-blue-500/10 border-2 border-blue-500/30' 
                        : 'bg-white/5 border-2 border-transparent'
                    }`}
                  >
                    <AnimatePresence>
                      {column.jobs.map((job, index) => {
                        const confidenceScore = getConfidenceScore(job)
                        
                        return (
                          <Draggable key={job.id} draggableId={job.id} index={index}>
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                variants={cardHover}
                                whileHover="hover"
                                className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 mb-3 cursor-grab active:cursor-grabbing transition-all duration-200 ${
                                  snapshot.isDragging ? 'rotate-3 shadow-2xl' : ''
                                }`}
                              >
                                {/* Job Header */}
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <p className="text-blue-400 font-mono text-sm font-semibold">{job.id}</p>
                                    <h4 className="text-white font-medium">{job.customer}</h4>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${getUrgencyColor(job.priority)}`} />
                                    <span className="text-xs text-gray-400">{job.priority?.toUpperCase()}</span>
                                  </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="mb-3">
                                  <p className="text-white text-sm font-medium">{job.vehicle}</p>
                                  <p className="text-gray-400 text-xs">{job.issue}</p>
                                </div>

                                {/* Value & Confidence */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="text-green-400" size={14} />
                                    <span className="text-green-400 font-semibold text-sm">{job.value}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${confidenceScore}%` }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className={`h-full ${
                                          confidenceScore > 80 ? 'bg-green-400' :
                                          confidenceScore > 60 ? 'bg-yellow-400' : 'bg-red-400'
                                        }`}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-400">{confidenceScore}%</span>
                                  </div>
                                </div>

                                {/* Estimator & Due Date */}
                                <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                                  <div className="flex items-center space-x-1">
                                    <User size={12} />
                                    <span>{job.estimator}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar size={12} />
                                    <span>{new Date(job.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                  <motion.button
                                    {...buttonPress}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toast.success(`Calling ${job.customer}`)
                                    }}
                                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-1 px-2 rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
                                  >
                                    <Phone size={12} />
                                    <span>Call</span>
                                  </motion.button>
                                  <motion.button
                                    {...buttonPress}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toast.success(`SMS sent to ${job.customer}`)
                                    }}
                                    className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1 px-2 rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
                                  >
                                    <MessageSquare size={12} />
                                    <span>SMS</span>
                                  </motion.button>
                                </div>

                                {/* Overdue Indicator */}
                                {new Date(job.dueDate) < new Date() && job.status !== 'Delivered' && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-2 flex items-center space-x-1 text-red-400 text-xs"
                                  >
                                    <AlertTriangle size={12} />
                                    <span>OVERDUE</span>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </Draggable>
                        )
                      })}
                    </AnimatePresence>
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default KanbanBoard
