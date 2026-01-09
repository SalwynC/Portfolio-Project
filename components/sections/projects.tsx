"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { projects, categories } from "@/lib/data"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SortOption = "featured" | "name" | "category"

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const prefersReducedMotion = useReducedMotion()

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)),
      )
    }

    if (activeCategory !== "All") {
      result = result.filter((project) => project.category === activeCategory)
    }

    switch (sortBy) {
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category))
        break
    }

    return result
  }, [searchQuery, activeCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategory("All")
    setSortBy("featured")
  }

  const hasActiveFilters = searchQuery || activeCategory !== "All" || sortBy !== "featured"
  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8" aria-labelledby="projects-heading">
      <div className="w-full max-w-6xl mx-auto">
        <div ref={ref}>
          <SectionHeader number="03" title="Things I've Built" />

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              A collection of projects I've worked on, ranging from full-stack web applications to AI/ML experiments and
              mobile apps. Each project represents a unique challenge and learning opportunity.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border focus:border-primary"
                    aria-label="Search projects"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[160px] bg-card">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-primary" />
                        Featured First
                      </span>
                    </SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category filters */}
              <div className="flex gap-2 flex-wrap items-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "transition-all",
                      activeCategory === category
                        ? "glow-primary-sm"
                        : "bg-transparent hover:bg-primary/10 border-border hover:border-primary/30",
                    )}
                  >
                    {category}
                    {category === "All" && <span className="ml-1.5 text-xs opacity-60">({projects.length})</span>}
                  </Button>
                ))}

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
                {featuredCount > 0 && !hasActiveFilters && (
                  <span className="ml-2 text-primary">({featuredCount} featured)</span>
                )}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters} className="bg-transparent">
                  Clear filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
