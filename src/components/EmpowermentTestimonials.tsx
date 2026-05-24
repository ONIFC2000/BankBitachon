/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe2, ShieldCheck } from 'lucide-react';
import { TestimonialsCarousel, type Testimonial } from '@/components/ui/testimonials-carousel';

const testimonials: Testimonial[] = [
  {
    text: "I almost gave up on online banking after my old bank kept charging hidden fees. Bank Bitachom changed that completely. No surprises, real support. Now I've got 3 accounts and a savings goal tracker that actually works.",
    highlight: "No surprises, real support",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=240",
    name: "Marcus T.",
    role: "Atlanta member",
    location: "Atlanta, USA",
    flag: "US",
    rating: "★★★★★",
  },
  {
    text: "No começo desconfiei, porque banco digital pra mim era fria. Mas o atendimento em português e a clareza das taxas me convenceram. Já investi 5 meses seguidos e vi meu dinheiro render de verdade com o Bank Bitachom.",
    translation: "At first I was suspicious, because digital banking felt like a risk. But the Portuguese support and fee transparency won me over.",
    highlight: "clareza das taxas",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=240",
    name: "Fernanda L.",
    role: "Investor",
    location: "São Paulo, Brazil",
    flag: "BR",
    rating: "★★★★★",
  },
  {
    text: "As a freelancer, I need separation between personal and business finances. Bank Bitachom made that effortless. Two years ago they had fewer automation features - today, it's a powerhouse. You can literally feel the company growing every quarter.",
    highlight: "personal and business finances",
    name: "Jonas W.",
    role: "Freelancer",
    location: "Berlin, Germany",
    flag: "DE",
    rating: "★★★★½",
  },
  {
    text: "I started with just a savings account at Bank Bitachom. Six months later, I'm using their wealth insights and automated bill pay. The app is light, fast, and respects Indian mobile data. Finally, a global bank that feels local.",
    highlight: "global bank that feels local",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&q=80&w=240",
    name: "Priya K.",
    role: "Mumbai saver",
    location: "Mumbai, India",
    flag: "IN",
    rating: "★★★★★",
  },
  {
    text: "M-Pesa integration was a game changer for me. I send money to my mom's village in seconds. When I joined Bank Bitachom in 2022, the app was good - now in 2025, it's excellent. Growth is visible.",
    highlight: "M-Pesa integration",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=240",
    name: "Samuel O.",
    role: "Early user",
    location: "Nairobi, Kenya",
    flag: "KE",
    rating: "★★★★½",
  },
  {
    text: "他社の口座と比べてセキュリティが段違い。指紋認証とリアルタイムの不正検知で安心して使えています。Bank Bitachomは最初は小さな機能しかなかったけど、今では完全な金融プラットフォームです。",
    translation: "The security is on another level compared to other banks. Fingerprint auth and real-time fraud detection let me use it with peace of mind.",
    highlight: "セキュリティ",
    name: "Yuki S.",
    role: "Security-first member",
    location: "Tokyo, Japan",
    flag: "JP",
    rating: "★★★★★",
  },
  {
    text: "J'ai failli partir à cause d'un bug de connexion il y a un an. Le support de Bank Bitachom m'a rappelé en 10 minutes et résolu le problème. Aujourd'hui, je recommande cette banque autour de moi. Une banque qui écoute et s'améliore.",
    translation: "I almost left because of a login bug a year ago. Bank Bitachom support called me back in 10 minutes and fixed it.",
    highlight: "Une banque qui écoute",
    name: "Claire M.",
    role: "Lyon customer",
    location: "Lyon, France",
    flag: "FR",
    rating: "★★★★",
  },
  {
    text: "I've watched Bank Bitachom evolve from a basic neobank into a serious financial institution. The round-up savings feature alone helped me save $4k last year. They still feel agile, but now with real stability.",
    highlight: "round-up savings",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240",
    name: "Tom R.",
    role: "Round-up saver",
    location: "Sydney, Australia",
    flag: "AU",
    rating: "★★★★★",
  },
  {
    text: "When I first joined Bank Bitachom, there was no joint account option. My wife and I almost switched. Then three months later - boom, joint accounts launched with budgeting tools. They move fast. That's rare for a bank.",
    highlight: "They move fast",
    name: "David & Sarah C.",
    role: "Joint account members",
    location: "Toronto, Canada",
    flag: "CA",
    rating: "★★★★½",
  },
  {
    text: "Load shedding used to kill my online banking. Bank Bitachom's offline transaction queue saves me every week. I've been here since they had 50k users - now they're at over 2.8 million. Proud to say I was early.",
    highlight: "offline transaction queue",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=240",
    name: "Thabo N.",
    role: "Early adopter",
    location: "Cape Town, South Africa",
    flag: "ZA",
    rating: "★★★★★",
  },
  {
    text: "I moved back from the UK last year and was nervous about keeping a global bank account. Bank Bitachom still works - fast app, good exchange rates. But local customer support hours don't match our timezone well yet. Takes 8-12 hours to get a reply. That said, the service itself is solid and I trust them more than local banks.",
    highlight: "fast app, good exchange rates",
    name: "Chidi O.",
    role: "Returned from UK",
    location: "Lagos, Nigeria",
    flag: "NG",
    rating: "★★★★",
  },
  {
    text: "After 7 years in Canada, I came home to Nairobi expecting the same seamless experience. The Bank Bitachom app works fine for transfers and savings. But mobile money integration is slower than before I left. Sometimes transactions take 30+ minutes. I appreciate the security and low fees, but for daily life back in Africa, it needs improvement.",
    highlight: "security and low fees",
    name: "Grace W.",
    role: "Returned from Canada",
    location: "Nairobi, Kenya",
    flag: "KE",
    rating: "★★★",
  },
];

export default function EmpowermentTestimonials() {
  const firstRow = testimonials.slice(0, 6);
  const secondRow = testimonials.slice(6);

  return (
    <section className="py-12 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-full text-xs font-bold tracking-wider uppercase font-display">
            <Globe2 className="w-3.5 h-3.5" />
            Global Member Voices
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-snug">
            Banking trust, proven across borders
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real Bank Bitachom members describe the fees, support, mobile money, security, and product growth that shape their daily financial lives.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="space-y-3 sm:space-y-5">
            <TestimonialsCarousel testimonials={firstRow} speed={42} direction="left" cardHeight={260} desktopCardHeight={340} />
            <TestimonialsCarousel testimonials={secondRow} speed={48} direction="right" cardHeight={260} desktopCardHeight={340} />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs font-bold text-slate-300 shadow-sm backdrop-blur">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            International support is improving fast, and members are noticing
          </div>
        </div>
      </div>
    </section>
  );
}
