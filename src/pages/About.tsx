export function About() {
  return (
    <div>
      <div className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About JavaCoach</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              We are dedicated to providing world-class Java training to college students, bridging the gap between academic learning and industry requirements.
            </p>
            <p className="text-gray-700 mb-4">
              Through interactive live sessions, expert mentorship, and hands-on projects, we empower students to become confident Java developers ready for real-world challenges.
            </p>
          </div>
          <div className="bg-brand-black text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Industry experts with 10+ years of experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Live interactive sessions 3 times per week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Lifetime access to recorded lectures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Real-world project-based learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Personalized doubt support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-yellow">✓</span>
                <span>Industry-recognized certificate</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-brand-light p-12 rounded-lg mb-12">
          <h2 className="text-3xl font-bold mb-6">The JavaCoach Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-brand-black">Live Learning</h3>
              <p className="text-gray-700">Learn directly from experts in real-time interactive sessions with live doubt solving.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-brand-black">Flexible Access</h3>
              <p className="text-gray-700">Access recorded lectures anytime. Learn at your own pace while attending live sessions.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-brand-black">Career Ready</h3>
              <p className="text-gray-700">Build portfolio projects, interview preparation, and industry connections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
