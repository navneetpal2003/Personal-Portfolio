'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, Layers } from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import ProjectModal from '@/components/ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  githubUrl: string;
  demoUrl: string;
  tags: string[];
  category: string;
  featured: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamically extract categories from database projects
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90, damping: 15 },
    },
  } as const;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[30%] left-[10%] w-[25vw] h-[25vw] bg-primary/5 rounded-full blur-[90px] pointer-events-none glow-blob [animation-delay:4s]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Projects
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Navigation Tab */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'border-primary text-white bg-primary'
                  : 'border-slate-200/60 dark:border-white/5 bg-white/20 dark:bg-white/5 hover:border-primary/40'
              }`}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                className="group glass glass-card p-6 rounded-2xl border border-white/40 dark:border-white/5 flex flex-col justify-between h-[360px] cursor-pointer clickable relative overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {/* Card category & decoration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-primary/10 text-primary border border-primary/10 rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 dark:text-amber-400">
                        <Layers className="w-3 h-3" />
                        <span>FEATURED</span>
                      </span>
                    )}
                  </div>

                  {/* Title & brief description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Bottom details (tech tags & actions) */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-4">
                    <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View details</span>
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Stop modal from opening
                        className="text-slate-500 hover:text-primary transition-colors cursor-pointer"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4.5 h-4.5" />
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Stop modal from opening
                          className="text-slate-500 hover:text-primary transition-colors cursor-pointer"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project detailed modal overlay */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
}
