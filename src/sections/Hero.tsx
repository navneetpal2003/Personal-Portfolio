'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ArrowRight, Mail } from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
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

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Dynamically import ThreeDBackground with SSR disabled to prevent server-side WebGL errors
const ThreeDBackground = dynamic(() => import('@/components/ThreeDBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent -z-10" />,
});

interface HeroProps {
  profile: {
    name: string;
    title: string;
    bio: string;
    resumeUrl: string;
    github: string;
    linkedin: string;
    email: string;
  };
}

export default function Hero({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const opacityBlob = useTransform(scrollYProgress, [0, 0.85], [0.8, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.75], [1, 0.94]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* 3D background blob with scroll parallax */}
      <motion.div
        style={{ y: yBlob, opacity: opacityBlob }}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
      >
        <ThreeDBackground />
      </motion.div>

      {/* Decorative background lights */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-cyan-400/8 rounded-full blur-[120px] pointer-events-none glow-blob [animation-delay:4s]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          style={{ y: yText, opacity: opacityText, scale: scaleText }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-800">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl text-slate-900 leading-[1.1]"
          >
            Architecting{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-cyan-500">
              Intelligence
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl font-bold text-slate-800"
          >
            {profile.name} — {profile.title}
          </motion.h2>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-700 max-w-2xl leading-relaxed font-medium"
          >
            {profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(127,13,242,0.2)] hover:shadow-[0_8px_25px_rgba(127,13,242,0.3)] transition-all transform hover:-translate-y-0.5 clickable"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={profile.resumeUrl}
              download
              className="px-6 py-3.5 rounded-full glass-button text-slate-800 font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 clickable"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-8"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
