/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Retrieve values from environment variables securely
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey =
  (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

// Check if credentials exist for live cloud database
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Lazy client instantiation to avoid crashing if keys are missing
let supabaseClientInstance: any = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseClientInstance) {
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }
  return supabaseClientInstance;
}

/**
 * Fallback local simulated auth and session management engine used when 
 * production credentials are not injected in the settings panel yet.
 */
export const sandboxAuthStore = {
  getUsers: () => {
    try {
      return JSON.parse(localStorage.getItem('bitachon_sandbox_users') || '[]');
    } catch {
      return [];
    }
  },
  addUser: (username: string, fullName: string, initialBalance: number, password: string) => {
    try {
      const users = sandboxAuthStore.getUsers();
      const normalizedUsername = username.trim().toLowerCase();
      const existingIndex = users.findIndex((u: any) => u.username === normalizedUsername);
      const newUser = {
        id: users[existingIndex]?.id || 'user_' + Math.random().toString(36).substring(2, 11),
        username: normalizedUsername,
        fullName,
        password,
        balance: initialBalance || 5000,
        createdAt: users[existingIndex]?.createdAt || new Date().toISOString()
      };
      if (existingIndex >= 0) {
        users[existingIndex] = newUser;
      } else {
        users.push(newUser);
      }
      localStorage.setItem('bitachon_sandbox_users', JSON.stringify(users));
      return newUser;
    } catch (e) {
      console.error('Failed to store sandbox credentials:', e);
      return null;
    }
  },
  findUserByUsername: (username: string) => {
    const users = sandboxAuthStore.getUsers();
    return users.find((u: any) => u.username === username.trim().toLowerCase());
  },
  updatePassword: (username: string, password: string) => {
    const users = sandboxAuthStore.getUsers();
    const normalizedUsername = username.trim().toLowerCase();
    const userIndex = users.findIndex((u: any) => u.username === normalizedUsername);
    if (userIndex < 0) return false;
    users[userIndex] = { ...users[userIndex], password };
    localStorage.setItem('bitachon_sandbox_users', JSON.stringify(users));
    return true;
  }
};
