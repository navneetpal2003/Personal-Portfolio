'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code } from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass p-6 md:p-8 rounded-3xl border border-white/40 shadow-2xl flex flex-col gap-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-200/40 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-200/60 transition-all cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="flex flex-col gap-2.5 pr-8">
              <span className="px-3 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/20 rounded-full w-fit uppercase tracking-widest font-mono">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight font-display">
                {project.title}
              </h3>
            </div>

            {/* Simulated Screenshot / Interactive Graphic */}
            <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/10 via-indigo-500/10 to-cyan-500/10 border border-white/40 overflow-hidden flex items-center justify-center p-4">
              {/* Fallback mock visualization using SVGs and CSS */}
              <div className="w-full h-full flex flex-col justify-between p-4 bg-white/40 rounded-xl backdrop-blur-sm border border-white/40 relative overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 border-b border-slate-200/40 pb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="text-[10px] text-slate-600 ml-2 font-mono truncate max-w-[60%]">
                    {project.id}.app
                  </div>
                </div>

                {/* Simulated neural nodes graphic */}
                <div className="flex-1 flex items-center justify-center relative">
                  <Code className="w-12 h-12 text-primary opacity-20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="w-36 h-36 border border-dotted border-cyan-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
                  </div>
                </div>

                {/* Footer status */}
                <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono">
                  <span>Status: Operational</span>
                  <span>Stack: {project.tags.slice(0, 3).join(' | ')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                Project Overview
              </h4>
              <p className="text-slate-800 leading-relaxed font-semibold text-sm md:text-base">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100/80 text-slate-800 border border-slate-200/60 font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links CTA */}
            <div className="flex flex-wrap gap-4 border-t border-slate-200/60 pt-6 mt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-950 text-white font-semibold flex items-center gap-2 shadow-sm transition-all clickable text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold flex items-center gap-2 shadow-[0_4px_12px_rgba(127,13,242,0.2)] hover:shadow-[0_6px_18px_rgba(127,13,242,0.3)] transition-all transform hover:-translate-y-0.5 clickable text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demonstration</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
