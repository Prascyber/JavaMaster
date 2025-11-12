import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Course } from '../types';
import { AlertCircle } from 'lucide-react';

export function Checkout() {
  const { courseId } = useParams();
  const { student } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    college_name: '',
    year: '1st Year',
    mobile_number: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }

    const fetchCourse = async () => {
      const { data } = await supabase
        .from('courses')
        .select()
        .eq('id', courseId)
        .single();

      if (data) {
        setCourse(data);
        setFormData({
          full_name: student.full_name || '',
          college_name: student.college_name || '',
          year: student.year || '1st Year',
          mobile_number: student.mobile_number || '',
          email: student.email || '',
        });
      }
    };

    fetchCourse();
  }, [courseId, student, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!student || !course) throw new Error('Missing data');

      const transactionId = `TXN-${Date.now()}`;

      const { error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            student_id: student.id,
            course_id: course.id,
            amount_paid: course.discounted_price,
            transaction_id: transactionId,
            payment_status: 'completed',
          }
        ]);

      if (orderError) throw orderError;

      await supabase
        .from('courses')
        .update({ seats_reserved: course.seats_reserved + 1 })
        .eq('id', course.id);

      navigate(`/order-confirmation/${transactionId}`);
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <div className="py-12 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name *"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
              />

              <input
                type="tel"
                name="mobile_number"
                placeholder="Mobile Number *"
                value={formData.mobile_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
              />

              <input
                type="text"
                name="college_name"
                placeholder="College Name *"
                value={formData.college_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
              />

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Other</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-yellow text-brand-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Purchase'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-1">3 days/week Live Classes</p>
              <p className="text-sm text-gray-600">Recorded Lectures Included</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Original Price:</span>
                <span className="line-through text-gray-500">₹{course.original_price}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Discounted Price:</span>
                <span className="text-brand-yellow">₹{course.discounted_price}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>You Save:</span>
                <span>₹{(course.original_price - course.discounted_price).toFixed(0)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-brand-yellow">₹{course.discounted_price}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-brand-yellow rounded-lg text-xs">
              <p className="font-semibold text-brand-black mb-1">✓ Secure Payment</p>
              <p className="text-gray-700">100% safe and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
