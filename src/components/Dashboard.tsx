/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from '../data';
import { Account, Transaction } from '../types';
import visaLogo from '../assets/logos/visa.svg';
import {
  BadgeDollarSign,
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle,
  CircleHelp,
  Copy,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  Globe2,
  Home,
  History,
  Landmark,
  Menu,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
}

type DashboardPage =
  | 'home'
  | 'account'
  | 'transfer'
  | 'local-transfer'
  | 'wire-methods'
  | 'wire'
  | 'crypto-transfer'
  | 'paypal-transfer'
  | 'wise-transfer'
  | 'cash-app-transfer'
  | 'skrill-transfer'
  | 'venmo-transfer'
  | 'zelle-transfer'
  | 'revolut-transfer'
  | 'alipay-transfer'
  | 'wechat-transfer'
  | 'receive'
  | 'deposit'
  | 'request-money'
  | 'history'
  | 'cards'
  | 'loan-request'
  | 'tax-refund'
  | 'loan-history'
  | 'opportunities'
  | 'opportunity-detail'
  | 'settings'
  | 'support';

type Opportunity = {
  id: string;
  title: string;
  provider: string;
  category: string;
  deadline: string;
  amount: string;
  location: string;
  image: string;
  match: string;
  summary: string;
  tags: string[];
};

const pageTitles: Record<DashboardPage, { title: string; helper: string }> = {
  home: {
    title: 'What would you like to do today?',
    helper: 'Choose one action below.',
  },
  account: {
    title: 'Account Info',
    helper: 'See your account number, balance, and account type.',
  },
  transfer: {
    title: 'Send Money',
    helper: 'Choose how you want to send money.',
  },
  'local-transfer': {
    title: 'Local Transfer',
    helper: 'Send money to a local account.',
  },
  'wire-methods': {
    title: 'Select Transfer Method',
    helper: 'Choose how you want to send money out.',
  },
  wire: {
    title: 'Wire Transfer',
    helper: 'Send money to an international bank account.',
  },
  'crypto-transfer': {
    title: 'Cryptocurrency',
    helper: 'Send funds to your cryptocurrency wallet.',
  },
  'paypal-transfer': {
    title: 'PayPal',
    helper: 'Transfer funds to your PayPal account.',
  },
  'wise-transfer': {
    title: 'Wise Transfer',
    helper: 'Transfer with lower fees using Wise.',
  },
  'cash-app-transfer': {
    title: 'Cash App',
    helper: 'Quick transfers to your Cash App account.',
  },
  'skrill-transfer': {
    title: 'Skrill',
    helper: 'Transfer funds to your Skrill account.',
  },
  'venmo-transfer': {
    title: 'Venmo',
    helper: 'Send funds to your Venmo account.',
  },
  'zelle-transfer': {
    title: 'Zelle',
    helper: 'Quick transfers to your Zelle account.',
  },
  'revolut-transfer': {
    title: 'Revolut',
    helper: 'Transfer to your Revolut account with low fees.',
  },
  'alipay-transfer': {
    title: 'Alipay',
    helper: 'Send funds to your Alipay account.',
  },
  'wechat-transfer': {
    title: 'WeChat Pay',
    helper: 'Transfer to your WeChat Pay wallet.',
  },
  deposit: {
    title: 'Deposit Money',
    helper: 'Add money to your account.',
  },
  receive: {
    title: 'Receive Money',
    helper: 'Choose how money should come in.',
  },
  'request-money': {
    title: 'Request Money',
    helper: 'Ask someone to send money to you.',
  },
  history: {
    title: 'History',
    helper: 'See money that came in and money that went out.',
  },
  cards: {
    title: 'Virtual Cards',
    helper: 'Choose a card for online payments.',
  },
  'loan-request': {
    title: 'Loan Request',
    helper: 'Ask for a car, home, or personal loan.',
  },
  'tax-refund': {
    title: 'IRS Tax Refund',
    helper: 'Add refund details and track the deposit.',
  },
  'loan-history': {
    title: 'Loan History',
    helper: 'See loan balances and loan payments.',
  },
  opportunities: {
    title: 'Opportunities',
    helper: 'Browse scholarships, grants, and funding matches.',
  },
  'opportunity-detail': {
    title: 'Opportunity',
    helper: 'Review details, save it, or continue to apply.',
  },
  settings: {
    title: 'Settings',
    helper: 'Update basic account choices.',
  },
  support: {
    title: 'Support Ticket',
    helper: 'Ask for help from the support team.',
  },
};

const appMenuSections = [
  {
    label: 'Main Menu',
    items: [
      { id: 'home' as DashboardPage, label: 'Dashboard', icon: Home },
      { id: 'history' as DashboardPage, label: 'Transactions', icon: ReceiptText },
      { id: 'cards' as DashboardPage, label: 'Cards', icon: CreditCard },
    ],
  },
  {
    label: 'Transfers',
    items: [
      { id: 'local-transfer' as DashboardPage, label: 'Local Transfer', icon: Send },
      { id: 'wire-methods' as DashboardPage, label: 'Transfer Methods', icon: Globe2 },
      { id: 'receive' as DashboardPage, label: 'Receive Money', icon: Download },
    ],
  },
  {
    label: 'Services',
    items: [
      { id: 'opportunities' as DashboardPage, label: 'Opportunities', icon: Sparkles },
      { id: 'loan-request' as DashboardPage, label: 'Loan Request', icon: BadgeDollarSign },
      { id: 'tax-refund' as DashboardPage, label: 'IRS Tax Refund', icon: FileText },
      { id: 'loan-history' as DashboardPage, label: 'Loan History', icon: RotateCcw },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'settings' as DashboardPage, label: 'Settings', icon: Settings },
      { id: 'support' as DashboardPage, label: 'Support Ticket', icon: CircleHelp },
    ],
  },
];

const cardChoices = [
  {
    name: 'Visa',
    image: visaLogo,
    helper: 'Good for everyday online shopping.',
    gradient: 'from-slate-900 via-primary-950 to-slate-950',
  },
  {
    name: 'Mastercard',
    image: 'https://cdn.simpleicons.org/mastercard/ffffff',
    helper: 'Good for travel and subscriptions.',
    gradient: 'from-slate-900 via-red-950 to-slate-950',
  },
  {
    name: 'American Express',
    image: 'https://cdn.simpleicons.org/americanexpress/ffffff',
    helper: 'Good for larger planned purchases.',
    gradient: 'from-slate-900 via-sky-950 to-slate-950',
  },
];

const mainTransferMethods = [
  {
    id: 'wire' as DashboardPage,
    title: 'Wire Transfer',
    helper: 'Transfer funds directly to international bank accounts.',
    icon: Globe2,
  },
  {
    id: 'crypto-transfer' as DashboardPage,
    title: 'Cryptocurrency',
    helper: 'Send funds to your cryptocurrency wallet.',
    icon: Wallet,
  },
  {
    id: 'paypal-transfer' as DashboardPage,
    title: 'PayPal',
    helper: 'Transfer funds to your PayPal account.',
    icon: BadgeDollarSign,
  },
  {
    id: 'wise-transfer' as DashboardPage,
    title: 'Wise Transfer',
    helper: 'Transfer with lower fees using Wise.',
    icon: Send,
  },
  {
    id: 'cash-app-transfer' as DashboardPage,
    title: 'Cash App',
    helper: 'Quick transfers to your Cash App account.',
    icon: Plus,
  },
];

