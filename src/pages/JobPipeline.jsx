import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react'

const JobPipeline = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const jobs = [
    {
      id: '#CC-2024-001',
      customer: 'Jessica Martinez',
      phone: '(215) 555-0123',
      vehicle: '2022 Honda Civic',
      issue: 'Rear bumper repair + paint',
      status: 'In Progress',
      value: '$2,450',
      estimator: 'Ali Sheikh',
      dueDate: '2024-01-15',
      priority: 'high',
      notes: 'Customer wants OEM parts only'
    },
    {
      id: '#CC-2024-002',
      customer: 'Mike Johnson',
      phone: '(215) 555-0124',
      vehicle: '2021 Toyota Camry',
      issue: 'Front door dent removal',
      status: 'Scheduled',
      value: '$1,850',
      estimator: 'Ali Sheikh',
      dueDate: '2024-01-16',
      priority: 'medium',
      notes: 'Insurance claim - State Farm'
    },
    {
      id: '#CC-2024-003',
      customer: 'Sarah Wilson',
      phone: '(215) 555-0125',
      vehicle: '2020 BMW 3 Series',
      issue: 'Full front end collision',
      status: 'Estimate',
      value: '$3,200',
      estimator: 'Ali Sheikh',
      dueDate: '2024-01-14',
      priority: 'high',
      notes: 'Waiting for adjuster approval'
    },
    {
      id: '#CC-2024-004',
      customer: 'David Brown',
      phone: '(215) 555-0126',
      vehicle: '2019 Ford F-150',
      issue: 'Bed liner + tailgate paint',
      status: 'Delivered',
      value: '$1,200',
      estimator: 'Ali Sheikh',
      dueDate: '2024-01-13',
      priority: 'low',
      notes: 'Customer pickup scheduled'
    }
  ]

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.phone.includes(searchTerm) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Job Pipeline</h1>
          <p className="text-dark-muted">Track and manage all collision repair jobs</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>New Job</span>
        </button>
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
                    <p className="text-white">{new Date(job.dueDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-dark-muted text-sm">Due Date</p>
                </div>

                <div className="text-center lg:text-right">
                  <p className="text-white">{job.estimator}</p>
                  <p className="text-dark-muted text-sm">Estimator</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm px-3 py-2">
                    View
                  </button>
                  <button className="btn-primary text-sm px-3 py-2">
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            {job.status === 'In Progress' && (
              <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-400" size={16} />
                  <p className="text-yellow-400 text-sm font-medium">
                    AI Suggestion: Job overdue by 1 day. Consider contacting parts supplier.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dark-muted text-lg">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default JobPipeline
