'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Database, Code2, LayoutTemplate, Settings2, BookOpen } from 'lucide-react';

interface SkillCategory {
  category: string;
  list: string[];
}

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  // Map categories to appropriate icons and style glows
  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai/ml':
        return {
          icon: BrainCircuit,
          glow: 'group-hover:shadow-[0_0_25px_rgba(127,13,242,0.15)] group-hover:border-primary/30',
          badge: 'bg-primary/10 text-primary border-primary/20',
        };
      case 'data science tools':
        return {
          icon: Database,
          glow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group-hover:border-cyan-500/30',
          badge: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
        };
      case 'programming languages':
        return {
          icon: Code2,
          glow: 'group-hover:shadow-[0_0_25px_rgba(236,72,153,0.15)] group-hover:border-rose-500/30',
          badge: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        };
      case 'frameworks':
        return {
          icon: LayoutTemplate,
          glow: 'group-hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] group-hover:border-indigo-500/30',
          badge: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
        };
      case 'tools & platforms':
        return {
          icon: Settings2,
          glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] group-hover:border-amber-500/30',
          badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        };
      default:
        return {
          icon: BookOpen,
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/30',
          badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  } as const;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Glow blobs */}
      <div className="absolute top-[20%] left-[5%] w-[25vw] h-[25vw] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[20%] right-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none glow-blob [animation-delay:5s]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technical{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500">
              Expertise
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid of Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((category, idx) => {
            const theme = getCategoryTheme(category.category);
            const Icon = theme.icon;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`group glass glass-card p-6 rounded-2xl border border-white/40 dark:border-white/5 flex flex-col gap-5 ${theme.glow}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${theme.badge}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.list.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 transition-all hover:border-primary/40 hover:text-primary dark:hover:text-primary transform hover:scale-[1.03] duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
