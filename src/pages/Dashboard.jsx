import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Car,
  Users,
  Calendar,
  Target
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import QuickActions from '../components/QuickActions'
import RecentActivity from '../components/RecentActivity'
import PipelineOverview from '../components/PipelineOverview'
import { useDemoStore } from '../store/demoStore'

const Dashboard = () => {
  const { isDemoMode, getDemoJobs, getDemoLeads } = useDemoStore()
  const [stats, setStats] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      const jobs = getDemoJobs()
      const leads = getDemoLeads()
      
      const activeJobs = jobs.filter(job => job.status !== 'Delivered').length
      const pendingQuotes = leads.filter(lead => lead.status === 'Warm' || lead.status === 'Cold').length
      const totalRevenue = jobs.reduce((sum, job) => sum + parseInt(job.value.replace(/[$,]/g, '')), 0)
      const hotLeads = leads.filter(lead => lead.status === 'Hot').length
      const totalLeads = leads.length
      const conversionRate = totalLeads > 0 ? Math.round((hotLeads / totalLeads) * 100) : 0

      setStats([
        {
          title: 'Today\'s Revenue',
          value: '$12,450',
          change: '+18%',
          icon: DollarSign,
          color: 'neon-green'
        },
        {
          title: 'Active Jobs',
          value: activeJobs.toString(),
          change: '+3',
          icon: Car,
          color: 'neon-blue'
        },
        {
          title: 'Pending Quotes',
          value: pendingQuotes.toString(),
          change: '-2',
          icon: Clock,
          color: 'yellow-400'
        },
        {
          title: 'Conversion Rate',
          value: `${conversionRate}%`,
          change: '+5%',
          icon: Target,
          color: 'purple-400'
        }
      ])
    } else {
      // Default stats for non-demo mode
      setStats([
        {
          title: 'Today\'s Revenue',
          value: '$0',
          change: '0%',
          icon: DollarSign,
          color: 'neon-green'
        },
        {
          title: 'Active Jobs',
          value: '0',
          change: '0',
          icon: Car,
          color: 'neon-blue'
        },
        {
          title: 'Pending Quotes',
          value: '0',
          change: '0',
          icon: Clock,
          color: 'yellow-400'
        },
        {
          title: 'Conversion Rate',
          value: '0%',
          change: '0%',
          icon: Target,
          color: 'purple-400'
        }
      ])
    }
  }, [isDemoMode, getDemoJobs, getDemoLeads])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Command Center</h1>
          <p className="text-dark-muted">Welcome back, Ali. Here's what's happening today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-dark-muted">Last updated</p>
          <p className="text-neon-blue font-mono">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Overview */}
        <div className="lg:col-span-2">
          <PipelineOverview />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}

export default Dashboard
