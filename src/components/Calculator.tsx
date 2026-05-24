/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Car, 
  Home, 
  PiggyBank, 
  TrendingUp, 
  HelpCircle,
  HelpCircleIcon,
  BadgeCent,
  CheckCircle
} from 'lucide-react';

export default function AppletCalculator() {
  const [calcType, setCalcType] = useState<'mortgage' | 'auto' | 'savings'>('mortgage');

  // Sliders states
  const [amount, setAmount] = useState(350000); // Mortgage amount or Auto loan or Savings Initial
  const [rate, setRate] = useState(5.875);      // Interest rate / APY
  const [term, setTerm] = useState(30);         // Term in Years

  // Extra features
  const [monthlyContribution, setMonthlyContribution] = useState(300); // For savings compound

  // Computed Outputs
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [nationalAveragePayment, setNationalAveragePayment] = useState(0);
  const [bitachonSavings, setBitachonSavings] = useState(0);

  useEffect(() => {
    if (calcType === 'mortgage' || calcType === 'auto') {
      const principle = amount;
      const monthlyRate = (rate / 100) / 12;
      const numberOfPayments = term * 12;

      if (monthlyRate === 0) {
        setMonthlyPayment(principle / numberOfPayments);
        setTotalInterest(0);
        setTotalPayout(principle);
        return;
      }

      const payment = principle * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalCost = payment * numberOfPayments;
      const interest = totalCost - principle;

      setMonthlyPayment(payment);
      setTotalInterest(interest);
      setTotalPayout(totalCost);

      // National Average rate difference
      const averageRateDiff = calcType === 'mortgage' ? 7.24 : 6.84;
      const natMonthlyRate = (averageRateDiff / 100) / 12;
      const averagePayment = principle * (natMonthlyRate * Math.pow(1 + natMonthlyRate, numberOfPayments)) / (Math.pow(1 + natMonthlyRate, numberOfPayments) - 1);
      
      setNationalAveragePayment(averagePayment);
      setBitachonSavings((averagePayment - payment) * numberOfPayments);
    } else {
      // Savings compound calculation: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
      const p = amount; // initial
      const r = rate / 100;
      const n = 12; // monthly compounding
      const t = term; // years

      const nt = n * t;
      const rn = r / n;

      const baseCompound = p * Math.pow(1 + rn, nt);
      const seriesCompound = monthlyContribution * ((Math.pow(1 + rn, nt) - 1) / rn);
      const finalBalance = baseCompound + seriesCompound;

      const totalDeposited = p + (monthlyContribution * nt);
      const earnedInterest = finalBalance - totalDeposited;

      setMonthlyPayment(finalBalance); // Represent final accumulated balance
      setTotalInterest(earnedInterest);
      setTotalPayout(totalDeposited);

      // National average compound savings (0.45% APY)
      const avgR = 0.45 / 100;
      const avgRn = avgR / n;
      const avgBaseCompound = p * Math.pow(1 + avgRn, nt);
      const avgSeriesCompound = monthlyContribution * ((Math.pow(1 + avgRn, nt) - 1) / avgRn);
      const avgFinalBalance = avgBaseCompound + avgSeriesCompound;

      setNationalAveragePayment(avgFinalBalance);
      setBitachonSavings(finalBalance - avgFinalBalance);
    }
  }, [calcType, amount, rate, term, monthlyContribution]);

  // Set default sliders when calculator switches
  const handleTypeChange = (type: 'mortgage' | 'auto' | 'savings') => {
    setCalcType(type);
    if (type === 'mortgage') {
      setAmount(380000);
      setRate(5.875);
      setTerm(30);
    } else if (type === 'auto') {
      setAmount(35000);
      setRate(3.99);
      setTerm(5);
    } else {
      setAmount(5000);
      setRate(4.85);
      setTerm(10);
    }
  };

  const formattedAmount = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const formattedCent = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(val);
  };

  return (
    <section id="calcs" className="py-14 sm:py-20 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-700 rounded-full text-xs font-bold tracking-wider uppercase font-display">
            <Calculator className="w-3.5 h-3.5" />
            Empowerment Simulator
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-snug">
            Run your numbers with absolute clarity
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Drag the parameters to compute instant payments, comparative savings, and interest margins optimized under Bank Bitachon policies.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="w-full sm:w-auto bg-slate-100 p-1 rounded-xl grid grid-cols-1 min-[420px]:grid-cols-3 gap-1 border border-slate-200">
            <button
              onClick={() => handleTypeChange('mortgage')}
              className={`min-h-11 flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                calcType === 'mortgage' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-250'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Mortgages</span>
            </button>
            <button
              onClick={() => handleTypeChange('auto')}
              className={`min-h-11 flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                calcType === 'auto' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-250'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Auto Loans</span>
            </button>
            <button
              onClick={() => handleTypeChange('savings')}
              className={`min-h-11 flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                calcType === 'savings' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-250'
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              <span>Compound Savings</span>
            </button>
          </div>
        </div>

        {/* Calculator Main Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-slate-50 p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          
          {/* Controls: Left Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-250/70 space-y-6">
              
              {/* Amount Slider */}
              <div className="space-y-2">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">
                    {calcType === 'savings' ? 'Initial Capital Deposit' : 'Total Amount to Finance'}
                  </span>
                  <span className="font-mono font-extrabold text-primary-700 bg-primary-50 px-3 py-1 rounded">
                    {formattedAmount(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcType === 'mortgage' ? 50000 : calcType === 'auto' ? 5000 : 500}
                  max={calcType === 'mortgage' ? 1500000 : calcType === 'auto' ? 120000 : 250000}
                  step={calcType === 'mortgage' ? 10000 : calcType === 'auto' ? 1000 : 100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-primary-600 cursor-pointer h-3 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                  <span>{calcType === 'mortgage' ? '$50K' : calcType === 'auto' ? '$5K' : '$500'}</span>
                  <span>{calcType === 'mortgage' ? '$1.5M' : calcType === 'auto' ? '$120K' : '$250K'}</span>
                </div>
              </div>

              {/* Monthly contribution (Savings only) */}
              {calcType === 'savings' && (
                <div className="space-y-2 mt-4">
                  <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-2 text-sm">
                    <span className="font-semibold text-slate-700">Monthly Added Contribution</span>
                    <span className="font-mono font-extrabold text-primary-700 bg-primary-50 px-3 py-1 rounded">
                      {formattedAmount(monthlyContribution)}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={50}
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full accent-primary-600 cursor-pointer h-3 bg-slate-100 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>$0</span>
                    <span>$5,000/mo</span>
                  </div>
                </div>
              )}

              {/* Rate Slider */}
              <div className="space-y-2">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">
                    {calcType === 'savings' ? 'Bitachon High-Yield APY' : 'Nominal Interest Rate (APR)'}
                  </span>
                  <span className="font-mono font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded">
                    {rate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={15}
                  step={0.125}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-3 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                  <span>0.1%</span>
                  <span>15.0%</span>
                </div>
              </div>

              {/* Term Slider */}
              <div className="space-y-2">
                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">Term Duration (Years)</span>
                  <span className="font-mono font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded">
                    {term} {term === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={calcType === 'mortgage' ? 30 : calcType === 'auto' ? 7 : 20}
                  step={1}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full accent-slate-700 cursor-pointer h-3 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
                  <span>1 yr</span>
                  <span>{calcType === 'mortgage' ? '30 yrs' : calcType === 'auto' ? '7 yrs' : '20 yrs'}</span>
                </div>
              </div>

            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center flex items-center justify-center gap-2 text-sm leading-relaxed text-blue-800">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              <span>Our <strong>Bitachon Lock-in Promise</strong> guarantees this rate is held securely for 45 calendar days.</span>
            </div>
          </div>

          {/* Outputs: Right Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-8 space-y-6 select-none relative overflow-hidden border border-slate-800">
              {/* Background accent ring */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-450/10 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="text-center space-y-2 pb-4 border-b border-slate-800">
                <div className="text-xs font-bold text-gold-400 uppercase tracking-widest leading-none">
                  {calcType === 'savings' ? 'Accumulated Total Balance' : 'Estimated Monthly Payment'}
                </div>
                <div className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight glow-effect">
                  {calcType === 'savings' ? formattedAmount(monthlyPayment) : formattedCent(monthlyPayment)}
                </div>
                <div className="text-xs text-slate-400">
                  {calcType === 'savings' ? `After compounding for ${term} years` : `Principal + interest payments`}
                </div>
              </div>

              {/* Sub outputs layout */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center gap-4 text-sm pb-3 border-b border-slate-800/60">
                  <span className="text-slate-400">{calcType === 'savings' ? 'Total Main Deposits' : 'Total principal paid'}</span>
                  <span className="font-mono font-bold text-slate-200">{formattedAmount(totalPayout)}</span>
                </div>
                
                <div className="flex justify-between items-center gap-4 text-sm pb-3 border-b border-slate-800/60">
                  <span className="text-slate-400">{calcType === 'savings' ? 'Accumulated Compound Yield' : 'Total interest cost over-life'}</span>
                  <span className="font-mono font-bold text-slate-200">{formattedCent(totalInterest)}</span>
                </div>

                <div className="flex flex-col min-[420px]:flex-row min-[420px]:justify-between min-[420px]:items-center gap-3 text-sm bg-emerald-950/40 p-4 rounded-xl border border-emerald-900/30">
                  <div className="space-y-0.5">
                    <span className="font-bold text-emerald-400 block uppercase tracking-wider text-xs">
                      Your Bank Bitachon Yield Surplus
                    </span>
                    <span className="text-xs text-slate-300">
                      Compared to the national average indices
                    </span>
                  </div>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    +{formattedAmount(bitachonSavings)}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3.5 bg-emerald-100 text-emerald-900 rounded-xl text-center space-y-1 border border-emerald-400/40"
                >
                  <div className="font-extrabold text-xs flex justify-center items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Estimated Rate Preview
                  </div>
                  <div className="text-[10px]">
                    Sign in to a secure portal before this can become a formal application.
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="text-xs text-slate-400 leading-relaxed italic text-center">
              *Calculations are models based on modern standards. APR and APY values reflect monthly compounding schedules. Actual finalized premium details will depend on client historical parameters.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
