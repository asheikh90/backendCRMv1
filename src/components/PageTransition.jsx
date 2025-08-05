import React from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from '../utils/animationVariants'

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
