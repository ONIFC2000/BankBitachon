/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, PhoneCall, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-gold-600/30 py-8 sm:pt-16 sm:pb-8 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 border-b border-slate-900 pb-6 md:pb-12 mb-6 md:mb-10 text-left">
          
          {/* Logo brand and newsletter section - 4/12 width */}
          <div className="md:col-span-4 space-y-4 md:space-y-6">
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

            <p className="hidden sm:block max-w-sm text-slate-400 text-xs leading-relaxed">
              We deliver premium mutual banking yields, bullet-proof digital security envelopes, and member-centric loans for individuals, builders, and small businesses alike.
            </p>

            <div className="hidden md:block space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-none">
                Subscribe to Financial Reports
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Quarterly reports, disclosures, and member notices should live on a dedicated resources page before this signup returns.
              </p>
            </div>
          </div>

          {/* Links columns - 8/12 width (4 categories of 2/12) */}
          <div className="hidden md:grid md:col-span-8 grid-cols-4 gap-8">
            
            {/* Products Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Deposits
              </h5>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li>Yield Checking</li>
                <li>Compound Savings</li>
                <li>High Yield Certificate</li>
                <li>Individual IRAs</li>
              </ul>
            </div>

            {/* Loans Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Lending Pools
              </h5>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li>Home Mortgage</li>
                <li>Auto Refinance Loans</li>
                <li>Consolidation Credit</li>
                <li>Business Capital</li>
              </ul>
            </div>

            {/* Help Support Column */}
            <div className="space-y-3.5">
              <h5 className="font-display font-bold text-xs text-gold-400 uppercase tracking-widest">
                Support
              </h5>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li>Help Center FAQs</li>
                <li>ATM Finder</li>
                <li>Fee-Free Promises</li>
                <li><a href="tel:+18005553224" className="text-slate-400 hover:text-white transition-colors">Emergency Hotline</a></li>
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
              </ul>
            </div>

          </div>

        </div>

        {/* Regulatory notices and copyright */}
        <div className="text-slate-500 text-[10px] text-left space-y-4 pt-3 md:pt-4 border-t border-slate-900">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-400">
            <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-2 min-[420px]:gap-4">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                1-800-555-BITACHON
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-primary-500" />
                vault@bankbitachon.com
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-3">
              <span className="border border-slate-800 px-2 py-1 rounded font-bold font-mono text-[9px]">LENDER EQUAL HOUSING</span>
              <span className="border border-slate-800 px-2 py-1 rounded font-bold font-mono text-[9px]">NCUA CERTIFIED #89012</span>
            </div>
          </div>

          <p className="md:hidden leading-relaxed text-slate-600">
            &copy; 2026 Bank Bitachon. Federally insured deposits. Equal Housing Opportunity Lender.
          </p>
          <p className="hidden md:block leading-relaxed text-slate-600">
            &copy; 2026 Bank Bitachon Secure Registry Mutual Cooperatives. All rights reserved. Deposits are federally insured to at least $250,050 and backed by the full confidence of the National Credit Union Share Insurance Fund. Equal Housing Opportunity Lender. Credit approvals depend on financial verification parameters. Instant switch tools rely on automated routing networks and employer salary schedules.
          </p>
        </div>

      </div>
    </footer>
  );
}
