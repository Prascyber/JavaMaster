import { User } from "@supabase/supabase-js";


export interface Student {
  id: string;
  email: string;
  full_name: string;
  college_name: string;
  year: string;
  mobile_number: string;
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

export interface CartItem {
  id: string;
  course_id: string;
  course: Course;
}

export interface Order {
  id: string;
  course_id: string;
  course: Course;
  amount_paid: number;
  purchase_date: string;
  payment_status: string;
  transaction_id: string;
}

export interface AuthContextType {
  student: Student | null;
  admin: any | null;
  loading: boolean;
  signUp: (data: any) => Promise<User>;  // ✅ make sure this says Promise<void>
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}
