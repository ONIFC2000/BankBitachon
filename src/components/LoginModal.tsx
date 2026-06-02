/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle,
  Landmark,
  MailCheck,
  WalletCards,
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured, sandboxAuthStore } from '../lib/supabase';

const authScenes = [
  {
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Account view',
    title: 'See your savings, loans, and cash in one place.',
    body: 'Check balances, rates, transfers, and recent activity before you make your next money move.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Savings growth',
    title: 'Watch your money grow with clear daily numbers.',
    body: 'Follow your APY, interest earned, and goal progress without digging through statements.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1400&q=85',
    eyebrow: 'Money movement',
    title: 'Move between spending, saving, and reserves with ease.',
    body: 'Keep transfers, cards, and treasury accounts organized from the same banking view.',
  },
];

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, metadata?: any) => void;
  setActiveTab: (tab: string) => void;
  initialRecoveryMode?: boolean;
  initialRegisterMode?: boolean;
  onRecoveryComplete?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  setActiveTab,
  initialRecoveryMode = false,
  initialRegisterMode = false,
  onRecoveryComplete,
}: LoginModalProps) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('5000');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);

  const normalizedLogin = username.trim().toLowerCase();
  const authEmail = normalizedLogin.includes('@') ? normalizedLogin : `${normalizedLogin}@bankbitachon.com`;
  const authRedirectUrl = typeof window !== 'undefined' ? window.location.origin : undefined;
  const scene = authScenes[activeScene];

  const resetFeedback = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setShowResendConfirmation(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const sceneTimer = window.setInterval(() => {
      setActiveScene((index) => (index + 1) % authScenes.length);
    }, 5200);

    return () => {
      window.clearInterval(sceneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !initialRecoveryMode) {
      setIsRegisterMode(initialRegisterMode);
      setIsPasswordResetMode(false);
      setErrorMsg('');
      setSuccessMsg('');
      setShowResendConfirmation(false);
    }
  }, [initialRegisterMode, initialRecoveryMode, isOpen]);

  useEffect(() => {
    if (isOpen && initialRecoveryMode) {
      setIsRegisterMode(false);
      setIsPasswordResetMode(true);
      setPassword('');
      setConfirmPassword('');
      setErrorMsg('');
      setSuccessMsg('Enter a new password to finish account recovery.');
    }
  }, [initialRecoveryMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (isPasswordResetMode) {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);
      try {
        if (isSupabaseConfigured) {
          const supabase = getSupabaseClient();
          const { error } = await supabase.auth.updateUser({ password });
          if (error) {
            setErrorMsg(error.message || 'We could not update your password. Please request a new recovery link.');
            setIsSubmitting(false);
            return;
          }
        } else if (normalizedLogin) {
          sandboxAuthStore.updatePassword(normalizedLogin, password);
        }
        setSuccessMsg('Password updated. You can now sign in.');
        setPassword('');
        setConfirmPassword('');
        setIsPasswordResetMode(false);
        onRecoveryComplete?.();
      } catch (err: any) {
        setErrorMsg(err?.message || 'We could not update your password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!normalizedLogin || !password.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (isRegisterMode) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();

        if (isRegisterMode) {
          const { data, error } = await supabase.auth.signUp({
            email: authEmail,
            password,
            options: {
              emailRedirectTo: authRedirectUrl,
              data: {
                full_name: fullName,
                initial_balance: parseFloat(selectedBalance) || 5000,
              }
            }
          });

          if (error) {
            setErrorMsg(error.message || 'We could not create this account. Please try again.');
            setIsSubmitting(false);
            return;
          }

          if (!data.session) {
            setSuccessMsg('Account created. Check your email to confirm it, then sign in. If the email does not arrive, use Resend confirmation below.');
            setShowResendConfirmation(true);
            setIsRegisterMode(false);
            setPassword('');
            setConfirmPassword('');
            setIsSubmitting(false);
            return;
          }

          onLoginSuccess(fullName, data.user?.user_metadata);
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: authEmail,
            password
          });

          if (error) {
            const lowerMessage = error.message?.toLowerCase() || '';
            if (lowerMessage.includes('email not confirmed') || lowerMessage.includes('confirm')) {
              setErrorMsg('This email is not confirmed yet. Check your inbox or use Resend confirmation below.');
              setShowResendConfirmation(true);
            } else {
              setErrorMsg(
                lowerMessage.includes('invalid')
                  ? 'Those login details do not match an existing account. Check the email/username and password, or use password recovery.'
                  : error.message || 'We could not sign you in. Please try again.'
              );
            }
            setIsSubmitting(false);
            return;
          }

          const loggedName = data.user?.user_metadata?.full_name || authEmail.split('@')[0];
          onLoginSuccess(loggedName.charAt(0).toUpperCase() + loggedName.slice(1), data.user?.user_metadata);
        }
      } else {
        // Local Sandbox Mode simulation
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        if (isRegisterMode) {
          const newUser = sandboxAuthStore.addUser(normalizedLogin, fullName, parseFloat(selectedBalance), password);
          onLoginSuccess(fullName, { initial_balance: newUser?.balance });
        } else {
          const user = sandboxAuthStore.findUserByUsername(normalizedLogin);
          if (user && (!user.password || user.password === password)) {
            onLoginSuccess(user.fullName, { initial_balance: user.balance });
          } else {
            setErrorMsg('Those login details do not match an existing test account. Create an account or recover the password.');
            setIsSubmitting(false);
            return;
          }
        }
      }

      setIsSubmitting(false);
      onClose();
      setActiveTab('dashboard');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  const handlePasswordRecovery = async () => {
    resetFeedback();
    if (!normalizedLogin) {
      setErrorMsg('Enter your email or username first, then request password recovery.');
      return;
    }

    setIsRecovering(true);
    try {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
          redirectTo: authRedirectUrl,
        });
        if (error) {
          setErrorMsg(error.message || 'We could not send the recovery email. Please try again.');
          setIsRecovering(false);
          return;
        }
        setSuccessMsg('Password recovery email sent. Check your inbox for the reset link.');
      } else {
        const user = sandboxAuthStore.findUserByUsername(normalizedLogin);
        if (!user) {
          setErrorMsg('No test account found for that username.');
          setIsRecovering(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Test mode recovery: enter a new password with at least 6 characters, then tap Forgot password again.');
          setIsRecovering(false);
          return;
        }
        sandboxAuthStore.updatePassword(normalizedLogin, password);
        setSuccessMsg('Test mode password updated. You can sign in with the new password now.');
        setIsRegisterMode(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Password recovery failed. Please try again.');
    } finally {
      setIsRecovering(false);
    }
  };

  const handleResendConfirmation = async () => {
    resetFeedback();
    if (!normalizedLogin) {
      setErrorMsg('Enter your email or username first, then resend the confirmation email.');
      return;
    }

    if (!isSupabaseConfigured) {
      setSuccessMsg('Test mode does not send confirmation emails. Live Supabase mode will send them once keys are configured.');
      return;
    }

    setIsRecovering(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: authEmail,
        options: {
          emailRedirectTo: authRedirectUrl,
        },
      });

      if (error) {
        setErrorMsg(error.message || 'We could not resend the confirmation email. Check your SMTP/Auth settings and try again.');
        setShowResendConfirmation(true);
        return;
      }

      setSuccessMsg('Confirmation email sent. Check your inbox and spam folder for the verification link.');
      setShowResendConfirmation(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'We could not resend the confirmation email. Please try again.');
    } finally {
      setIsRecovering(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(241,207,76,0.2),transparent_26%),linear-gradient(135deg,#f8faf6_0%,#eff6f3_54%,#f7f1df_100%)] dark:bg-[radial-gradient(circle_at_16%_20%,rgba(241,207,76,0.12),transparent_28%),linear-gradient(135deg,#020617_0%,#0f172a_54%,#111827_100%)]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 grid h-dvh grid-cols-1 overflow-y-auto xl:grid-cols-[minmax(420px,0.86fr)_minmax(560px,1.14fr)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
        >
          <section className="flex min-h-dvh items-start justify-center px-4 py-6 sm:items-center sm:px-8 sm:py-12 lg:px-12">
            <div className="w-full max-w-[440px]">
              <div className="mb-7 flex items-center justify-between gap-5 sm:mb-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 text-left"
                  aria-label="Return to BankBitachon"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-gold-300 shadow-xl shadow-slate-950/10">
                    <Landmark className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-black tracking-tight text-slate-950 dark:text-white">
                      BankBitachon
                    </span>
                  </span>
                </button>
              </div>

              <div className="mb-6 sm:mb-8">
                <h1 id="auth-title" className="font-display text-3xl font-black leading-[1] tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                  {isPasswordResetMode ? 'Update Account Access' : isRegisterMode ? 'Open Your Account' : 'Sign In'}
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {isPasswordResetMode
                    ? 'Choose a new password, then return to your banking dashboard.'
                    : isRegisterMode
                      ? 'Create access for savings, transfers, cards, and loan tools.'
                      : 'Enter your account details to continue to your banking dashboard.'}
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/80 bg-white/74 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/78 dark:shadow-black/30 sm:space-y-5 sm:rounded-[2rem] sm:p-7">
            {!isSupabaseConfigured && !isPasswordResetMode && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
                <span className="font-bold">Sandbox mode:</span> Add Supabase URL and publishable key env vars to send live investor confirmations and recovery emails.
              </div>
            )}

            {errorMsg && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left sm:space-y-4">
              
              {isRegisterMode && !isPasswordResetMode && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rebecca Goldstein"
                    value={fullName}
	                  onChange={(e) => {
	                    setFullName(e.target.value);
	                    resetFeedback();
	                  }}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-gold-400 focus:bg-slate-950"
                  />
                </div>
              )}

              {!isPasswordResetMode && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Email or username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="member@example.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      resetFeedback();
                    }}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-gold-400 focus:bg-slate-950"
                  />
                </div>
              )}

              <div className="space-y-1">
	                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  {isPasswordResetMode ? 'New password' : 'Password'}
	                </label>
	                <div className="relative">
	                  <input
	                    type={showPassword ? 'text' : 'password'}
	                    required
	                    placeholder="••••••••"
	                    value={password}
	                    onChange={(e) => {
	                      setPassword(e.target.value);
	                      resetFeedback();
	                    }}
	                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 py-3 pl-4 pr-12 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-gold-400 focus:bg-slate-950"
	                  />
	                  <button
	                    type="button"
	                    onClick={() => setShowPassword((value) => !value)}
	                    className="absolute right-2 top-1/2 inline-flex min-h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white"
	                    aria-label={showPassword ? 'Hide password' : 'Show password'}
	                  >
	                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
	                  </button>
	                </div>
                {!isRegisterMode && !isPasswordResetMode && (
	                  <button
	                    type="button"
	                    onClick={handlePasswordRecovery}
	                    disabled={isRecovering}
	                    className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700 hover:text-slate-950 disabled:opacity-60 dark:text-gold-300 dark:hover:text-white"
	                  >
	                    {isRecovering ? 'Sending recovery...' : 'Forgot password?'}
	                  </button>
	                )}
	              </div>

              {(isRegisterMode || isPasswordResetMode) && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Confirm password
                    </label>
	                    <div className="relative">
	                      <input
	                        type={showConfirmPassword ? 'text' : 'password'}
	                        required
	                        placeholder="••••••••"
	                        value={confirmPassword}
	                        onChange={(e) => {
	                          setConfirmPassword(e.target.value);
	                          resetFeedback();
	                        }}
	                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 py-3 pl-4 pr-12 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-gold-400 focus:bg-slate-950"
	                      />
	                      <button
	                        type="button"
	                        onClick={() => setShowConfirmPassword((value) => !value)}
	                        className="absolute right-2 top-1/2 inline-flex min-h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white"
	                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
	                      >
	                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
	                      </button>
	                    </div>
                  </div>

                  {isRegisterMode && !isPasswordResetMode && (
                  <div className="space-y-1 pt-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Choose opening account
                    </label>
	                    <select
	                      value={selectedBalance}
	                      onChange={(e) => setSelectedBalance(e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 p-3 text-sm text-white outline-none transition-colors focus:border-gold-400 focus:bg-slate-950"
                    >
                      <option value="1500">$1,500 Starter Savings</option>
                      <option value="5000">$5,000 Checking & Savings</option>
                      <option value="25000">$25,000 Premium Account</option>
                      <option value="150000">$150,000 Business Treasury</option>
                    </select>
                  </div>
                  )}
                </>
              )}

              {/* Login Submit Actions Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-950 px-3 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white shadow-xl shadow-slate-950/15 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 dark:bg-gold-400 dark:text-slate-950 dark:hover:bg-gold-300 sm:text-xs sm:tracking-[0.2em]"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{isPasswordResetMode ? 'Updating password...' : 'Checking your account...'}</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    <span>{isPasswordResetMode ? 'Update Password' : isRegisterMode ? 'Create Account' : 'Sign In'}</span>
                  </>
                )}
              </button>
            </form>

            {!isPasswordResetMode && (
            <div className="space-y-3 border-t border-slate-200 pt-4 text-center dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
	                  setIsRegisterMode(!isRegisterMode);
	                  resetFeedback();
	                }}
                className="text-xs font-bold text-slate-500 underline transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                {isRegisterMode ? 'Already have an account? Sign in.' : 'New here? Create an account.'}
              </button>
              {showResendConfirmation && (
              <div>
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  disabled={isRecovering}
                  className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600 transition-colors hover:border-gold-400 hover:text-slate-950 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-gold-400 dark:hover:text-white sm:text-[11px] sm:tracking-[0.14em]"
                >
                  <MailCheck className="h-3.5 w-3.5" />
                  {isRecovering ? 'Sending...' : 'Resend confirmation'}
                </button>
              </div>
              )}
            </div>
            )}
              </div>
              <footer className="mt-5 text-center text-[11px] font-semibold leading-5 text-slate-500 dark:text-slate-400">
                Protected access for BankBitachon members. Need help? Contact support before sharing account details.
              </footer>
            </div>
          </section>

          <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 xl:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={scene.image}
                src={scene.image}
                alt=""
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-110"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.3),rgba(15,23,42,0.02)),linear-gradient(0deg,rgba(15,23,42,0.78),rgba(15,23,42,0.03)_48%,rgba(15,23,42,0.2))]" />
            <div className="absolute right-10 top-10 flex items-center justify-end text-white">
              <div className="flex gap-2">
                {authScenes.map((authScene, index) => (
                  <button
                    key={authScene.title}
                    type="button"
                    onClick={() => setActiveScene(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeScene ? 'w-8 bg-gold-300' : 'w-2.5 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Show ${authScene.eyebrow}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="max-w-2xl text-white"
                >
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold-300 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-950">
                    <WalletCards className="h-3.5 w-3.5" />
                    {scene.eyebrow}
                  </div>
                  <h2 className="font-display text-3xl font-black leading-tight tracking-tight 2xl:text-5xl">
                    {scene.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/78">
                    {scene.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
