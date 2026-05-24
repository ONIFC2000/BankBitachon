/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Network } from 'lucide-react';
import { LogoCloud } from '@/components/ui/logo-cloud-2';

export default function LogoCloudSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-full text-xs font-bold tracking-wider uppercase font-display">
            <Network className="w-3.5 h-3.5" />
            Trusted Payment Network
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-snug">
            Financial partners that keep money <span className="text-gold-400">moving</span>.
          </h2>
          <p className="text-slate-400 text-sm">
            Bank Bitachon connects card networks, digital wallets, money movement, wealth access, and digital asset rails into one secure member experience.
          </p>
        </div>

        <LogoCloud />
      </div>
    </section>
  );
}
