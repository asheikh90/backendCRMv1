import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const ActionButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  successMessage,
  className = '',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (e) => {
    if (onClick) {
      setIsLoading(true)
      try {
        await onClick(e)
        if (successMessage) {
          toast.success(successMessage)
        }
      } catch (error) {
        toast.error('Action failed')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-neon-blue text-dark-bg hover:bg-opacity-80',
    secondary: 'bg-dark-card border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-dark-muted hover:text-white hover:bg-dark-bg'
  }

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={16} className="mr-2" />}
          {children}
        </>
      )}
    </motion.button>
  )
}

export default ActionButton
