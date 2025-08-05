import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Upload, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { useDemoStore } from '../store/demoStore'

const RecentActivity = () => {
  const { isDemoMode } = useDemoStore()
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (isDemoMode) {
      setActivities([
        {
          id: 1,
          type: 'quote',
          icon: DollarSign,
          color: 'neon-green',
          title: 'Quote sent to Jessica Martinez',
          description: '2022 Honda Civic - Rear bumper repair',
          time: '2 minutes ago',
          value: '$2,450'
        },
        {
          id: 2,
          type: 'upload',
          icon: Upload,
          color: 'neon-blue',
          title: 'Photos uploaded for Job #CC-2024-001',
          description: 'Before/after proof generated',
          time: '15 minutes ago'
        },
        {
          id: 3,
          type: 'message',
          icon: MessageSquare,
          color: 'yellow-400',
          title: 'Follow-up SMS sent',
          description: 'Mike Johnson - Quote reminder',
          time: '1 hour ago'
        },
        {
          id: 4,
          type: 'complete',
          icon: CheckCircle,
          color: 'neon-green',
          title: 'Job completed',
          description: 'David Brown - 2019 Ford F-150 delivered',
          time: '2 hours ago',
          value: '$1,200'
        },
        {
          id: 5,
          type: 'alert',
          icon: AlertTriangle,
          color: 'red-400',
          title: 'Parts delayed',
          description: 'Job #CC-2024-003 - BMW parts ETA extended',
          time: '3 hours ago'
        }
      ])
    } else {
      setActivities([])
    }
  }, [isDemoMode])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-neon-blue hover:text-neon-green transition-colors text-sm">
          View All →
        </button>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-3 bg-dark-bg rounded-lg hover:bg-opacity-80 transition-colors"
              >
                <div className={`p-2 rounded-lg bg-${activity.color} bg-opacity-20 flex-shrink-0`}>
                  <Icon className={`text-${activity.color}`} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{activity.title}</p>
                    {activity.value && (
                      <span className="text-neon-green font-semibold">{activity.value}</span>
                    )}
                  </div>
                  <p className="text-dark-muted text-sm mt-1">{activity.description}</p>
                  <p className="text-dark-muted text-xs mt-2">{activity.time}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="mx-auto mb-4 text-dark-muted" size={48} />
          <p className="text-dark-muted">No recent activity</p>
          <p className="text-dark-muted text-sm">Enable demo mode to see sample data</p>
        </div>
      )}
    </div>
  )
}

export default RecentActivity
