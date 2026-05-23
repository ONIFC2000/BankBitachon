/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from '../data';
import { Account, Transaction, LoanApplication } from '../types';
import { 
  ShieldCheck, 
  Wallet, 
  Send, 
  CreditCard, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Lock, 
  Unlock, 
  PlusCircle, 
  CheckCircle, 
  TrendingUp, 
  Download, 
  Percent, 
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ userName, onLogout, setActiveTab }: DashboardProps) {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTransferFrom, setActiveTransferFrom] = useState('ac1');
  const [activeTransferTo, setActiveTransferTo] = useState('ac2');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [isCardLocked, setIsCardLocked] = useState(false);

  // Apply loan States
  const [loanAmount, setLoanAmount] = useState('10000');
  const [loanType, setLoanType] = useState('Auto Refinance Rate (3.99%)');
  const [appliedLoans, setAppliedLoans] = useState<LoanApplication[]>([]);
  const [isApplyingLoan, setIsApplyingLoan] = useState(false);

  // Transfer Submit Handler
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please specify a valid monetary value.');
      return;
    }

    if (activeTransferFrom === activeTransferTo) {
      alert('Source and destination accounts must differ.');
      return;
    }

    const sourceAcc = accounts.find((a) => a.id === activeTransferFrom);
    if (!sourceAcc || sourceAcc.balance < amt) {
      alert('Insufficient funds available in the selected source account.');
      return;
    }

    setIsTransferring(true);

    setTimeout(() => {
      // Update accounts balance state
      const updated = accounts.map((acc) => {
        if (acc.id === activeTransferFrom) {
          return { ...acc, balance: acc.balance - amt };
        }
        if (acc.id === activeTransferTo) {
          return { ...acc, balance: acc.balance + amt };
        }
        return acc;
      });

      // Add a transaction record
      const fromAccObj = accounts.find((a) => a.id === activeTransferFrom);
      const toAccObj = accounts.find((a) => a.id === activeTransferTo);
      
      const newTx: Transaction = {
        id: `t_user_${Date.now()}`,
        date: 'Today',
        description: `Secure Transfer from ${fromAccObj?.name.substring(0,10)} to ${toAccObj?.name.substring(0,10)}`,
        category: 'Transfer',
        amount: -amt,
        status: 'Completed'
      };

      setAccounts(updated);
      setTransactions([newTx, ...transactions]);
      setIsTransferring(false);
      setTransferAmount('');
      setTransferMessage(`Successfully wired ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt)} instantaneously!`);
      
      setTimeout(() => setTransferMessage(''), 5000);
    }, 1200);
  };

  // Live Loan Application Handler
  const handleLoanApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(loanAmount);
    if (isNaN(amt) || amt < 1000) {
      alert('Minimum signature credit loan application starts at $1,000.');
      return;
    }

    setIsApplyingLoan(true);

    setTimeout(() => {
      const newLoan: LoanApplication = {
        id: `loan_${Date.now()}`,
        type: loanType,
        amount: amt,
        term: 5,
        status: amt > 50000 ? 'Reviewing' : 'Approved',
        date: 'Today'
      };

      setAppliedLoans([newLoan, ...appliedLoans]);
      
      // If approved, add capital to checking
      if (newLoan.status === 'Approved') {
        setAccounts(accounts.map(acc => {
          if (acc.id === 'ac1') { // Ultimate yield checking
            return { ...acc, balance: acc.balance + amt };
          }
          return acc;
        }));

        setTransactions([
          {
            id: `t_loan_${Date.now()}`,
            date: 'Today',
            description: `Approved Loan Proceeds: ${loanType.split(' ')[0]}`,
            category: 'Income',
            amount: amt,
            status: 'Completed'
          },
          ...transactions
        ]);
        alert(`Congratulations! Your financial credit qualifies you for INSTANT Bitachon Pre-approval! ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt)} has been swept straight into your Ultimate Yield Checking account.`);
      } else {
        alert('Your high-limit loan request has been securely locked in for immediate manual auditing by a premier Credit Specialist. Status: Reviewing.');
      }

      setIsApplyingLoan(false);
    }, 1500);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="bg-slate-950 py-10 min-h-screen relative text-slate-100 bg-grid-pattern">
      
      {/* Interactive header block */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-900">
          <div className="space-y-1 text-left">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 h-fit">
              <span className="w-2 h-2 rounded bg-emerald-400 animate-pulse" />
              Authenticated Secure Sandbox
            </span>
            <h1 className="font-display font-extrabold text-3xl text-white tracking-tight">
              Shalom, <span className="text-gold-400 font-sans">{userName}</span>
            </h1>
            <p className="text-xs text-slate-400">
              Logged in since {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors cursor-pointer"
            >
              Public Homepage
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-red-950/40 text-red-400 hover:bg-red-900 hover:text-white border border-red-900/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Terminate Session
            </button>
          </div>
        </div>

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left (Accounts summary & Transactions ledger) - 8/12 */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Accounts balances row */}
            <div className="space-y-3.5">
              <h3 className="font-display font-bold text-sm text-gold-400 uppercase tracking-widest text-left flex items-center gap-2">
                <Wallet className="w-4 h-4 text-gold-400" />
                Active Account Portfolios
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accounts.map((acc) => {
                  const isNegativeValue = acc.balance < 0;
                  return (
                    <div 
                      key={acc.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-705 transition-all relative overflow-hidden text-left"
                    >
                      {/* APY indicator */}
                      {acc.apy && (
                        <span className="absolute top-4 right-4 text-[9px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-900/30 font-mono">
                          APY: {acc.apy}%
                        </span>
                      )}
                      {acc.apr && (
                        <span className="absolute top-4 right-4 text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono">
                          APR: {acc.apr}%
                        </span>
                      )}

                      <div className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                        {acc.name}
                      </div>
                      <div className="text-slate-500 font-mono text-[10px] tracking-widest mt-0.5">
                        {acc.number}
                      </div>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className={`font-display font-black text-2xl tracking-tight ${isNegativeValue ? 'text-red-450' : 'text-white'}`}>
                          {formatCurrency(acc.balance)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold font-mono">USD</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated Money Transfer Panel */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-1.5 bg-primary-700/10 text-primary-400 border border-primary-900/30 rounded-lg">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    Instant Trust Wire &amp; Transfer
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-none">
                    No-fee real-time ACH transaction simulation
                  </p>
                </div>
              </div>

              {transferMessage && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 mb-4 animate-fadeIn">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                  <span>{transferMessage}</span>
                </div>
              )}

              <form onSubmit={handleTransfer} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Source Account (From)
                  </label>
                  <select
                    value={activeTransferFrom}
                    onChange={(e) => setActiveTransferFrom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg text-xs p-3 text-slate-200 outline-none focus:border-gold-500"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id} disabled={acc.balance <= 0}>
                        {acc.name} ({formatCurrency(acc.balance)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Destination Account (To)
                  </label>
                  <select
                    value={activeTransferTo}
                    onChange={(e) => setActiveTransferTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg text-xs p-3 text-slate-200 outline-none focus:border-gold-500"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} ({formatCurrency(acc.balance)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Transfer Capital Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm font-bold">$</span>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2.5 pl-8 pr-4 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isTransferring}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-550 text-slate-950 font-bold text-xs uppercase py-3 rounded-lg tracking-wider shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isTransferring ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Wire Keys...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Perform Immediate Sweep</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Ledger Transactions Ledger */}
            <div className="space-y-3.5 text-left">
              <div className="flex justify-between items-center pb-1">
                <h3 className="font-display font-bold text-sm text-gold-400 uppercase tracking-widest flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Security Audit Ledger &middot; Transactions
                </h3>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">
                  {transactions.length} total operations
                </span>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden shadow-md">
                <div className="divide-y divide-slate-850/60 max-h-[350px] overflow-y-auto scrollbar">
                  {transactions.map((tx) => {
                    const isDebit = tx.amount < 0;
                    return (
                      <div 
                        key={tx.id}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-slate-850/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl border ${isDebit ? 'bg-red-950/20 border-red-900/40 text-red-400' : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400'}`}>
                            {isDebit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white max-w-[200px] sm:max-w-[320px] truncate leading-tight">
                              {tx.description}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                              <span>{tx.date}</span>
                              <span className="w-1 h-1 bg-slate-550 rounded-full" />
                              <span className="text-slate-500 font-mono text-[9px] uppercase">{tx.category}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end">
                          <span className={`font-mono text-xs font-black ${isDebit ? 'text-slate-300' : 'text-emerald-400'}`}>
                            {isDebit ? '' : '+'}{formatCurrency(tx.amount)}
                          </span>
                          <span className="text-[9px] text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold uppercase mt-1">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Column Right (Virtual Credit Card controls & Quick Loan Apply) - 4/12 */}
          <div className="lg:col-span-4 space-y-8 text-left">
            
            {/* Visual Virtual debit card */}
            <div className="space-y-3.5">
              <h3 className="font-display font-bold text-sm text-gold-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <CreditCard className="w-4 h-4 text-gold-400" />
                Bitachon Defenses Card
              </h3>

              {/* Dynamic Flipped / Animating Credit Card Visual */}
              <div className="perspective-1000">
                <motion.div 
                  initial={false}
                  animate={{ rotateY: isCardLocked ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
                  className="relative w-full h-[210px] rounded-2xl p-6 flex flex-col justify-between shadow-2xl overflow-hidden text-white cursor-pointer select-none ring-1 border-t ring-white/10"
                  style={{
                    background: isCardLocked 
                      ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                      : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
                  }}
                >
                  {/* Decorative glowing wave texture inside card */}
                  <div className="absolute inset-0 bg-transparent" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="font-serif italic font-bold tracking-wider block text-xs">Bank Bitachon</span>
                      <span className="text-[8px] tracking-widest text-[#94a3b8] uppercase">INFINITE SECURITY CARD</span>
                    </div>
                    
                    <div className="p-1 text-gold-400">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Lock Indicator overlays */}
                  {isCardLocked && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col justify-center items-center z-20">
                      <Lock className="w-9 h-9 text-red-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 mt-2">Card Frozen</span>
                    </div>
                  )}

                  {/* Chip and Numbers */}
                  <div className="relative z-10 space-y-3.5 mt-2">
                    {/* Chip representation */}
                    <div className="w-9 h-7 bg-gold-405 opacity-80 rounded-md border border-slate-705 shadow-sm overflow-hidden flex flex-col justify-between p-1">
                      <div className="grid grid-cols-3 gap-0.5 h-full opacity-60">
                        <div className="border border-slate-900" />
                        <div className="border border-slate-900" />
                        <div className="border border-slate-900" />
                      </div>
                    </div>

                    <div className="text-sm font-mono tracking-[4px] font-bold">
                      4410 8904 1120 7741
                    </div>
                  </div>

                  <div className="flex justify-between items-end relative z-10 text-[9px] font-mono">
                    <div>
                      <div className="text-[7px] text-[#94a3b8] uppercase">Cardholder</div>
                      <div className="font-bold tracking-wide">{userName.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-[7px] text-[#94a3b8] uppercase">Security</div>
                      <div className="font-bold">CVV 812</div>
                    </div>
                    <div>
                      <div className="text-[7px] text-[#94a3b8] uppercase">Exp Date</div>
                      <div className="font-bold">12 / 31</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Lock card trigger widget button */}
              <button
                onClick={() => {
                  setIsCardLocked(!isCardLocked);
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer shadow ${
                  isCardLocked 
                    ? 'bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900 hover:text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
                }`}
              >
                {isCardLocked ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Authorize &amp; Defrost Card</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold-400" />
                    <span>Freeze Instant Card Lock</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Loan Pre-approval Form */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <div className="space-y-0.5 pb-2 border-b border-slate-850">
                <span className="text-[9px] bg-gold-400/10 text-gold-400 font-bold px-2 py-0.5 rounded uppercase border border-gold-400/25">
                  Pre-approved limit
                </span>
                <h4 className="font-display font-black text-sm text-white uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                  <PlusCircle className="w-4.5 h-4.5 text-primary-500" />
                  Rapid Capital Draw down
                </h4>
              </div>

              <form onSubmit={handleLoanApplication} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Campaign / Loan Theme
                  </label>
                  <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg text-xs p-2.5 text-slate-200 outline-none focus:border-gold-500"
                  >
                    <option>Auto Refinance Rate (3.99%)</option>
                    <option>30-Year Home Mortgage (5.875%)</option>
                    <option>Signature Personal Loan (7.99%)</option>
                    <option>SBA Small Business Capital (6.5%)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Requested Fund Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500 text-xs font-bold">$</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-gold-500 rounded-lg py-2 pl-7 pr-3 text-xs text-slate-100 placeholder-slate-705 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isApplyingLoan}
                  className="w-full bg-primary-700 hover:bg-primary-600 text-white font-extrabold text-[10px] uppercase tracking-wider py-2.5 rounded-lg active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex justify-center items-center gap-1"
                >
                  {isApplyingLoan ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Requesting Drawdown...</span>
                    </>
                  ) : (
                    <>
                      <span>Apply For Pre-qualification</span>
                    </>
                  )}
                </button>
              </form>

              {/* List of Applied loans */}
              {appliedLoans.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-850 text-[10px]">
                  <h5 className="font-bold text-slate-400 uppercase tracking-wider">Application Ledger</h5>
                  <div className="space-y-1.5">
                    {appliedLoans.map((loan) => (
                      <div key={loan.id} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-850">
                        <div>
                          <div className="font-bold text-slate-200 truncate max-w-[120px]">{loan.type.split(' ')[0]}</div>
                          <div className="text-slate-500">{loan.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-slate-350">{formatCurrency(loan.amount)}</div>
                          <span className={`font-bold uppercase tracking-wider text-[8px] ${
                            loan.status === 'Approved' ? 'text-emerald-450' : 'text-orange-400'
                          }`}>
                            {loan.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick FDIC disclosure */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start gap-2.5 text-[10px] text-slate-400 line-normal">
              <AlertCircle className="w-4.5 h-4.5 text-gold-400 flex-shrink-0" />
              <span>Federal statutory limits require account actions to be logged with audit keys. For security instructions, see the digital banking manual. Joint balances are covered to $500,000.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
