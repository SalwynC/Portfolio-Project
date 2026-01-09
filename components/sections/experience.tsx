"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { experience } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Auto-cycle through tabs with delay
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % experience.length)
    }, 5000) // 5 second delay

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="experience" className="py-24 px-6 bg-muted/30" aria-labelledby="experience-heading">
      <div className="max-w-4xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="02" title="Where I've Worked" />

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8"
          >
            {/* Tab List with timeline */}
            <div className="relative">
              <div
                className="flex md:flex-col overflow-x-auto md:overflow-visible"
                role="tablist"
                aria-label="Work experience"
              >
                {experience.map((exp, index) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveTab(index)}
                    role="tab"
                    aria-selected={activeTab === index}
                    aria-controls={`panel-${exp.id}`}
                    id={`tab-${exp.id}`}
                    className={cn(
                      "relative px-4 py-3 text-sm text-left whitespace-nowrap transition-all",
                      "hover:text-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                      "md:pl-8",
                      activeTab === index ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors",
                        activeTab === index ? "bg-primary border-primary" : "bg-background border-muted-foreground/30",
                      )}
                    />
                    {exp.company}
                  </button>
                ))}
              </div>
              <div className="hidden md:block absolute left-[5px] top-3 bottom-3 w-px bg-border" />
            </div>

            {/* Tab Panel */}
            <div className="flex-1 min-h-[300px]">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  role="tabpanel"
                  id={`panel-${exp.id}`}
                  aria-labelledby={`tab-${exp.id}`}
                  hidden={activeTab !== index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeTab === index ? 1 : 0,
                    x: activeTab === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(activeTab !== index && "hidden", "space-y-4")}
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {exp.title}{" "}
                      <Link
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                      >
                        @ {exp.company}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5 shrink-0 font-mono text-sm" aria-hidden="true">
                          {"->"}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
