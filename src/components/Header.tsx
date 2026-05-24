'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Terminal, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple scrollspy to highlight active link
      const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`glass px-6 py-3 rounded-full flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'shadow-[0_8px_32px_0_rgba(127,13,242,0.06)] border-white/40 dark:border-white/10'
              : 'border-white/20 dark:border-white/5'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(127,13,242,0.4)] transition-all group-hover:scale-105">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-cyan-500">
              NavNeet.ai
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary relative px-4 py-1.5 rounded-full ${
                  activeSection === link.href.substring(1)
                    ? 'text-primary'
                    : 'text-slate-700'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </a>
            ))}
          </div>

 
          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 border border-slate-200/50 bg-white/30 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 z-40 glass rounded-2xl p-5 border-white/40 dark:border-white/10 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-2 px-3 rounded-xl hover:bg-primary/5 hover:text-primary ${
                    activeSection === link.href.substring(1) ? 'text-primary bg-primary/5' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </a>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
