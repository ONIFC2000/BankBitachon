/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  PiggyBank, 
  Home, 
  CreditCard, 
  Briefcase, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  BarChart, 
  Sparkles,
  Zap
} from 'lucide-react';

interface BentoFeaturesProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenSelfLogin: () => void;
}

export default function BentoFeatures({ onNavigateToSection, onOpenSelfLogin }: BentoFeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <section id="bento-features" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Curved Visual Cut Section */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-slate-950/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Tag Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold tracking-wider uppercase font-display">
            <Sparkles className="w-3.5 h-3.5" />
            Class-Leading Financial Design
          </span>
          <h2 className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-900 tracking-tight leading-[1.1]">
            Why smart money chooses <span className="bg-gradient-to-r from-primary-700 to-gold-600 bg-clip-text text-transparent">Bank Bitachon</span>
          </h2>
          <p className="text-slate-600 text-base">
            We combined the member-centric rates of a traditional credit union with the state-of-the-art security armor of a multi-tiered cryptographic vault.
          </p>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* Card 1: Main High Yield Savings Promotion (Huge Width 8/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
          >
            {/* Background texture helper */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-50 rounded-full filter blur-3xl pointer-events-none -mr-16 -mb-16 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex-1 space-y-4 relative z-10 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" /> High APY Active
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  Dual-Action High Yield Compound Savings
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Earn a secure, guaranteed <strong>4.85% APY</strong> without freezing your funds, worrying about withdrawal thresholds, or fighting hidden subscription fees.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> NCUA Insured</li>
                  <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Daily Interest Comp</li>
                  <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Direct Deposit Boost</li>
                  <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Instant Lock Support</li>
                </ul>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => onNavigateToSection('rates')}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Lock in your 4.85% APY</span>
                  <ChevronRight className="w-4 h-4 text-gold-400 font-bold" />
                </button>
              </div>
            </div>

            {/* Content Image representing smiling professional human */}
            <div className="w-full md:w-56 h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden relative shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Smiling professional happy Bitachon partner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-gold-400 text-[10px] font-mono font-bold px-2 py-1 rounded">
                Rebecca G. &middot; Baker
              </div>
            </div>
          </motion.div>

          {/* Card 2: 3.99% Auto Loan Promotion (Small Width 4/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
          >
            <div className="space-y-4">
              <div className="p-3 bg-gold-200/20 text-gold-600 rounded-xl w-fit">
                <BarChart className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate Refinance Promos</div>
                <h3 className="font-display font-black text-xl text-slate-900 tracking-tight leading-snug">
                  Unbeatable 3.99% APR Auto Loans
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Save an average of $94/month when migrating your active auto lending from high-rate dealer financing to pre-qualified Bitachon reserves.
              </p>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => onNavigateToSection('calcs')}
                className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 hover:underline cursor-pointer"
              >
                Estimate Loans <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                APR: 3.99%
              </span>
            </div>
          </motion.div>

          {/* Card 3: Home Loans Mortgages (Small Width 4/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
          >
            <div className="space-y-4">
              <div className="p-3 bg-primary-50 text-primary-700 rounded-xl w-fit">
                <Home className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fixed Security Promise</div>
                <h3 className="font-display font-black text-xl text-slate-900 tracking-tight leading-snug">
                  Low-Cost Home Mortgages
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unlock specialized first-time homeowner assistance, quick lock-in rates, and zero commission broker fees.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => onNavigateToSection('calcs')}
                className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 hover:underline cursor-pointer"
              >
                Mortgage Help <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-400">Fixed rate</span>
            </div>
          </motion.div>

          {/* Card 4: Business Commercial Advisory (Huge Width 8/12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
          >
            {/* Background glowing effects */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="w-full md:w-56 h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden relative shadow-md order-last md:order-first">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
                alt="Confident small business customer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-gold-400 text-[10px] font-mono font-bold px-2 py-1 rounded">
                Marcus V. &middot; Engineer
              </div>
            </div>

            <div className="flex-1 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gold-450/10 text-gold-400 border border-gold-400/20 rounded-full text-[9px] font-bold uppercase tracking-wider font-display">
                  <Briefcase className="w-3.5 h-3.5" /> High-Cap Merchant Advising
                </span>
                <h3 className="font-display font-black text-2.5xl text-white tracking-tight">
                  Business & Commercial Growth Advising
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Power your small business with high-limit checking, direct SBA loans, automated invoice routing integrations, and merchant accounts with no terminal rental costs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button 
                  onClick={() => onNavigateToSection('business')}
                  className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Schedule Commercial Consulting <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-emerald-400 font-bold">Safe Deposit SBA</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
