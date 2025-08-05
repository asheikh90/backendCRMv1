import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Radar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Phone,
  FileText,
  Wrench
} from 'lucide-react'

const OperatorRadar = () => {
  const [filter, setFilter] = useState('all')

  const radarItems = [
    {
      id: 1,
      type: 'follow-up',
      priority: 'high',
      title: 'Follow up with Jessica Martinez',
      description: 'GMB lead - Quote sent 2 days ago, no response',
      action: 'Send SMS reminder',
      dueTime: '2024-01-15T14:00:00Z',
      customer: 'Jessica Martinez',
      phone: '(215) 555-0123',
      value: '$2,450',
      icon: MessageSquare,
      color: 'red-400'
    },
    {
      id: 2,
      type: 'update',
      priority: 'medium',
      title: 'Update CCC for job #CC-2024-001',
      description: 'Parts arrived, need to update repair timeline',
      action: 'Update CCC system',
      dueTime: '2024-01-15T16:00:00Z',
      customer: 'Mike Johnson',
      jobId: '#CC-2024-001',
      icon: FileText,
      color: 'yellow-400'
    },
    {
      id: 3,
      type: 'review',
      priority: 'high',
      title: 'Tech needs note review',
      description: 'Additional damage found on BMW repair',
      action: 'Review and approve',
      dueTime: '2024-01-15T11:00:00Z',
      customer: 'Sarah Wilson',
      jobId: '#CC-2024-003',
      value: '+$850',
      icon: Wrench,
      color: 'red-400'
    },
    {
      id: 4,
      type: 'call',
      priority: 'medium',
      title: 'Call parts supplier',
      description: 'Bumper for Honda Civic delayed',
      action: 'Get new ETA',
      dueTime: '2024-01-15T15:30:00Z',
      customer: 'Related to Jessica Martinez',
      icon: Phone,
      color: 'yellow-400'
    },
    {
      id: 5,
      type: 'follow-up',
      priority: 'low',
      title: 'Check on delivered job',
      description: 'Customer satisfaction follow-up',
      action: 'Send satisfaction survey',
      dueTime: '2024-01-16T10:00:00Z',
      customer: 'David Brown',
      jobId: '#CC-2024-004',
      icon: CheckCircle,
      color: 'green-400'
    },
    {
      id: 6,
      type: 'alert',
      priority: 'high',
      title: 'Job overdue alert',
      description: 'Toyota Camry repair 1 day past due date',
      action: 'Contact customer',
      dueTime: '2024-01-15T09:00:00Z',
      customer: 'Mike Johnson',
      jobId: '#CC-2024-002',
      icon: AlertTriangle,
      color: 'red-400'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500 bg-opacity-10'
      case 'medium': return 'border-yellow-500 bg-yellow-500 bg-opacity-10'
      case 'low': return 'border-green-500 bg-green-500 bg-opacity-10'
      default: return 'border-dark-border bg-dark-bg'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'follow-up': return MessageSquare
      case 'update': return FileText
      case 'review': return Wrench
      case 'call': return Phone
      case 'alert': return AlertTriangle
      default: return CheckCircle
    }
  }

  const filteredItems = filter === 'all' 
    ? radarItems 
    : radarItems.filter(item => item.priority === filter)

  const priorityCounts = {
    high: radarItems.filter(item => item.priority === 'high').length,
    medium: radarItems.filter(item => item.priority === 'medium').length,
    low: radarItems.filter(item => item.priority === 'low').length
  }

  const handleAction = (item) => {
    console.log('Executing action:', item.action, 'for item:', item.id)
    // Here you would implement the actual action logic
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Operator Radar</h1>
          <p className="text-dark-muted">Smart to-do list that replaces manager oversight</p>
        </div>
        <div className="flex items-center space-x-2">
          <Radar className="text-neon-green animate-pulse" size={24} />
          <span className="text-neon-green font-semibold">ACTIVE MONITORING</span>
        </div>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="text-red-400" size={24} />
            <span className="text-2xl font-bold text-red-400">{priorityCounts.high}</span>
          </div>
          <p className="text-dark-muted">High Priority</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="text-yellow-400" size={24} />
            <span className="text-2xl font-bold text-yellow-400">{priorityCounts.medium}</span>
          </div>
          <p className="text-dark-muted">Medium Priority</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="text-green-400" size={24} />
            <span className="text-2xl font-bold text-green-400">{priorityCounts.low}</span>
          </div>
          <p className="text-dark-muted">Low Priority</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Radar className="text-neon-blue" size={24} />
            <span className="text-2xl font-bold text-neon-blue">{radarItems.length}</span>
          </div>
          <p className="text-dark-muted">Total Items</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4">
        {['all', 'high', 'medium', 'low'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === filterOption
                ? 'bg-neon-blue text-dark-bg'
                : 'bg-dark-card text-dark-muted hover:text-white hover:bg-dark-bg'
            }`}
          >
            {filterOption === 'all' ? 'All Items' : `${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)} Priority`}
            {filterOption !== 'all' && (
              <span className="ml-2 text-xs">({priorityCounts[filterOption]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Radar Items */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const Icon = item.icon
          const isOverdue = new Date(item.dueTime) < new Date()
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card border-l-4 ${getPriorityColor(item.priority)} ${
                isOverdue ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Item Info */}
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-lg bg-${item.color} bg-opacity-20`}>
                    <Icon className={`text-${item.color}`} size={20} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-500 text-white' :
                        item.priority === 'medium' ? 'bg-yellow-500 text-dark-bg' :
                        'bg-green-500 text-dark-bg'
                      }`}>
                        {item.priority.toUpperCase()}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white animate-pulse">
                          OVERDUE
                        </span>
                      )}
                    </div>
                    
                    <p className="text-dark-muted">{item.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-white font-medium">{item.customer}</span>
                      {item.jobId && (
                        <span className="text-neon-blue font-mono">{item.jobId}</span>
                      )}
                      {item.phone && (
                        <span className="text-dark-muted">{item.phone}</span>
                      )}
                      {item.value && (
                        <span className="text-neon-green font-semibold">{item.value}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={14} className="text-dark-muted" />
                      <span className={`${isOverdue ? 'text-red-400' : 'text-dark-muted'}`}>
                        Due: {new Date(item.dueTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleAction(item)}
                    className={`btn-primary px-4 py-2 text-sm ${
                      item.priority === 'high' ? 'bg-red-500 hover:bg-red-600' : ''
                    }`}
                  >
                    {item.action}
                  </button>
                  
                  <button className="text-dark-muted hover:text-white text-sm">
                    Snooze
                  </button>
                </div>
              </div>

              {/* AI Context */}
              {item.priority === 'high' && (
                <div className="mt-4 p-3 bg-neon-blue bg-opacity-10 border border-neon-blue rounded-lg">
                  <p className="text-neon-blue text-sm font-medium">
                    🤖 AI Context: {
                      item.type === 'follow-up' ? 'Lead is hot - 73% conversion probability based on similar profiles' :
                      item.type === 'review' ? 'Additional work approval needed - customer has premium insurance' :
                      item.type === 'alert' ? 'Customer satisfaction at risk - proactive communication recommended' :
                      'Action required to maintain workflow efficiency'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto mb-4 text-neon-green" size={48} />
          <p className="text-neon-green text-lg font-semibold">All clear!</p>
          <p className="text-dark-muted">No items in this priority level</p>
        </div>
      )}
    </div>
  )
}

export default OperatorRadar
