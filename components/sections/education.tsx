"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react"
import { education } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" aria-labelledby="education-heading">
      <div className="max-w-4xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="04" title="Education" />

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary via-chart-2 to-primary" />
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0 border border-primary/20">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </span>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-sm font-mono text-primary">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border dark:bg-muted/20 dark:border-border">
                      <h4 className="flex items-center gap-2 font-medium mb-3 text-foreground">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <Badge key={course} variant="secondary" className="text-xs bg-background border border-border dark:bg-card dark:border-border dark:text-foreground">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>


                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
