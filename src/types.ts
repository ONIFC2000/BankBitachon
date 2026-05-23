/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RateItem {
  id: string;
  name: string;
  type: 'savings' | 'loan' | 'mortgage';
  bitachonRate: number;
  averageRate: number;
  label: string;
}

export interface LocationItem {
  id: string;
  name: string;
  type: 'Atm' | 'Branch' | 'Itm';
  address: string;
  city: string;
  zip: string;
  distance: string;
  hours: string[];
  lat: number;
  lng: number;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  category: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Accounts' | 'Loans' | 'Security' | 'Digital';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Shopping' | 'Utilities' | 'Dining' | 'Transfer' | 'Investment';
  amount: number;
  status: 'Completed' | 'Pending';
}

export interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  apy?: number;
  apr?: number;
  type: 'Checking' | 'Savings' | 'Credit' | 'Loan';
}

export interface LoanApplication {
  id: string;
  type: string;
  amount: number;
  term: number;
  status: 'Approved' | 'Reviewing' | 'Declined';
  date: string;
}
