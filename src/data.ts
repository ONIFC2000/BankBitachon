/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RateItem, LocationItem, TestimonialItem, FaqItem, Account, Transaction } from './types';

export const RATE_DATA: RateItem[] = [
  {
    id: 'hys',
    name: 'High-Yield Savings',
    type: 'savings',
    bitachonRate: 4.85,
    averageRate: 0.45,
    label: 'Annual Percentage Yield (APY)'
  },
  {
    id: 'mm',
    name: 'Money Market Premium',
    type: 'savings',
    bitachonRate: 5.12,
    averageRate: 0.65,
    label: 'APY for balances $25k+'
  },
  {
    id: 'cd12',
    name: '12-Month Share Certificate',
    type: 'savings',
    bitachonRate: 5.25,
    averageRate: 1.22,
    label: 'APY with $1,000 min deposit'
  },
  {
    id: 'auto',
    name: 'New Auto Loan',
    type: 'loan',
    bitachonRate: 3.99,
    averageRate: 6.84,
    label: 'Annual Percentage Rate (APR)'
  },
  {
    id: 'home30',
    name: '30-Year Fixed Mortgage',
    type: 'mortgage',
    bitachonRate: 5.875,
    averageRate: 7.24,
    label: 'APR with 20% down payment'
  },
  {
    id: 'personal',
    name: 'Signature Personal Loan',
    type: 'loan',
    bitachonRate: 7.99,
    averageRate: 11.48,
    label: 'APR fixed interest'
  }
];

export const LOCATION_DATA: LocationItem[] = [
  {
    id: 'hq',
    name: 'Bitachon Plaza HQ & Financial Center',
    type: 'Branch',
    address: 'Place du Marche 13',
    city: 'Basel',
    zip: '4007, Switzerland',
    distance: 'Global HQ Hub',
    hours: [
      'Lobby: Mon - Fri (9:00 AM - 5:00 PM CET)',
      'Video Support: Mon - Sat (8:00 AM - 8:00 PM CET)'
    ],
    lat: 47.5596,
    lng: 7.5886,
    features: ['Instant Issue Debit Cards', 'Coin Counter', 'Safe Deposit Boxes', 'Mortgage Officer', 'Interactive ITM']
  },
  {
    id: 'midtown',
    name: 'Cardiff Trafalgar Trust Office',
    type: 'Branch',
    address: 'Trafalgar House, 7 Fitzalan Place',
    city: 'Cardiff',
    zip: 'CF29 0ED, Wales',
    distance: 'UK Western Region',
    hours: [
      'Lobby: Mon - Fri (8:30 AM - 4:30 PM BST)',
      'Video Support: Mon - Sat (8:00 AM - 8:00 PM BST)'
    ],
    lat: 51.4815,
    lng: -3.1670,
    features: ['Wealth Advisors', 'Biometric Authentication', 'Business Lending Specialists', 'ATM 24/7']
  },
  {
    id: 'brooklyn',
    name: 'Bristol Deanery Trust Hub',
    type: 'Branch',
    address: 'Deanery Road',
    city: 'Bristol',
    zip: 'BS1 9AS, United Kingdom',
    distance: 'UK Southwest Region',
    hours: [
      'Lobby: Mon - Thu (9:00 AM - 4:30 PM BST), Fri (9:00 AM - 5:30 PM BST)',
      'Drive-up: Sat (9:00 AM - 1:00 PM BST)'
    ],
    lat: 51.4520,
    lng: -2.6025,
    features: ['Spanish-Speaking Staff', 'Interactive ITM', 'Coin Counter', 'ATM 24/7']
  },
  {
    id: 'terminal-itm',
    name: 'Castleton Smart ITM Kiosk',
    type: 'Itm',
    address: '2200 Castleton Dr',
    city: 'Troy',
    zip: 'MI 48083, USA',
    distance: 'US Central Region',
    hours: [
      'Interactive Video Support: Mon-Sat (7:00 AM - 8:00 PM EST)',
      'ATM Functions: 24/7'
    ],
    lat: 42.5575,
    lng: -83.1118,
    features: ['Video Teller Live Support', 'Check/Cash Deposit', 'Multilingual Assistance']
  },
  {
    id: 'wall-atm',
    name: 'Detroit secured ATM Point',
    type: 'Atm',
    address: 'Jefferson Chalmers',
    city: 'Detroit',
    zip: 'MI 48215, USA',
    distance: 'US Detroit Local Kiosk',
    hours: ['ATM Functions: 24/7'],
    lat: 42.3683,
    lng: -82.9351,
    features: ['24/7 Safe Lobby Access', 'Contactless Tap Reader', 'Receipt Emailing']
  }
];

