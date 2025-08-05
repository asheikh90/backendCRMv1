import { create } from 'zustand'

export const useDemoStore = create((set, get) => ({
  isDemoMode: false,
  
  toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
  
  // Demo data
  getDemoLeads: () => [
    {
      id: 'L001',
      name: 'Jessica Martinez',
      phone: '(215) 555-0123',
      email: 'jessica@email.com',
      source: 'Google Ads',
      vehicle: '2022 Honda Civic',
      issue: 'Rear bumper damage',
      status: 'Hot',
      lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      nextFollowUp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
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
      lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
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
      lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      nextFollowUp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Overdue
      estimatedValue: 3200,
      notes: 'Waiting for insurance approval'
    },
    {
      id: 'L004',
      name: 'David Brown',
      phone: '(215) 555-0126',
      email: 'david@email.com',
      source: 'Referrals',
      vehicle: '2019 Ford F-150',
      issue: 'Bed liner + tailgate paint',
      status: 'Hot',
      lastContact: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
      nextFollowUp: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedValue: 1200,
      notes: 'Ready to schedule'
    }
  ],

  getDemoJobs: () => [
    {
      id: '#CC-2024-001',
      customer: 'Jessica Martinez',
      phone: '(215) 555-0123',
      vehicle: '2022 Honda Civic',
      issue: 'Rear bumper repair + paint',
      status: 'In Progress',
      value: '$2,450',
      estimator: 'Ali Sheikh',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'high',
      notes: 'Customer wants OEM parts only'
    },
    {
      id: '#CC-2024-002',
      customer: 'Mike Johnson',
      phone: '(215) 555-0124',
      vehicle: '2021 Toyota Camry',
      issue: 'Front door dent removal',
      status: 'Scheduled',
      value: '$1,850',
      estimator: 'Ali Sheikh',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      notes: 'Insurance claim - State Farm'
    },
    {
      id: '#CC-2024-003',
      customer: 'Sarah Wilson',
      phone: '(215) 555-0125',
      vehicle: '2020 BMW 3 Series',
      issue: 'Full front end collision',
      status: 'Estimate',
      value: '$3,200',
      estimator: 'Ali Sheikh',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Overdue
      priority: 'high',
      notes: 'Waiting for adjuster approval'
    },
    {
      id: '#CC-2024-004',
      customer: 'David Brown',
      phone: '(215) 555-0126',
      vehicle: '2019 Ford F-150',
      issue: 'Bed liner + tailgate paint',
      status: 'Delivered',
      value: '$1,200',
      estimator: 'Ali Sheikh',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'low',
      notes: 'Customer pickup completed'
    }
  ],

  getDemoEstimators: () => [
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
    },
    {
      id: 4,
      name: 'Tony Rodriguez',
      avatar: '/api/placeholder/40/40',
      quotesGiven: 98,
      jobsClosed: 28,
      totalRevenue: 62400,
      closeRate: 28.6,
      avgTicket: 2229,
      rank: 4,
      badge: 'none',
      trend: '-3%'
    }
  ],

  getDemoSignals: () => [
    {
      id: 1,
      type: 'leads',
      icon: '🔁',
      message: '4 leads need follow-up today',
      priority: 'high',
      count: 4,
      route: '/leads'
    },
    {
      id: 2,
      type: 'performance',
      icon: '📈',
      message: 'Dealer leads outperform GMB by 14% this week',
      priority: 'medium',
      count: 14,
      route: '/leads'
    },
    {
      id: 3,
      type: 'photos',
      icon: '📸',
      message: '3 jobs missing Before/After upload',
      priority: 'medium',
      count: 3,
      route: '/proof'
    },
    {
      id: 4,
      type: 'estimator',
      icon: '🚨',
      message: '1 estimator below 30% close rate',
      priority: 'high',
      count: 1,
      route: '/estimators'
    },
    {
      id: 5,
      type: 'revenue',
      icon: '💰',
      message: 'Daily revenue up 18% vs yesterday',
      priority: 'low',
      count: 18,
      route: '/'
    }
  ]
}))
