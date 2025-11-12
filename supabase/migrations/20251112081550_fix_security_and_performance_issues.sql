/*
  # Fix Security and Performance Issues

  1. Add Indexes for Foreign Keys
    - Index on cart_items(course_id)
    - Index on cart_items(student_id)
    - Index on orders(student_id)
    - Index on orders(course_id)

  2. Optimize RLS Policies
    - Replace auth.uid() calls with (select auth.uid()) for better performance
    - Add SELECT policy for students table
    - Add SELECT policy for admin_users table
    - Remove duplicate "Students can view all courses" policy

  3. Performance Improvements
    - Subquery optimization in RLS policies
    - Proper index usage for queries
*/

-- Create indexes for foreign keys on cart_items
CREATE INDEX IF NOT EXISTS idx_cart_items_student_id ON cart_items(student_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_course_id ON cart_items(course_id);

-- Create indexes for foreign keys on orders
CREATE INDEX IF NOT EXISTS idx_orders_student_id ON orders(student_id);
CREATE INDEX IF NOT EXISTS idx_orders_course_id ON orders(course_id);

-- Drop and recreate RLS policies with optimized queries

-- Orders table policies
DROP POLICY IF EXISTS "Students can view own orders" ON orders;
DROP POLICY IF EXISTS "Students can insert own orders" ON orders;

CREATE POLICY "Students can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));

CREATE POLICY "Students can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

-- Cart items table policies
DROP POLICY IF EXISTS "Students can view own cart" ON cart_items;
DROP POLICY IF EXISTS "Students can insert own cart items" ON cart_items;
DROP POLICY IF EXISTS "Students can delete own cart items" ON cart_items;

CREATE POLICY "Students can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));

CREATE POLICY "Students can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (student_id = (select auth.uid()));

-- Courses table - remove duplicate policy and keep only one for public access
DROP POLICY IF EXISTS "Students can view all courses" ON courses;
DROP POLICY IF EXISTS "Public can view courses" ON courses;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

-- Students table - add missing RLS policies
DROP POLICY IF EXISTS "Students can view own profile" ON students;
DROP POLICY IF EXISTS "Students can update own profile" ON students;

CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "New students can insert their profile"
  ON students FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admin users table - add RLS policies
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view their own data" ON admin_users;

CREATE POLICY "Admins can view their own data"
  ON admin_users FOR SELECT
  USING (id = (select auth.uid()));

-- Create additional indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_purchase_date ON orders(purchase_date DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_courses_batch_start_date ON courses(batch_start_date);

-- Add comments for documentation
COMMENT ON INDEX idx_cart_items_student_id IS 'Index for cart_items.student_id foreign key - improves join performance';
COMMENT ON INDEX idx_cart_items_course_id IS 'Index for cart_items.course_id foreign key - improves join performance';
COMMENT ON INDEX idx_orders_student_id IS 'Index for orders.student_id foreign key - improves join performance';
COMMENT ON INDEX idx_orders_course_id IS 'Index for orders.course_id foreign key - improves join performance';
COMMENT ON INDEX idx_orders_purchase_date IS 'Index for sorting orders by purchase date';
COMMENT ON INDEX idx_orders_payment_status IS 'Index for filtering orders by payment status';
COMMENT ON INDEX idx_students_email IS 'Index for student email lookup';
COMMENT ON INDEX idx_courses_batch_start_date IS 'Index for course batch date queries';
