"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, FileText, Code2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { TypingText } from "@/components/typing-text"

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  const roles = ["Full Stack Developer", "MERN Stack Developer", "Cloud Engineer", "Python Developer"]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32"
      aria-label="Introduction"
    >
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Terminal-style greeting */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-gradient-to-r from-primary/15 to-primary/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,169,146,0.1)] dark:from-primary/25 dark:to-primary/15 dark:border-primary/70 dark:shadow-[0_8px_32px_rgba(0,169,146,0.2)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-sm font-mono text-foreground/80 dark:text-foreground/90 font-medium">
              <span className="text-primary dark:text-primary font-semibold">~/portfolio</span> <span className="text-foreground dark:text-foreground/90">$</span> whoami
            </span>
          </div>
        </motion.div>

        {/* Name with glow effect */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent dark:from-foreground dark:via-primary dark:to-foreground animate-gradient"
        >
          <span className="text-primary/60 font-mono text-base sm:text-lg md:text-xl lg:text-2xl block mb-2 sm:mb-3 animate-pulse">{'<Developer/>'}</span>
          {personalInfo.name}
        </motion.h1>

        {/* Typing text for roles */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm mb-6 h-12"
        >
          <TypingText texts={roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg text-foreground/85 dark:text-foreground/90 max-w-xl mx-auto mb-8 leading-relaxed drop-shadow-[0_0_12px_rgba(0,169,146,0.2)] font-medium"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button asChild size="lg" className="gap-2 group glow-primary-sm shadow-md dark:shadow-[0_0_24px_rgba(0,169,146,0.25)]">
            <Link href="#projects">
              <Code2 className="h-5 w-5" />
              View My Work
              <motion.span
                className="inline-block"
                animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 bg-transparent border-primary/30 hover:bg-primary/10 dark:border-primary/60 dark:hover:bg-primary/20 text-foreground dark:text-foreground"
          >
            <Link href="#contact">Get In Touch</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2 text-foreground/90 hover:text-primary">
            <Link href="https://drive.google.com/file/d/1zX2l0fhSgHljcImc8Y0cieCoPphbXEKd/preview" target="_blank" rel="noopener noreferrer">
              <FileText className="h-5 w-5" />
              Resume
            </Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { href: personalInfo.social.github, icon: Github, label: "GitHub" },
            { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
          ].filter(social => social.href).map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted/50 dark:bg-muted/30 text-muted-foreground dark:text-foreground/80 hover:text-primary hover:bg-primary/10 hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </Link>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-8 sm:mt-12 md:mt-16 mb-8 grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-[280px] sm:max-w-md md:max-w-lg mx-auto px-2 sm:px-4"
        >
          {[
            { value: "3+", label: "Internships" },
            { value: "4+", label: "Projects Built" },
            { value: "10+", label: "Technologies" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-mono">{stat.value}</div>
              <div className="text-[9px] sm:text-xs md:text-sm text-muted-foreground whitespace-nowrap leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