export const TESTIMONIAL_DATA: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Rebecca Goldstein',
    role: 'Co-Founder, Artisanal Bloom Bakery',
    quote: 'Switching our commercial accounts to Bank Bitachon saved us thousands on transaction fees, and the 5.12% yield on our cash reserve has let us hire two new bakers. The service is real, fast, and intensely personal.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    category: 'Business Banking'
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'Homeowner & Software Engineer',
    quote: "With the interest rate spikes, we thought a home was out of reach. Bank Bitachon's mortgage advisory held our hand through a first-time buyer rate discount. Now we have our backyard, locked in at a whole percent below the average rate.",
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    category: 'Home Mortgages'
  },
  {
    id: 't3',
    name: 'Amara & Lucas Sterling',
    role: 'Family Savers & Educators',
    quote: 'We moved our emergency savings here over a year ago. Seeing the High-Yield savings compound month after month gives us confidence that our children\'s college funds are keeping pace with inflation. Truly a bank of confidence!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    category: 'Personal Savings'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'fq1',
    category: 'Accounts',
    question: 'How do I transfer my direct deposit to Bank Bitachon?',
    answer: 'We make it painless with our automated Direct Deposit Switch Assistant. Once logged into your secure digital banking portal, go to Services > Switch Deposit, upload your former employer pay stub or bank form, and our system generates and sends a pre-filled authorization to your payroll department automatically.'
  },
  {
    id: 'fq2',
    category: 'Security',
    question: 'What measures are in place to secure my Bank Bitachon account?',
    answer: 'We employ multi-layered military-grade defenses. Every login session requires Multi-Factor Authentication (MFA) via hardware security keys or authenticator apps. Your data is protected in transit with TLS 1.3 and at rest with AES-256 encryption. We also monitor transactions 24/7 with proactive AI anomaly detection and offer instant card-lock features directly in the app.'
  },
  {
    id: 'fq3',
    category: 'Loans',
    question: 'Does applying for a pre-approved auto or home loan hurt my credit score?',
    answer: 'Not at all! Our pre-qualification system utilizes a "soft credit pull" which checks your eligibility and locks in your highly competitive rate without impacting your credit score. If you proceed with the formalized, final application, a standard credit inquiry is initiated.'
  },
  {
    id: 'fq4',
    category: 'Digital',
    question: 'What is an Interactive Teller Machine (ITM) and how do I use it?',
    answer: 'ITMs are our high-definition smart terminals. They look like regular ATMs, but can connect you face-to-face via full-rate video stream to a live Bank Bitachon teller in our HQ office. This allows you to perform custom operations like making loan payments, cashing checks down to the penny, and transferring money between joint accounts from your car window.'
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'ac1',
    name: 'Ultimate Yield checking',
    number: '•••• 8920',
    balance: 5420.75,
    type: 'Checking'
  },
  {
    id: 'ac2',
    name: 'High-Yield Compound Savings',
    number: '•••• 1154',
    balance: 42150.90,
    apy: 4.85,
    type: 'Savings'
  },
  {
    id: 'ac3',
    name: 'Premium Infinite Credit Card',
    number: '•••• 4410',
    balance: -810.25,
    apr: 14.99,
    type: 'Credit'
  },
  {
    id: 'ac4',
    name: 'Green Energy Vehicle Loan',
    number: '•••• 9901',
    balance: -18450.00,
    apr: 3.99,
    type: 'Loan'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't_01',
    date: 'May 22, 2026',
    description: 'Direct Deposit: ARTISANAL BLOOM SALARY',
    category: 'Income',
    amount: 3250.00,
    status: 'Completed'
  },
  {
    id: 't_02',
    date: 'May 21, 2026',
    description: 'Whole Foods Market Manhattan',
    category: 'Shopping',
    amount: -124.50,
    status: 'Completed'
  },
  {
    id: 't_03',
    date: 'May 19, 2026',
    description: 'Transfer to High-Yield Savings',
    category: 'Transfer',
    amount: -1000.00,
    status: 'Completed'
  },
  {
    id: 't_04',
    date: 'May 18, 2026',
    description: 'Consolidated Edison Power Bill',
    category: 'Utilities',
    amount: -85.75,
    status: 'Completed'
  },
  {
    id: 't_05',
    date: 'May 17, 2026',
    description: 'Le Bernardin Dining NYC',
    category: 'Dining',
    amount: -212.00,
    status: 'Completed'
  },
  {
    id: 't_06',
    date: 'May 15, 2026',
    description: 'Monthly Dividend Compound Credit Check',
    category: 'Income',
    amount: 172.18,
    status: 'Completed'
  },
  {
    id: 't_07',
    date: 'May 10, 2026',
    description: 'Starbucks Coffee Lexington Ave',
    category: 'Dining',
    amount: -12.45,
    status: 'Completed'
  }
];
