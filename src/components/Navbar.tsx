import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { student, admin, logout, adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    adminLogout();
    navigate('/');
  };

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard' },
  ];

  const studentNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const publicNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const navItems = admin ? adminNavItems : student ? studentNavItems : publicNavItems;

  return (
    <nav className="bg-brand-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Code2 className="w-8 h-8 text-brand-yellow" />
            <span className="text-brand-yellow">JavaMaster</span>
          </Link>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-brand-yellow transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {student ? (
              <>
                <span className="text-sm text-gray-300">{student.full_name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : admin ? (
              <>
                <span className="text-sm text-gray-300">Admin</span>
                <button
                  onClick={handleLogout}
                  className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-brand-yellow hover:text-yellow-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-2 hover:bg-brand-yellow hover:text-brand-black rounded transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {student ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-brand-yellow hover:text-brand-black rounded transition"
              >
                Logout
              </button>
            ) : admin ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-brand-yellow hover:text-brand-black rounded transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-brand-yellow hover:text-brand-black rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-brand-yellow hover:text-brand-black rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
