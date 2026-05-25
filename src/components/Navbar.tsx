/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Menu, 
  X, 
  Lock, 
  PhoneCall,
  UserCircle
} from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentSection: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ 
  onLoginClick, 
  onNavigateToSection, 
  currentSection,
  isLoggedIn,
  onLogout,
  userName,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveTab('home');
    onNavigateToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-gold-600/30 text-white shadow-xl">
      {/* Top Action Utility Bar */}
      {activeTab !== 'dashboard' && (
      <div className="hidden md:flex w-full bg-slate-950 border-b border-slate-800 text-xs px-6 py-2.5 justify-between items-center text-slate-300 font-sans">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-gold-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Secure Connection Active (TLS 1.3)
          </span>
          <a href="tel:+18005553224" className="flex items-center gap-1 hover:text-white transition-colors">
            <PhoneCall className="w-3 h-3 text-gold-400" />
            1-800-555-BITACHON (24/7 Support)
          </a>
        </div>
        
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => handleNavClick('rates')}
            className="min-h-11 hover:text-gold-400 transition-colors"
          >
            Current Rates
          </button>
          <button 
            onClick={() => handleNavClick('locator')}
            className="min-h-11 hover:text-gold-400 transition-colors"
          >
            ATMs & Branches
          </button>
        </div>
      </div>
      )}

      {/* Main Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="nav-logo"
        >
          <div className="relative p-2 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-6 h-6 text-slate-950 font-bold" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-tight tracking-wider text-white group-hover:text-gold-400 transition-colors flex items-center gap-1.5">
              BANK <span className="text-gold-400 font-extrabold">BITACHON</span>
            </div>
            <div className="font-mono text-[9px] tracking-widest text-slate-400 uppercase leading-none">
              Security · Yield · Confidence
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
          <button
            onClick={() => handleNavClick('bento-features')}
            className={`px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer ${
              currentSection === 'bento-features' ? 'text-gold-400 bg-slate-800' : 'text-slate-200 hover:text-gold-400 hover:bg-slate-800/60'
            }`}
          >
            Banking Offers
          </button>
          <button
            onClick={() => handleNavClick('calcs')}
            className={`px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer ${
              currentSection === 'calcs' ? 'text-gold-400 bg-slate-800' : 'text-slate-200 hover:text-gold-400 hover:bg-slate-800/60'
            }`}
          >
            Simulator
          </button>
          <button
            onClick={() => handleNavClick('faqs')}
            className={`px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer ${
              currentSection === 'faqs' ? 'text-gold-400 bg-slate-800' : 'text-slate-200 hover:text-gold-400 hover:bg-slate-800/60'
            }`}
          >
            FAQs
          </button>
        </nav>

        {/* Global CTAs */}
        <div className="hidden lg:flex items-center space-x-3" id="nav-actions">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 leading-none uppercase">Secure Client</div>
                <div className="text-xs font-semibold text-gold-400 leading-tight">{userName}</div>
              </div>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-primary-750 text-white transition-colors hover:bg-primary-600"
                aria-label="Open profile portal"
                title="Profile portal"
              >
                <UserCircle className="h-5 w-5" />
              </button>
              <button 
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-orange-400 hover:underline transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 px-5 py-2 rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-gold-500/20 shadow-neutral-950 hover:from-gold-400 hover:to-gold-550 active:scale-98 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 fill-slate-950 stroke-2" />
              <span>Secure Login</span>
            </button>
          )}
        </div>

        {/* Mobile Navigation controls */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="min-h-11 min-w-11 p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-slate-950 border-t border-slate-800"
          >
            <div className="px-5 py-6 space-y-5">
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleNavClick('rates')}
                  className="min-h-11 flex justify-center items-center py-2.5 border border-slate-850 rounded-xl text-sm font-semibold text-slate-300 hover:text-white"
                >
                  Current Rates
                </button>
                <button
                  onClick={() => handleNavClick('bento-features')}
                  className="min-h-11 flex justify-center items-center py-2.5 border border-slate-850 rounded-xl text-sm font-semibold text-slate-300 hover:text-white"
                >
                  Banking Offers
                </button>
                <button
                  onClick={() => handleNavClick('calcs')}
                  className="min-h-11 flex justify-center items-center py-2.5 border border-slate-850 rounded-xl text-sm font-semibold text-slate-300 hover:text-white"
                >
                  Simulator
                </button>
                <button
                  onClick={() => handleNavClick('locator')}
                  className="min-h-11 flex justify-center items-center py-2.5 border border-slate-850 rounded-xl text-sm font-semibold text-slate-300 hover:text-white"
                >
                  ATMs & Branches
                </button>
                <button
                  onClick={() => handleNavClick('faqs')}
                  className="min-h-11 flex justify-center items-center py-2.5 border border-slate-850 rounded-xl text-sm font-semibold text-slate-300 hover:text-white"
                >
                  FAQs
                </button>
              </div>

              {/* Login action in mobile menu */}
              <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <div className="text-center bg-slate-900 p-2.5 rounded-lg border border-slate-850">
                      <div className="text-[10px] text-slate-500 uppercase leading-none">Security Portal Active</div>
                      <div className="text-sm font-bold text-gold-400 mt-1">{userName}</div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full min-h-12 bg-primary-700 hover:bg-primary-650 text-white font-bold text-sm uppercase py-3 rounded-xl text-center"
                    >
                      Access Account Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="min-h-11 text-sm text-red-400 hover:underline pt-1 text-center"
                    >
                      Sign Out Secure Session
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full min-h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl tracking-wide shadow-lg cursor-pointer"
                    >
                      <Lock className="w-4 h-4 fill-slate-950" />
                      <span>Access Secure Banking</span>
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center text-[10px] text-slate-500 leading-tight">
                <div>Federal Insurance Coverage NCUA &middot; Equal Housing Lender</div>
                <div className="mt-1">Bank Bitachon Safe Guard Registry &copy; 2026</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
