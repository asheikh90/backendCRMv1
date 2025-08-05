import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, DollarSign, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts'

const Estimators = () => {
  const estimators = [
    {
      id: 1,
      name: 'Ali Sheikh',
      avatar: '/api/placeholder/40/40',
      quotesGiven: 156,
      jobsClosed: 108,
      totalRevenue: 245600,
      closeRate: 69.2,
      avgTicket: 2274,
      rank: 1,
      badge: 'gold',
      trend: '+12%'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      avatar: '/api/placeholder/40/40',
      quotesGiven: 134,
      jobsClosed: 89,
      totalRevenue: 198400,
      closeRate: 66.4,
      avgTicket: 2230,
      rank: 2,
      badge: 'silver',
      trend: '+8%'
    },
    {
      id: 3,
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      quotesGiven: 142,
      jobsClosed: 85,
      totalRevenue: 187300,
      closeRate: 59.9,
      avgTicket: 2203,
      rank: 3,
      badge: 'bronze',
      trend: '+5%'
    }
  ]

  const monthlyData = [
    { month: 'Jan', ali: 28500, marcus: 24200, sarah: 22100 },
    { month: 'Feb', ali: 31200, marcus: 26800, sarah: 23900 },
    { month: 'Mar', ali: 29800, marcus: 25600, sarah: 24200 },
    { month: 'Apr', ali: 33100, marcus: 28400, sarah: 25800 },
    { month: 'May', ali: 35600, marcus: 29900, sarah: 26400 },
    { month: 'Jun', ali: 32400, marcus: 27800, sarah: 25100 }
  ]

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-400 bg-yellow-400 bg-opacity-20 border-yellow-400'
      case 'silver': return 'text-gray-300 bg-gray-300 bg-opacity-20 border-gray-300'
      case 'bronze': return 'text-orange-400 bg-orange-400 bg-opacity-20 border-orange-400'
      default: return 'text-dark-muted'
    }
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Estimator Leaderboard</h1>
          <p className="text-dark-muted">Track performance and close rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="text-yellow-400" size={24} />
          <span className="text-yellow-400 font-semibold">PERFORMANCE TRACKING</span>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card">
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
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {estimators.map((estimator, index) => (
          <motion.div
            key={estimator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card-hover ${estimator.rank === 1 ? 'border-yellow-400 shadow-neon-blue' : ''}`}
          >
            <div className="flex items-center justify-between">
              {/* Estimator Info */}
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{getRankIcon(estimator.rank)}</div>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={estimator.avatar}
                    alt={estimator.name}
                    className="w-12 h-12 rounded-full border-2 border-dark-border"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{estimator.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(estimator.badge)}`}>
                        {estimator.badge.toUpperCase()}
                      </span>
                      <span className="text-neon-green text-sm font-medium">{estimator.trend}</span>
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
                  <p className="text-2xl font-bold text-yellow-400">{estimator.closeRate}%</p>
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
                <div 
                  className="bg-gradient-to-r from-neon-blue to-neon-green h-2 rounded-full transition-all duration-500"
                  style={{ width: `${estimator.closeRate}%` }}
                ></div>
              </div>
            </div>

            {/* AI Insights */}
            {estimator.rank === 1 && (
              <div className="mt-4 p-3 bg-neon-blue bg-opacity-10 border border-neon-blue rounded-lg">
                <p className="text-neon-blue text-sm font-medium">
                  🏆 Top Performer: Consistently high close rate with premium pricing strategy
                </p>
              </div>
            )}
            
            {estimator.closeRate < 60 && (
              <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg">
                <p className="text-yellow-400 text-sm font-medium">
                  💡 AI Suggestion: Focus on follow-up timing and value proposition presentation
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Target className="mx-auto mb-2 text-neon-blue" size={32} />
          <p className="text-2xl font-bold text-white">67.2%</p>
          <p className="text-dark-muted text-sm">Avg Close Rate</p>
        </div>
        
        <div className="card text-center">
          <DollarSign className="mx-auto mb-2 text-neon-green" size={32} />
          <p className="text-2xl font-bold text-white">$2,236</p>
          <p className="text-dark-muted text-sm">Avg Ticket</p>
        </div>
        
        <div className="card text-center">
          <TrendingUp className="mx-auto mb-2 text-yellow-400" size={32} />
          <p className="text-2xl font-bold text-white">432</p>
          <p className="text-dark-muted text-sm">Total Quotes</p>
        </div>
        
        <div className="card text-center">
          <Trophy className="mx-auto mb-2 text-purple-400" size={32} />
          <p className="text-2xl font-bold text-white">$631k</p>
          <p className="text-dark-muted text-sm">Total Revenue</p>
        </div>
      </div>
    </div>
  )
}

export default Estimators
