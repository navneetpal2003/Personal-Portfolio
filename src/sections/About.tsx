'use client';

import { motion } from 'framer-motion';
import { Award, Brain, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  profile: {
    bio: string;
  };
  achievements: string[];
}

export default function About({ profile, achievements }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  } as const;

  const stats = [
    { label: 'LeetCode Problems', value: '200+', icon: Brain, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'HackerRank (C++ & Python)', value: '4 Star', icon: Award, color: 'text-primary bg-primary/10' },
    { label: 'Total Coding Solved', value: '600+', icon: Sparkles, color: 'text-cyan-500 bg-cyan-500/10' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background lights */}
      <div className="absolute top-[30%] right-[5%] w-[25vw] h-[25vw] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none glow-blob [animation-delay:3s]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Achievements
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Bio Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 glass glass-card p-8 rounded-3xl flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional Journey</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {profile.bio} I love working at the intersection of AI modeling and web systems, implementing production-ready pipelines that bring intelligence to real-world applications.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Throughout my computer science degree, I have continuously challenged myself by participating in coding activities, solving algorithmic problems on platforms like LeetCode and HackerRank, and building projects using state-of-the-art framework systems like Gemini API, LangChain, and Streamlit.
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass glass-card p-6 rounded-2xl flex items-center gap-5"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h4>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Key Achievements Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 glass glass-card p-8 rounded-3xl mt-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Key Achievements & Milestones</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-normal">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
