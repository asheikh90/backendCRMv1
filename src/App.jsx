import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import JobPipeline from './pages/JobPipeline'
import QuoteEngine from './pages/QuoteEngine'
import ProofEngine from './pages/ProofEngine'
import LeadTracker from './pages/LeadTracker'
import Estimators from './pages/Estimators'
import OperatorRadar from './pages/OperatorRadar'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <Router>
      <div className="flex h-screen bg-dark-bg">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pipeline" element={<JobPipeline />} />
            <Route path="/quotes" element={<QuoteEngine />} />
            <Route path="/proof" element={<ProofEngine />} />
            <Route path="/leads" element={<LeadTracker />} />
            <Route path="/estimators" element={<Estimators />} />
            <Route path="/radar" element={<OperatorRadar />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
