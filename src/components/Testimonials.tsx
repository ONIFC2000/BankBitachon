/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIAL_DATA } from '../data';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIAL_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIAL_DATA.length) % TESTIMONIAL_DATA.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-12 right-0 w-96 h-96 bg-primary-800/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-80 h-80 bg-gold-450/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-full text-xs font-bold uppercase tracking-wider font-display">
            <Sparkles className="w-3.5 h-3.5" />
            Member Confessions
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-tight">
            Confidence spoken by <span className="text-gold-400">real people</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Read how small business owners, home buyers, and families utilize Bank Bitachon daily to protect and amplify their commercial reserves.
          </p>
        </div>

        {/* Testimonials Slider Board */}
        <div className="relative bg-slate-950 p-6 sm:p-12 rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between">
          {/* Big quotes graphic representation */}
          <div className="absolute top-6 right-8 text-slate-800/30 font-serif text-[180px] leading-none pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-1 fill-slate-900/50" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
              >
                {/* Left profile image representation column (Column 4/12) */}
                <div className="md:col-span-4 flex justify-center md:justify-start">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-gold-405 shadow-xl flex-shrink-0">
                    <img 
                      src={TESTIMONIAL_DATA[activeIndex].image}
                      alt={TESTIMONIAL_DATA[activeIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-slate-900/95 backdrop-blur-xs text-[9px] font-mono hover:text-white font-bold px-2 py-0.5 rounded text-gold-400 uppercase tracking-widest leading-normal">
                      {TESTIMONIAL_DATA[activeIndex].category}
                    </div>
                  </div>
                </div>

                {/* Right text feedback representation column (Column 8/12) */}
                <div className="md:col-span-8 space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: TESTIMONIAL_DATA[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  {/* Core Quote */}
                  <blockquote className="font-serif italic text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
                    &ldquo;{TESTIMONIAL_DATA[activeIndex].quote}&rdquo;
                  </blockquote>

                  {/* Customer author specs */}
                  <div className="space-y-0.5 pt-2">
                    <cite className="font-display font-black text-sm text-white not-italic tracking-wide">
                      {TESTIMONIAL_DATA[activeIndex].name}
                    </cite>
                    <div className="text-xs text-slate-400 font-medium">
                      {TESTIMONIAL_DATA[activeIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controllers buttons panel */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-900 relative z-10">
            {/* Dots representation index indicator */}
            <div className="flex space-x-2">
              {TESTIMONIAL_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i ? 'w-6 bg-gold-400' : 'w-2 bg-slate-800'
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Left Right Buttons togglers */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="p-2 sm:p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 active:scale-95 transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
