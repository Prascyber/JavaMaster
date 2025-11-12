/*
  # Java Coaching Platform - Initial Schema

  1. New Tables
    - `students` - Student profiles and authentication
    - `courses` - Course information
    - `orders` - Purchase records
    - `cart_items` - Shopping cart
    - `admin_users` - Admin accounts

  2. Security
    - Enable RLS on all tables
    - Add policies for student data access
    - Add policies for admin access

  3. Key Features
    - Student authentication fields
    - Course pricing and inventory
    - Order tracking with payment status
    - Cart management
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  college_name text NOT NULL,
  year text NOT NULL,
  mobile_number text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  original_price decimal NOT NULL,
  discounted_price decimal NOT NULL,
  seats_available integer NOT NULL DEFAULT 20,
  seats_reserved integer NOT NULL DEFAULT 0,
  batch_start_date date NOT NULL,
  features text[] DEFAULT '{}',
  modules jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  amount_paid decimal NOT NULL,
  transaction_id text UNIQUE,
  payment_status text DEFAULT 'pending',
  purchase_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view all courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Students can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (student_id = auth.uid());
