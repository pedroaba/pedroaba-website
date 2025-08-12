import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.24, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.22, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -12 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.24, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.28, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.28, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  show: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
}

export const staggerChildren = (stagger = 0.06) => ({
  hidden: { opacity: 1 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: stagger,
      delayChildren: 0.02
    } 
  },
})

export const staggerChildrenFast = (stagger = 0.04) => ({
  hidden: { opacity: 1 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: stagger 
    } 
  },
})

// Hover animations for interactive elements
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const hoverLift = {
  y: -2,
  transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
}

// View-based animations
export const inView = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
