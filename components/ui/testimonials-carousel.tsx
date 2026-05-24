"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  translation?: string;
  image?: string;
  name: string;
  role: string;
  location?: string;
  flag?: string;
  rating?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number;
  direction?: "left" | "right";
  cardHeight?: number;
  desktopCardHeight?: number;
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 200,
  desktopCardHeight = cardHeight,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className ?? ""}`} ref={containerRef}>
      <motion.div
        animate={{
          x: direction === "left" ? [0, -carouselWidth] : [-carouselWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6"
      >
        {loopTestimonials.map(({ text, highlight, translation, image, name, role, location, flag, rating }, index) => (
          <motion.div
            key={`${name}-${index}`}
            whileHover={{ scale: 1.03, y: -4 }}
            className="bg-white my-2 sm:my-3 border border-slate-200 shadow-sm hover:shadow-xl rounded-2xl p-3.5 sm:p-5 flex-shrink-0 w-[72vw] max-w-[280px] sm:w-[430px] sm:max-w-none h-[var(--mobile-card-height)] sm:h-[var(--desktop-card-height)] transition-shadow relative overflow-hidden"
            style={{
              "--mobile-card-height": `${cardHeight}px`,
              "--desktop-card-height": `${desktopCardHeight}px`,
            } as React.CSSProperties}
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-50 rounded-full blur-3xl pointer-events-none -mr-14 -mb-14" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="space-y-3 min-h-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 font-display">
                    <span>{flag}</span>
                    {location}
                  </span>
                  {rating && <span className="text-gold-500 text-xs tracking-tight">{rating}</span>}
                </div>
                <div className="max-h-[132px] sm:max-h-[190px] overflow-hidden">
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 break-words whitespace-normal">
                    {highlight
                      ? text.split(highlight).map((part, idx, arr) => (
                          <React.Fragment key={idx}>
                            {part}
                            {idx !== arr.length - 1 && (
                              <span className="text-primary-700 font-bold">{highlight}</span>
                            )}
                          </React.Fragment>
                        ))
                      : text}
                  </p>
                  {translation && (
                    <p className="mt-2 hidden sm:block text-xs leading-relaxed text-slate-400 italic">
                      {translation}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    width={50}
                    height={50}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-slate-200 bg-slate-900 text-gold-400 flex items-center justify-center font-display font-black text-sm sm:text-base">
                    {flag ?? name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <div className="font-display font-black leading-tight text-slate-900 truncate text-sm sm:text-base">{name}</div>
                  <div className="text-slate-500 text-xs font-semibold truncate">{role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
