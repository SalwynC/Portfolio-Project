"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Star, X, Code2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  github: string
  demo?: string
  featured: boolean
}

export function ProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <Card
        className="group h-full overflow-hidden bg-card dark:bg-card hover:shadow-xl transition-all duration-300 cursor-pointer border border-border dark:border-border/70 hover:border-primary/50 dark:hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary relative"
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsModalOpen(true)
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10">
          <div className="absolute top-0 right-0 w-px h-8 bg-primary/30" />
          <div className="absolute top-0 right-0 h-px w-8 bg-primary/30" />
        </div>

        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          {project.featured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-lg glow-primary-sm">
              <Star className="h-3 w-3" />
              Featured
            </div>
          )}
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-mono">
            {project.category}
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <Code2
              className="h-5 w-5 text-primary shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-mono bg-primary/15 text-primary border border-primary/30 dark:bg-primary/20 dark:text-primary dark:border-primary/40"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs font-mono bg-muted dark:bg-muted/30 text-muted-foreground dark:text-muted-foreground border border-border dark:border-border/60">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-${project.id}-title`}
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-2xl bg-card dark:bg-card rounded-xl shadow-2xl border border-border dark:border-border/70 overflow-hidden"
              initial={prefersReducedMotion ? {} : { scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">
                  {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-auto p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative aspect-video">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 id={`project-${project.id}-title`} className="text-2xl font-bold">
                    {project.title}
                  </h2>
                  <Badge variant="outline" className="shrink-0 border-primary/30 text-primary">
                    {project.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="font-mono bg-primary/10 text-primary border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="gap-2 bg-transparent flex-1 sm:flex-none border-border hover:border-primary/50"
                  >
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                  {project.demo && (
                    <Button asChild className="gap-2 flex-1 sm:flex-none glow-primary-sm">
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
