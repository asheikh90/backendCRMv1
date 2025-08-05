import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/themeStore'

// Components
import Sidebar from './components/Sidebar'
import AIAssistant from './components/AIAssistant'
import QuickActionsBar from './components/QuickActionsBar'
import SystemStatus from './components/SystemStatus'
import ThemeToggle from './components/ThemeToggle'

// Pages
import Dashboard from './pages/Dashboard'
import JobPipeline from './pages/JobPipeline'
import QuoteEngine from './pages/QuoteEngine'
import ProofEngine from './pages/ProofEngine'
import LeadTracker from './pages/LeadTracker'
import Estimators from './pages/Estimators'
import OperatorRadar from './pages/OperatorRadar'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pipeline" element={<JobPipeline />} />
        <Route path="/quotes" element={<QuoteEngine />} />
        <Route path="/proof" element={<ProofEngine />} />
        <Route path="/leads" element={<LeadTracker />} />
        <Route path="/estimators" element={<Estimators />} />
        <Route path="/radar" element={<OperatorRadar />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const { isDark, getCurrentColors } = useThemeStore()
  const colors = getCurrentColors()

  useEffect(() => {
    // Apply theme to document
    document.documentElement.style.setProperty('--bg-color', colors.bg)
    document.documentElement.style.setProperty('--card-color', colors.card)
    document.documentElement.style.setProperty('--border-color', colors.border)
    document.documentElement.style.setProperty('--text-color', colors.text)
    document.documentElement.style.setProperty('--muted-color', colors.muted)
    document.documentElement.style.setProperty('--accent-color', colors.accent)
  }, [isDark, colors])

  return (
    <Router>
      <div 
        className={`min-h-screen transition-colors duration-500 ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
        style={{ backgroundColor: colors.bg }}
      >
        {/* Global Components */}
        <ThemeToggle />
        <SystemStatus />
        <Sidebar />
        
        {/* Main Content */}
        <main className="ml-64 min-h-screen">
          <AnimatedRoutes />
        </main>

        {/* Floating Components */}
        <QuickActionsBar />
        <AIAssistant />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: colors.success,
                secondary: colors.bg,
              },
            },
            error: {
              iconTheme: {
                primary: colors.danger,
                secondary: colors.bg,
              },
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
