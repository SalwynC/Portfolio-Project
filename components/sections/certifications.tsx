"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { certifications } from "@/lib/data"
import { Award, ExternalLink, X, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const, // cubic-bezier for smooth bounce
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.1,
      },
    },
  }

  const pulseVariants = {
    initial: { opacity: 0.7, scale: 1 },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" aria-labelledby="certifications-heading">
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionHeader 
              number="05"
              title="Certifications"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.97 }}
                className="group relative"
              >
                {/* Animated Glow Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.badgeColor} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Card Container - Glassmorphism */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative h-full bg-card backdrop-blur-sm border border-border dark:border-border/70 rounded-2xl overflow-hidden hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 dark:bg-card dark:hover:shadow-primary/20"
                >
                  {/* Certificate Image */}
                  <motion.div
                    className="relative h-48 bg-gradient-to-br from-muted/30 to-muted/50 overflow-hidden flex items-center justify-center"
                    variants={imageVariants}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.badgeColor} opacity-20`} />
                    
                    {/* Actual Certificate Image */}
                    {cert.image && (
                      <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-40 w-auto drop-shadow-2xl brightness-110 dark:brightness-125 z-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            console.error(`Image failed to load: ${cert.image}`)
                          }}
                        />
                      </motion.div>
                    )}
                    
                    {/* Fallback if no image */}
                    {!cert.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
                          <Award className="w-20 h-20 text-white/80 relative z-10" />
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient overlay with animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-20"
                      initial={{ opacity: 0.3 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Animated Badge Icon */}
                    <motion.div
                      className="absolute top-4 right-4 z-30 p-2 bg-card/95 backdrop-blur-sm rounded-lg border border-border dark:border-border/70"
                      animate={prefersReducedMotion ? {} : {
                        y: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Shield className="w-5 h-5 text-primary" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-primary/70" />
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {cert.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground/70" />
                        <span className="text-xs text-muted-foreground/70">
                          {cert.issueDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs px-3 py-1.5 bg-primary/20 dark:bg-primary/25 text-primary rounded-full group-hover:bg-primary/30 dark:group-hover:bg-primary/35 transition-colors">
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal for Certificate Details */}
        <AnimatePresence>
          {selectedCert && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                {/* Modal Content */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-3xl w-full bg-card dark:bg-card backdrop-blur-xl border border-border dark:border-border/70 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-4 right-4 z-50 p-2 bg-background/80 dark:bg-background/80 hover:bg-background dark:hover:bg-background/90 rounded-full border border-border dark:border-border/60 transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>

                  {/* Certificate Image */}
                  <motion.div
                    className="relative h-64 md:h-96 bg-gradient-to-br from-muted/30 to-background flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedCert.badgeColor} opacity-50`} />
                    
                    {/* Actual Certificate Image */}
                    {selectedCert.image && (
                      <motion.div
                        className="relative w-full h-full"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                      >
                        <Image
                          src={selectedCert.image}
                          alt={selectedCert.title}
                          fill
                          className="object-contain p-6 relative z-10 brightness-110"
                          priority={true}
                          onError={() => {
                            // Fallback handled by Next.js
                          }}
                        />
                      </motion.div>
                    )}
                    
                    {/* Fallback if no image */}
                    {!selectedCert.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
                          <Award className="w-32 h-32 md:w-40 md:h-40 text-white/60 relative z-10" />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Details with staggered animation */}
                  <motion.div
                    className="p-6 md:p-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {selectedCert.title}
                        </h2>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          {selectedCert.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="text-foreground/90 leading-relaxed">
                      {selectedCert.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Issued: {selectedCert.issueDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          ID: {selectedCert.credentialId}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors w-full justify-center md:w-auto"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  )
}
