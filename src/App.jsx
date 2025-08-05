import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import JobPipeline from './pages/JobPipeline'
import QuoteEngine from './pages/QuoteEngine'
import ProofEngine from './pages/ProofEngine'
import LeadTracker from './pages/LeadTracker'
import Estimators from './pages/Estimators'
import OperatorRadar from './pages/OperatorRadar'
import AskForge from './components/AskForge'
import DemoToggle from './components/DemoToggle'
import LiveSignals from './components/LiveSignals'
import AgentStatus from './components/AgentStatus'
import AgentOverlay from './components/AgentOverlay'
import PageTransition from './components/PageTransition'
import { useDemoStore } from './store/demoStore'
import { useUIStore } from './store/uiStore'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/pipeline" element={<PageTransition><JobPipeline /></PageTransition>} />
        <Route path="/quotes" element={<PageTransition><QuoteEngine /></PageTransition>} />
        <Route path="/proof" element={<PageTransition><ProofEngine /></PageTransition>} />
        <Route path="/leads" element={<PageTransition><LeadTracker /></PageTransition>} />
        <Route path="/estimators" element={<PageTransition><Estimators /></PageTransition>} />
        <Route path="/radar" element={<PageTransition><OperatorRadar /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()
  const { isDemoMode } = useDemoStore()

  // Remember sidebar state
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [setSidebarCollapsed])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  return (
    <Router>
      <div className="flex h-screen bg-dark-bg overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          {/* Demo Mode Banner */}
          {isDemoMode && (
            <div className="bg-neon-blue/10 backdrop-blur-sm border-b border-neon-blue/30 px-4 py-2">
              <p className="text-neon-blue text-sm font-medium text-center">
                🎯 You are viewing Collision Club in Demo Mode
              </p>
            </div>
          )}

          {/* Agent Status */}
          <AgentStatus />

          {/* Live Signals */}
          <LiveSignals />
          
          <div className="pt-16">
            <AnimatedRoutes />
          </div>
        </main>

        {/* Demo Toggle */}
        <DemoToggle />

        {/* Ask Forge AI Assistant */}
        <AskForge />

        {/* Agent Overlay */}
        <AgentOverlay />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(26, 26, 26, 0.9)',
              backdropFilter: 'blur(10px)',
              color: '#E0E0E0',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
