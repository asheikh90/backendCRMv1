import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useDemoStore } from '../store/demoStore'
import SuggestedNextStep from '../components/SuggestedNextStep'
import { cardVariants, pulseVariants } from '../utils/animationVariants'
import toast from 'react-hot-toast'

const Estimators = () => {
  const { isDemoMode, getDemoEstimators } = useDemoStore()
  const [estimators, setEstimators] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      setEstimators(getDemoEstimators())
    } else {
      setEstimators([])
    }
  }, [isDemoMode, getDemoEstimators])

  const monthlyData = [
    { month: 'Jan', ali: 28500, marcus: 24200, sarah: 22100, tony: 8900 },
    { month: 'Feb', ali: 31200, marcus: 26800, sarah: 23900, tony: 9200 },
    { month: 'Mar', ali: 29800, marcus: 25600, sarah: 24200, tony: 8800 },
    { month: 'Apr', ali: 33100, marcus: 28400, sarah: 25800, tony: 9500 },
    { month: 'May', ali: 35600, marcus: 29900, sarah: 26400, tony: 10100 },
    { month: 'Jun', ali: 32400, marcus: 27800, sarah: 25100, tony: 9800 }
  ]

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-400 bg-yellow-400 bg-opacity-20 border-yellow-400'
      case 'silver': return 'text-gray-300 bg-gray-300 bg-opacity-20 border-gray-300'
      case 'bronze': return 'text-orange-400 bg-orange-400 bg-opacity-20 border-orange-400'
      default: return 'text-dark-muted bg-dark-muted bg-opacity-20 border-dark-muted'
    }
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const lowPerformers = estimators.filter(est => est.closeRate < 40)

  const suggestions = isDemoMode ? [
    {
      text: `${lowPerformers.length} estimator needs coaching (below 40% close rate)`,
      priority: "high",
      action: () => toast.success("Scheduling coaching session")
    },
    {
      text: "Ali's techniques could be shared with team",
      priority: "medium",
      action: () => toast.success("Scheduling team training session")
    },
    {
      text: "Average ticket up 8% this month",
      priority: "low",
      action: () => toast.success("Generating performance report")
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
          <h1 className="text-3xl font-bold neon-text">Estimator Leaderboard</h1>
          <p className="text-dark-muted">Track performance and close rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="text-yellow-400" size={24} />
          <span className="text-yellow-400 font-semibold">PERFORMANCE TRACKING</span>
        </div>
      </motion.div>

      {/* AI Suggested Next Steps */}
      <SuggestedNextStep 
        suggestions={suggestions}
        onAction={(suggestion) => suggestion.action()}
      />

      {/* Performance Chart */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <h3 className="text-lg font-semibold mb-4 text-white">Monthly Revenue Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888888', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888888', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Line 
                type="monotone" 
                dataKey="ali" 
                stroke="#00D4FF" 
                strokeWidth={3}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="marcus" 
                stroke="#00FF88" 
                strokeWidth={3}
                dot={{ fill: '#00FF88', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="sarah" 
                stroke="#EAB308" 
                strokeWidth={3}
                dot={{ fill: '#EAB308', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="tony" 
                stroke="#EF4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
            <span className="text-white text-sm">Ali Sheikh</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-green rounded-full"></div>
            <span className="text-white text-sm">Marcus Johnson</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-white text-sm">Sarah Chen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-dashed border-red-400"></div>
            <span className="text-white text-sm">Tony Rodriguez</span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {estimators.map((estimator, index) => {
          const isLowPerformer = estimator.closeRate < 40
          const isTopPerformer = estimator.rank === 1
          
          return (
            <motion.div
              key={estimator.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`card-hover ${isTopPerformer ? 'border-yellow-400 shadow-neon-blue' : ''}`}
            >
              <div className="flex items-center justify-between">
                {/* Estimator Info */}
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="text-4xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {getRankIcon(estimator.rank)}
                  </motion.div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.img
                      src={estimator.avatar}
                      alt={estimator.name}
                      className="w-12 h-12 rounded-full border-2 border-dark-border"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{estimator.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(estimator.badge)}`}>
                          {estimator.badge.toUpperCase()}
                        </span>
                        <span className={`text-sm font-medium ${
                          estimator.trend.startsWith('+') ? 'text-neon-green' : 'text-red-400'
                        }`}>
                          {estimator.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-blue">{estimator.quotesGiven}</p>
                    <p className="text-dark-muted text-sm">Quotes Given</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-green">{estimator.jobsClosed}</p>
                    <p className="text-dark-muted text-sm">Jobs Closed</p>
                  </div>
                  
                  <div className="text-center">
                    <motion.p 
                      className={`text-2xl font-bold ${isLowPerformer ? 'text-red-400' : 'text-yellow-400'}`}
                      variants={isLowPerformer ? pulseVariants : {}}
                      animate={isLowPerformer ? 'pulse' : ''}
                    >
                      {estimator.closeRate}%
                    </motion.p>
                    <p className="text-dark-muted text-sm">Close Rate</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">${estimator.avgTicket.toLocaleString()}</p>
                    <p className="text-dark-muted text-sm">Avg Ticket</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">${(estimator.totalRevenue / 1000).toFixed(0)}k</p>
                    <p className="text-dark-muted text-sm">Total Revenue</p>
                  </div>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-dark-muted">Performance Score</span>
                  <span className="text-white">{estimator.closeRate}%</span>
                </div>
                <div className="w-full bg-dark-bg rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isLowPerformer 
                        ? 'bg-gradient-to-r from-red-500 to-red-400' 
                        : 'bg-gradient-to-r from-neon-blue to-neon-green'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${estimator.closeRate}%` }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                  />
                </div>
              </div>

              {/* AI Insights */}
              {isTopPerformer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-neon-blue/10 backdrop-blur-sm border border-neon-blue/30 rounded-lg"
                >
                  <p className="text-neon-blue text-sm font-medium">
                    🏆 Top Performer: Consistently high close rate with premium pricing strategy
                  </p>
                </motion.div>
              )}
              
              {isLowPerformer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-400" size={16} />
                    <p className="text-yellow-400 text-sm font-medium">
                      💡 AI Suggestion: Focus on follow-up timing and value proposition presentation. Consider shadowing Ali's next estimates.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Target, value: '67.2%', label: 'Avg Close Rate', color: 'neon-blue' },
          { icon: DollarSign, value: '$2,236', label: 'Avg Ticket', color: 'neon-green' },
          { icon: TrendingUp, value: '432', label: 'Total Quotes', color: 'yellow-400' },
          { icon: Trophy, value: '$631k', label: 'Total Revenue', color: 'purple-400' }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div 
              key={stat.label}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index + 4}
              whileHover="hover"
              className="card text-center"
            >
              <Icon className={`mx-auto mb-2 text-${stat.color}`} size={32} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-dark-muted text-sm">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Estimators
