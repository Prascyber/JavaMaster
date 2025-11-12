import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';
import { CheckCircle } from 'lucide-react';

export function OrderConfirmation() {
  const { transactionId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, courses(*)')
        .eq('transaction_id', transactionId)
        .single();

      if (data) {
        setOrder(data);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [transactionId]);

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (!order) return <div className="py-12 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-50 border-b-4 border-green-500 p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">Your enrollment has been confirmed</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-bold text-blue-900 mb-2">Welcome to JavaCoach!</h3>
              <p className="text-blue-700 text-sm">
                Thank you for enrolling in our Java Live Coaching Program. You'll receive a detailed welcome email shortly with access details and class schedules.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-gray-700">Transaction ID:</span>
                  <span className="font-mono font-bold">{order.transaction_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Course:</span>
                  <span className="font-semibold">{(order as any).courses?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Amount Paid:</span>
                  <span className="font-bold text-brand-yellow">₹{order.amount_paid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Purchase Date:</span>
                  <span>{new Date(order.purchase_date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Status:</span>
                  <span className="text-green-600 font-semibold">✓ Completed</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">What's Next?</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-brand-yellow font-bold">1.</span>
                  <span className="text-gray-700">Check your email for the welcome letter and class schedule</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-yellow font-bold">2.</span>
                  <span className="text-gray-700">Join our WhatsApp group for updates and announcements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-yellow font-bold">3.</span>
                  <span className="text-gray-700">Attend your first live session on the scheduled date</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-yellow font-bold">4.</span>
                  <span className="text-gray-700">Access all recorded lectures and course materials</span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-brand-yellow rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Note:</span> Your receipt has been sent to your registered email. You can download it from your Orders section in the Student Dashboard.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                to="/dashboard"
                className="flex-1 bg-brand-yellow text-brand-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition text-center"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/courses"
                className="flex-1 border-2 border-brand-yellow text-brand-yellow py-3 rounded-lg font-bold hover:bg-brand-yellow hover:text-brand-black transition text-center"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
