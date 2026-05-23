/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, PhoneCall, Mail, Globe, Sparkles, Send, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-gold-600/30 pt-16 pb-8 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12 mb-10 text-left">
          
          {/* Logo brand and newsletter section - 4/12 width */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg shadow">
                <Shield className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="font-display font-black text-base text-white tracking-wider leading-none">
                  BANK <span className="text-gold-400">BITACHON</span>
                </div>
                <div className="font-mono text-[8px] tracking-widest text-slate-500 uppercase mt-0.5">
                  Federal Security Registry
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              We deliver premium mutual banking yields, bullet-proof digital security envelopes, and member-centric loans for individuals, builders, and small businesses alike.
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-none">
                Subscribe to Financial Reports
              </div>
              
              {subscribed ? (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/40 rounded-lg text-[10px] text-emerald-400">
                  Welcome to our ledger swap. Reports will be sent quarterly.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email to swap reports"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs py-2.5 pl-3 pr-10 hover:border-slate-700 outline-none text-slate-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 text-gold-400 hover:text-white p-1 cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns - 8/12 width (4 categories of 2/12) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Products Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Deposits
              </h5>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#rates" className="hover:text-white transition-colors">Yield Checking</a></li>
                <li><a href="#rates" className="hover:text-white transition-colors">Compound Savings</a></li>
                <li><a href="#rates" className="hover:text-white transition-colors">High Yield Certificate</a></li>
                <li><a href="#rates" className="hover:text-white transition-colors">Individual IRAs</a></li>
              </ul>
            </div>

            {/* Loans Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Lending Pools
              </h5>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#calcs" className="hover:text-white transition-colors">Home Mortgage</a></li>
                <li><a href="#calcs" className="hover:text-white transition-colors">Auto Refinance Loans</a></li>
                <li><a href="#calcs" className="hover:text-white transition-colors">Consolidation Credit</a></li>
                <li><a href="#calcs" className="hover:text-white transition-colors">Business Capital</a></li>
              </ul>
            </div>

            {/* Help Support Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Support
              </h5>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#faqs" className="hover:text-white transition-colors">Help Center FAQs</a></li>
                <li><a href="#locator" className="hover:text-white transition-colors">ATM ATM Finder</a></li>
                <li><a href="#rates" className="hover:text-white transition-colors">Fee-Free Promises</a></li>
                <li><a href="tel:+18005553224" className="hover:text-white transition-colors">Emergency Hotlines</a></li>
              </ul>
            </div>

            {/* Corporate Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Safeguards
              </h5>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><span className="text-slate-500 font-mono">256-Bit TLS 1.3</span></li>
                <li><span className="text-slate-500 font-mono">MFA Protocol Hub</span></li>
                <li><span className="text-slate-500 font-mono">Mutual Charters</span></li>
                <li><span className="text-slate-300 font-mono block text-[10px] bg-emerald-900/40 border border-emerald-900/30 px-1.5 py-0.5 rounded text-center">NCUA INSURED</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Regulatory notices and copyright */}
        <div className="text-slate-500 text-[10px] text-left space-y-4 pt-4 border-t border-slate-900">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                1-800-555-BITACHON
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-primary-500" />
                vault@bankbitachon.com
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="border border-slate-800 px-2 py-1 rounded font-bold font-mono text-[9px]">LENDER EQUAL HOUSING</span>
              <span className="border border-slate-800 px-2 py-1 rounded font-bold font-mono text-[9px]">NCUA CERTIFIED #89012</span>
            </div>
          </div>

          <p className="leading-relaxed text-slate-600">
            &copy; 2026 Bank Bitachon Secure Registry Mutual Cooperatives. All rights reserved. Deposits are federally insured to at least $250,050 and backed by the full confidence of the National Credit Union Share Insurance Fund. Equal Housing Opportunity Lender. Credit approvals depend on financial verification parameters. Instant switch tools rely on automated routing networks and employer salary schedules.
          </p>
        </div>

      </div>
    </footer>
  );
}