const moreTransferMethods = [
  {
    id: 'skrill-transfer' as DashboardPage,
    title: 'Skrill',
    helper: 'Transfer funds to your Skrill account.',
    icon: Wallet,
  },
  {
    id: 'venmo-transfer' as DashboardPage,
    title: 'Venmo',
    helper: 'Send funds to your Venmo account.',
    icon: Send,
  },
  {
    id: 'zelle-transfer' as DashboardPage,
    title: 'Zelle',
    helper: 'Quick transfers to your Zelle account.',
    icon: ArrowRight,
  },
  {
    id: 'revolut-transfer' as DashboardPage,
    title: 'Revolut',
    helper: 'Transfer to your Revolut account with low fees.',
    icon: CreditCard,
  },
  {
    id: 'alipay-transfer' as DashboardPage,
    title: 'Alipay',
    helper: 'Send funds to your Alipay account.',
    icon: ReceiptText,
  },
  {
    id: 'wechat-transfer' as DashboardPage,
    title: 'WeChat Pay',
    helper: 'Transfer to your WeChat Pay wallet.',
    icon: Wallet,
  },
];

const transferMethodPages = [...mainTransferMethods, ...moreTransferMethods]
  .filter((method) => method.id !== 'wire')
  .map((method) => method.id);

const wireCountries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const moneyPages: DashboardPage[] = ['local-transfer', 'deposit', 'wire', 'request-money', ...transferMethodPages];

const opportunities: Opportunity[] = [
  {
    id: 'mastercard-foundation-scholars',
    title: 'Mastercard Foundation Scholars Program',
    provider: 'Mastercard Foundation partner universities',
    category: 'Fully funded scholarship',
    deadline: 'Rolling university deadlines',
    amount: 'Tuition, housing, stipend',
    location: 'Africa, Canada, UK, US',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=85',
    match: '96% match',
    summary: 'For high-achieving young leaders seeking undergraduate or graduate study with leadership development support.',
    tags: ['Scholarship', 'Leadership', 'Undergraduate', 'Graduate'],
  },
  {
    id: 'chevening-scholarship',
    title: 'Chevening Scholarship',
    provider: 'UK Government',
    category: 'Graduate scholarship',
    deadline: 'Applications open annually',
    amount: 'Full tuition plus living support',
    location: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85',
    match: '91% match',
    summary: 'A one-year master’s scholarship for emerging leaders with strong academic and professional potential.',
    tags: ['Masters', 'Leadership', 'UK', 'Fully funded'],
  },
  {
    id: 'erasmus-mundus-joint-masters',
    title: 'Erasmus Mundus Joint Masters',
    provider: 'European Union',
    category: 'International masters',
    deadline: 'Program-specific deadlines',
    amount: 'Tuition, travel, monthly stipend',
    location: 'Europe',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85',
    match: '88% match',
    summary: 'Study across multiple European universities with an integrated international degree pathway.',
    tags: ['Masters', 'Europe', 'Travel grant', 'Global'],
  },
  {
    id: 'google-career-cert-scholarship',
    title: 'Google Career Certificate Scholarship',
    provider: 'Google and partner nonprofits',
    category: 'Skills scholarship',
    deadline: 'Cohort-based',
    amount: 'Certificate access and career support',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85',
    match: '84% match',
    summary: 'Short professional training paths in data analytics, cybersecurity, IT support, UX, and project management.',
    tags: ['Online', 'Career', 'Tech', 'Certificate'],
  },
  {
    id: 'african-development-bank-internship',
    title: 'African Development Bank Internship',
    provider: 'African Development Bank Group',
    category: 'Paid internship',
    deadline: 'Multiple annual windows',
    amount: 'Monthly stipend',
    location: 'Regional offices',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    match: '82% match',
    summary: 'Professional exposure for students and recent graduates interested in development finance and policy.',
    tags: ['Internship', 'Finance', 'Development', 'Graduate'],
  },
  {
    id: 'orange-social-venture-prize',
    title: 'Orange Social Venture Prize',
    provider: 'Orange',
    category: 'Startup grant',
    deadline: 'Annual challenge',
    amount: 'Grant funding and mentorship',
    location: 'Africa and Middle East',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=85',
    match: '79% match',
    summary: 'Funding and visibility for entrepreneurs building technology-driven social impact ventures.',
    tags: ['Grant', 'Startup', 'Social impact', 'Founder'],
  },
];

