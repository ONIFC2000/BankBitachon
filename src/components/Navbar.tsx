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
  ChevronDown, 
  Globe, 
  Lock, 
  PhoneCall, 
  Search, 
  CreditCard,
  Briefcase,
  Users,
  Percent
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navigationItems = [
    { 
      name: 'Personal Banking', 
      id: 'personal',
      icon: <Users className="w-4 h-4 text-primary-600" />,
      subItems: ['High-Yield Checking', 'Compound Savings', 'Credit Cards', 'Personal Loans'] 
    },
    { 
      name: 'Lending & Mortgages', 
      id: 'lending',
      icon: <Percent className="w-4 h-4 text-primary-600" />,
      subItems: ['Home Mortgages', 'Auto Loans', 'Refinance Solutions', 'Rate Lock Promise'] 
    },
    { 
      name: 'Business Solutions', 
      id: 'business',
      icon: <Briefcase className="w-4 h-4 text-primary-600" />,
      subItems: ['Business Checking', 'Commercial Loans', 'Merchant Services', 'Capital Advisory'] 
    },
    { 
      name: 'Help & Security', 
      id: 'security',
      icon: <Shield className="w-4 h-4 text-primary-600" />,
      subItems: ['256-bit Encryption', 'MFA Protocols', 'Report Lost Card', 'Fraud Department'] 
    }
  ];

  const languages = ['English', 'Español', 'Français', 'עברית'];

  const handleNavClick = (sectionId: string) => {
    setActiveTab('home');
    onNavigateToSection(sectionId);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-gold-600/30 text-white shadow-xl">
      {/* Top Action Utility Bar */}
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
            className="hover:text-gold-400 transition-colors"
          >
            Current Rates
          </button>
          <button 
            onClick={() => handleNavClick('locator')}
            className="hover:text-gold-400 transition-colors"
          >
            ATMs & Branches
          </button>
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 hover:text-gold-400 transition-colors text-slate-300 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-md shadow-2xl z-20 py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-700 hover:text-gold-400 transition-colors ${language === lang ? 'text-gold-400 font-semibold' : 'text-slate-300'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

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
          {navigationItems.map((item) => (
            <div 
              key={item.id} 
              className="relative inline-block"
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer ${
                  currentSection === item.id 
                    ? 'text-gold-400 bg-slate-800' 
                    : 'text-slate-200 hover:text-gold-400 hover:bg-slate-800/60'
                }`}
              >
                {item.name}
                <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <AnimatePresence>
                {activeDropdown === item.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-0.5 w-64 bg-slate-900 border border-slate-700/60 rounded-lg shadow-2xl p-4 z-40"
                  >
                    <div className="flex items-center gap-2 pb-2 mb-3 border-b border-slate-800">
                      {item.icon}
                      <span className="font-display font-semibold text-xs text-gold-400 tracking-wider uppercase">
                        {item.name} Solutions
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {item.subItems.map((sub, i) => (
                        <li key={i}>
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors"
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex justify-between items-center">
                      <span>Proactive Safeguards</span>
                      <span className="text-emerald-400">NCUA Insured</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <button 
            onClick={() => handleNavClick('calcs')}
            className={`px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 cursor-pointer ${
              currentSection === 'calcs' ? 'text-gold-400 bg-slate-800' : 'text-slate-200 hover:text-gold-400 hover:bg-slate-800/60'
            }`}
          >
            Calculators
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
                className="px-2.5 py-1 text-xs font-semibold uppercase bg-primary-750 text-white hover:bg-primary-600 rounded transition-colors"
              >
                My Portal
              </button>
              <button 
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-orange-400 hover:underline transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('rates')}
                className="text-sm font-semibold text-slate-300 hover:text-white hover:underline decoration-gold-400 py-1 px-2.5 mr-1"
              >
                Join Us
              </button>
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 px-5 py-2 rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-gold-500/20 shadow-neutral-950 hover:from-gold-400 hover:to-gold-550 active:scale-98 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4 fill-slate-950 stroke-2" />
                <span>Secure Login</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation controls */}
        <div className="flex lg:hidden items-center space-x-2">
          {isLoggedIn && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-2.5 py-1.5 text-xs font-bold uppercase bg-gold-500 text-slate-950 rounded shadow"
            >
              Portal
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
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
              {/* Mobile Quick Rate Search */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask Bitachon: How can we help you?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg py-2.5 pl-3 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
                <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-500" />
              </div>

              {/* Drawer Navigation Links */}
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.id} className="space-y-2 border-b border-slate-900 pb-3">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center justify-between text-left font-display font-bold text-sm tracking-wide text-gold-400"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    <div className="grid grid-cols-2 gap-2 pl-2">
                      {item.subItems.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.id)}
                          className="text-left text-xs py-1 text-slate-400 hover:text-white"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleNavClick('calcs')}
                    className="flex justify-center items-center py-2.5 border border-slate-850 rounded-lg text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    Calculators
                  </button>
                  <button
                    onClick={() => handleNavClick('locator')}
                    className="flex justify-center items-center py-2.5 border border-slate-850 rounded-lg text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    ATMs & Branches
                  </button>
                </div>
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
                      className="w-full bg-primary-700 hover:bg-primary-650 text-white font-bold text-xs uppercase py-3 rounded-lg text-center"
                    >
                      Access Account Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-xs text-red-400 hover:underline pt-1 text-center"
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
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold text-sm py-3.5 rounded-lg tracking-wide shadow-lg cursor-pointer"
                    >
                      <Lock className="w-4 h-4 fill-slate-950" />
                      <span>Access Secure Banking</span>
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('rates');
                      }}
                      className="text-xs text-slate-400 hover:text-white hover:underline text-center py-1"
                    >
                      Become A Member Today
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
