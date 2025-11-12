import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isAdmin) {
        await adminLogin(email, password);
        navigate('/admin/dashboard');
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black to-gray-900 py-12 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-brand-yellow p-6 text-center">
            <h1 className="text-3xl font-bold text-brand-black">JavaCoach</h1>
            <p className="text-brand-black text-sm mt-1">
              {isAdmin ? 'Admin Login' : 'Student Login'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-sm text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => {
                    setIsAdmin(e.target.checked);
                    setError('');
                  }}
                  className="w-4 h-4 text-brand-yellow cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-700">Admin Login</span>
              </label>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-yellow text-brand-black py-2 rounded-lg font-bold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {!isAdmin && (
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-yellow font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
