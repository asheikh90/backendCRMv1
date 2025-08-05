import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { useUIStore } from '../store/uiStore'
import { useDemoStore } from '../store/demoStore'

const AskForge = () => {
  const { askForgeOpen, setAskForgeOpen } = useUIStore()
  const { isDemoMode } = useDemoStore()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi Ali — I'm Forge, your AI assistant. I can help you optimize operations, analyze performance, and answer questions about your collision shop. What can I help you with?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(input)
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('follow-up') || lowerQuery.includes('lead')) {
      return "Based on your current leads, I recommend prioritizing Jessica Martinez (Hot lead, $2,450 value) and David Brown (Hot lead, ready to schedule). For Jessica, send an SMS: 'Hi Jessica, just checking if you had any questions about the Honda Civic repair quote. We can start Monday if you're ready.' For overdue leads like Sarah Wilson, try: 'Hi Sarah, following up on your BMW repair estimate. Insurance approvals can take time - let me know if you need help expediting this.'"
    }
    
    if (lowerQuery.includes('gmb') || lowerQuery.includes('convert')) {
      return "This week, GMB leads are converting at 74% vs Google Ads at 69%. However, dealer referrals are your strongest at 82% conversion. GMB leads tend to be more price-sensitive but convert faster. I'd suggest increasing your GMB optimization and asking satisfied dealer customers for reviews to boost both channels."
    }
    
    if (lowerQuery.includes('closer') || lowerQuery.includes('best') || lowerQuery.includes('estimator')) {
      return "Ali, you're the top closer this month with 69.2% close rate and $245k revenue. Marcus is solid at 66.4%, but Tony Rodriguez needs attention at 28.6% close rate. I recommend having Tony shadow your next few estimates and focus on value presentation rather than just price. His average ticket is good ($2,229) but he's not closing deals."
    }
    
    if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('profit')) {
      return "Today's revenue is $12,450, up 18% from yesterday. Your average ticket is $2,236 across all estimators. To boost revenue, focus on: 1) Upselling headlight restoration (+$150 avg), 2) Premium warranty options (+$150-300), 3) Following up on the 8 pending quotes worth ~$18k total."
    }
    
    if (lowerQuery.includes('overdue') || lowerQuery.includes('late') || lowerQuery.includes('stuck')) {
      return "You have 2 overdue items: Sarah Wilson's BMW estimate (1 day overdue - waiting on insurance) and Mike Johnson's Camry repair (1 day past due date). For Sarah, contact the adjuster directly. For Mike, call to explain the delay and offer a completion bonus or discount for the inconvenience."
    }
    
    if (lowerQuery.includes('parts') || lowerQuery.includes('supplier')) {
      return "Based on your current jobs, you have parts delays on 2 vehicles. The Honda Civic bumper is delayed - I recommend calling your secondary supplier or checking with the dealer for OEM availability. Always communicate delays proactively to customers with new timelines and compensation options."
    }
    
    return "I understand you're asking about collision shop operations. I can help with lead management, estimator performance, revenue optimization, job tracking, and operational insights. Try asking me about specific leads, conversion rates, or performance metrics. What specific area would you like to focus on?"
  }

  const quickActions = [
    { text: "What's the best follow-up for hot leads?", action: () => setInput("What's the best follow-up for hot leads?") },
    { text: "How are GMB leads converting?", action: () => setInput("How are GMB leads converting this week?") },
    { text: "Who's my best closer this month?", action: () => setInput("Who's my best closer this month?") },
    { text: "Show me overdue items", action: () => setInput("What items are overdue or stuck?") }
  ]

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!askForgeOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAskForgeOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-green rounded-full shadow-neon-blue flex items-center justify-center z-50 group"
          >
            <Zap className="text-dark-bg" size={24} />
            <div className="absolute -top-12 right-0 bg-dark-card border border-neon-blue rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              <p className="text-neon-blue text-sm font-medium">⚡ Ask Forge</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {askForgeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`bg-dark-card border border-neon-blue rounded-lg shadow-neon-blue w-full max-w-2xl transition-all duration-300 ${
                isMinimized ? 'h-16' : 'h-[600px]'
              } flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center">
                    <Zap className="text-dark-bg" size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Ask Forge</h3>
                    <p className="text-dark-muted text-xs">AI Assistant for Collision Club</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </button>
                  <button
                    onClick={() => setAskForgeOpen(false)}
                    className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-neon-blue text-dark-bg'
                              : 'bg-dark-bg border border-dark-border text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-dark-bg opacity-70' : 'text-dark-muted'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-dark-bg border border-dark-border text-white p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-dark-muted text-xs mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.action}
                            className="text-xs bg-dark-bg hover:bg-neon-blue hover:text-dark-bg border border-dark-border hover:border-neon-blue rounded-full px-3 py-1 transition-all duration-200"
                          >
                            {action.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-dark-border">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about your collision shop..."
                        className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white placeholder-dark-muted focus:border-neon-blue focus:outline-none"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="bg-neon-blue text-dark-bg px-4 py-2 rounded-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AskForge
