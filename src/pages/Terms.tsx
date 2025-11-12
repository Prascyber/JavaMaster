export function Terms() {
  return (
    <div>
      <div className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Welcome to JavaMaster</h2>

          <p className="mb-4 text-gray-700">
            These Terms & Conditions govern your access to and use of JavaMaster’s website, courses, and related services. 
            By enrolling or using our platform, you agree to comply with these terms. 
            Please read them carefully before proceeding.
          </p>

          <h3 className="text-xl font-bold mb-3">1. Enrollment & Access</h3>
          <p className="mb-4 text-gray-700">
            When you purchase or enroll in a course, you gain personal, non-transferable access to that course. 
            Sharing or distributing course content is strictly prohibited.
          </p>

          <h3 className="text-xl font-bold mb-3">2. Payments & Refunds</h3>
          <p className="mb-4 text-gray-700">
            All payments are processed securely through our payment gateway. 
            Refunds may be available only under specific conditions and within the defined refund policy period.
          </p>

          <h3 className="text-xl font-bold mb-3">3. Course Content & Ownership</h3>
          <p className="mb-4 text-gray-700">
            All course materials, including videos, notes, assignments, and resources, 
            are the intellectual property of JavaMaster. Unauthorized copying or redistribution is not allowed.
          </p>

          <h3 className="text-xl font-bold mb-3">4. User Responsibilities</h3>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Provide accurate information during registration.</li>
            <li>Use the platform only for lawful educational purposes.</li>
            <li>Respect the intellectual property of others and follow community guidelines.</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">5. Disclaimer</h3>
          <p className="mb-4 text-gray-700">
            While we strive to provide high-quality content, JavaMaster does not guarantee job placement or specific outcomes. 
            The course is designed for learning and skill development purposes.
          </p>

          <h3 className="text-xl font-bold mb-3">6. Changes to Terms</h3>
          <p className="mb-4 text-gray-700">
            JavaMaster reserves the right to update these Terms & Conditions at any time. 
            Continued use of the platform after updates constitutes acceptance of the revised terms.
          </p>

          <h3 className="text-xl font-bold mb-3">7. Contact Us</h3>
          <p className="text-gray-700">
            For any queries regarding these Terms, please contact us at:{" "}
            <a href="mailto:info@javamaster.com" className="text-brand-yellow hover:underline">
              info@javamaster.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
