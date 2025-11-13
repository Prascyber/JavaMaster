import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthContextType } from '../types';
import { User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<any | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check auth session on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setStudent(user);
      setLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setStudent(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ New Supabase Auth-based Signup
const signUp = async (data: any): Promise<User> => {
  const { email, password, full_name, college_name, year, mobile_number } = data;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;
  const user = signUpData.user;
  if (!user) throw new Error("User not created");

  await supabase
    .from("profiles")
    .update({
      full_name,
      college_name,
      year,
      mobile_number,
    })
    .eq("id", user.id);

  setStudent(user);
  localStorage.setItem("student", JSON.stringify(user));

  return user; // ✅ Now we return it
};


  // ✅ Login using Supabase Auth
  const login = async (email: string, password: string): Promise<void> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  const user = data.user;
  if (!user) throw new Error("Invalid credentials");

  setStudent(user);
  localStorage.setItem("student", JSON.stringify(user));
};


  // ✅ Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setStudent(null);
  };

  // ✅ Admin login (if you maintain a separate admin_users table)
  const adminLogin = async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('admin_users')
      .select()
      .eq('email', email)
      .maybeSingle();

    if (error || !data) throw new Error('Invalid admin credentials');
    if (data.password !== password) throw new Error('Invalid admin credentials');

    setAdmin(data);
    localStorage.setItem('admin', JSON.stringify(data));
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        admin,
        loading,
        signUp,
        login,
        logout,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
