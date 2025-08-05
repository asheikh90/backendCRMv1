import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Phone,
  MessageSquare
} from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import ActionButton from '../components/ActionButton'
import toast from 'react-hot-toast'

const JobPipeline = () => {
  const { isDemoMode, getDemoJobs } = useDemoStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      setJobs(getDemoJobs())
    } else {
      setJobs([])
    }
  }, [isDemoMode, getDemoJobs])

  const statuses = ['all', 'Estimate', 'Scheduled', 'In Progress', 'Delivered']

  const getStatusColor = (status) => {
    switch (status) {
      case 'Estimate': return 'status-estimate'
      case 'Scheduled': return 'status-scheduled'
      case 'In Progress': return 'status-progress'
      case 'Delivered': return 'status-delivered'
      default: return 'bg-dark-muted'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-dark-muted'
    }
  }

  const isOverdue = (dueDate, status) => {
    return status !== 'Delivered' && new Date(dueDate) < new Date()
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.phone.includes(searchTerm) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleCall = (customer, phone) => {
    toast.success(`Calling ${customer} at ${phone}`)
  }

  const handleSMS = (customer, phone) => {
    toast.success(`SMS sent to ${customer}`)
  }

  const handleUpdate = (jobId) => {
    toast.success(`Job ${jobId} updated`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Job Pipeline</h1>
          <p className="text-dark-muted">Track and manage all collision repair jobs</p>
        </div>
        <ActionButton
          icon={Plus}
          onClick={() => toast.success('New job form opened')}
          successMessage="New job created"
        >
          New Job
        </ActionButton>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" size={20} />
          <input
            type="text"
            placeholder="Search by customer, phone, or job ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-dark-muted focus:border-neon-blue focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-dark-muted" size={20} />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:outline-none"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              {/* Job Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-neon-blue font-mono font-semibold">{job.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(job.priority)}`}>
                    {job.priority.toUpperCase()} PRIORITY
                  </span>
                  {isOverdue(job.dueDate, job.status) && (
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500 text-white animate-pulse">
                      OVERDUE
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{job.customer}</h3>
                    <p className="text-dark-muted">{job.phone}</p>
                    <p className="text-white">{job.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">{job.issue}</p>
                    <p className="text-dark-muted text-sm">{job.notes}</p>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="text-center lg:text-right">
                  <p className="text-neon-green text-xl font-bold">{job.value}</p>
                  <p className="text-dark-muted text-sm">Est. Value</p>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="flex items-center justify-center lg:justify-end space-x-1">
                    <Calendar size={16} className="text-dark-muted" />
                    <p className={`${isOverdue(job.dueDate, job.status) ? 'text-red-400 font-semibold' : 'text-white'}`}>
                      {new Date(job.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-dark-muted text-sm">Due Date</p>
                </div>

                <div className="text-center lg:text-right">
                  <p className="text-white">{job.estimator}</p>
                  <p className="text-dark-muted text-sm">Estimator</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <ActionButton
                    variant="secondary"
                    size="sm"
                    icon={Phone}
                    onClick={() => handleCall(job.customer, job.phone)}
                  >
                    Call
                  </ActionButton>
                  <ActionButton
                    variant="secondary"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => handleSMS(job.customer, job.phone)}
                  >
                    SMS
                  </ActionButton>
                  <ActionButton
                    size="sm"
                    onClick={() => handleUpdate(job.id)}
                  >
                    Update
                  </ActionButton>
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            {job.status === 'In Progress' && isOverdue(job.dueDate, job.status) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-400" size={16} />
                  <p className="text-yellow-400 text-sm font-medium">
                    🤖 AI Suggestion: Job overdue by {Math.ceil((new Date() - new Date(job.dueDate)) / (1000 * 60 * 60 * 24))} day(s). Consider contacting parts supplier or customer.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto mb-4 text-dark-muted" size={48} />
          <p className="text-dark-muted text-lg">
            {jobs.length === 0 ? 'No jobs available' : 'No jobs found matching your criteria'}
          </p>
          {jobs.length === 0 && (
            <p className="text-dark-muted text-sm">Enable demo mode to see sample data</p>
          )}
        </div>
      )}
    </div>
  )
}

export default JobPipeline
