"use client"

import type React from "react"

import { motion, type Variants } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function AnimatedText({ text, className = "", delay = 0, as: Component = "span" }: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(" ")

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>
  }

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-[0.25em]" variants={wordVariants}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedHeading({ children, className = "", delay = 0 }: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.span>
  )
}
