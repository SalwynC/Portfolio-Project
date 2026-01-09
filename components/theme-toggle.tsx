"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 relative overflow-hidden" 
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = (resolvedTheme || theme) === "dark"

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 relative overflow-hidden transition-all duration-200 hover:bg-accent/50 active:bg-accent"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, scale: 0, y: 10, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, scale: 0, y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-4 w-4 text-slate-900 dark:text-yellow-400 drop-shadow-sm" strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, scale: 0, y: -10, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, scale: 0, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-4 w-4 text-orange-500 dark:text-orange-400 drop-shadow-sm" strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}
