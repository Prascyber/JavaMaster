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
const signUp = async (data: any) => {
  const { email, password, full_name, college_name, year, mobile_number } = data;

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, college_name, year, mobile_number },
    },
  });

  if (signUpError) {
    console.error("Signup error:", signUpError);
    throw new Error(signUpError.message);
  }

  if (!authData.user) throw new Error("User not returned from signup");

  // Wait briefly for trigger to insert profile
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    throw new Error(profileError.message);
  }

  if (profileData) {
    setStudent(profileData);
    localStorage.setItem('student', JSON.stringify(profileData));
  }

  return authData.user;
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
