import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Filter, Search, Plus } from 'lucide-react'
import { useDemoStore } from '../store/demoStore'
import KanbanBoard from '../components/KanbanBoard'
import { pageTransition, buttonPress } from '../utils/animations'
import toast from 'react-hot-toast'

const JobPipeline = () => {
  const { isDemoMode, getDemoJobs } = useDemoStore()
  const [jobs, setJobs] = useState([])
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (isDemoMode) {
      setJobs(getDemoJobs())
    } else {
      setJobs([])
    }
  }, [isDemoMode, getDemoJobs])

  const handleJobUpdate = (jobId, newStatus) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ))
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/10 backdrop-blur-xl border-b border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Job Pipeline
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Drag & drop jobs through your workflow
            </motion.p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors w-64"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="New Inquiry">New Inquiry</option>
              <option value="Estimate">Estimate Sent</option>
              <option value="Scheduled">Job Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Complete</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <motion.button
                {...buttonPress}
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'kanban' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid size={20} />
              </motion.button>
              <motion.button
                {...buttonPress}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={20} />
              </motion.button>
            </div>

            {/* New Job Button */}
            <motion.button
              {...buttonPress}
              onClick={() => toast.success('Opening new job form')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>New Job</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {viewMode === 'kanban' ? (
          <KanbanBoard jobs={filteredJobs} onJobUpdate={handleJobUpdate} />
        ) : (
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">List view coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default JobPipeline
