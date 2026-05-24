'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // Success: redirect to dashboard
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Invalid administrator password.');
      }
    } catch {
      setError('Network connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-6 bg-[#fbfaff] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none glow-blob" />
      <div className="absolute bottom-[20%] right-[20%] w-[25vw] h-[25vw] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none glow-blob [animation-delay:4s]" />

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' as const, damping: 20, stiffness: 200 }}
        className="w-full max-w-md glass p-8 rounded-3xl border border-white/60 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Admin Authentication</h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Enter password to open CMS
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-3 rounded-xl border border-slate-200 bg-white/60 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary transition-all text-sm font-medium text-slate-900"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              className="text-rose-500 font-semibold text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(127,13,242,0.2)] transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
