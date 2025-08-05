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
import SuggestedNextStep from '../components/SuggestedNextStep'
import { useDemoStore } from '../store/demoStore'
import { cardVariants } from '../utils/animationVariants'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { isDemoMode, getDemoJobs, getDemoLeads } = useDemoStore()
  const [stats, setStats] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      const jobs = getDemoJobs()
      const leads = getDemoLeads()
      
      const activeJobs = jobs.filter(job => job.status !== 'Delivered').length
      const pendingQuotes = leads.filter(lead => lead.status === 'Warm' || lead.status === 'Cold').length
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

  const suggestions = isDemoMode ? [
    {
      text: "Follow up on 2 overdue jobs (BMW & Camry)",
      priority: "high",
      action: () => toast.success("Navigating to overdue jobs")
    },
    {
      text: "Send quote reminder to Mike Johnson",
      priority: "medium",
      action: () => toast.success("SMS reminder sent to Mike")
    },
    {
      text: "Upload missing photos for 3 completed jobs",
      priority: "low",
      action: () => toast.success("Opening Visual Proof Engine")
    }
  ] : []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold neon-text">Command Center</h1>
          <p className="text-dark-muted">Welcome back, Ali. Here's what's happening today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-dark-muted">Last updated</p>
          <motion.p 
            key={new Date().toLocaleTimeString()}
            initial={{ scale: 1.1, color: '#00D4FF' }}
            animate={{ scale: 1, color: '#E0E0E0' }}
            className="font-mono"
          >
            {new Date().toLocaleTimeString()}
          </motion.p>
        </div>
      </motion.div>

      {/* AI Suggested Next Steps */}
      <SuggestedNextStep 
        suggestions={suggestions}
        onAction={(suggestion) => suggestion.action()}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Overview */}
        <motion.div 
          className="lg:col-span-2"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <PipelineOverview />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <RecentActivity />
      </motion.div>
    </div>
  )
}

export default Dashboard
