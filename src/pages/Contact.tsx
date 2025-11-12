import React, { useState } from 'react';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-2">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Mail className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Email</h3>
            <p className="text-gray-600">info@javacoach.com</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Phone className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <MapPin className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <p className="text-gray-600">India</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex gap-2 text-green-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              Thank you! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow resize-none"
            />

            <button
              type="submit"
              className="w-full bg-brand-yellow text-brand-black py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
