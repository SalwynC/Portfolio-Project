"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SectionHeaderProps {
  number?: string
  title: string
  centered?: boolean
}

export function SectionHeader({ number, title, centered = false }: SectionHeaderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  const content = (
    <>
      {number && (
        <span className="text-primary font-mono text-base sm:text-lg flex items-center gap-1 animate-pulse">
          <span className="text-muted-foreground/50">{"<"}</span>
          {number}
          <span className="text-muted-foreground/50">{"/>"}</span>
        </span>
      )}
      <span className="relative text-foreground drop-shadow-sm font-semibold">
        {title}
        {/* Underline decoration */}
        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      </span>
      {!centered && <span className="h-px bg-gradient-to-r from-border via-border to-transparent flex-1 max-w-xs" />}
    </>
  )

  if (prefersReducedMotion) {
    return (
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
        className={`flex items-center gap-4 text-2xl sm:text-3xl font-bold mb-10 ${centered ? "justify-center" : ""}`}
      >
        {content}
      </h2>
    )
  }

  return (
    <motion.h2
      ref={ref}
      id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
      className={`flex items-center gap-4 text-2xl sm:text-3xl font-bold mb-10 ${centered ? "justify-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.h2>
  )
}
