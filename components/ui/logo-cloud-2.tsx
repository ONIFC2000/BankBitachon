"use client";

import type React from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import applePayLogo from "@/src/assets/logos/apple-pay.svg";
import binanceLogo from "@/src/assets/logos/binance.svg";
import charlesSchwabLogo from "@/src/assets/logos/charles-schwab.svg";
import googlePayLogo from "@/src/assets/logos/google-pay.svg";
import leadBankLogo from "@/src/assets/logos/lead-bank.svg";
import visaLogo from "@/src/assets/logos/visa.svg";
import westernUnionLogo from "@/src/assets/logos/western-union.svg";

type Logo = {
  src?: string;
  alt: string;
  label: string;
  sublabel?: string;
  className?: string;
};

const logos: Logo[] = [
  {
    src: leadBankLogo,
    alt: "Lead Bank Logo",
    label: "Lead Bank",
    sublabel: "Banking rails",
    className: "max-h-9 brightness-0 invert",
  },
  {
    src: visaLogo,
    alt: "Visa Logo",
    label: "Visa",
    sublabel: "Card network",
  },
  {
    src: applePayLogo,
    alt: "Apple Pay Logo",
    label: "Apple Pay",
    sublabel: "Wallet payments",
  },
  {
    src: googlePayLogo,
    alt: "Google Pay Logo",
    label: "Google Pay",
    sublabel: "Mobile checkout",
  },
  {
    src: westernUnionLogo,
    alt: "Western Union Logo",
    label: "Western Union",
    sublabel: "Global transfers",
  },
  {
    src: charlesSchwabLogo,
    alt: "Charles Schwab Logo",
    label: "Charles Schwab",
    sublabel: "Wealth access",
    className: "bg-white p-1.5 rounded-md",
  },
  {
    src: binanceLogo,
    alt: "Binance Logo",
    label: "Binance",
    sublabel: "Digital assets",
  },
];

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <motion.div
      className={cn(
        "relative grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl sm:grid-cols-2 lg:grid-cols-7",
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800/20 via-transparent to-gold-400/10 pointer-events-none" />
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-white/10" />

      {logos.map((logo, index) => (
        <LogoCard key={logo.label} logo={logo} index={index}>
          {index < logos.length - 1 && (
            <PlusIcon
              className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden size-6 text-gold-400/50 lg:block"
              strokeWidth={1}
            />
          )}
        </LogoCard>
      ))}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-white/10" />
    </motion.div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
  index: number;
};

function LogoCard({ logo, index, className, children, ...props }: LogoCardProps) {
  return (
    <motion.div
      className={cn(
        "relative flex min-h-36 flex-col items-center justify-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-8 text-center transition-colors hover:bg-white/[0.07] sm:border-r lg:border-b-0",
        index === 6 && "sm:col-span-2 lg:col-span-1 lg:border-r-0",
        className
      )}
      animate={{
        opacity: [0.58, 1, 0.58],
        y: [4, 0, 4],
      }}
      transition={{
        duration: 4.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.22,
      }}
      whileHover={{ opacity: 1, y: -6, scale: 1.03 }}
      {...props}
    >
      <div className="flex h-10 items-center justify-center">
        <img
          alt={logo.alt}
          className={cn("pointer-events-none max-h-8 max-w-36 select-none object-contain", logo.className)}
          src={logo.src}
        />
      </div>
      <div>
        <div className="font-display text-sm font-black text-white">{logo.label}</div>
        {logo.sublabel && <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">{logo.sublabel}</div>}
      </div>
      {children}
    </motion.div>
  );
}
