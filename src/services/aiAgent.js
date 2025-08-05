// AI Agent Service - Mock implementations for future LLM integration
export class AIAgent {
  // Simulate API delay
  static async delay(ms = 1500) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Mock damage analysis API
  static async analyzeDamage(images, vehicleInfo = {}) {
    await this.delay(2000)
    
    const damageTypes = [
      'Minor paint scratches',
      'Dent repair needed',
      'Bumper replacement required',
      'Panel realignment necessary',
      'Paint touch-up required',
      'Structural damage detected'
    ]
    
    const repairTypes = [
      'Paint correction and polish',
      'Paintless dent repair (PDR)',
      'Bumper replacement and paint',
      'Panel beating and refinishing',
      'Touch-up paint application',
      'Structural repair and alignment'
    ]
    
    // Mock analysis based on image count and vehicle info
    const severity = Math.random() > 0.5 ? 'moderate' : 'minor'
    const basePrice = severity === 'moderate' ? 1500 : 800
    const priceVariation = Math.floor(Math.random() * 500)
    
    return {
      id: `analysis_${Date.now()}`,
      timestamp: new Date().toISOString(),
      vehicleInfo,
      damageAssessment: {
        summary: `Based on the uploaded images, I've identified ${damageTypes[Math.floor(Math.random() * damageTypes.length)]} on your ${vehicleInfo.year || '2020'} ${vehicleInfo.make || 'Vehicle'}. The damage appears to be ${severity} and will require professional attention to restore the vehicle to its original condition.`,
        damageType: damageTypes[Math.floor(Math.random() * damageTypes.length)],
        repairType: repairTypes[Math.floor(Math.random() * repairTypes.length)],
        severity,
        affectedAreas: this.generateAffectedAreas(images.length),
        estimatedHours: severity === 'moderate' ? '8-12 hours' : '4-6 hours'
      },
      pricing: {
        estimatedRange: {
          min: basePrice + priceVariation,
          max: basePrice + priceVariation + 800
        },
        breakdown: {
          labor: Math.floor((basePrice + priceVariation) * 0.6),
          parts: Math.floor((basePrice + priceVariation) * 0.3),
          materials: Math.floor((basePrice + priceVariation) * 0.1)
        },
        confidence: Math.floor(Math.random() * 20) + 75 // 75-95%
      },
      recommendations: [
        'Schedule inspection within 48 hours',
        'Avoid driving in harsh weather until repaired',
        'Consider paint protection after repair',
        'Document damage for insurance claim'
      ],
      nextSteps: [
        'Schedule detailed in-person inspection',
        'Provide insurance information',
        'Approve repair timeline',
        'Arrange vehicle drop-off'
      ]
    }
  }

  // Generate affected areas based on number of images
  static generateAffectedAreas(imageCount) {
    const areas = ['Front Bumper', 'Rear Bumper', 'Driver Side Door', 'Passenger Side Door', 'Hood', 'Trunk', 'Front Quarter Panel', 'Rear Quarter Panel']
    const selectedAreas = []
    const numAreas = Math.min(imageCount, Math.floor(Math.random() * 3) + 1)
    
    for (let i = 0; i < numAreas; i++) {
      const randomArea = areas[Math.floor(Math.random() * areas.length)]
      if (!selectedAreas.includes(randomArea)) {
        selectedAreas.push(randomArea)
      }
    }
    
    return selectedAreas
  }

