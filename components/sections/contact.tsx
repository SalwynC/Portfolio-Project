"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Mail, MapPin, Loader2, CheckCircle2, Terminal, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { personalInfo } from "@/lib/data"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return !value.trim() ? "Name is required" : undefined
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email"
        return undefined
      case "subject":
        return !value.trim() ? "Subject is required" : undefined
      case "message":
        if (!value.trim()) return "Message is required"
        if (value.trim().length < 10) return "Message must be at least 10 characters"
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key as keyof FormErrors] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Using Web3Forms API to send email
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // You need to get this from web3forms.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTouched({})
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-muted/30" aria-labelledby="contact-heading">
      <div className="w-full max-w-4xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="06" title="Get In Touch" centered />

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed"
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my
            best to get back to you!
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-12"
          >
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Terminal-style info card */}
              <div className="p-4 rounded-lg bg-card border border-border dark:border-border/60 overflow-hidden">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border dark:border-border/60">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground">contact.sh</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> cat contact_info.txt
                  </p>
                  <div className="pl-4 space-y-1 text-muted-foreground dark:text-muted-foreground">
                    <p>
                      <span className="text-primary">email:</span> {personalInfo.email}
                    </p>
                    <p>
                      <span className="text-primary">location:</span> {personalInfo.location}
                    </p>
                    <p>
                      <span className="text-primary">status:</span>{" "}
                      <span className="text-green-500">available for hire</span>
                    </p>
                  </div>
                </div>
              </div>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="flex items-start gap-4 group p-4 rounded-lg bg-card border border-border dark:border-border/60 hover:border-primary/30 dark:hover:border-primary/40 transition-colors"
                whileHover={prefersReducedMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                    {personalInfo.email}
                  </p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border dark:border-border/60"
                whileHover={prefersReducedMotion ? {} : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-foreground">Location</h3>
                  <p className="text-muted-foreground text-sm">{personalInfo.location}</p>
                </div>
              </motion.div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                  { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                ].filter(social => social.href).map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-card border border-border dark:border-border/60 text-muted-foreground hover:text-primary hover:border-primary/30 dark:hover:border-primary/40 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              {isSubmitted ? (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-primary/30 dark:border-primary/40 rounded-xl p-8 text-center"
                >
                  <motion.div
                    className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">Thank you for reaching out. I'll get back to you soon!</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-primary/30 dark:border-primary/40 dark:hover:bg-primary/20"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <div className="bg-card border border-border dark:border-border/60 rounded-xl overflow-hidden">
                  {/* Form header */}
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border dark:border-border/60 bg-muted/50 dark:bg-muted/20">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">new_message.form</span>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                          className={`bg-background dark:bg-card border-border dark:border-border/60 focus:border-primary dark:focus:border-primary ${errors.name && touched.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          aria-invalid={errors.name && touched.name ? "true" : "false"}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && touched.name && (
                          <p id="name-error" className="text-xs text-destructive" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                          className={`bg-background dark:bg-card border-border dark:border-border/60 focus:border-primary dark:focus:border-primary ${errors.email && touched.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          aria-invalid={errors.email && touched.email ? "true" : "false"}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && touched.email && (
                          <p id="email-error" className="text-xs text-destructive" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="What's this about?"
                        className={`bg-background dark:bg-card border-border dark:border-border/60 focus:border-primary dark:focus:border-primary ${errors.subject && touched.subject ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-invalid={errors.subject && touched.subject ? "true" : "false"}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      />
                      {errors.subject && touched.subject && (
                        <p id="subject-error" className="text-xs text-destructive" role="alert">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your message..."
                        rows={5}
                        className={`bg-background dark:bg-card border-border dark:border-border/60 focus:border-primary dark:focus:border-primary resize-none ${errors.message && touched.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-invalid={errors.message && touched.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && touched.message && (
                        <p id="message-error" className="text-xs text-destructive" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full gap-2 glow-primary-sm" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
