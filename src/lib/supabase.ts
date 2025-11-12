import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Student {
  id: string;
  email: string;
  full_name: string;
  college_name: string;
  year: string;
  mobile_number: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  original_price: number;
  discounted_price: number;
  seats_available: number;
  seats_reserved: number;
  batch_start_date: string;
  features: string[];
  modules: any[];
}

export interface Order {
  id: string;
  student_id: string;
  course_id: string;
  amount_paid: number;
  transaction_id: string;
  payment_status: string;
  purchase_date: string;
}
