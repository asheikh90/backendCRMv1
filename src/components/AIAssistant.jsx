import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react'
import { springConfig, buttonPress } from '../utils/animations'

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi Ali! I'm your AI assistant. I can help you interpret metrics, recommend next steps, and answer questions about your collision shop operations. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        { text: "Show me conversion insights", icon: TrendingUp },
        { text: "Which leads need follow-up?", icon: Users },
        { text: "Schedule optimization tips", icon: Calendar },
        { text: "Revenue breakdown analysis", icon: DollarSign }
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text = input) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(text)
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        insights: response.insights,
        actions: response.actions
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('conversion') || lowerQuery.includes('insight')) {
      return {
        content: "Based on your current data, here are key conversion insights:\n\n• GMB leads are converting 14% better than Google Ads (74% vs 69%)\n• Dealer referrals have the highest conversion at 82%\n• Your average response time is 2.3 hours - reducing to under 1 hour could boost conversions by 15-20%\n\nRecommendation: Focus more budget on GMB optimization and implement faster response automation.",
        insights: [
          { metric: "GMB Conversion", value: "74%", trend: "+14%" },
          { metric: "Response Time", value: "2.3h", trend: "Target: <1h" },
          { metric: "Dealer Referrals", value: "82%", trend: "Best source" }
        ]
      }
    }
    
    if (lowerQuery.includes('follow-up') || lowerQuery.includes('leads')) {
      return {
        content: "You have 3 leads requiring immediate attention:\n\n🔥 **Jessica Martinez** - Hot lead, $2,450 value, last contact 2 days ago\n⚠️ **Sarah Wilson** - BMW repair, overdue follow-up by 1 day\n📞 **Mike Johnson** - Warm lead, quote sent 3 days ago, no response\n\nSuggested actions: Send SMS to Jessica about scheduling, call Sarah directly about insurance status, and send quote reminder to Mike.",
        actions: [
          { text: "Send SMS to Jessica", type: "sms", target: "Jessica Martinez" },
          { text: "Call Sarah Wilson", type: "call", target: "Sarah Wilson" },
          { text: "Email quote reminder to Mike", type: "email", target: "Mike Johnson" }
        ]
      }
    }
    
    if (lowerQuery.includes('schedule') || lowerQuery.includes('optimization')) {
      return {
        content: "Schedule optimization analysis:\n\n• You have 2 jobs finishing this week, creating capacity for new work\n• Tuesday-Thursday are your peak productivity days\n• Scheduling estimates on Mondays increases close rate by 23%\n• Your current job completion time averages 3.2 days\n\nRecommendation: Block Monday mornings for estimates, and you can take on 2 more jobs this week without overtime.",
        insights: [
          { metric: "Available Capacity", value: "2 slots", trend: "This week" },
          { metric: "Monday Estimates", value: "+23%", trend: "Close rate boost" },
          { metric: "Avg Completion", value: "3.2 days", trend: "Industry: 4.1" }
        ]
      }
    }
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('breakdown')) {
      return {
        content: "Revenue breakdown for this month:\n\n💰 **Total Revenue**: $47,250 (+18% vs last month)\n🎯 **Average Ticket**: $2,236 (up from $2,180)\n📈 **Top Services**: Paint work (34%), Dent repair (28%), Full collision (38%)\n🏆 **Best Estimator**: Ali Sheikh - 69.2% close rate\n\nOpportunity: Upselling paint protection adds average $180 per job with 67% acceptance rate.",
        insights: [
          { metric: "Monthly Revenue", value: "$47.2k", trend: "+18%" },
          { metric: "Average Ticket", value: "$2,236", trend: "+$56" },
          { metric: "Paint Protection", value: "67%", trend: "Acceptance rate" }
        ]
      }
    }
    
    return {
      content: "I can help you with:\n\n📊 **Analytics**: Conversion rates, revenue trends, performance metrics\n👥 **Lead Management**: Follow-up recommendations, priority scoring\n📅 **Scheduling**: Capacity planning, optimal booking times\n💡 **Insights**: AI-powered suggestions for growth\n\nWhat specific area would you like to explore?",
      suggestions: [
        { text: "Analyze my conversion funnel", icon: TrendingUp },
        { text: "Show overdue follow-ups", icon: Users },
        { text: "Optimize my schedule", icon: Calendar },
        { text: "Revenue opportunities", icon: DollarSign }
      ]
    }
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            {...buttonPress}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50 group"
            style={{
              boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileHover={{ opacity: 1, scale: 1, x: 0 }}
              className="absolute right-full mr-4 bg-gray-900/90 backdrop-blur-md text-white px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
            >
              <div className="flex items-center space-x-2">
                <Bot size={16} />
                <span className="font-medium">AI Assistant</span>
              </div>
              <p className="text-xs text-gray-300">Ask me anything about your shop</p>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={springConfig}
            className={`fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
            style={{
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <Bot className="text-white" size={16} />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-gray-400 text-xs">Always learning, always helping</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  {...buttonPress}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} className="text-gray-400" /> : <Minimize2 size={16} className="text-gray-400" />}
                </motion.button>
                <motion.button
                  {...buttonPress}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* Insights */}
                        {message.insights && (
                          <div className="mt-3 space-y-2">
                            {message.insights.map((insight, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
                              >
                                <span className="text-xs text-gray-300">{insight.metric}</span>
                                <div className="text-right">
                                  <span className="text-sm font-semibold text-blue-400">{insight.value}</span>
                                  <p className="text-xs text-gray-400">{insight.trend}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        {message.actions && (
                          <div className="mt-3 space-y-2">
                            {message.actions.map((action, index) => (
                              <motion.button
                                key={index}
                                {...buttonPress}
                                className="w-full text-left p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs text-blue-300 transition-colors"
                              >
                                {action.text}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        
                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => {
                              const Icon = suggestion.icon
                              return (
                                <motion.button
                                  key={index}
                                  {...buttonPress}
                                  onClick={() => handleSend(suggestion.text)}
                                  className="flex items-center space-x-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-gray-300 transition-colors"
                                >
                                  <Icon size={12} />
                                  <span>{suggestion.text}</span>
                                </motion.button>
                              )
                            })}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-2xl border border-white/20">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-blue-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-blue-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-blue-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything about your collision shop..."
                      className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                    />
                    <motion.button
                      {...buttonPress}
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isTyping}
                      className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAssistant
