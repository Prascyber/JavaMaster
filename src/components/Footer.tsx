import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-brand-yellow font-bold text-lg mb-4">JavaCoach</h3>
            <p className="text-gray-400">Learn Java from industry experts through live interactive coaching sessions.</p>
          </div>
          <div>
            <h4 className="text-brand-yellow font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-brand-yellow transition">Home</a></li>
              <li><a href="/courses" className="hover:text-brand-yellow transition">Courses</a></li>
              <li><a href="/about" className="hover:text-brand-yellow transition">About</a></li>
              <li><a href="/contact" className="hover:text-brand-yellow transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-yellow font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-400">
             <li>
  <Link to="/privacy" className="hover:text-brand-yellow transition">
    Privacy Policy
  </Link>
</li>
  <li><Link to="/terms" className="hover:text-brand-yellow transition">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-yellow font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@javacoach.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 JavaCoach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
