import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Student, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const studentData = localStorage.getItem('student');
      const adminData = localStorage.getItem('admin');

      if (studentData) {
        setStudent(JSON.parse(studentData));
      }
      if (adminData) {
        setAdmin(JSON.parse(adminData));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (data: any) => {
    const { email, password, full_name, college_name, year, mobile_number } = data;

    const { data: result, error } = await supabase
      .from('students')
      .insert([
        {
          email,
          password_hash: await hashPassword(password),
          full_name,
          college_name,
          year,
          mobile_number,
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;

    if (result) {
      setStudent(result);
      localStorage.setItem('student', JSON.stringify(result));
    }
  };

  const login = async (email: string, password: string) => {
    const { data: result, error } = await supabase
      .from('students')
      .select()
      .eq('email', email)
      .maybeSingle();

    if (error || !result) throw new Error('Invalid credentials');

    const passwordMatch = await verifyPassword(password, result.password_hash);
    if (!passwordMatch) throw new Error('Invalid credentials');

    setStudent(result);
    localStorage.setItem('student', JSON.stringify(result));
  };

  const logout = async () => {
    setStudent(null);
    localStorage.removeItem('student');
  };

  const adminLogin = async (email: string, password: string) => {
    const { data: result, error } = await supabase
      .from('admin_users')
      .select()
      .eq('email', email)
      .maybeSingle();

    if (error || !result) throw new Error('Invalid admin credentials');

    const passwordMatch = await verifyPassword(password, result.password_hash);
    if (!passwordMatch) throw new Error('Invalid admin credentials');

    setAdmin(result);
    localStorage.setItem('admin', JSON.stringify(result));
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ student, admin, loading, signUp, login, logout, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}
