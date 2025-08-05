import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  GitBranch, 
  Calculator, 
  Camera, 
  Users, 
  Trophy, 
  Radar,
  Menu,
  X
} from 'lucide-react'
import { useDemoStore } from '../store/demoStore'

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation()
  const { isDemoMode, getDemoLeads, getDemoJobs } = useDemoStore()
  const [hoveredItem, setHoveredItem] = useState(null)

  const getPreviewData = (path) => {
    if (!isDemoMode) return null

    switch (path) {
      case '/pipeline':
        const jobs = getDemoJobs()
        const activeJobs = jobs.filter(job => job.status === 'In Progress').length
        return `${activeJobs} active jobs`
      
      case '/leads':
        const leads = getDemoLeads()
        const hotLeads = leads.filter(lead => lead.status === 'Hot').length
        const overdueLeads = leads.filter(lead => new Date(lead.nextFollowUp) < new Date()).length
        return overdueLeads > 0 ? `${overdueLeads} overdue follow-ups` : `${hotLeads} hot leads`
      
      case '/quotes':
        return '2 quotes pending'
      
      case '/proof':
        return '3 photos needed'
      
      case '/estimators':
        return 'Ali leading 69.2%'
      
      case '/radar':
        return '6 action items'
      
      default:
        return 'Live dashboard'
    }
  }

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: 'neon-blue' },
    { path: '/pipeline', icon: GitBranch, label: 'Job Pipeline', color: 'neon-green' },
    { path: '/quotes', icon: Calculator, label: 'AI Quote Engine', color: 'yellow-400' },
    { path: '/proof', icon: Camera, label: 'Visual Proof', color: 'purple-400' },
    { path: '/leads', icon: Users, label: 'Lead Tracker', color: 'pink-400' },
    { path: '/estimators', icon: Trophy, label: 'Estimators', color: 'orange-400' },
    { path: '/radar', icon: Radar, label: 'Operator Radar', color: 'red-400' },
  ]

  return (
    <div className={`fixed left-0 top-0 h-full bg-dark-card border-r border-dark-border transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="text-xl font-bold neon-text">COLLISION</h1>
            <p className="text-xs text-dark-muted">COMMAND CENTER v3+</p>
          </motion.div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-dark-bg transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          const previewData = getPreviewData(item.path)
          
          return (
            <div key={item.path} className="relative">
              <Link
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? `bg-${item.color} bg-opacity-20 text-${item.color} border border-${item.color}` 
                    : 'hover:bg-dark-bg text-dark-text hover:text-white'
                }`}
              >
                <Icon 
                  size={20} 
                  className={isActive ? `text-${item.color}` : 'group-hover:text-neon-blue'} 
                />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>

              {/* Tooltip with Preview */}
              <AnimatePresence>
                {collapsed && hoveredItem === item.path && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full top-0 ml-2 bg-dark-bg border border-neon-blue rounded-lg px-3 py-2 whitespace-nowrap z-50"
                  >
                    <p className="text-white font-medium">{item.label}</p>
                    {previewData && (
                      <p className="text-neon-blue text-xs">{previewData}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="text-xs text-dark-muted text-center">
            <p>Operator: <span className="text-neon-green">Ali Sheikh</span></p>
            <p>Collision Club Philly</p>
            {isDemoMode && (
              <p className="text-neon-blue mt-1">🎯 Demo Mode Active</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Sidebar
