"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Heart, Terminal, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { personalInfo } from "@/lib/data"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { href: personalInfo.social.github, icon: Github, label: "GitHub" },
  { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  //{ href: personalInfo.social.twitter, icon: Twitter, label: "Twitter" },
].filter(link => link.href)

export function Footer() {
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-6 border-t border-border relative">
      {/* Back to top button */}
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="rounded-full bg-background border-border hover:border-primary/50 hover:bg-primary/10"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="font-mono font-bold">
              <span className="text-primary">{">"}</span>SC
            </span>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:-translate-y-1 transition-all duration-200 inline-block border border-transparent hover:border-primary/30"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Attribution */}
          <motion.p
            className="text-sm text-muted-foreground text-center flex items-center gap-1.5"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Designed & Built with <Heart className="h-4 w-4 text-red-500 inline" aria-label="love" /> by{" "}
            <span className="text-primary font-medium">{personalInfo.name}</span>
          </motion.p>

          {/* Copyright & Tech Stack */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} All rights reserved.</p>
            <p className="text-xs text-muted-foreground/60 font-mono">Built with Next.js, TypeScript & TailwindCSS</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
