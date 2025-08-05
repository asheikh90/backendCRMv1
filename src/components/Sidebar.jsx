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
  X,
  Zap
} from 'lucide-react'
import { buttonPress, slideIn } from '../utils/animations'
import { useThemeStore } from '../store/themeStore'

const Sidebar = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { getCurrentColors } = useThemeStore()
  const colors = getCurrentColors()

  const menuItems = [
    { 
      path: '/', 
      icon: LayoutDashboard, 
      label: 'Command Center', 
      gradient: 'from-blue-500 to-blue-600',
      description: 'Overview & insights'
    },
    { 
      path: '/pipeline', 
      icon: GitBranch, 
      label: 'Job Pipeline', 
      gradient: 'from-green-500 to-green-600',
      description: 'Drag & drop workflow'
    },
    { 
      path: '/quotes', 
      icon: Calculator, 
      label: 'AI Quote Engine', 
      gradient: 'from-purple-500 to-purple-600',
      description: 'Smart pricing'
    },
    { 
      path: '/proof', 
      icon: Camera, 
      label: 'Visual Proof', 
      gradient: 'from-orange-500 to-orange-600',
      description: 'Before/after gallery'
    },
    { 
      path: '/leads', 
      icon: Users, 
      label: 'Lead Tracker', 
      gradient: 'from-pink-500 to-pink-600',
      description: 'Conversion pipeline'
    },
    { 
      path: '/estimators', 
      icon: Trophy, 
      label: 'Estimators', 
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'Performance leaderboard'
    },
    { 
      path: '/radar', 
      icon: Radar, 
      label: 'Operator Radar', 
      gradient: 'from-red-500 to-red-600',
      description: 'Live monitoring'
    },
  ]

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                  >
                    <Zap className="text-white" size={20} />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      COLLISION
                    </h1>
                    <p className="text-xs text-gray-400">Command Center v4.0</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            {...buttonPress}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu size={20} className="text-gray-400" /> : <X size={20} className="text-gray-400" />}
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="group relative block"
              >
                <motion.div
                  {...buttonPress}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {/* Background glow for active item */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                    />
                  )}
                  
                  <Icon size={20} className="relative z-10" />
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        variants={slideIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="relative z-10"
                      >
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-0 ml-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none z-50"
                  >
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-gray-300">{item.description}</p>
                  </motion.div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute bottom-6 left-4 right-4"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AS</span>
                </div>
                <div>
                  <p className="text-white font-medium">Ali Sheikh</p>
                  <p className="text-xs text-gray-400">Collision Club Philly</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Sidebar
