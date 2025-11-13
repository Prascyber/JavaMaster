import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';
import { BookOpen, Download, LogOut } from 'lucide-react';

export function Dashboard() {
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }

    // Fetch both profile & orders
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch profile details from "profiles" table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', student.id)
          .single();

        if (profileError) console.error('Profile fetch error:', profileError);
        else setProfile(profileData);

        // 2️⃣ Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*, courses(*)')
          .eq('student_id', student.id)
          .eq('payment_status', 'completed');

        if (ordersError) console.error('Orders fetch error:', ordersError);
        else setOrders(ordersData || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
            <h3 className="text-gray-600 text-sm font-semibold">Welcome Back</h3>
            <p className="text-2xl font-bold mt-2">{profile?.full_name || 'Student'}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
            <h3 className="text-gray-600 text-sm font-semibold">Courses Enrolled</h3>
            <p className="text-2xl font-bold mt-2">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
            <h3 className="text-gray-600 text-sm font-semibold">College</h3>
            <p className="text-lg font-bold mt-2">{profile?.college_name || '-'}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
            <h3 className="text-gray-600 text-sm font-semibold">Year</h3>
            <p className="text-2xl font-bold mt-2">{profile?.year || '-'}</p>
          </div>
        </div>

        {/* My Courses Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-brand-black text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-yellow" />
              <h2 className="text-2xl font-bold">My Courses</h2>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          <div className="p-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
                <a
                  href="/courses"
                  className="bg-brand-yellow text-brand-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition inline-block"
                >
                  Explore Courses
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-br from-brand-black to-gray-900 text-white rounded-lg p-6 hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {(order as any).courses?.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Enrolled on {new Date(order.purchase_date).toLocaleDateString()}
                    </p>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount Paid:</span>
                        <span className="text-brand-yellow font-bold">₹{order.amount_paid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400 font-bold">✓ Active</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-brand-yellow text-brand-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Receipt
                      </button>
                      <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                        Course Page
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