  // Mock quote generation API
  static async generateQuote(customerInfo, damageInfo, photos = []) {
    await this.delay(1800)
    
    const basePrice = Math.floor(Math.random() * 2000) + 1000
    const laborRate = 85 // per hour
    const estimatedHours = Math.floor(Math.random() * 8) + 4
    
    return {
      id: `quote_${Date.now()}`,
      timestamp: new Date().toISOString(),
      customer: customerInfo,
      vehicle: {
        year: customerInfo.year,
        make: customerInfo.make,
        model: customerInfo.model
      },
      damage: damageInfo,
      estimate: {
        labor: {
          hours: estimatedHours,
          rate: laborRate,
          total: estimatedHours * laborRate
        },
        parts: Math.floor(basePrice * 0.4),
        materials: Math.floor(basePrice * 0.15),
        subtotal: basePrice,
        tax: Math.floor(basePrice * 0.08),
        total: Math.floor(basePrice * 1.08)
      },
      warranty: {
        labor: '2 years',
        parts: '1 year',
        paint: 'Lifetime'
      },
      timeline: {
        inspection: '1-2 business days',
        parts: '3-5 business days',
        repair: `${estimatedHours / 8} business days`
      },
      confidence: Math.floor(Math.random() * 15) + 80, // 80-95%
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      notes: 'This estimate is based on visual assessment. Final pricing may vary after detailed inspection.',
      attachments: photos.map((photo, index) => ({
        id: `photo_${index}`,
        name: photo.name || `damage_photo_${index + 1}.jpg`,
        url: photo.preview || photo.url
      }))
    }
  }

  // Mock SMS sending
  static async sendSMS(phoneNumber, message, attachments = []) {
    await this.delay(1000)
    
    return {
      id: `sms_${Date.now()}`,
      timestamp: new Date().toISOString(),
      to: phoneNumber,
      message,
      attachments,
      status: 'sent',
      deliveryStatus: 'delivered',
      cost: 0.02 // Mock cost per SMS
    }
  }

  // Mock email sending
  static async sendEmail(email, subject, body, attachments = []) {
    await this.delay(1200)
    
    return {
      id: `email_${Date.now()}`,
      timestamp: new Date().toISOString(),
      to: email,
      subject,
      body,
      attachments,
      status: 'sent',
      openTracking: false,
      clickTracking: false
    }
  }

  // Mock lead scoring
  static async scoreLeadConversion(leadData) {
    await this.delay(800)
    
    const factors = {
      responseTime: leadData.responseTime < 60 ? 25 : leadData.responseTime < 180 ? 15 : 5,
      source: leadData.source === 'Referrals' ? 30 : leadData.source === 'GMB' ? 25 : 15,
      estimatedValue: leadData.estimatedValue > 2000 ? 20 : leadData.estimatedValue > 1000 ? 15 : 10,
      engagement: leadData.engagement === 'high' ? 20 : leadData.engagement === 'medium' ? 10 : 5,
      timeOfDay: new Date().getHours() >= 9 && new Date().getHours() <= 17 ? 5 : 0
    }
    
    const totalScore = Object.values(factors).reduce((sum, score) => sum + score, 0)
    
    return {
      score: Math.min(100, totalScore),
      factors,
      recommendation: totalScore > 70 ? 'high_priority' : totalScore > 50 ? 'medium_priority' : 'low_priority',
      suggestedActions: this.generateSuggestedActions(totalScore, leadData),
      confidence: Math.floor(Math.random() * 10) + 85
    }
  }

  // Generate suggested actions based on lead score
  static generateSuggestedActions(score, leadData) {
    const actions = []
    
    if (score > 70) {
      actions.push('Call immediately - high conversion probability')
      actions.push('Send personalized quote within 2 hours')
      actions.push('Schedule in-person inspection')
    } else if (score > 50) {
      actions.push('Send SMS with quote link')
      actions.push('Follow up within 24 hours')
      actions.push('Provide additional service information')
    } else {
      actions.push('Add to nurture campaign')
      actions.push('Send educational content')
      actions.push('Follow up in 3-5 days')
    }
    
    return actions
  }

  // Mock scheduling API
  static async scheduleAppointment(customerInfo, appointmentType, preferredDate) {
    await this.delay(1000)
    
    return {
      id: `appointment_${Date.now()}`,
      timestamp: new Date().toISOString(),
      customer: customerInfo,
      type: appointmentType,
      scheduledDate: preferredDate,
      duration: appointmentType === 'inspection' ? 30 : 60,
      status: 'confirmed',
      location: 'Collision Club Philly - Main Location',
      confirmationSent: true,
      reminderScheduled: true
    }
  }
}
