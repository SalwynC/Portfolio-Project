"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Terminal, Zap, Users, Lightbulb } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  const highlights = [
    { icon: Terminal, label: "Clean Code", desc: "Writing maintainable, scalable code" },
    { icon: Zap, label: "Performance", desc: "Optimizing for speed & efficiency" },
    { icon: Users, label: "Collaboration", desc: "Working effectively in teams" },
    { icon: Lightbulb, label: "Innovation", desc: "Creative problem solving" },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="01" title="About Me" />

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
          >
            <div className="md:col-span-2 space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p className="text-justify sm:text-left">
                Hello! I'm Salwyn Christopher, a final year Information Technology student at KL University with a passion for building scalable web applications and cloud-powered solutions. My journey in software development began with a curiosity about how websites work, which led me to dive deep into full-stack development.
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of completing multiple virtual internships with{" "}
                <span className="text-primary font-medium">AICTE (Google)</span>, working on{" "}
                <span className="text-primary font-medium">Android development</span>,{" "}
                <span className="text-primary font-medium">cloud engineering</span>, and{" "}
                <span className="text-primary font-medium">Python full-stack development</span>. My main focus is building accessible, performant applications using modern technologies like React, Node.js, Django, and cloud platforms.
              </p>
              <p>
                I've built several projects including a cloud-based study platform, a real-time roadmap manager, and an airline reservation system. I'm passionate about creating solutions that solve real-world problems and enhance user experiences. Currently pursuing my B.Tech with an 8.02 CGPA and certified in AWS, AZ-900, and RPA.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="p-1.5 sm:p-2 rounded-md bg-primary/10 flex-shrink-0">
                      <item.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative group"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Soft light card container */}
              <div className="relative rounded-3xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-lg overflow-visible">
                
                {/* Subtle ambient glow behind image */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2/3 h-2/3 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                
                {/* Profile image container */}
                <div className="relative p-6">
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-md border border-primary/15 bg-gradient-to-br from-background to-primary/5">
                    <Image
                      src="/salwyn_christopher.jpg"
                      alt="Salwyn Christopher - Software Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Light gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 transition-all duration-500" />
                  </div>
                </div>
                
                {/* Available for hire badge - positioned at bottom of card */}
                <motion.div
                  className="relative mb-6 mx-auto w-fit px-5 py-2 bg-background/70 backdrop-blur-sm border border-primary/20 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ scale: 1.03, y: -1 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-sm text-primary">Available for hire</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
