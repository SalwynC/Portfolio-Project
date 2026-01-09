'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Block scroll during loading
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    // Show loader for 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Re-enable scroll
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!isVisible) return null

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 top-0 left-0 z-[9999] w-screen h-screen flex items-center justify-center bg-background pointer-events-auto">
        <p className="text-sm font-medium text-foreground/70">Loading Portfolio</p>
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 top-0 left-0 z-[9999] w-screen h-screen flex items-center justify-center bg-background pointer-events-auto overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated dual-ring spinner */}
        <motion.div
          className="relative w-24 h-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer ring rotating clockwise */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ring rotating counter-clockwise */}
          <motion.div
            className="absolute inset-2 rounded-full border-3 border-transparent border-b-primary border-l-primary"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center pulsing dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Loading Portfolio</h1>
          <p className="text-sm text-foreground/60">Preparing your experience...</p>
        </motion.div>

        {/* Pulsing indicator dots */}
        <motion.div
          className="flex gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary"
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
