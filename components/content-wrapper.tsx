'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for page loader to finish (3.5s) then show content
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
