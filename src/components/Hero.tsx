/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  BadgePercent, 
  Briefcase,
  Lock,
  PiggyBank,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

interface HeroProps {
  onLoginSuccess: (userName: string, metadata?: any) => void;
  onNavigateToSection: (sectionId: string) => void;
  isLoggedIn: boolean;
  onOpenSelfLogin: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ 
  onLoginSuccess, 
  onNavigateToSection, 
  isLoggedIn,
  onOpenSelfLogin,
  setActiveTab
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto scroll rate slides
  const marketingSlides = [
    {
      title: "Earn 4.85% APY on your savings.",
      subtitle: "High-Yield Savings with Bank Bitachon",
      description: "Put your money in our savings account and watch it grow. You earn 10x more than most banks. No fees. No minimum balance. Take your money out whenever you need it.",
      highlights: ["NCUA Insured to $250k", "No Minimum Balance", "Grows Every Month"],
      ctaText: "Open High-Yield Savings",
      targetId: "rates",
      badge: "Best Savings Rate",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Get a car loan at just 3.99% APR.",
      subtitle: "Drive with Confidence",
      description: "Buy a new car or lower your current car payments. Check your rate in 3 minutes. It will not hurt your credit score.",
      highlights: ["No Payments for 90 Days", "Up to 84-Month Terms", "Easy to Switch Loans"],
      ctaText: "Calculate Auto Savings",
      targetId: "calcs",
      badge: "Save on Your Car",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Your business earns 5.12% APY.",
      subtitle: "Business Banking Made Simple",
      description: "Keep your business money safe and watch it grow. Made for small businesses, startups, and shops. Your money is protected and always easy to access.",
      highlights: ["Free Business Transfers", "Your Own Banking Advisor", "Safe and Protected"],
      ctaText: "Explore Business Services",
      targetId: "bento-features",
      badge: "Business Banking",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % marketingSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [marketingSlides.length]);

  const handleHeroLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setLoginError('Please enter your username.');
      return;
    }
    if (password.length < 4) {
      setLoginError('Password must be at least 4 characters.');
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');

    try {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        const email = username.includes('@') ? username : `${username.toLowerCase().trim()}@bankbitachon.com`;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setLoginError(error.message);
          setIsSubmitting(false);
          return;
        }
        const meta = data.user?.user_metadata;
        const loggedName = meta?.full_name || email.split('@')[0];
        onLoginSuccess(loggedName.charAt(0).toUpperCase() + loggedName.slice(1), meta);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
        onLoginSuccess(formattedName);
      }
      setIsSubmitting(false);
      setActiveTab('dashboard');
    } catch (err: any) {
      setLoginError(err?.message || 'Something went wrong. Try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="relative bg-slate-950 pb-12 pt-4 sm:pb-16 sm:pt-6 overflow-hidden bg-grid-pattern">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-700/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gold-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Panel: Carousel Slider of Rates */}
          <div className="col-span-1 lg:col-span-7 select-none">
            <div className="min-h-0 lg:min-h-[460px] flex flex-col justify-center py-8 lg:py-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 ring-1 ring-gold-400/30 rounded-full text-xs font-semibold tracking-wider uppercase font-display">
                    <BadgePercent className="w-4 h-4" />
                    {marketingSlides[activeSlide].badge}
                  </span>

                  {/* Main Header Tag */}
                  <h1 className="font-display font-extrabold text-3xl sm:text-4.5xl md:text-5xl text-white tracking-tight leading-[1.1]">
                    {marketingSlides[activeSlide].title.split('.').map((part, index) => {
                      if (index === 0 && part) {
                        return <span key={index} className="block">{part}.</span>;
                      }
                      return <span key={index} className="text-gold-400 block mt-1">{part}</span>;
                    })}
                  </h1>

                  {/* Subtitle */}
                  <h3 className="text-lg font-bold text-slate-300 font-sans tracking-wide">
                    {marketingSlides[activeSlide].subtitle}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    {marketingSlides[activeSlide].description}
                  </p>

                  {/* Bullet Achievements */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {marketingSlides[activeSlide].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/40">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="font-semibold tracking-wide">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pt-4">
                    <button
                      onClick={() => onNavigateToSection(marketingSlides[activeSlide].targetId)}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm tracking-wide px-6 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-primary-500/15 cursor-pointer"
                    >
                      <span>{marketingSlides[activeSlide].ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onNavigateToSection('rates')}
                      className="inline-flex min-h-11 items-center justify-center gap-1 text-sm font-semibold text-slate-300 hover:text-white hover:underline uppercase tracking-wider py-2"
                    >
                      <span>See Comparative Yields</span>
                      <ChevronRight className="w-4 h-4 text-gold-400" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex items-center gap-1.5 mt-8 -ml-2">
                {marketingSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveSlide(dotIdx)}
                    className={`min-h-11 min-w-11 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === dotIdx ? 'text-gold-400' : 'text-slate-700 hover:text-slate-500'
                    }`}
                    aria-label={`Slide ${dotIdx + 1}`}
                  >
                    <span className={`h-2.5 rounded-full transition-all duration-300 ${activeSlide === dotIdx ? 'w-8 bg-gold-400' : 'w-2.5 bg-current'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:hidden">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900 p-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-gold-400/10 p-3 text-gold-400">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-black text-white">Secure banking access</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    Sign in or create an account when you are ready. Your session is protected with encrypted access.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                <button
                  onClick={onOpenSelfLogin}
                  className="min-h-12 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-lg"
                >
                  Secure Login
                </button>
                <button
                  onClick={() => onNavigateToSection('calcs')}
                  className="min-h-12 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200"
                >
                  Run Numbers
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Secure Portal Login Card & Floating Human Artwork */}
          <div className="hidden lg:block col-span-1 lg:col-span-5 relative mt-6 lg:mt-0" id="hero-portal-panel">
            
            {/* Login Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Card Header Security Banner */}
              <div className="bg-slate-950 px-4 sm:px-6 py-4.5 border-b border-gold-600/30 flex justify-between items-center gap-3 bg-radial-gradient">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gold-400/10 rounded-md">
                    <ShieldCheck className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                      Secure Bitachon Portal
                    </h3>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                      Encrypted session active
                    </p>
                  </div>
                </div>
                
                <span className="font-mono text-[9px] text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800 tracking-wider">
                  MFA-READY
                </span>
              </div>

              {/* Login States */}
              <div className="p-4 sm:p-8 space-y-6">
                {isLoggedIn ? (
                  <div className="space-y-5 text-center py-6">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-black text-lg text-white">You're signed in!</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Welcome back. Go to your dashboard to check your accounts.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-550 text-slate-950 font-extrabold text-sm py-3 rounded-lg shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      Go to Account Dashboard
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroLogin} className="space-y-4">
                    {loginError && (
                      <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-lg flex items-start gap-2 text-xs text-red-300">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        Username
                      </label>
                      <div className="relative">
                        <input 
                          type="text"
                          required
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setLoginError('');
                          }}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 rounded-lg py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                          Password
                        </label>
                      </div>
                      <input 
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setLoginError('');
                        }}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 rounded-lg py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-550 text-slate-950 font-extrabold text-sm py-3.5 rounded-lg tracking-wide shadow-lg active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Signing you in...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 fill-slate-950" />
                          <span>Log In</span>
                        </>
                      )}
                    </button>

                    <div className="pt-4 border-t border-slate-800/80">
                      <p className="text-[10px] text-slate-600 text-center">
                        New here? <button type="button" onClick={onOpenSelfLogin} className="min-h-11 px-2 text-slate-400 hover:text-white underline">Create an account</button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Float Badge below: FDIC/NCUA assurance */}
            <div className="mt-4 flex justify-between items-center text-slate-500 text-[10px] font-sans px-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Federal Reserve Guard
              </span>
              <span>NCUA insured to $250,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Human Image banner strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 lg:mt-16 border-t border-slate-900 pt-8 sm:pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="space-y-1">
            <div className="font-display font-black text-2.5xl text-gold-400">4.85% <span className="text-xs">APY</span></div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Savings accounts</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-2.5xl text-gold-400">3.99% <span className="text-xs">APR</span></div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auto vehicle refinance</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-2.5xl text-gold-400">$0 <span className="text-xs">FEES</span></div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly maintenance</div>
          </div>
          <div className="space-y-1">
            <div className="font-display font-black text-2.5xl text-gold-400">100% <span className="text-xs">SAFE</span></div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">MFA protected portal</div>
          </div>
        </div>
      </div>
    </section>
  );
}
