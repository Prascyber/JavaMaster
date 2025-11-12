import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';
import { Download } from 'lucide-react';

export function Orders() {
  const { student } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, courses(*)')
        .eq('student_id', student.id)
        .order('purchase_date', { ascending: false });

      if (data) {
        setOrders(data as any);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [student, navigate]);

  const downloadReceipt = (order: Order) => {
    const receiptContent = `
JAVACOACH - ORDER RECEIPT
================================
Transaction ID: ${order.transaction_id}
Date: ${new Date(order.purchase_date).toLocaleDateString()}

Student Details:
Name: ${student?.full_name}
Email: ${student?.email}
Mobile: ${student?.mobile_number}
College: ${student?.college_name}

Course: ${(order as any).courses?.title}
Amount Paid: ₹${order.amount_paid}
Status: Completed

================================
Thank you for your purchase!
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent));
    element.setAttribute('download', `Receipt-${order.transaction_id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12 text-brand-black">My Orders</h1>

        {loading ? (
          <div className="text-center py-12">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't made any purchases yet</p>
            <a
              href="/courses"
              className="bg-brand-yellow text-brand-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition inline-block"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                  <div>
                    <h3 className="font-semibold text-gray-600 text-sm mb-1">Course</h3>
                    <p className="font-bold text-brand-black">{(order as any).courses?.title}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 text-sm mb-1">Amount Paid</h3>
                    <p className="font-bold text-brand-yellow">₹{order.amount_paid}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 text-sm mb-1">Purchase Date</h3>
                    <p className="font-bold text-brand-black">{new Date(order.purchase_date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => downloadReceipt(order)}
                      className="w-full bg-brand-yellow text-brand-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Receipt
                    </button>
                  </div>
                </div>
                <div className="bg-brand-light px-6 py-3 text-sm text-gray-600">
                  <span className="font-semibold">Transaction ID:</span> {order.transaction_id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
