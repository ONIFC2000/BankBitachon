/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, X, Lock, UserCheck, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured, sandboxAuthStore } from '../lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, setActiveTab }: LoginModalProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('5000');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('All fields must be completed.');
      return;
    }

    if (isRegisterMode) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your legal Full Name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Security keys must contain at least 6 characters.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        // Convert username to a valid email structure if it doesn't already contain one
        const email = username.includes('@') ? username : `${username.toLowerCase().trim()}@bankbitachon.com`;

        if (isRegisterMode) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                initial_balance: parseFloat(selectedBalance) || 5000,
              }
            }
          });

          if (error) {
            setErrorMsg(error.message);
            setIsSubmitting(false);
            return;
          }

          // If signup is successful, log them in or announce success
          onLoginSuccess(fullName);
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            setErrorMsg(error.message);
            setIsSubmitting(false);
            return;
          }

          const loggedName = data.user?.user_metadata?.full_name || email.split('@')[0];
          onLoginSuccess(loggedName.charAt(0).toUpperCase() + loggedName.slice(1));
        }
      } else {
        // Local Sandbox Mode simulation
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (isRegisterMode) {
          sandboxAuthStore.addUser(username, fullName, parseFloat(selectedBalance));
          onLoginSuccess(fullName);
        } else {
          const user = sandboxAuthStore.findUserByUsername(username);
          if (username === 'rebecca_gold' && password === 'bitachonSafe2026') {
            onLoginSuccess('Rebecca Goldstein');
          } else if (user) {
            onLoginSuccess(user.fullName);
          } else {
            // Safe fallback sign-in
            onLoginSuccess(username.charAt(0).toUpperCase() + username.slice(1));
          }
        }
      }

      setIsSubmitting(false);
      onClose();
      setActiveTab('dashboard');
    } catch (err: any) {
      setErrorMsg(err?.message || 'An authentication error occurred.');
      setIsSubmitting(false);
    }
  };

  const handlePrefillDemo = () => {
    setUsername('rebecca_gold');
    setPassword('bitachonSafe2026');
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal content body container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative z-10"
        >
          {/* Top colored aesthetic block */}
          <div className="bg-slate-950 px-6 py-4 border-b border-gold-600/30 flex justify-between items-center bg-radial-gradient">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-gold-400/10 rounded-lg">
                <Lock className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-display font-black text-sm text-white tracking-wide uppercase">
                  {isRegisterMode ? 'Enroll Credentials' : 'Secure Core Access'}
                </h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 leading-none mt-1">
                  <span className="relative flex h-1.5 w-1.5 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>TLS 1.3 Active</span>
                  <span className="text-slate-600 mx-1">•</span>
                  <span className={isSupabaseConfigured ? "text-amber-400 font-mono text-[9px]" : "text-purple-400 font-mono text-[9px]"}>
                    {isSupabaseConfigured ? "Supabase live" : "sandbox mode"}
                  </span>
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close credentials popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {!isSupabaseConfigured && (
              <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-[10px] text-purple-300 leading-normal text-left">
                💡 <span className="font-bold text-purple-200">Local Sandbox Mode:</span> To connect real user authentication databases, declare <code className="bg-slate-950 px-1 py-0.2 rounded text-amber-400 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-950 px-1 py-0.2 rounded text-amber-400 font-mono">VITE_SUPABASE_ANON_KEY</code> in Settings.
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {isRegisterMode && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Legal Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rebecca Goldstein"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Secure ID / Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
                  <span>Secret PIN Code</span>
                  {!isRegisterMode && (
                    <button 
                      type="button" 
                      onClick={handlePrefillDemo}
                      className="text-[10px] text-gold-400 hover:text-gold-300 font-bold tracking-normal"
                    >
                      Fill Demo Pass
                    </button>
                  )}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none"
                />
              </div>

              {isRegisterMode && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Confirm PIN Code
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2.5 px-3.5 text-xs text-white placeholder-slate-750 focus:outline-none"
                    />
                  </div>

                  {/* Seed Account Balance */}
                  <div className="space-y-1 pt-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Initial Deposited Vault Allocation
                    </label>
                    <select
                      value={selectedBalance}
                      onChange={(e) => setSelectedBalance(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg text-xs p-2.5 text-slate-200 outline-none"
                    >
                      <option value="1500">$1,500 Checking Allocation</option>
                      <option value="5000">$5,000 Checking & Savings Match</option>
                      <option value="25000">$25,000 Premium Vault Allocation</option>
                      <option value="150000">$150,000 High-Capacity Corporate Margin</option>
                    </select>
                  </div>
                </>
              )}

              {/* Login Submit Actions Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-550 text-slate-950 font-extrabold text-xs uppercase py-3 rounded-lg tracking-wider shadow-lg hover:shadow-gold-500/10 active:scale-98 transition-all disabled:opacity-50 cursor-pointer flex justify-center items-center gap-1.5 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Ledger Alignment...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-slate-950" />
                    <span>{isRegisterMode ? 'Complete Enrollment' : 'Authenticate Session'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800/80 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMsg('');
                }}
                className="text-xs text-slate-400 hover:text-white underline font-semibold transition-colors cursor-pointer"
              >
                {isRegisterMode ? 'Have an existing trust key? Sign In.' : 'Enroll as a new Mutual Partner.'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
