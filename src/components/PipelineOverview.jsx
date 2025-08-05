import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'

const PipelineOverview = () => {
  const data = [
    { name: 'Estimate', count: 12, color: '#EAB308' },
    { name: 'Scheduled', count: 8, color: '#3B82F6' },
    { name: 'In Progress', count: 15, color: '#F97316' },
    { name: 'Delivered', count: 23, color: '#10B981' }
  ]

  const recentJobs = [
    {
      id: '#CC-2024-001',
      customer: 'Jessica Martinez',
      vehicle: '2022 Honda Civic',
      status: 'In Progress',
      value: '$2,450',
      dueDate: 'Today'
    },
    {
      id: '#CC-2024-002',
      customer: 'Mike Johnson',
      vehicle: '2021 Toyota Camry',
      status: 'Scheduled',
      value: '$1,850',
      dueDate: 'Tomorrow'
    },
    {
      id: '#CC-2024-003',
      customer: 'Sarah Wilson',
      vehicle: '2020 BMW 3 Series',
      status: 'Estimate',
      value: '$3,200',
      dueDate: 'Pending'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Estimate': return 'status-estimate'
      case 'Scheduled': return 'status-scheduled'
      case 'In Progress': return 'status-progress'
      case 'Delivered': return 'status-delivered'
      default: return 'bg-dark-muted'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Pipeline Overview</h3>
        <button className="text-neon-blue hover:text-neon-green transition-colors text-sm">
          View All →
        </button>
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
        <div className="space-y-3">
          {recentJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-neon-blue font-mono text-sm">{job.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-white font-medium">{job.customer}</p>
                <p className="text-dark-muted text-sm">{job.vehicle}</p>
              </div>
              <div className="text-right">
                <p className="text-neon-green font-semibold">{job.value}</p>
                <p className="text-dark-muted text-sm">{job.dueDate}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PipelineOverview
