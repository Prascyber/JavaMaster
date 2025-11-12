export function Privacy() {
  return (
    <div>
      <div className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

          <p className="mb-4 text-gray-700">
            At JavaCoach, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </p>

          <h3 className="text-xl font-bold mb-3">1. Information We Collect</h3>
          <p className="mb-4 text-gray-700">
            We collect personal information that you provide directly to us when you:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Create an account</li>
            <li>Enroll in courses</li>
            <li>Make payments</li>
            <li>Contact us</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">2. How We Use Your Information</h3>
          <p className="mb-4 text-gray-700">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Provide and improve our services</li>
            <li>Process transactions</li>
            <li>Send course updates and announcements</li>
            <li>Respond to your inquiries</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">3. Data Security</h3>
          <p className="mb-4 text-gray-700">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h3 className="text-xl font-bold mb-3">4. Contact Us</h3>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us at info@javacoach.com
          </p>
        </div>
      </div>
    </div>
  );
}
