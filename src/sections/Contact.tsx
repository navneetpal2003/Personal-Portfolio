'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactProps {
  email: string;
  phone: string;
}

export default function Contact({ email, phone }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('Name, email, and message are required.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset status after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg('Failed to send message.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] bg-primary/8 rounded-full blur-[90px] pointer-events-none glow-blob [animation-delay:3s]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Get in{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Touch
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start"
        >
          {/* Info Side Card */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass p-6 rounded-2xl border border-white/55 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-slate-900 font-display">Contact Information</h3>
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors break-all"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Phone</p>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Location</p>
                    <p className="text-sm font-semibold text-slate-800">
                      Meerut, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side Card */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
              className="glass p-6 md:p-8 rounded-3xl border border-white/55 flex flex-col gap-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md focus:bg-white/30 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold text-slate-800 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] placeholder-slate-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md focus:bg-white/30 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold text-slate-800 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] placeholder-slate-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="px-4 py-2.5 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md focus:bg-white/30 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold text-slate-800 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] placeholder-slate-400"
                  placeholder="Subject of message"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md focus:bg-white/30 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold text-slate-800 resize-none shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] placeholder-slate-400"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(127,13,242,0.2)] hover:shadow-[0_8px_25px_rgba(127,13,242,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Your message has been sent successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 text-rose-500 font-bold text-sm bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
