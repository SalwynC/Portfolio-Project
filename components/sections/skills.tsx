"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { skills } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Layers, Wrench, Lightbulb, ChevronRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const skillCategories = [
  { key: "languages" as const, label: "Languages", icon: Code2, color: "from-blue-500/20 to-cyan-500/20" },
  {
    key: "frameworks" as const,
    label: "Frameworks & Libraries",
    icon: Layers,
    color: "from-green-500/20 to-emerald-500/20",
  },
  { key: "tools" as const, label: "Tools & Platforms", icon: Wrench, color: "from-orange-500/20 to-amber-500/20" },
  { key: "concepts" as const, label: "Concepts", icon: Lightbulb, color: "from-purple-500/20 to-pink-500/20" },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const codeLines = [
    (
      <span key="line-1" className="text-muted-foreground">
        <span className="text-primary">const</span> developer = {"{"}
      </span>
    ),
    (
      <span key="line-2" className="text-muted-foreground ml-4">
        name: <span className="text-green-400">"Salwyn Christopher"</span>,
      </span>
    ),
    (
      <span key="line-3" className="text-muted-foreground ml-4">
        skills: [<span className="text-yellow-400">"TypeScript"</span>, <span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"Node.js"</span>, ...],
      </span>
    ),
    (
      <span key="line-4" className="text-muted-foreground ml-4">
        passion: <span className="text-green-400">"Building great software"</span>,
      </span>
    ),
    (
      <span key="line-5" className="text-muted-foreground ml-4">
        available: <span className="text-blue-400">true</span>
      </span>
    ),
    (
      <span key="line-6" className="text-muted-foreground">{"}"};</span>
    ),
  ]
  const [visibleLines, setVisibleLines] = useState<number>(prefersReducedMotion ? codeLines.length : 0)

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!isInView) return
    if (visibleLines >= codeLines.length) return
    const t = setTimeout(() => setVisibleLines(v => Math.min(v + 1, codeLines.length)), 160)
    return () => clearTimeout(t)
  }, [prefersReducedMotion, isInView, visibleLines])

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-muted/30" aria-labelledby="skills-heading">
      <div className="w-full max-w-6xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="04" title="Skills & Technologies" centered />

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 sm:mb-12 text-center"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated collection of technologies I've worked with. Hover over any skill to learn more about my
              experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
              >
                <Card className="h-full bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                  <div className={cn("h-1 bg-gradient-to-r", category.color)} />
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      {category.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {skills[category.key].map((skill, index) => (
                        <motion.li
                          key={skill}
                          initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.2,
                            delay: categoryIndex * 0.1 + index * 0.05,
                          }}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={cn(
                            "flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-all cursor-default",
                            hoveredSkill === skill
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 transition-transform",
                              hoveredSkill === skill ? "translate-x-1 text-primary" : "",
                            )}
                          />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 p-4 rounded-lg bg-card border border-border font-mono text-sm overflow-x-auto"
          >
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs">skills.ts</span>
            </div>
            <code className="text-muted-foreground">
              {codeLines.slice(0, visibleLines).map((line, i) => (
                <motion.div key={`code-line-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-6">
                  {line}
                </motion.div>
              ))}
              {visibleLines < codeLines.length && (
                <span className="inline-block w-[6px] h-4 bg-primary ml-1 align-baseline animate-blink shadow-[0_0_10px_rgba(0,169,146,0.6)]" />
              )}
            </code>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
