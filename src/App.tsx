/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import Calculator from './components/Calculator';
import RatesComparisons from './components/RatesComparisons';
import AtmLocator from './components/AtmLocator';
import EmpowermentTestimonials from './components/EmpowermentTestimonials';
import LogoCloudSection from './components/LogoCloudSection';
import Faqs from './components/Faqs';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AboutUsSection from '@/components/ui/about-us-section';
import { getSupabaseClient, isSupabaseConfigured } from './lib/supabase';

import { ShieldCheck, ArrowRight, ArrowUpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [shouldOpenRegisterMode, setShouldOpenRegisterMode] = useState(false);
  const [isPasswordRecoveryMode, setIsPasswordRecoveryMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  // Load existing session if Supabase is active
  useEffect(() => {
    if (isSupabaseConfigured) {
      const supabase = getSupabaseClient();
      if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            const metadata = session.user.user_metadata;
            const name = metadata?.full_name || session.user.email?.split('@')[0];
            setUserName(name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Customer');
            setIsLoggedIn(true);
          }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY') {
            setIsPasswordRecoveryMode(true);
            setIsLoginModalOpen(true);
          }
          if (session?.user) {
            const metadata = session.user.user_metadata;
            const name = metadata?.full_name || session.user.email?.split('@')[0];
            setUserName(name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Customer');
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            setUserName('');
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      }
    }
  }, []);

  // Scroll target element helper
  const navigateToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoginSuccess = (name: string, metadata?: any) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    setIsLoggedIn(false);
    setUserName('');
    setActiveTab('home');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-between overflow-x-hidden antialiased">
      {/* Sticky Top Header Navigation */}
      {activeTab === 'home' && (
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onNavigateToSection={navigateToSection}
        currentSection={currentSection}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userName={userName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      )}

      {/* Primary Display Sections */}
      <main className="flex-grow">
        {activeTab === 'dashboard' ? (
          <Dashboard 
            userName={userName}
            onLogout={handleLogout}
            setActiveTab={setActiveTab}
          />
        ) : (
          <>
            {/* Immersive Welcome Banner Carousel & Login widget */}
            <Hero 
              onNavigateToSection={navigateToSection}
              onOpenSelfLogin={() => {
                setShouldOpenRegisterMode(false);
                setIsPasswordRecoveryMode(false);
                setIsLoginModalOpen(true);
              }}
              onOpenCreateAccount={() => {
                setShouldOpenRegisterMode(true);
                setIsPasswordRecoveryMode(false);
                setIsLoginModalOpen(true);
              }}
            />

            {/* Core Value Deliverables (Checking & savings APY highlights) */}
            <BentoFeatures 
              onNavigateToSection={navigateToSection}
              onOpenSelfLogin={() => setIsLoginModalOpen(true)}
            />

            {/* Direct comparative indicators showing yields over competitors */}
            <RatesComparisons />

            {/* Premium Mortgage & Auto sliding calculators */}
            <Calculator />

            {/* Member stories tied to the empowerment simulator */}
            <EmpowermentTestimonials />

            {/* ATM Locator and physical branch trust mapping */}
            <AtmLocator />

            {/* Trusted infrastructure partner grid */}
            <LogoCloudSection />

            {/* Story section placed directly above FAQ topics */}
            <AboutUsSection />

            {/* Structural expandable accordions covering FAQ topics */}
            <Faqs />
          </>
        )}
      </main>

      {activeTab === 'home' && <Footer onNavigateToSection={navigateToSection} />}

      {/* Floating security and assistance overlay buttons */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setShouldOpenRegisterMode(false);
          setIsPasswordRecoveryMode(false);
        }}
        onLoginSuccess={handleLoginSuccess}
        setActiveTab={setActiveTab}
        initialRecoveryMode={isPasswordRecoveryMode}
        initialRegisterMode={shouldOpenRegisterMode}
        onRecoveryComplete={() => setIsPasswordRecoveryMode(false)}
      />

      {/* Back to top scroll button */}
      {activeTab === 'home' && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 z-40 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-gold-400 hover:text-white p-3 rounded-full shadow-2xl active:scale-95 transition-all cursor-pointer group"
        aria-label="Back to Top"
        id="scroll-to-top"
      >
        <ArrowUpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
      )}
    </div>
  );
}
