import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, ShoppingCart, TrendingUp, LogOut } from 'lucide-react';

export function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalStudents: 0,
    avgOrderValue: 0,
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      const { data: ordersData, count: orderCount } = await supabase
        .from('orders')
        .select('*, courses(*), students(*)', { count: 'exact' })
        .eq('payment_status', 'completed');

      const { count: studentCount } = await supabase
        .from('students')
        .select('id', { count: 'exact' });

      let totalRevenue = 0;
      if (ordersData) {
        totalRevenue = ordersData.reduce((sum, order) => sum + (order.amount_paid || 0), 0);
        setOrders(ordersData);
      }

      const { data: studentsData } = await supabase
        .from('students')
        .select('*');

      setStudents(studentsData || []);

      setStats({
        totalRevenue,
        totalOrders: orderCount || 0,
        totalStudents: studentCount || 0,
        avgOrderValue: orderCount ? Math.round(totalRevenue / orderCount) : 0,
      });

      setLoading(false);
    };

    fetchStats();
  }, [admin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const chartData = [
    { name: 'Mon', revenue: Math.random() * 50000 },
    { name: 'Tue', revenue: Math.random() * 50000 },
    { name: 'Wed', revenue: Math.random() * 50000 },
    { name: 'Thu', revenue: Math.random() * 50000 },
    { name: 'Fri', revenue: Math.random() * 50000 },
    { name: 'Sat', revenue: Math.random() * 50000 },
    { name: 'Sun', revenue: Math.random() * 50000 },
  ];

  const pieData = [
    { name: 'Completed', value: stats.totalOrders },
    { name: 'Pending', value: Math.max(0, 20 - stats.totalOrders) },
  ];

  const COLORS = ['#FFD700', '#e6b800'];

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="bg-brand-black text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Total Revenue</h3>
                    <p className="text-3xl font-bold text-brand-yellow mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-brand-yellow opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Total Orders</h3>
                    <p className="text-3xl font-bold text-brand-yellow mt-2">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-brand-yellow opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Total Students</h3>
                    <p className="text-3xl font-bold text-brand-yellow mt-2">{stats.totalStudents}</p>
                  </div>
                  <Users className="w-12 h-12 text-brand-yellow opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-yellow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-600 text-sm font-semibold">Avg Order Value</h3>
                    <p className="text-3xl font-bold text-brand-yellow mt-2">₹{stats.avgOrderValue}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-brand-yellow opacity-20" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-brand-black">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-brand-black">Enrollment Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color) => (
                        <Cell key={`cell-${color}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-brand-black text-white px-6 py-4">
                <h2 className="text-xl font-bold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-brand-light">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="border-t hover:bg-brand-light transition">
                        <td className="px-6 py-4">{order.students?.full_name}</td>
                        <td className="px-6 py-4">{order.students?.email}</td>
                        <td className="px-6 py-4">{order.courses?.title}</td>
                        <td className="px-6 py-4 font-bold text-brand-yellow">₹{order.amount_paid}</td>
                        <td className="px-6 py-4">{new Date(order.purchase_date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="text-green-600 font-bold">✓ Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-brand-black text-white px-6 py-4">
                <h2 className="text-xl font-bold">Registered Students</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-brand-light">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">College</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 10).map((student) => (
                      <tr key={student.id} className="border-t hover:bg-brand-light transition">
                        <td className="px-6 py-4 font-semibold">{student.full_name}</td>
                        <td className="px-6 py-4">{student.email}</td>
                        <td className="px-6 py-4">{student.college_name}</td>
                        <td className="px-6 py-4">{student.year}</td>
                        <td className="px-6 py-4">{student.mobile_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
