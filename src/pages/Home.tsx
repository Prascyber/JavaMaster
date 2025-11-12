import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Zap, Award, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Home() {
  const [stats, setStats] = useState({ students: 50, learning: 50, sessions: 170 });
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: studentCount } = await supabase
        .from('students')
        .select('id', { count: 'exact' });

      const { count: orderCount } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .eq('payment_status', 'completed');

      const { count: courseTotal } = await supabase
        .from('courses')
        .select('id', { count: 'exact' });

      setStats({
        students: studentCount || 0,
        learning: orderCount || 0,
        sessions: (orderCount || 0) * 12,
      });
      setCourseCount(courseTotal || 1);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-brand-yellow text-brand-black px-4 py-2 rounded-full font-semibold mb-4">
                Limited Offer - 25% Extra Discount
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Master Java <span className="text-brand-yellow">Live</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Learn directly from industry experts through interactive live coaching sessions. Limited to 20 students per batch.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/courses"
                  className="bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition flex items-center gap-2"
                >
                  Enroll Now <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="border-2 border-brand-yellow text-brand-yellow px-8 py-3 rounded-lg font-bold hover:bg-brand-yellow hover:text-brand-black transition">
                  Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                🔥 Only 5 seats remaining! Batch starts 21st Nov
              </p>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 bg-brand-yellow opacity-20 rounded-lg blur-3xl"></div>
              <div className="relative bg-gray-800 rounded-lg p-8 text-center h-full flex flex-col justify-center items-center">
                <Play className="w-24 h-24 text-brand-yellow mb-4 mx-auto" />
                <p className="text-2xl font-bold mb-2">Watch Intro Video</p>
                <p className="text-gray-400">See how our live sessions work</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-black text-white p-8 rounded-lg text-center hover:shadow-xl transition">
              <Users className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-brand-yellow">{stats.students}+</h3>
              <p className="text-gray-300 mt-2">Students Taught</p>
            </div>
            <div className="bg-brand-black text-white p-8 rounded-lg text-center hover:shadow-xl transition">
              <Zap className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-brand-yellow">{stats.learning}+</h3>
              <p className="text-gray-300 mt-2">Currently Learning</p>
            </div>
            <div className="bg-brand-black text-white p-8 rounded-lg text-center hover:shadow-xl transition">
              <Award className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-brand-yellow">{stats.sessions}</h3>
              <p className="text-gray-300 mt-2">Live Sessions Completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose JavaCoach?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Live Interactive Sessions', desc: '3 days per week with real-time doubt support' },
              { title: 'Recorded Lectures', desc: 'Access all sessions anytime, anywhere' },
              { title: 'Comprehensive Projects', desc: 'Build real-world Java applications' },
              { title: 'Certification', desc: 'Industry-recognized completion certificate' },
              { title: 'Expert Mentors', desc: '10+ years of industry experience' },
              { title: 'Lifetime Access', desc: 'Learn at your own pace with lifetime support' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-brand-yellow">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Master Java?</h2>
          <p className="text-xl text-gray-300 mb-8">Join {courseCount} course and transform your coding skills</p>
          <Link
            to="/courses"
            className="bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition inline-block"
          >
            Start Learning Today
          </Link>
        </div>
      </div>
    </div>
  );
}
