import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Phone, 
  Mail, 
  MessageSquare,
  Calendar,
  Filter,
  Search
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { useDemoStore } from '../store/demoStore'
import SuggestedNextStep from '../components/SuggestedNextStep'
import ContextualTooltip from '../components/ContextualTooltip'
import SmartActionHint from '../components/SmartActionHint'
import { cardVariants, pulseVariants, shakeVariants } from '../utils/animationVariants'
import toast from 'react-hot-toast'

const LeadTracker = () => {
  const { isDemoMode, getDemoLeads } = useDemoStore()
  const [selectedSource, setSelectedSource] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [leads, setLeads] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      setLeads(getDemoLeads())
    } else {
      setLeads([])
    }
  }, [isDemoMode, getDemoLeads])

  const conversionData = [
    { source: 'Google Ads', leads: 45, converted: 31, rate: 69 },
    { source: 'GMB', leads: 38, converted: 28, rate: 74 },
    { source: 'Dealers', leads: 22, converted: 18, rate: 82 },
    { source: 'Walk-ins', leads: 15, converted: 12, rate: 80 },
    { source: 'Referrals', leads: 12, converted: 11, rate: 92 }
  ]

  const sourceColors = {
    'Google Ads': '#3B82F6',
    'GMB': '#10B981',
    'Dealers': '#F59E0B',
    'Walk-ins': '#8B5CF6',
    'Referrals': '#EF4444'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500'
      case 'Warm': return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500'
      case 'Cold': return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500'
      default: return 'bg-dark-muted'
    }
  }

  const isOverdue = (followUpDate) => {
    return new Date(followUpDate) < new Date()
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource
    return matchesSearch && matchesSource
  })

  const overdueLeads = leads.filter(lead => isOverdue(lead.nextFollowUp))
  const hotLeads = leads.filter(lead => lead.status === 'Hot')

  const suggestions = isDemoMode ? [
    {
      text: `Send quote reminder to ${overdueLeads.length} overdue leads`,
      priority: "high",
      action: () => toast.success("Bulk SMS reminders sent")
    },
    {
      text: `Follow up with ${hotLeads.length} hot leads today`,
      priority: "medium",
      action: () => toast.success("Hot lead follow-ups scheduled")
    },
    {
      text: "GMB leads converting 14% better than Google Ads",
      priority: "low",
      action: () => toast.success("Adjusting ad spend allocation")
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
          <h1 className="text-3xl font-bold neon-text">Lead Conversion Tracker</h1>
          <p className="text-dark-muted">Track conversion rates and manage follow-ups</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-neon-green" size={24} />
          <span className="text-neon-green font-semibold">CONVERSION TRACKING</span>
        </div>
      </motion.div>

      {/* AI Suggested Next Steps */}
      <SuggestedNextStep 
        suggestions={suggestions}
        onAction={(suggestion) => suggestion.action()}
      />

      {/* Conversion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Chart */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Conversion by Source</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <XAxis 
                  dataKey="source" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={sourceColors[entry.source]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Source Breakdown */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="card"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Lead Sources</h3>
          <div className="space-y-4">
            {conversionData.map((source, index) => (
              <motion.div 
                key={source.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: sourceColors[source.source] }}
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="text-white font-medium">{source.source}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{source.rate}%</p>
                  <p className="text-dark-muted text-sm">{source.converted}/{source.leads}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lead Management */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="card"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-white">Active Leads</h3>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" size={16} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-dark-bg/50 backdrop-blur-sm border border-dark-border rounded-lg text-white placeholder-dark-muted focus:border-neon-blue focus:outline-none"
              />
            </div>
            
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-dark-bg/50 backdrop-blur-sm border border-dark-border rounded-lg px-4 py-2 text-white focus:border-neon-blue focus:outline-none"
            >
              <option value="all">All Sources</option>
              {Object.keys(sourceColors).map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead, index) => {
            const leadIsOverdue = isOverdue(lead.nextFollowUp)
            const isHot = lead.status === 'Hot'
            
            return (
              <ContextualTooltip
                key={lead.id}
                content={`${lead.name} - ${lead.vehicle} - ${lead.issue}`}
                actions={[
                  {
                    icon: MessageSquare,
                    label: 'SMS',
                    onClick: () => toast.success(`SMS sent to ${lead.name}`)
                  },
                  {
                    icon: Phone,
                    label: 'Call',
                    onClick: () => toast.success(`Calling ${lead.name}`)
                  }
                ]}
              >
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-dark-bg/50 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    {/* Lead Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-neon-blue font-mono font-semibold">{lead.id}</span>
                        <motion.span 
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}
                          variants={isHot ? pulseVariants : {}}
                          animate={isHot ? 'pulse' : ''}
                        >
                          {lead.status}
                        </motion.span>
                        <span 
                          className="px-2 py-1 rounded text-xs text-white"
                          style={{ backgroundColor: sourceColors[lead.source] }}
                        >
                          {lead.source}
                        </span>
                        {leadIsOverdue && (
                          <motion.span 
                            variants={pulseVariants}
                            animate="pulse"
                            className="px-2 py-1 rounded-full text-xs bg-red-500 text-white"
                          >
                            OVERDUE
                          </motion.span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{lead.name}</h4>
                          <div className="flex items-center space-x-4 text-dark-muted text-sm">
                            <span className="flex items-center space-x-1">
                              <Phone size={14} />
                              <span>{lead.phone}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Mail size={14} />
                              <span>{lead.email}</span>
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-medium">{lead.vehicle}</p>
                          <p className="text-dark-muted text-sm">{lead.issue}</p>
                          <p className="text-dark-muted text-sm">{lead.notes}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lead Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                      <div className="text-center lg:text-right">
                        <p className="text-neon-green text-xl font-bold">${lead.estimatedValue.toLocaleString()}</p>
                        <p className="text-dark-muted text-sm">Est. Value</p>
                      </div>
                      
                      <div className="text-center lg:text-right">
                        <div className="flex items-center justify-center lg:justify-end space-x-1">
                          <Calendar size={16} className="text-dark-muted" />
                          <p className={`${leadIsOverdue ? 'text-red-400 font-semibold' : 'text-white'}`}>
                            {new Date(lead.nextFollowUp).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-dark-muted text-sm">Next Follow-up</p>
                        <SmartActionHint 
                          type="lastUpdate" 
                          data={new Date(lead.lastContact).toLocaleDateString()} 
                          className="mt-1"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <motion.button
                          variants={leadIsOverdue ? shakeVariants : {}}
                          animate={leadIsOverdue ? 'shake' : ''}
                          className="btn-secondary text-sm px-3 py-2 flex items-center space-x-1"
                          onClick={() => toast.success(`Calling ${lead.name}`)}
                        >
                          <Phone size={14} />
                          <span>Call</span>
                        </motion.button>
                        
                        <button 
                          className="btn-secondary text-sm px-3 py-2 flex items-center space-x-1"
                          onClick={() => toast.success(`SMS sent to ${lead.name}`)}
                        >
                          <MessageSquare size={14} />
                          <span>SMS</span>
                        </button>
                        
                        <button 
                          className="btn-primary text-sm px-3 py-2"
                          onClick={() => toast.success(`Lead ${lead.id} updated`)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Follow-up Suggestion */}
                  {isHot && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-3 bg-neon-green/10 backdrop-blur-sm border border-neon-green/30 rounded-lg"
                    >
                      <p className="text-neon-green text-sm font-medium">
                        🤖 AI Suggestion: High conversion probability (87%). Send quote reminder SMS now.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </ContextualTooltip>
            )
          })}
        </div>

        {filteredLeads.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="mx-auto mb-4 text-dark-muted" size={48} />
            <p className="text-dark-muted text-lg">No leads found</p>
            {leads.length === 0 && (
              <p className="text-dark-muted text-sm">Enable demo mode to see sample data</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default LeadTracker
