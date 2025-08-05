import React from 'react'
import { Link, useLocation } from 'react-router-dom'
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

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation()

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
          <div>
            <h1 className="text-xl font-bold neon-text">COLLISION</h1>
            <p className="text-xs text-dark-muted">COMMAND CENTER v3</p>
          </div>
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
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
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
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-dark-muted text-center">
            <p>Operator: <span className="text-neon-green">Ali Sheikh</span></p>
            <p>Collision Club Philly</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
