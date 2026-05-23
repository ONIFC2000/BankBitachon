/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RATE_DATA } from '../data';
import { TrendingUp, Sparkles, AlertCircle, Percent, ArrowRight } from 'lucide-react';

export default function RatesComparisons() {
  const [selectedCategory, setSelectedCategory] = useState<'savings' | 'loan' | 'mortgage'>('savings');

  const filteredRates = RATE_DATA.filter(item => item.type === selectedCategory);

  return (
    <section id="rates" className="py-20 bg-slate-950 text-white relative overflow-hidden bg-grid-pattern">
      {/* Decorative colored glow circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-700/10 rounded-full filter blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-450/5 rounded-full filter blur-[100px] pointer-events-none translate-x-1/4" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-full text-xs font-bold uppercase tracking-wider font-display">
              <Percent className="w-3.5 h-3.5" />
              Dynamic Rate Sheet
            </span>
            <h2 className="font-display font-black text-3.5xl sm:text-4xl text-white tracking-tight leading-tight">
              A yield surplus that puts <span className="text-gold-400 text-glow">capital first</span>
            </h2>
            <p className="text-slate-400 text-sm">
              We operate as a mutual credit framework. That means instead of paying expensive Wall Street executive bonuses, we pump surplus margins right back into your interest rates.
            </p>
          </div>

          {/* Quick toggle bar categories */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl self-start md:self-end">
            {(['savings', 'loan', 'mortgage'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-gold-500 text-slate-950 font-black shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'savings' ? 'Deposits' : cat === 'loan' ? 'Consumer' : 'Mortgages'}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison grid layout with animating rating bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Comparison table panel (Right side / Columns 7/12) */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {filteredRates.map((rate) => {
                  const scaleMultiplier = rate.type === 'savings' 
                    ? (rate.bitachonRate / rate.averageRate) 
                    : (rate.averageRate / rate.bitachonRate);
                  
                  const isYieldGood = rate.type === 'savings';
                  
                  return (
                    <div 
                      key={rate.id}
                      className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                      <div className="space-y-1.5 flex-1 max-w-sm">
                        <h4 className="font-display font-black text-lg text-white">
                          {rate.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {rate.label}
                        </p>
                      </div>

                      {/* Visual comparative bars */}
                      <div className="flex-1 space-y-3.5">
                        {/* Bank Bitachon Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-200">Bank Bitachon</span>
                            <span className="font-mono text-emerald-400 font-extrabold text-sm">
                              {rate.bitachonRate}% {rate.type === 'savings' ? 'APY' : 'APR'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-850">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              viewport={{ once: true }}
                              className={`h-full rounded-full bg-gradient-to-r ${isYieldGood ? 'from-emerald-600 to-emerald-400' : 'from-gold-600 to-gold-400'}`}
                            />
                          </div>
                        </div>

                        {/* Traditional Bank Average Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs text-slate-400">
                            <span>National Average Index</span>
                            <span className="font-mono">
                              {rate.averageRate}% {rate.type === 'savings' ? 'APY' : 'APR'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-900">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.max(8, Math.min(92, (rate.averageRate / (rate.bitachonRate + rate.averageRate)) * 100))}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                              className={`h-full rounded-full bg-slate-800`}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Call-to-action Side Panel (Left side / Columns 4/12) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-gold-600/20 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="p-3 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-xl w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display font-black text-xl text-white">
                The Compound Math Advantage
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A balance of $25,000 kept in Bank Bitachon savings earns over $1,212 in guaranteed interest in twelve months, compared to just $110 at typical Wall Street mega institutions.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-850 flex items-start gap-2 text-[10px] text-slate-400">
              <AlertCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Yield average index based on FDIC state findings published May 2026. Rate comparisons do not represent promotional constraints.</span>
            </div>

            <button 
              onClick={() => {
                const element = document.getElementById('calcs');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold text-xs uppercase py-3 rounded-lg shadow-lg hover:shadow-gold-500/10 active:scale-98 transition-all cursor-pointer"
            >
              <span>Simulate Your Yields</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
