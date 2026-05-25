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
    answer: 'Sign in, go to Account Info, and choose direct deposit. We give you the routing number and account number to share with your job.'
  },
  {
    id: 'fq2',
    category: 'Security',
    question: 'What measures are in place to secure my Bank Bitachon account?',
    answer: 'We protect your account with secure sign in, alerts, and checks for strange activity. If something looks wrong, we help you stop it fast.'
  },
  {
    id: 'fq3',
    category: 'Loans',
    question: 'Does applying for a pre-approved auto or home loan hurt my credit score?',
    answer: 'Checking your rate does not hurt your credit. If you choose to finish the loan, we may need a full credit check.'
  },
  {
    id: 'fq4',
    category: 'Digital',
    question: 'What is an Interactive Teller Machine (ITM) and how do I use it?',
    answer: 'An ITM is like an ATM with video help. You can talk to a real helper, deposit money, pay a loan, or move money.'
  },
  {
    id: 'fq5',
    category: 'Accounts',
    question: 'How do I see my balance?',
    answer: 'Sign in and look at the top card. It shows the money you can use now.'
  },
  {
    id: 'fq6',
    category: 'Accounts',
    question: 'How do I find my account number?',
    answer: 'Open Account Info. Your account number is shown with your account name and balance.'
  },
  {
    id: 'fq7',
    category: 'Accounts',
    question: 'Can I hide my balance?',
    answer: 'Yes. Tap the eye button on the balance card. Tap it again when you want to see the balance.'
  },
  {
    id: 'fq8',
    category: 'Accounts',
    question: 'What does available balance mean?',
    answer: 'It is the money you can use today. Some pending payments may not be counted yet.'
  },
  {
    id: 'fq9',
    category: 'Accounts',
    question: 'How do I add money?',
    answer: 'Open Deposit, choose an account, enter the amount, and tap Add money.'
  },
  {
    id: 'fq10',
    category: 'Loans',
    question: 'How do I check a loan payment?',
    answer: 'Open History and look for your loan payment. You can also check your loan account in Account Info.'
  },
  {
    id: 'fq11',
    category: 'Loans',
    question: 'Can I pay my loan early?',
    answer: 'Yes. You can make extra payments when your loan allows it. Check your loan page before you pay.'
  },
  {
    id: 'fq12',
    category: 'Loans',
    question: 'What is APR?',
    answer: 'APR is the yearly cost of borrowing money. A lower APR usually means you pay less.'
  },
  {
    id: 'fq13',
    category: 'Loans',
    question: 'How do I start a car loan?',
    answer: 'Go to the loan tool, enter the car amount, and review the payment estimate.'
  },
  {
    id: 'fq14',
    category: 'Loans',
    question: 'Can I see my loan balance?',
    answer: 'Yes. Open Account Info and choose your loan account. You will see what is still owed.'
  },
  {
    id: 'fq15',
    category: 'Security',
    question: 'What should I do if I see a payment I did not make?',
    answer: 'Open History, check the payment, and contact support right away. We can help review it.'
  },
  {
    id: 'fq16',
    category: 'Security',
    question: 'How do I keep my account safe?',
    answer: 'Use a strong password, do not share it, and sign out when you are done.'
  },
  {
    id: 'fq17',
    category: 'Security',
    question: 'Why do I need email confirmation?',
    answer: 'It helps us know the email belongs to you before we open full account access.'
  },
  {
    id: 'fq18',
    category: 'Security',
    question: 'What if I forget my password?',
    answer: 'Use Forgot password on the sign-in page. We will send a reset link to your email.'
  },
  {
    id: 'fq19',
    category: 'Security',
    question: 'Does Bank Bitachon watch for fraud?',
    answer: 'Yes. We check for strange account activity and can help stop unsafe payments.'
  },
  {
    id: 'fq20',
    category: 'Digital',
    question: 'How do I send money?',
    answer: 'Sign in, open Send Money, choose where money comes from, choose where it goes, and enter the amount.'
  },
  {
    id: 'fq21',
    category: 'Digital',
    question: 'How do I see past payments?',
    answer: 'Open History. You will see money in, money out, dates, and payment names.'
  },
  {
    id: 'fq22',
    category: 'Digital',
    question: 'Can I use the dashboard on my phone?',
    answer: 'Yes. The dashboard is made to work on phones, tablets, and computers.'
  },
  {
    id: 'fq23',
    category: 'Digital',
    question: 'Why did my page not update?',
    answer: 'Refresh the page. If it still looks wrong, sign out and sign in again.'
  },
  {
    id: 'fq24',
    category: 'Digital',
    question: 'Can I download a statement?',
    answer: 'Statements will be in Account Info. For now, use History to review your activity.'
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'ac1',
    name: 'Ultimate Yield checking',
    number: '•••• 8920',
    balance: 350000.00,
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
    date: 'May 22, 2025',
    description: 'Direct Deposit: ARTISANAL BLOOM SALARY',
    category: 'Income',
    amount: 20000.00,
    status: 'Completed'
  },
  {
    id: 't_02',
    date: 'May 21, 2025',
    description: 'Whole Foods Market Manhattan',
    category: 'Shopping',
    amount: -5000.00,
    status: 'Completed'
  },
  {
    id: 't_03',
    date: 'May 19, 2025',
    description: 'Transfer to High-Yield Savings',
    category: 'Transfer',
    amount: -15000.00,
    status: 'Completed'
  },
  {
    id: 't_04',
    date: 'May 18, 2025',
    description: 'Consolidated Edison Power Bill',
    category: 'Utilities',
    amount: -5000.00,
    status: 'Completed'
  },
  {
    id: 't_05',
    date: 'May 17, 2025',
    description: 'Le Bernardin Dining NYC',
    category: 'Dining',
    amount: -15000.00,
    status: 'Completed'
  },
  {
    id: 't_06',
    date: 'May 15, 2025',
    description: 'Monthly Dividend Compound Credit Check',
    category: 'Income',
    amount: 300000.00,
    status: 'Completed'
  },
  {
    id: 't_07',
    date: 'May 10, 2025',
    description: 'Starbucks Coffee Lexington Ave',
    category: 'Dining',
    amount: -5000.00,
    status: 'Completed'
  }
];
