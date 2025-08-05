import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { useDemoStore } from '../store/demoStore'
import { useNavigate } from 'react-router-dom'
import ActionButton from './ActionButton'

const PipelineOverview = () => {
  const navigate = useNavigate()
  const { isDemoMode, getDemoJobs } = useDemoStore()
  const [data, setData] = useState([])
  const [recentJobs, setRecentJobs] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      const jobs = getDemoJobs()
      
      // Calculate pipeline data
      const statusCounts = {
        'Estimate': jobs.filter(job => job.status === 'Estimate').length,
        'Scheduled': jobs.filter(job => job.status === 'Scheduled').length,
        'In Progress': jobs.filter(job => job.status === 'In Progress').length,
        'Delivered': jobs.filter(job => job.status === 'Delivered').length
      }

      const pipelineData = [
        { name: 'Estimate', count: statusCounts.Estimate, color: '#EAB308' },
        { name: 'Scheduled', count: statusCounts.Scheduled, color: '#3B82F6' },
        { name: 'In Progress', count: statusCounts['In Progress'], color: '#F97316' },
        { name: 'Delivered', count: statusCounts.Delivered, color: '#10B981' }
      ]

      setData(pipelineData)
      setRecentJobs(jobs.slice(0, 3))
    } else {
      setData([
        { name: 'Estimate', count: 0, color: '#EAB308' },
        { name: 'Scheduled', count: 0, color: '#3B82F6' },
        { name: 'In Progress', count: 0, color: '#F97316' },
        { name: 'Delivered', count: 0, color: '#10B981' }
      ])
      setRecentJobs([])
    }
  }, [isDemoMode, getDemoJobs])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Estimate': return 'status-estimate'
      case 'Scheduled': return 'status-scheduled'
      case 'In Progress': return 'status-progress'
      case 'Delivered': return 'status-delivered'
      default: return 'bg-dark-muted'
    }
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Pipeline Overview</h3>
        <ActionButton
          onClick={() => navigate('/pipeline')}
          variant="ghost"
          className="text-neon-blue hover:text-neon-green transition-colors text-sm"
        >
          View All →
        </ActionButton>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Jobs */}
      <div>
        <h4 className="text-sm font-semibold text-dark-muted mb-3">RECENT JOBS</h4>
        {recentJobs.length > 0 ? (
          <div className="space-y-3">
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer"
                onClick={() => navigate('/pipeline')}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-neon-blue font-mono text-sm">{job.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    {isOverdue(job.dueDate) && job.status !== 'Delivered' && (
                      <span className="px-2 py-1 rounded-full text-xs bg-red-500 text-white animate-pulse">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <p className="text-white font-medium">{job.customer}</p>
                  <p className="text-dark-muted text-sm">{job.vehicle}</p>
                </div>
                <div className="text-right">
                  <p className="text-neon-green font-semibold">{job.value}</p>
                  <p className="text-dark-muted text-sm">
                    {isOverdue(job.dueDate) && job.status !== 'Delivered' ? 'Overdue' : 'On Track'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-dark-muted">No recent jobs</p>
            <p className="text-dark-muted text-sm">Enable demo mode to see sample data</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PipelineOverview
