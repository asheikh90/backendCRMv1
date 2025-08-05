import React, { useState } from 'react'
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const LeadTracker = () => {
  const [selectedSource, setSelectedSource] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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

  const leads = [
    {
      id: 'L001',
      name: 'Jessica Martinez',
      phone: '(215) 555-0123',
      email: 'jessica@email.com',
      source: 'Google Ads',
      vehicle: '2022 Honda Civic',
      issue: 'Rear bumper damage',
      status: 'Hot',
      lastContact: '2024-01-15T10:30:00Z',
      nextFollowUp: '2024-01-16T14:00:00Z',
      estimatedValue: 2450,
      notes: 'Very interested, wants OEM parts'
    },
    {
      id: 'L002',
      name: 'Mike Johnson',
      phone: '(215) 555-0124',
      email: 'mike@email.com',
      source: 'GMB',
      vehicle: '2021 Toyota Camry',
      issue: 'Door dent',
      status: 'Warm',
      lastContact: '2024-01-14T15:45:00Z',
      nextFollowUp: '2024-01-17T10:00:00Z',
      estimatedValue: 1850,
      notes: 'Price shopping, sent quote'
    },
    {
      id: 'L003',
      name: 'Sarah Wilson',
      phone: '(215) 555-0125',
      email: 'sarah@email.com',
      source: 'Dealers',
      vehicle: '2020 BMW 3 Series',
      issue: 'Front end collision',
      status: 'Cold',
      lastContact: '2024-01-12T09:15:00Z',
      nextFollowUp: '2024-01-18T11:00:00Z',
      estimatedValue: 3200,
      notes: 'Waiting for insurance approval'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500'
      case 'Warm': return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500'
      case 'Cold': return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500'
      default: return 'bg-dark-muted'
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource
    return matchesSearch && matchesSource
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-text">Lead Conversion Tracker</h1>
          <p className="text-dark-muted">Track conversion rates and manage follow-ups</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-neon-green" size={24} />
          <span className="text-neon-green font-semibold">CONVERSION TRACKING</span>
        </div>
      </div>

      {/* Conversion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Chart */}
        <div className="card">
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
        </div>

        {/* Source Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-white">Lead Sources</h3>
          <div className="space-y-4">
            {conversionData.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: sourceColors[source.source] }}
                  />
                  <span className="text-white font-medium">{source.source}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{source.rate}%</p>
                  <p className="text-dark-muted text-sm">{source.converted}/{source.leads}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Management */}
      <div className="card">
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
                className="pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-muted focus:border-neon-blue focus:outline-none"
              />
            </div>
            
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-neon-blue focus:outline-none"
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
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-bg p-4 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                {/* Lead Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-neon-blue font-mono font-semibold">{lead.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span 
                      className="px-2 py-1 rounded text-xs text-white"
                      style={{ backgroundColor: sourceColors[lead.source] }}
                    >
                      {lead.source}
                    </span>
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
                      <p className="text-white">{new Date(lead.nextFollowUp).toLocaleDateString()}</p>
                    </div>
                    <p className="text-dark-muted text-sm">Next Follow-up</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm px-3 py-2 flex items-center space-x-1">
                      <Phone size={14} />
                      <span>Call</span>
                    </button>
                    <button className="btn-secondary text-sm px-3 py-2 flex items-center space-x-1">
                      <MessageSquare size={14} />
                      <span>SMS</span>
                    </button>
                    <button className="btn-primary text-sm px-3 py-2">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Auto Follow-up Suggestion */}
              {lead.status === 'Hot' && (
                <div className="mt-4 p-3 bg-neon-green bg-opacity-10 border border-neon-green rounded-lg">
                  <p className="text-neon-green text-sm font-medium">
                    🤖 AI Suggestion: Send quote reminder SMS - High conversion probability
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto mb-4 text-dark-muted" size={48} />
            <p className="text-dark-muted text-lg">No leads found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadTracker
