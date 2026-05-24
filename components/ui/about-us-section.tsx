"use client"

import type React from "react"

import {
  ArrowRight,
  Brain,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  PiggyBank,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AboutUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Digital Banking",
      description:
        "Transform the way you manage money with our intuitive digital platform. We blend security and simplicity to give you full control over your finances - anytime, anywhere.",
      position: "left",
    },
    {
      icon: <PiggyBank className="w-5 h-5" />,
      title: "Grow Your Money",
      description:
        "Build lasting financial health with smart savings and investment tools designed to grow with you. From automated round-ups to goal-based planning, we make wealth-building effortless.",
      position: "left",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Keep Money Safe",
      description:
        "Our innovative, multi-layered security approach combines cutting-edge encryption with user-friendly design - keeping your data safe without slowing you down.",
      position: "left",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Smart Money Tips",
      description:
        "Elevate your financial decisions with AI-driven insights. From spending patterns to savings opportunities, we help you perfect every dollar's journey.",
      position: "right",
    },
    {
      icon: <CalendarCheck className="w-5 h-5" />,
      title: "Plan Ahead",
      description:
        "Our meticulous planning tools ensure you stay on track for every goal - from daily budgets to major life milestones - with real-time updates and proactive alerts.",
      position: "right",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Easy Payments",
      description:
        "Watch your money work for you. Automate bills, schedule transfers, and handle every aspect of your finances with precision - no matter where you are.",
      position: "right",
    },
  ]

  return (
    <section id="about-section" className="w-full py-20 bg-slate-50 text-slate-900 overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-slate-950/10 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold tracking-wider uppercase font-display"
            variants={itemVariants}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Discover Our Mission
          </motion.span>
          <motion.h2
            className="font-display font-black text-3.5xl sm:text-4.5xl text-slate-900 tracking-tight leading-[1.1]"
            variants={itemVariants}
          >
            About <span className="bg-gradient-to-r from-primary-700 to-gold-600 bg-clip-text text-transparent">Bank Bitachon</span>
          </motion.h2>
          <motion.p className="text-slate-600 text-base leading-relaxed" variants={itemVariants}>
            We are a dedicated team of financial and digital security experts committed to creating seamless, secure, and
            intelligent banking experiences. With precision and a customer-first mindset, we turn financial complexity into
            clarity.
          </motion.p>
          <motion.h3 className="pt-3 text-xl sm:text-2xl font-display font-black text-slate-900" variants={itemVariants}>
            Your Financial Journey, Reimagined
          </motion.h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <div className="lg:col-span-4 grid gap-6">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                />
              ))}
          </div>

          <motion.div
            className="lg:col-span-4 bg-slate-900 text-white rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden relative min-h-[520px] flex flex-col justify-between"
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-700/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-full text-[10px] font-bold uppercase tracking-wider font-display">
                  <Zap className="w-3.5 h-3.5" />
                  Live Control
                </span>
                <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Secure balance</p>
                <div className="font-display text-4xl font-black tracking-tight">$48,920.40</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-400/10 px-2.5 py-1 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Protected by Bitachon Shield
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Monthly saved" value="$1,240" accent="text-gold-400" />
                <MetricCard label="APY boost" value="4.85%" accent="text-primary-300" />
              </div>
            </div>

            <div className="relative z-10 mx-5 mb-5 rounded-2xl bg-white text-slate-950 border border-slate-200 p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Next smart move</p>
                  <p className="font-display font-black text-sm">Move $350 to Goals Vault</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary-700" />
              </div>
              <div className="pt-4 space-y-3">
                <ProgressRow label="Emergency Fund" value="82%" width="82%" />
                <ProgressRow label="Travel Savings" value="54%" width="54%" />
                <ProgressRow label="Auto Pay Ready" value="100%" width="100%" />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 grid gap-6">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ServiceItemProps {
  key?: React.Key
  icon: React.ReactNode
  title: string
  description: string
  variants: {
    hidden: { opacity: number; y?: number }
    visible: { opacity: number; y?: number; transition: { duration: number; ease: string } }
  }
}

function ServiceItem({ icon, title, description, variants }: ServiceItemProps) {
  return (
    <motion.div
      className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all relative overflow-hidden"
      variants={variants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl pointer-events-none -mr-12 -mb-12 group-hover:scale-125 transition-transform duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-xl group-hover:bg-slate-900 group-hover:text-gold-400 transition-colors">
            {icon}
          </div>
          <h3 className="font-display font-black text-xl text-slate-900 tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  accent: string
}

function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{label}</p>
      <p className={`mt-1 font-display font-black text-2xl ${accent}`}>{value}</p>
    </div>
  )
}

interface ProgressRowProps {
  label: string
  value: string
  width: string
}

function ProgressRow({ label, value, width }: ProgressRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-primary-600 to-gold-500" style={{ width }} />
      </div>
    </div>
  )
}