export default function Dashboard({ userName, onLogout, setActiveTab }: DashboardProps) {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [page, setPage] = useState<DashboardPage>('home');
  const [showBalance, setShowBalance] = useState(true);
  const [now, setNow] = useState(new Date());
  const [fromAccountId, setFromAccountId] = useState('ac1');
  const [toAccountId, setToAccountId] = useState('ac2');
  const [sendAmount, setSendAmount] = useState('');
  const [depositAccountId, setDepositAccountId] = useState('ac1');
  const [depositAmount, setDepositAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transferPin, setTransferPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [isPinGateOpen, setIsPinGateOpen] = useState(false);
  const [pendingTransferAction, setPendingTransferAction] = useState<'send' | 'deposit' | null>(null);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(opportunities[0].id);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setTransferPin(localStorage.getItem('bankbitachon_transfer_pin') || '');
  }, []);

  useEffect(() => {
    const syncPageFromHash = () => {
      const hashValue = window.location.hash.replace('#dashboard-', '');
      if (hashValue.startsWith('opportunity-')) {
        const opportunityId = hashValue.replace('opportunity-', '');
        if (opportunities.some((item) => item.id === opportunityId)) {
          setSelectedOpportunityId(opportunityId);
          setPage('opportunity-detail');
        }
        return;
      }

      const hashPage = hashValue as DashboardPage;
      if (Object.keys(pageTitles).includes(hashPage)) {
        setPage(hashPage);
      }
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);
    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  const openPage = (nextPage: DashboardPage) => {
    setPage(nextPage);
    setIsMobileMenuOpen(false);
    window.history.replaceState(null, '', `#dashboard-${nextPage}`);
  };

  const openOpportunity = (opportunityId: string) => {
    setSelectedOpportunityId(opportunityId);
    setPage('opportunity-detail');
    setIsMobileMenuOpen(false);
    window.history.replaceState(null, '', `#dashboard-opportunity-${opportunityId}`);
  };

  const primaryAccount = accounts.find((acc) => acc.id === 'ac1') || accounts[0];
  const totalBalance = useMemo(
    () => accounts.reduce((sum, account) => sum + Math.max(account.balance, 0), 0),
    [accounts],
  );

  const formatMoney = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const isMoneyPage = moneyPages.includes(page);
  const isPopupPage = isMoneyPage || page === 'account';
  const selectedOpportunity = opportunities.find((item) => item.id === selectedOpportunityId) || opportunities[0];

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 4500);
  };

  const updateAccountBalance = (accountId: string, amountChange: number) => {
    setAccounts((current) =>
      current.map((account) =>
        account.id === accountId ? { ...account, balance: account.balance + amountChange } : account,
      ),
    );
  };

  const checkTransferPin = () => {
    if (!transferPin) {
      if (!/^\d{4}$/.test(newPin)) {
        showMessage('Set a 4 digit transfer PIN first.');
        return false;
      }
      localStorage.setItem('bankbitachon_transfer_pin', newPin);
      setTransferPin(newPin);
      setPinInput('');
      setNewPin('');
      showMessage('Transfer PIN saved.');
      return true;
    }

    if (pinInput !== transferPin) {
      showMessage('Wrong transfer PIN. Try again.');
      return false;
    }

    return true;
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    setTransactions((current) => [
      {
        id: `tx_${Date.now()}`,
        date: 'Today',
        status: 'Completed',
        ...transaction,
      },
      ...current,
    ]);
  };

  const runSendMoney = () => {
    const amount = Number(sendAmount);
    const fromAccount = accounts.find((account) => account.id === fromAccountId);
    const toAccount = accounts.find((account) => account.id === toAccountId);

    if (!fromAccount || !toAccount) {
      showMessage('Choose two accounts first.');
      return;
    }

    if (fromAccountId === toAccountId) {
      showMessage('Choose a different account to send to.');
      return;
    }

    if (!amount || amount <= 0) {
      showMessage('Enter an amount greater than $0.');
      return;
    }

    if (fromAccount.balance < amount) {
      showMessage('You do not have enough money in that account.');
      return;
    }

    setIsWorking(true);
    window.setTimeout(() => {
      updateAccountBalance(fromAccountId, -amount);
      updateAccountBalance(toAccountId, amount);
      addTransaction({
        description: `Sent money to ${toAccount.name}`,
        category: 'Transfer',
        amount: -amount,
      });
      setSendAmount('');
      setPinInput('');
      setIsWorking(false);
      showMessage(`Done. You sent ${formatMoney(amount)}.`);
    }, 700);
  };

  const runDeposit = () => {
    const amount = Number(depositAmount);
    const account = accounts.find((item) => item.id === depositAccountId);

    if (!account) {
      showMessage('Choose an account first.');
      return;
    }

    if (!amount || amount <= 0) {
      showMessage('Enter an amount greater than $0.');
      return;
    }

    setIsWorking(true);
    window.setTimeout(() => {
      updateAccountBalance(depositAccountId, amount);
      addTransaction({
        description: `Deposit to ${account.name}`,
        category: 'Income',
        amount,
      });
      setDepositAmount('');
      setPinInput('');
      setIsWorking(false);
      showMessage(`Done. You added ${formatMoney(amount)}.`);
    }, 700);
  };

  const handleSendMoney = (event: React.FormEvent) => {
    event.preventDefault();
    setPendingTransferAction('send');
    setIsPinGateOpen(true);
  };

  const handleDeposit = (event: React.FormEvent) => {
    event.preventDefault();
    setPendingTransferAction('deposit');
    setIsPinGateOpen(true);
  };

  const confirmTransferPin = () => {
    if (!checkTransferPin()) return;
    setIsPinGateOpen(false);
    if (pendingTransferAction === 'send') {
      runSendMoney();
    }
    if (pendingTransferAction === 'deposit') {
      runDeposit();
    }
    setPendingTransferAction(null);
  };

  const actions = [
    {
      id: 'account' as DashboardPage,
      title: 'Account Info',
      helper: 'See your details',
      icon: Building2,
      className: 'bg-slate-950/70 text-white border-slate-800 hover:border-gold-400/50',
      iconClassName: 'bg-slate-900 text-gold-400 border border-slate-700',
    },
    {
      id: 'transfer' as DashboardPage,
      title: 'Send Money',
      helper: 'Local or wire',
      icon: Send,
      className: 'bg-primary-950/70 text-white border-primary-800 hover:border-primary-400/70',
      iconClassName: 'bg-primary-900/70 text-primary-300 border border-primary-700',
    },
    {
      id: 'receive' as DashboardPage,
      title: 'Receive Money',
      helper: 'Deposit or request',
      icon: Plus,
      className: 'bg-emerald-950/45 text-white border-emerald-800/70 hover:border-emerald-400/70',
      iconClassName: 'bg-emerald-900/70 text-emerald-300 border border-emerald-700',
    },
    {
      id: 'history' as DashboardPage,
      title: 'History',
      helper: 'See activity',
      icon: History,
      className: 'bg-gold-400/10 text-white border-gold-400/30 hover:border-gold-300/70',
      iconClassName: 'bg-gold-400/15 text-gold-300 border border-gold-400/30',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-pattern pb-24 pt-6 text-white sm:py-8">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <AppSidebar page={page} openPage={openPage} onHome={() => setActiveTab('home')} onLogout={onLogout} />
        <div className="min-w-0 flex-1">
        <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400 text-slate-950">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black">BankBitachon</p>
              <p className="text-xs text-slate-400">{pageTitles[page].title}</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-200"
            aria-label="Open app menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <MobileAppMenu
          isOpen={isMobileMenuOpen}
          page={page}
          openPage={openPage}
          onClose={() => setIsMobileMenuOpen(false)}
          onHome={() => setActiveTab('home')}
          onLogout={onLogout}
          userName={userName}
        />

        <TransferPinGate
          isOpen={isPinGateOpen}
          transferPin={transferPin}
          pinInput={pinInput}
          setPinInput={setPinInput}
          newPin={newPin}
          setNewPin={setNewPin}
          onCancel={() => {
            setIsPinGateOpen(false);
            setPendingTransferAction(null);
          }}
          onConfirm={confirmTransferPin}
        />

        {page === 'home' && (
        <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 p-6 text-white shadow-2xl shadow-black/30 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_66%,rgba(241,207,76,0.13),transparent_28%)]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="relative z-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold-400/25 bg-slate-950/70 text-xl font-black text-gold-300">
                  {userName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gold-300">Good {now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'}</p>
                  <h1 className="text-xl font-black sm:text-2xl">{userName || 'Customer'}</h1>
                </div>
              </div>

              <div className="hidden text-left sm:text-right" />
            </div>

            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-200">Available balance</p>
                <div className="mt-2 flex items-center gap-3">
                  <p className="text-4xl font-black tracking-tight text-gold-300 sm:text-5xl">
                    {showBalance ? formatMoney(totalBalance) : '••••••'}
                  </p>
                  <button
                    onClick={() => setShowBalance((value) => !value)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                    aria-label={showBalance ? 'Hide balance' : 'Show balance'}
                  >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 backdrop-blur-md sm:p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gold-400/12 p-3 text-gold-300">
                    <Wallet className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80">Main account</p>
                    <p className="mt-1 text-2xl font-black">72966750489</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openPage('history')}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-black text-slate-100 shadow-sm hover:border-gold-400/60"
                  >
                    <ReceiptText className="h-5 w-5" />
                    Transactions
                  </button>
                  <button
                    onClick={() => openPage('receive')}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gold-400 px-4 text-sm font-black text-slate-950 shadow-sm hover:bg-gold-300"
                  >
                    <CreditCard className="h-5 w-5" />
                    Top up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {message && (
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-bold text-emerald-200">
            <CheckCircle className="h-5 w-5" />
            {message}
          </div>
        )}

        <section className={`mt-6 rounded-[1.5rem] border border-slate-800 bg-slate-900/80 p-5 shadow-sm shadow-black/20 sm:p-7 ${
          isPopupPage ? 'lg:fixed lg:inset-0 lg:z-40 lg:m-0 lg:flex lg:items-center lg:justify-center lg:border-0 lg:bg-slate-950/75 lg:p-8 lg:backdrop-blur-md' : ''
        }`}>
          <div className={isPopupPage ? 'max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/40 sm:p-7' : ''}>
          {page !== 'home' && page !== 'account' && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <button
                onClick={() => openPage('home')}
                className="inline-flex min-h-10 items-center rounded-full bg-slate-800 px-4 text-sm font-bold text-slate-200 hover:bg-slate-700"
              >
                Back
              </button>
              <span className="text-sm font-black text-gold-300">{pageTitles[page].title}</span>
            </div>
          )}

          {page !== 'account' && (
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-white">
              {pageTitles[page].title}
            </h2>
            <p className="mt-2 text-base text-slate-300">{pageTitles[page].helper}</p>
          </div>
          )}

          {page === 'home' && (
            <>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => openPage(action.id)}
                    className={`min-h-36 rounded-2xl border p-3 text-center shadow-sm shadow-black/20 transition-transform hover:-translate-y-0.5 sm:min-h-44 sm:p-5 ${action.className}`}
                  >
                    <span className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full sm:h-16 sm:w-16 ${action.iconClassName}`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </span>
                    <span className="block text-base font-black sm:text-xl">{action.title}</span>
                    <span className="mt-1 block text-xs font-semibold opacity-70 sm:mt-2 sm:text-sm">{action.helper}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.85fr]">
              <VirtualCardPromo onApply={() => openPage('cards')} />
              <RecentHistory transactions={transactions.slice(0, 2)} formatMoney={formatMoney} onViewAll={() => openPage('history')} />
            </div>
            <AiOpportunityRecommendations
              opportunities={opportunities.slice(0, 5)}
              onOpenOpportunity={openOpportunity}
              onViewMore={() => openPage('opportunities')}
            />
            </>
          )}

          {page === 'account' && <AccountInfo accounts={accounts} formatMoney={formatMoney} userName={userName} onClose={() => openPage('home')} />}

          {page === 'transfer' && <TransferChoicePage openPage={openPage} />}

          {page === 'wire-methods' && <TransferMethodPage openPage={openPage} />}

          {page === 'receive' && <ReceiveChoicePage openPage={openPage} />}

          {page === 'local-transfer' && (
            <MoneyForm
              accounts={accounts}
              amount={sendAmount}
              setAmount={setSendAmount}
              fromAccountId={fromAccountId}
              setFromAccountId={setFromAccountId}
              toAccountId={toAccountId}
              setToAccountId={setToAccountId}
              isWorking={isWorking}
              onSubmit={handleSendMoney}
              formatMoney={formatMoney}
              transferPin={transferPin}
              pinInput={pinInput}
              setPinInput={setPinInput}
              newPin={newPin}
              setNewPin={setNewPin}
            />
          )}

          {page === 'deposit' && (
            <DepositForm
              accounts={accounts}
              amount={depositAmount}
              setAmount={setDepositAmount}
              accountId={depositAccountId}
              setAccountId={setDepositAccountId}
              isWorking={isWorking}
              onSubmit={handleDeposit}
              formatMoney={formatMoney}
              transferPin={transferPin}
              pinInput={pinInput}
              setPinInput={setPinInput}
              newPin={newPin}
              setNewPin={setNewPin}
            />
          )}

          {page === 'history' && <HistoryList transactions={transactions} formatMoney={formatMoney} />}

          {page === 'cards' && <VirtualCardPage />}

          {page === 'wire' && (
            <WireForm
              accounts={accounts}
              fromAccountId={fromAccountId}
              setFromAccountId={setFromAccountId}
              amount={sendAmount}
              setAmount={setSendAmount}
              transferPin={transferPin}
              pinInput={pinInput}
              setPinInput={setPinInput}
              newPin={newPin}
              setNewPin={setNewPin}
              isWorking={isWorking}
              formatMoney={formatMoney}
              onSubmit={handleSendMoney}
            />
          )}

          {transferMethodPages.includes(page) && (
            <ExternalTransferForm
              method={pageTitles[page]}
              accounts={accounts}
              fromAccountId={fromAccountId}
              setFromAccountId={setFromAccountId}
              amount={sendAmount}
              setAmount={setSendAmount}
              transferPin={transferPin}
              pinInput={pinInput}
              setPinInput={setPinInput}
              newPin={newPin}
              setNewPin={setNewPin}
              isWorking={isWorking}
              formatMoney={formatMoney}
              onSubmit={handleSendMoney}
            />
          )}

          {page === 'request-money' && <SimpleServicePage title="Request money" buttonLabel="Send request" fields={['Who should pay?', 'Amount', 'Note']} />}

          {page === 'loan-request' && <SimpleServicePage title="Loan request" buttonLabel="Send request" fields={['Loan type', 'Amount needed', 'Reason']} />}

          {page === 'tax-refund' && <SimpleServicePage title="IRS tax refund" buttonLabel="Save refund info" fields={['IRS tracking number', 'Expected amount', 'Deposit account']} />}

          {page === 'loan-history' && <LoanHistory accounts={accounts} formatMoney={formatMoney} />}

          {page === 'opportunities' && (
            <OpportunitiesPage opportunities={opportunities} onOpenOpportunity={openOpportunity} />
          )}

          {page === 'opportunity-detail' && (
            <OpportunityDetail opportunity={selectedOpportunity} onBack={() => openPage('opportunities')} />
          )}

          {page === 'settings' && <SimpleServicePage title="Settings" buttonLabel="Save settings" fields={['Email alerts', 'Default account', 'Display name']} />}

          {page === 'support' && <SimpleServicePage title="Support ticket" buttonLabel="Send ticket" fields={['What happened?', 'Best contact email', 'Message']} />}
          </div>
        </section>
        <MobileBottomNav page={page} openPage={openPage} />
        </div>
      </div>
    </div>
  );
}

function AppSidebar({
  page,
  openPage,
  onHome,
  onLogout,
}: {
  page: DashboardPage;
  openPage: (page: DashboardPage) => void;
  onHome: () => void;
  onLogout: () => void;
}) {
  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 rounded-3xl border border-slate-800 bg-slate-900/85 p-4 shadow-2xl shadow-black/30 lg:block">
      <div className="mb-7 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-slate-950">
          <Landmark className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-black">BankBitachon</p>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Account app</p>
        </div>
      </div>
      <AppMenuList page={page} openPage={openPage} />
      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-slate-800 pt-4">
        <button onClick={onHome} className="min-h-10 rounded-xl border border-slate-800 text-sm font-bold text-slate-300 hover:border-gold-400/60">
          Home
        </button>
        <button onClick={onLogout} className="min-h-10 rounded-xl bg-gold-400 text-sm font-black text-slate-950 hover:bg-gold-300">
          Sign out
        </button>
      </div>
    </aside>
  );
}

function MobileAppMenu({
  isOpen,
  page,
  openPage,
  onClose,
  onHome,
  onLogout,
  userName,
}: {
  isOpen: boolean;
  page: DashboardPage;
  openPage: (page: DashboardPage) => void;
  onClose: () => void;
  onHome: () => void;
  onLogout: () => void;
  userName: string;
}) {
  if (!isOpen) return null;

  const tileItems = [
    { id: 'home' as DashboardPage, label: 'Home', icon: Home, tone: 'bg-primary-500/90 border-primary-300/30 text-white' },
    { id: 'history' as DashboardPage, label: 'Activity', icon: ReceiptText, tone: 'bg-emerald-500/85 border-emerald-300/30 text-slate-950' },
    { id: 'cards' as DashboardPage, label: 'Cards', icon: CreditCard, tone: 'bg-primary-500/90 border-primary-300/30 text-white' },
    { id: 'opportunities' as DashboardPage, label: 'Opportunities', icon: Sparkles, tone: 'bg-gold-400/90 border-gold-200/40 text-slate-950' },
    { id: 'transfer' as DashboardPage, label: 'Transfer', icon: Send, tone: 'bg-emerald-500/85 border-emerald-300/30 text-slate-950' },
    { id: 'wire-methods' as DashboardPage, label: 'Methods', icon: Globe2, tone: 'bg-emerald-500/85 border-emerald-300/30 text-slate-950' },
    { id: 'receive' as DashboardPage, label: 'Receive', icon: Download, tone: 'bg-primary-500/90 border-primary-300/30 text-white' },
    { id: 'loan-request' as DashboardPage, label: 'Loan', icon: BadgeDollarSign, tone: 'bg-emerald-500/85 border-emerald-300/30 text-slate-950' },
    { id: 'tax-refund' as DashboardPage, label: 'IRS Refund', icon: FileText, tone: 'bg-primary-500/90 border-primary-300/30 text-white' },
    { id: 'settings' as DashboardPage, label: 'Settings', icon: Settings, tone: 'bg-primary-500/90 border-primary-300/30 text-white' },
    { id: 'support' as DashboardPage, label: 'Support', icon: CircleHelp, tone: 'bg-emerald-500/85 border-emerald-300/30 text-slate-950' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm lg:hidden">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gold-400/40 bg-slate-950 text-xl font-black text-gold-300">
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-black text-white">{userName || 'Customer'}</p>
              <p className="text-sm font-semibold text-slate-400">Account: 72966750489</p>
              <span className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-300">
                Verified
              </span>
            </div>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-6 border-t border-slate-800" />

        <div className="mb-5 text-center">
          <h2 className="text-2xl font-black text-white">Banking Menu</h2>
          <p className="mt-1 text-sm text-slate-400">Select an option to continue.</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {tileItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === page;
            return (
              <button
                key={item.id}
                onClick={() => openPage(item.id)}
                className={`min-h-28 rounded-2xl border p-3 text-center shadow-lg shadow-black/20 ${item.tone} ${
                  isActive ? 'ring-2 ring-gold-300' : ''
                }`}
              >
                <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="block text-sm font-black">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={onLogout}
            className="min-h-28 rounded-2xl border border-pink-300/20 bg-pink-400/10 p-3 text-center text-pink-200 shadow-lg shadow-black/20"
          >
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-pink-600">
              <ArrowRight className="h-6 w-6" />
            </span>
            <span className="block text-sm font-black">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileBottomNav({
  page,
  openPage,
}: {
  page: DashboardPage;
  openPage: (page: DashboardPage) => void;
}) {
  const bottomItems = [
    { id: 'home' as DashboardPage, label: 'Home', icon: Home },
    { id: 'transfer' as DashboardPage, label: 'Send', icon: Send },
    { id: 'cards' as DashboardPage, label: 'Cards', icon: CreditCard },
    { id: 'history' as DashboardPage, label: 'History', icon: ReceiptText },
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-slate-700 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4 gap-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.id === page || (item.id === 'transfer' && ['wire-methods', 'wire', ...transferMethodPages].includes(page));
          return (
            <button
              key={item.id}
              onClick={() => openPage(item.id)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-xl text-xs font-black transition-colors ${
                isActive ? 'bg-gold-400 text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function AppMenuList({
  page,
  openPage,
}: {
  page: DashboardPage;
  openPage: (page: DashboardPage) => void;
}) {
  return (
    <nav className="space-y-6">
      {appMenuSections.map((section) => (
        <div key={section.label}>
          <p className="mb-2 px-2 text-xs font-black uppercase tracking-widest text-slate-500">{section.label}</p>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === page;
              return (
                <button
                  key={item.id}
                  onClick={() => openPage(item.id)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-slate-950'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function RecentHistory({
  transactions,
  formatMoney,
  onViewAll,
}: {
  transactions: Transaction[];
  formatMoney: (value: number) => string;
  onViewAll: () => void;
}) {
  return (
    <div className="rounded-2xl border border-primary-700/50 bg-primary-950/35 p-4 shadow-lg shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white">Recent history</h3>
          <p className="text-sm text-slate-400">Latest account activity.</p>
        </div>
        <button onClick={onViewAll} className="rounded-full border border-slate-700 px-3 py-2 text-xs font-black text-gold-300 hover:border-gold-400">
          View all
        </button>
      </div>
      <HistoryList transactions={transactions} formatMoney={formatMoney} compact variant="soft" />
    </div>
  );
}

function VirtualCardPromo({ onApply }: { onApply: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 p-5">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-gold-400/10 blur-2xl" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-2">
          {cardChoices.map((card) => (
            <span key={card.name} className="flex h-9 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/8 p-2">
              <img src={card.image} alt={card.name} className="max-h-5 max-w-10 object-contain" />
            </span>
          ))}
        </div>
        <h3 className="text-xl font-black text-white">Virtual cards</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Make a card for online payments. Pick Visa, Mastercard, or American Express.
        </p>
        <button
          onClick={onApply}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 hover:bg-gold-300"
        >
          Apply now
        </button>
      </div>
    </div>
  );
}

function AiOpportunityRecommendations({
  opportunities,
  onOpenOpportunity,
  onViewMore,
}: {
  opportunities: Opportunity[];
  onOpenOpportunity: (id: string) => void;
  onViewMore: () => void;
}) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-lg shadow-black/20 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-slate-950">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gold-300">AI recommendations</p>
            <h3 className="mt-1 text-xl font-black text-white">Here are opportunities that fit you</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              I found these as quick shortcuts. Open any card to view the full opportunity page, save it, or apply.
            </p>
          </div>
        </div>
        <button
          onClick={onViewMore}
          className="shrink-0 rounded-full border border-slate-700 px-3 py-2 text-xs font-black text-gold-300 hover:border-gold-400"
        >
          View more
        </button>
      </div>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:-mx-5 sm:px-5">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onOpen={() => onOpenOpportunity(opportunity.id)}
            layout="rail"
          />
        ))}
      </div>
    </section>
  );
}

function OpportunitiesPage({
  opportunities,
  onOpenOpportunity,
}: {
  opportunities: Opportunity[];
  onOpenOpportunity: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gold-400/25 bg-gold-400/10 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gold-300">Opportunity app</p>
            <h3 className="mt-1 text-2xl font-black text-white">Recommended cards</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Cards stay compact here. Details, eligibility, save, and apply actions live on the opportunity page.
            </p>
          </div>
          <div className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm font-bold text-slate-300">
            <Search className="h-4 w-4 text-gold-300" />
            Browse matches
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onOpen={() => onOpenOpportunity(opportunity.id)}
          />
        ))}
      </div>
    </div>
  );
}

function OpportunityCard({
  opportunity,
  onOpen,
  layout = 'grid',
}: {
  key?: React.Key;
  opportunity: Opportunity;
  onOpen: () => void;
  layout?: 'grid' | 'rail';
}) {
  return (
    <button
      onClick={onOpen}
      className={`group snap-start overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-gold-400/70 ${
        layout === 'rail' ? 'w-[78vw] shrink-0 sm:w-72 lg:w-80' : 'w-full'
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img src={opportunity.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-black text-gold-300 backdrop-blur">
          {opportunity.match}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-950">
          {opportunity.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">{opportunity.provider}</p>
        <h4 className="mt-2 line-clamp-2 min-h-12 text-lg font-black leading-6 text-white">{opportunity.title}</h4>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
          <span className="rounded-full bg-slate-950 px-2.5 py-1">{opportunity.amount}</span>
          <span className="rounded-full bg-slate-950 px-2.5 py-1">{opportunity.deadline}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-800 pt-3">
          <span className="text-sm font-bold text-slate-400">{opportunity.location}</span>
          <span className="inline-flex items-center gap-1 text-sm font-black text-gold-300">
            View <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

function OpportunityDetail({
  opportunity,
  onBack,
}: {
  opportunity: Opportunity;
  onBack: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <div className="relative min-h-72 overflow-hidden">
        <img src={opportunity.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/10" />
        <button
          onClick={onBack}
          className="absolute left-4 top-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950/80 px-4 text-sm font-black text-white backdrop-blur hover:bg-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="text-xs font-black uppercase tracking-widest text-gold-300">{opportunity.provider}</p>
          <h3 className="mt-2 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">{opportunity.title}</h3>
        </div>
      </div>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_18rem]">
        <div>
          <div className="flex flex-wrap gap-2">
            {opportunity.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-black text-slate-300">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-5 text-base leading-7 text-slate-300">{opportunity.summary}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['Award', opportunity.amount],
              ['Deadline', opportunity.deadline],
              ['Location', opportunity.location],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl border border-gold-400/25 bg-gold-400/10 p-4">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 text-slate-950">
            <BookOpen className="h-6 w-6" />
          </div>
          <p className="text-sm font-black text-gold-200">{opportunity.match}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            This page is where the full application workflow belongs, so AI responses stay short and card-based.
          </p>
          <button className="mt-5 min-h-12 w-full rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 hover:bg-gold-300">
            Apply now
          </button>
          <button className="mt-3 min-h-12 w-full rounded-xl border border-slate-700 px-5 text-sm font-black text-slate-200 hover:border-gold-400">
            Save opportunity
          </button>
        </aside>
      </div>
    </div>
  );
}

function VirtualCardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cardChoices.map((card) => (
        <div key={card.name} className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.gradient} p-5`}>
          <div className="mb-8 flex h-12 items-center">
            <img src={card.image} alt={card.name} className="max-h-8 max-w-28 object-contain" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Virtual card</p>
          <h3 className="mt-2 text-2xl font-black text-white">{card.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{card.helper}</p>
          <button className="mt-6 min-h-11 w-full rounded-xl bg-gold-400 px-4 text-sm font-black text-slate-950 hover:bg-gold-300">
            Choose {card.name}
          </button>
        </div>
      ))}
    </div>
  );
}

function TransferChoicePage({ openPage }: { openPage: (page: DashboardPage) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChoiceCard
        icon={Send}
        title="Local transfer"
        helper="Send money to another account in your country."
        buttonLabel="Send local"
        onClick={() => openPage('local-transfer')}
      />
      <ChoiceCard
        icon={Globe2}
        title="International and apps"
        helper="Pick wire, PayPal, Wise, Cash App, crypto, and more."
        buttonLabel="See methods"
        onClick={() => openPage('wire-methods')}
      />
    </div>
  );
}

function TransferMethodPage({ openPage }: { openPage: (page: DashboardPage) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-black text-white">Select Transfer Method</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">Choose where you want the money to go.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {mainTransferMethods.map((method) => (
          <TransferMethodCard key={method.id} method={method} onClick={() => openPage(method.id)} />
        ))}
      </div>
      <div className="rounded-2xl border border-gold-400/25 bg-gold-400/10 p-4">
        <p className="text-sm font-black text-gold-200">More Options</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">Zelle, Venmo, Revolut, and more.</p>
      </div>
      <div>
        <h3 className="text-xl font-black text-white">Additional Transfer Methods</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {moreTransferMethods.map((method) => (
            <TransferMethodCard key={method.id} method={method} onClick={() => openPage(method.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

type TransferMethodCardProps = {
  key?: React.Key;
  method: {
    id: DashboardPage;
    title: string;
    helper: string;
    icon: React.ElementType;
  };
  onClick: () => void;
};

const TransferMethodCard = ({ method, onClick }: TransferMethodCardProps) => {
  const Icon = method.icon;
  return (
    <button
      onClick={onClick}
      className="group flex min-h-28 items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left transition-colors hover:border-gold-400/60 hover:bg-slate-900"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-200 ring-1 ring-primary-400/20 group-hover:bg-gold-400 group-hover:text-slate-950">
        <Icon className="h-6 w-6" />
      </span>
      <span>
        <span className="block text-base font-black text-white">{method.title}</span>
        <span className="mt-1 block text-sm leading-6 text-slate-400">{method.helper}</span>
      </span>
    </button>
  );
};

function ReceiveChoicePage({ openPage }: { openPage: (page: DashboardPage) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ChoiceCard
        icon={Download}
        title="Deposit money"
        helper="Add money to one of your accounts."
        buttonLabel="Deposit"
        onClick={() => openPage('deposit')}
      />
      <ChoiceCard
        icon={ReceiptText}
        title="Request money"
        helper="Ask someone to send money to your account."
        buttonLabel="Request"
        onClick={() => openPage('request-money')}
      />
    </div>
  );
}

function ChoiceCard({
  icon: Icon,
  title,
  helper,
  buttonLabel,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  helper: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left transition-colors hover:border-gold-400/60"
    >
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/12 text-gold-300">
        <Icon className="h-7 w-7" />
      </span>
      <span className="block text-xl font-black text-white">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-slate-400">{helper}</span>
      <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-gold-400 px-4 text-sm font-black text-slate-950">
        {buttonLabel}
      </span>
    </button>
  );
}

function AccountInfo({
  accounts,
  formatMoney,
  userName,
  onClose,
}: {
  accounts: Account[];
  formatMoney: (value: number) => string;
  userName: string;
  onClose: () => void;
}) {
  const primaryAccount = accounts[0];
  const rows = [
    { label: 'Account name', value: userName || 'Customer' },
    { label: 'Account number', value: primaryAccount?.number || '72966750489' },
    { label: 'Sort code', value: '388130' },
    { label: 'Payment reference', value: '1234567890' },
  ];

  const copyValue = (value: string) => {
    navigator.clipboard?.writeText(value).catch(() => undefined);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-400/20 text-primary-200">
          <Building2 className="h-8 w-8" />
        </div>
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-200">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-black text-white">Bank Account Details</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          BankBitachon
          <br />
          Secure online account
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="mb-4 flex items-center gap-2">
          <CircleHelp className="h-5 w-5 text-primary-300" />
          <h3 className="text-lg font-black text-white">Account Details</h3>
        </div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 rounded-xl bg-slate-900/80 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-400" />
                <span className="text-sm font-bold text-slate-300">{row.label}</span>
              </div>
              <button
                onClick={() => copyValue(row.value)}
                className="flex min-w-0 items-center gap-2 text-right text-sm font-black text-white"
                aria-label={`Copy ${row.label}`}
              >
                <span className="truncate">{row.value}</span>
                <Copy className="h-4 w-4 shrink-0 text-primary-300" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-primary-400/30 bg-primary-400/15 p-4 text-sm leading-6 text-primary-100">
        Use the payment reference when someone sends money to this account.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {accounts.slice(0, 2).map((account) => (
          <div key={account.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">{account.type}</p>
            <p className="mt-2 text-base font-black text-white">{account.name}</p>
            <p className="mt-3 text-sm text-slate-400">Balance</p>
            <p className="font-black text-gold-300">{formatMoney(account.balance)}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="mt-6 min-h-12 w-full rounded-xl border border-slate-700 px-5 text-sm font-black text-slate-200 hover:border-gold-400/60"
      >
        Close
      </button>
    </div>
  );
}

function LegacyAccountInfo({
  accounts,
  formatMoney,
}: {
  accounts: Account[];
  formatMoney: (value: number) => string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {accounts.map((account) => (
        <motion.div
          key={account.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-400">{account.type}</p>
              <h3 className="mt-1 text-xl font-black text-white">{account.name}</h3>
            </div>
            <Landmark className="h-6 w-6 text-gold-500" />
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Account number</span>
              <span className="font-black">{account.number}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Balance</span>
              <span className="font-black">{formatMoney(account.balance)}</span>
            </p>
            {account.apy && (
              <p className="flex justify-between gap-4">
                <span className="text-slate-400">Savings rate</span>
                <span className="font-black">{account.apy}% APY</span>
              </p>
            )}
            {account.apr && (
              <p className="flex justify-between gap-4">
                <span className="text-slate-400">Loan rate</span>
                <span className="font-black">{account.apr}% APR</span>
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MoneyForm({
  accounts,
  amount,
  setAmount,
  fromAccountId,
  setFromAccountId,
  toAccountId,
  setToAccountId,
  isWorking,
  onSubmit,
  formatMoney,
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
}: {
  accounts: Account[];
  amount: string;
  setAmount: (value: string) => void;
  fromAccountId: string;
  setFromAccountId: (value: string) => void;
  toAccountId: string;
  setToAccountId: (value: string) => void;
  isWorking: boolean;
  onSubmit: (event: React.FormEvent) => void;
  formatMoney: (value: number) => string;
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Field label="From">
        <AccountSelect value={fromAccountId} onChange={setFromAccountId} accounts={accounts} formatMoney={formatMoney} />
      </Field>
      <Field label="To">
        <AccountSelect value={toAccountId} onChange={setToAccountId} accounts={accounts} formatMoney={formatMoney} />
      </Field>
      <Field label="Amount">
        <MoneyInput value={amount} onChange={setAmount} />
      </Field>
      <div className="flex items-end">
        <SubmitButton isWorking={isWorking} label="Send money" workingLabel="Sending..." icon={Send} />
      </div>
    </form>
  );
}

function DepositForm({
  accounts,
  amount,
  setAmount,
  accountId,
  setAccountId,
  isWorking,
  onSubmit,
  formatMoney,
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
}: {
  accounts: Account[];
  amount: string;
  setAmount: (value: string) => void;
  accountId: string;
  setAccountId: (value: string) => void;
  isWorking: boolean;
  onSubmit: (event: React.FormEvent) => void;
  formatMoney: (value: number) => string;
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Field label="Put money into">
        <AccountSelect value={accountId} onChange={setAccountId} accounts={accounts} formatMoney={formatMoney} />
      </Field>
      <Field label="Amount">
        <MoneyInput value={amount} onChange={setAmount} />
      </Field>
      <div className="lg:col-span-2">
        <SubmitButton isWorking={isWorking} label="Add money" workingLabel="Adding..." icon={Plus} />
      </div>
    </form>
  );
}

function WireForm({
  accounts,
  fromAccountId,
  setFromAccountId,
  amount,
  setAmount,
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
  isWorking,
  onSubmit,
  formatMoney,
}: {
  accounts: Account[];
  fromAccountId: string;
  setFromAccountId: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
  isWorking: boolean;
  onSubmit: (event: React.FormEvent) => void;
  formatMoney: (value: number) => string;
}) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Field label="From">
        <AccountSelect value={fromAccountId} onChange={setFromAccountId} accounts={accounts} formatMoney={formatMoney} />
      </Field>
      <Field label="Country">
        <CountrySelect />
      </Field>
      <Field label="Bank name">
        <input className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-bold text-white outline-none focus:border-gold-400" placeholder="Bank name" />
      </Field>
      <Field label="Recipient name">
        <input className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-bold text-white outline-none focus:border-gold-400" placeholder="Recipient name" />
      </Field>
      <Field label="Amount">
        <MoneyInput value={amount} onChange={setAmount} />
      </Field>
      <div className="lg:col-span-2">
        <SubmitButton isWorking={isWorking} label="Send wire" workingLabel="Sending wire..." icon={Globe2} />
      </div>
    </form>
  );
}

function ExternalTransferForm({
  method,
  accounts,
  fromAccountId,
  setFromAccountId,
  amount,
  setAmount,
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
  isWorking,
  onSubmit,
  formatMoney,
}: {
  method: { title: string; helper: string };
  accounts: Account[];
  fromAccountId: string;
  setFromAccountId: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
  isWorking: boolean;
  onSubmit: (event: React.FormEvent) => void;
  formatMoney: (value: number) => string;
}) {
  const detailLabel = getTransferDetailLabel(method.title);
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-primary-400/20 bg-primary-500/10 p-4 lg:col-span-2">
        <p className="text-sm font-black text-primary-100">{method.title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{method.helper}</p>
      </div>
      <Field label="From">
        <AccountSelect value={fromAccountId} onChange={setFromAccountId} accounts={accounts} formatMoney={formatMoney} />
      </Field>
      <Field label={detailLabel}>
        <input
          required
          className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-bold text-white outline-none focus:border-gold-400"
          placeholder={detailLabel}
        />
      </Field>
      <Field label="Amount">
        <MoneyInput value={amount} onChange={setAmount} />
      </Field>
      <div className="lg:col-span-2">
        <SubmitButton isWorking={isWorking} label={`Send with ${method.title}`} workingLabel="Sending..." icon={Send} />
      </div>
    </form>
  );
}

function getTransferDetailLabel(methodTitle: string) {
  switch (methodTitle) {
    case 'Cryptocurrency':
      return 'Wallet address';
    case 'PayPal':
    case 'Skrill':
    case 'Wise Transfer':
      return 'Email';
    case 'Cash App':
      return 'Cash App tag';
    case 'Venmo':
      return 'Venmo name';
    case 'Zelle':
      return 'Email or phone';
    case 'Revolut':
      return 'Revolut tag or email';
    case 'Alipay':
      return 'Alipay ID';
    case 'WeChat Pay':
      return 'WeChat ID';
    default:
      return 'Account detail';
  }
}

function CountrySelect() {
  return (
    <select
      defaultValue=""
      required
      className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-bold text-white outline-none focus:border-gold-400"
    >
      <option value="" disabled>
        Pick a country
      </option>
      {wireCountries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}

function HistoryList({
  transactions,
  formatMoney,
  compact = false,
  variant = 'default',
}: {
  transactions: Transaction[];
  formatMoney: (value: number) => string;
  compact?: boolean;
  variant?: 'default' | 'soft';
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${variant === 'soft' ? 'divide-y divide-primary-800/60 border-primary-800/70 bg-slate-950/35' : 'divide-y divide-slate-800 border-slate-800'}`}>
      {transactions.map((transaction) => {
        const isMoneyOut = transaction.amount < 0;
        return (
          <div key={transaction.id} className={`flex items-center justify-between gap-4 ${variant === 'soft' ? 'bg-slate-900/60' : 'bg-slate-950'} ${compact ? 'p-3' : 'p-4'}`}>
            <div className="flex min-w-0 items-center gap-3">
              <div className={`rounded-full p-2 ${isMoneyOut ? 'bg-red-400/10 text-red-300' : 'bg-emerald-400/10 text-emerald-300'}`}>
                {isMoneyOut ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">{transaction.description}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  {transaction.date} · {transaction.category}
                </p>
              </div>
            </div>
            <p className={`shrink-0 text-sm font-black ${isMoneyOut ? 'text-slate-200' : 'text-emerald-300'}`}>
              {isMoneyOut ? '' : '+'}
              {formatMoney(transaction.amount)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function LoanHistory({
  accounts,
  formatMoney,
}: {
  accounts: Account[];
  formatMoney: (value: number) => string;
}) {
  const loans = accounts.filter((account) => account.type === 'Loan' || account.type === 'Credit');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {loans.map((loan) => (
        <div key={loan.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-sm font-bold text-slate-400">{loan.type}</p>
          <h3 className="mt-1 text-xl font-black text-white">{loan.name}</h3>
          <p className="mt-4 text-sm text-slate-400">Amount left</p>
          <p className="mt-1 text-2xl font-black text-gold-300">{formatMoney(Math.abs(loan.balance))}</p>
          <p className="mt-4 text-sm text-slate-300">
            Rate: <span className="font-black">{loan.apr || 0}% APR</span>
          </p>
          <button className="mt-5 min-h-11 w-full rounded-xl bg-gold-400 text-sm font-black text-slate-950">
            Make payment
          </button>
        </div>
      ))}
    </div>
  );
}

function SimpleServicePage({
  title,
  buttonLabel,
  fields,
}: {
  title: string;
  buttonLabel: string;
  fields: string[];
}) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
    >
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">Fill in the fields below. We keep it simple.</p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field} className="block">
            <span className="mb-2 block text-sm font-black text-slate-200">{field}</span>
            <input
              className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm font-bold text-white outline-none focus:border-gold-400"
              placeholder={field}
            />
          </label>
        ))}
      </div>
      <button className="mt-5 min-h-12 rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 hover:bg-gold-300">
        {buttonLabel}
      </button>
    </form>
  );
}

function TransferPinPrompt({
  newPin,
  setNewPin,
  onSave,
}: {
  newPin: string;
  setNewPin: (value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-gold-400/30 bg-gold-400/10 p-4">
      <h3 className="text-lg font-black text-white">Set your transfer PIN</h3>
      <p className="mt-1 text-sm text-slate-300">Use 4 numbers. You will need it to send or add money.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={newPin}
          onChange={(event) => setNewPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
          inputMode="numeric"
          maxLength={4}
          placeholder="4 digit PIN"
          className="min-h-12 rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-black text-white outline-none focus:border-gold-400"
        />
        <button onClick={onSave} className="min-h-12 rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 hover:bg-gold-300">
          Save PIN
        </button>
      </div>
    </div>
  );
}

function TransferPinGate({
  isOpen,
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-slate-950/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="w-full rounded-[1.5rem] border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:max-w-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">{transferPin ? 'Enter transfer PIN' : 'Set transfer PIN'}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              {transferPin ? 'Use your 4 numbers to finish this transfer.' : 'Choose 4 numbers to protect future transfers.'}
            </p>
          </div>
          <button onClick={onCancel} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">
          <TransferPinField transferPin={transferPin} pinInput={pinInput} setPinInput={setPinInput} newPin={newPin} setNewPin={setNewPin} />
        </div>
        <button onClick={onConfirm} className="mt-5 min-h-12 w-full rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 hover:bg-gold-300">
          Continue
        </button>
      </div>
    </div>
  );
}

function TransferPinField({
  transferPin,
  pinInput,
  setPinInput,
  newPin,
  setNewPin,
}: {
  transferPin: string;
  pinInput: string;
  setPinInput: (value: string) => void;
  newPin: string;
  setNewPin: (value: string) => void;
}) {
  return (
    <Field label={transferPin ? 'Transfer PIN' : 'Set 4 digit transfer PIN'}>
      <input
        value={transferPin ? pinInput : newPin}
        onChange={(event) => {
          const value = event.target.value.replace(/\D/g, '').slice(0, 4);
          if (transferPin) {
            setPinInput(value);
          } else {
            setNewPin(value);
          }
        }}
        inputMode="numeric"
        maxLength={4}
        type="password"
        placeholder="••••"
        className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-black text-white outline-none focus:border-gold-400"
      />
    </Field>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function AccountSelect({
  value,
  onChange,
  accounts,
  formatMoney,
}: {
  value: string;
  onChange: (value: string) => void;
  accounts: Account[];
  formatMoney: (value: number) => string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm font-bold text-white outline-none focus:border-gold-400"
    >
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.name} · {formatMoney(account.balance)}
        </option>
      ))}
    </select>
  );
}

function MoneyInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">$</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        className="min-h-12 w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-8 pr-4 text-sm font-bold text-white outline-none focus:border-gold-400"
      />
    </div>
  );
}

function SubmitButton({
  isWorking,
  label,
  workingLabel,
  icon: Icon,
}: {
  isWorking: boolean;
  label: string;
  workingLabel: string;
  icon: React.ElementType;
}) {
  return (
    <button
      type="submit"
      disabled={isWorking}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-5 text-sm font-black text-slate-950 shadow-sm hover:bg-gold-300 disabled:opacity-60"
    >
      {isWorking ? (
        <>
          <span className="flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-slate-950/25 border-t-slate-950">
            <Landmark className="h-3.5 w-3.5" />
          </span>
          {workingLabel}
        </>
      ) : (
        <>
          <Icon className="h-5 w-5" />
          {label}
        </>
      )}
    </button>
  );
}
