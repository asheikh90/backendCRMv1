import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Calculator,
  Upload
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useDemoStore } from '../store/demoStore'
import { pageTransition, staggerContainer, staggerItem, cardHover, buttonPress } from '../utils/animations'
import ImageUploadPanel from '../components/ImageUploadPanel'
import QuickEstimateModal from '../components/QuickEstimateModal'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { isDemoMode, getDemoJobs, getDemoLeads } = useDemoStore()
  const [stats, setStats] = useState([])
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showQuickEstimate, setShowQuickEstimate] = useState(false)

  useEffect(() => {
    if (isDemoMode) {
      const jobs = getDemoJobs()
      const leads = getDemoLeads()
      
      setStats([
        {
          title: "Today's Revenue",
          value: '$12,450',
          change: '+18%',
          trend: 'up',
          icon: DollarSign,
          gradient: 'from-green-500 to-emerald-600',
          description: 'vs yesterday'
        },
        {
          title: 'Active Jobs',
          value: jobs.filter(job => job.status !== 'Delivered').length.toString(),
          change: '+3',
          trend: 'up',
          icon: Calendar,
          gradient: 'from-blue-500 to-cyan-600',
          description: 'in pipeline'
        },
        {
          title: 'Hot Leads',
          value: leads.filter(lead => lead.status === 'Hot').length.toString(),
          change: '+2',
          trend: 'up',
          icon: Users,
          gradient: 'from-purple-500 to-pink-600',
          description: 'ready to close'
        },
        {
          title: 'Conversion Rate',
          value: '74%',
          change: '+5%',
          trend: 'up',
          icon: Target,
          gradient: 'from-orange-500 to-red-600',
          description: 'this month'
        }
      ])
    }
  }, [isDemoMode, getDemoJobs, getDemoLeads])

  const revenueData = [
    { month: 'Jan', revenue: 28500, target: 25000 },
    { month: 'Feb', revenue: 31200, target: 28000 },
    { month: 'Mar', revenue: 29800, target: 30000 },
    { month: 'Apr', revenue: 33100, target: 32000 },
    { month: 'May', revenue: 35600, target: 34000 },
    { month: 'Jun', revenue: 32400, target: 35000 }
  ]

  const sourceData = [
    { name: 'Google Ads', value: 35, color: '#3B82F6' },
    { name: 'GMB', value: 28, color: '#10B981' },
    { name: 'Dealers', value: 22, color: '#F59E0B' },
    { name: 'Referrals', value: 15, color: '#EF4444' }
  ]

  const handleAnalysisComplete = (analysis) => {
    toast.success('Damage analysis complete! Scroll down to see results.')
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Command Center
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, Ali. Here's your collision shop at a glance.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <motion.button
              {...buttonPress}
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg flex items-center space-x-2"
            >
              <Upload size={18} />
              <span>AI Damage Analysis</span>
            </motion.button>
            
            <motion.button
              {...buttonPress}
              onClick={() => setShowQuickEstimate(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg flex items-center space-x-2"
            >
              <Calculator size={18} />
              <span>Quick Estimate</span>
            </motion.button>
            
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Zap className="text-white" size={32} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* AI Image Upload Panel */}
      <AnimatePresence>
        {showImageUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Zap className="text-white" size={16} />
                  </motion.div>
                  <span>AI Damage Estimator</span>
                </h2>
                <motion.button
                  {...buttonPress}
                  onClick={() => setShowImageUpload(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </motion.button>
              </div>
              
              <ImageUploadPanel 
                onAnalysisComplete={handleAnalysisComplete}
                vehicleInfo={{ year: '2022', make: 'Honda', model: 'Civic' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight
          
          return (
            <motion.div
              key={stat.title}
              variants={staggerItem}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHover}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl shadow-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      <TrendIcon size={12} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${stat.gradient.split(' ')[1]} 0%, transparent 50%)`,
                    filter: 'blur(20px)'
                  }}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Revenue Trend</h3>
              <p className="text-gray-400 text-sm">Monthly performance vs targets</p>
            </div>
            <motion.button
              {...buttonPress}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              View Details
            </motion.button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#6B7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Lead Sources</h3>
            <p className="text-gray-400 text-sm">Distribution this month</p>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            {sourceData.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-gray-300 text-sm">{source.name}</span>
                </div>
                <span className="text-white font-semibold">{source.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights Panel */}
      <motion.div
        variants={staggerItem}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Zap className="text-white" size={16} />
          </motion.div>
          <h3 className="text-xl font-semibold text-white">AI Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h4 className="text-blue-400 font-medium mb-2">🎯 Optimization Opportunity</h4>
            <p className="text-gray-300 text-sm">
              GMB leads are converting 14% better than Google Ads. Consider reallocating $500/month budget.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h4 className="text-green-400 font-medium mb-2">📈 Growth Trend</h4>
            <p className="text-gray-300 text-sm">
              Your average ticket increased by $56 this month. Paint protection upsells are working.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <h4 className="text-yellow-400 font-medium mb-2">⚡ Action Required</h4>
            <p className="text-gray-300 text-sm">
              3 hot leads haven't been contacted in 24+ hours. Quick follow-up could close $6,500 in revenue.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Estimate Modal */}
      <QuickEstimateModal 
        isOpen={showQuickEstimate}
        onClose={() => setShowQuickEstimate(false)}
      />
    </motion.div>
  )
}

export default Dashboard
