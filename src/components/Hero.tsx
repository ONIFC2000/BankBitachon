/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  BadgePercent, 
  Lock,
} from 'lucide-react';

interface HeroProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenSelfLogin: () => void;
  onOpenCreateAccount: () => void;
}

export default function Hero({ 
  onNavigateToSection, 
  onOpenSelfLogin,
  onOpenCreateAccount
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto scroll rate slides
  const marketingSlides = [
    {
      title: "Grow your savings with 4.85% APY.",
      subtitle: "Save more with Bank Bitachon",
      description: "Put your money in a safe savings account and let it grow. There are no fees, no minimum balance, and you can take money out when you need it.",
      highlights: ["NCUA Insured to $250k", "No Minimum Balance", "Grows Every Month"],
      ctaText: "Open High-Yield Savings",
      targetId: "rates",
      badge: "Best Savings Rate",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Get a car loan with a low rate.",
      subtitle: "Drive with confidence",
      description: "Buy a car or lower your current car payment. Check your rate in 3 minutes. It will not hurt your credit score.",
      highlights: ["No Payments for 90 Days", "Up to 84-Month Terms", "Easy to Switch Loans"],
      ctaText: "Calculate Auto Savings",
      targetId: "calcs",
      badge: "Save on Your Car",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Help your business money grow.",
      subtitle: "Simple banking for your business",
      description: "Keep your business money safe and easy to use. This is made for small businesses, new companies, and shops.",
      highlights: ["Free Business Transfers", "Your Own Banking Advisor", "Safe and Protected"],
      ctaText: "Explore Business Services",
      targetId: "auth-register",
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

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 py-12 sm:py-16 lg:py-20">
      <AnimatePresence mode="wait">
        <motion.img
          key={marketingSlides[activeSlide].image}
          src={marketingSlides[activeSlide].image}
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.42, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-slate-950/66" />
      <div className="absolute inset-0 bg-grid-pattern opacity-35" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          <div className="col-span-1 lg:col-span-8 select-none">
            <div className="min-h-0 max-w-3xl py-6 lg:py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 ring-1 ring-gold-400/30 rounded-full text-xs font-semibold tracking-wider uppercase font-display">
                    <BadgePercent className="w-4 h-4" />
                    {marketingSlides[activeSlide].badge}
                  </span>

                  <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                    {marketingSlides[activeSlide].title}
                  </h1>

                  <h3 className="text-lg font-bold text-gold-300">
                    {marketingSlides[activeSlide].subtitle}
                  </h3>

                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    {marketingSlides[activeSlide].description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pt-4">
                    <button
                      onClick={() => {
                        if (marketingSlides[activeSlide].targetId === 'auth-register') {
                          onOpenCreateAccount();
                          return;
                        }
                        onNavigateToSection(marketingSlides[activeSlide].targetId);
                      }}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm tracking-wide px-6 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-primary-500/15 cursor-pointer"
                    >
                      <span>{marketingSlides[activeSlide].ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={onOpenSelfLogin}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-5 text-sm font-bold text-slate-200 hover:border-gold-400 hover:text-white"
                    >
                      <Lock className="h-4 w-4 text-gold-400" />
                      <span>Sign in</span>
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

        </div>
      </div>
    </section>
  );
}
