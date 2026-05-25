/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState<'Accounts' | 'Loans' | 'Security' | 'Digital'>('Accounts');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_DATA[0].id);

  const filteredFaqs = FAQ_DATA.filter(faq => faq.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold uppercase tracking-wider font-display">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Simple answers about accounts, loans, safety, and online banking.
          </p>
        </div>

        {/* Tab Selection menu */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-3xs">
          {(['Accounts', 'Loans', 'Security', 'Digital'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null); // Reset when switching category
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-3xs hover:shadow-2xs transition-all overflow-hidden"
                  >
                    {/* Header trigger button */}
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full flex items-center justify-between text-left p-5 sm:p-6 text-slate-950 font-display font-bold text-sm sm:text-base tracking-tight leading-snug cursor-pointer select-none"
                    >
                      <span className="font-extrabold text-slate-900">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ml-4 flex-shrink-0 ${isExpanded ? 'rotate-180 text-primary-600' : ''}`} />
                    </button>

                    {/* Expandable answers */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4.5 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
