'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Code, Award, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'Education' | 'Experience' | 'Freelance' | 'Research' | 'Internship';
}

interface TimelineProps {
  experience: ExperienceItem[];
}

export default function Timeline({ experience }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const scaleY = useSpring(scrollYProgress, { damping: 25, stiffness: 120 });

  const getTimelineIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'education':
        return GraduationCap;
      case 'experience':
      case 'internship':
      case 'freelance':
        return Code;
      default:
        return Award;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.96 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  } as const;

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background lights */}
      <div className="absolute top-[40%] right-[10%] w-[25vw] h-[25vw] bg-primary/8 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] bg-indigo-500/8 rounded-full blur-[110px] pointer-events-none glow-blob [animation-delay:2s]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Developer{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Roadmap
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline body */}
        <div ref={containerRef} className="relative ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {/* Static track line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200/80" />
          
          {/* Animated active path line */}
          <motion.div 
            style={{ scaleY }} 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-indigo-500 origin-top" 
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {experience.map((item) => {
              const Icon = getTimelineIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative group mb-12 last:mb-0"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 150, delay: 0.15 }}
                    className="absolute -left-[53px] md:-left-[61px] top-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-slate-700 group-hover:border-primary group-hover:text-primary transition-all duration-300 shadow-md z-10"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Card content */}
                  <div className="glass glass-card p-6 md:p-8 rounded-2xl relative border border-white/55 transition-all group-hover:shadow-[0_8px_30px_rgba(127,13,242,0.06)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider mb-2">
                          {item.type}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {item.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm font-bold shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{item.period}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-base font-bold text-slate-800 mb-3">
                      {item.company}
                    </h4>
                    
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed font-semibold">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
