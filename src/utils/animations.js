// Tesla-inspired animation system
export const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30
}

export const easeConfig = {
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.4
}

export const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
    filter: "blur(4px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...easeConfig,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.3 }
  }
}

export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 40px rgba(0, 212, 255, 0.15)",
    transition: { duration: 0.2 }
  }
}

export const buttonPress = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
    transition: { duration: 0.15 }
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(0, 212, 255, 0.3)",
      "0 0 30px rgba(0, 212, 255, 0.6)",
      "0 0 20px rgba(0, 212, 255, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: springConfig
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springConfig
  }
}
