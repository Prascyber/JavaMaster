import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Clock, Users, BookOpen } from 'lucide-react';
import type { Course } from '../types';

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const discountPercentage = Math.round(((courses[0]?.original_price - courses[0]?.discounted_price) / courses[0]?.original_price) * 100) || 0;

  return (
    <div>
      <div className="bg-gradient-to-r from-brand-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Our Courses</h1>
          <p className="text-gray-300 mt-2">Master Java with expert-led live coaching</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No courses available</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-brand-yellow transition shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="bg-gradient-to-br from-brand-black to-gray-900 text-white p-8 flex flex-col justify-center md:col-span-1">
                    <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-yellow" />
                        <span>3 days/week</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-yellow" />
                        <span>{20 - course.seats_reserved} seats left</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand-yellow" />
                        <span>Recorded + Live</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:col-span-2">
                    <p className="text-gray-600 mb-6">{course.description}</p>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-brand-black">Course Features:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {course.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-brand-yellow text-xl">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3 text-brand-black">Curriculum:</h4>
                      <div className="space-y-2">
                        {course.modules.slice(0, 5).map((module, idx) => (
                          <div key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <span className="text-brand-yellow">→</span>
                            {module.name || module}
                          </div>
                        ))}
                        {course.modules.length > 5 && (
                          <div className="text-sm text-gray-500">+{course.modules.length - 5} more topics</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-brand-yellow">₹{course.discounted_price}</span>
                        <span className="text-lg text-gray-400 line-through">₹{course.original_price}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded">
                          {discountPercentage}% OFF
                        </span>
                      </div>
                      <Link
                        to={`/checkout/${course.id}`}
                        className="bg-brand-yellow text-brand-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
                      >
                        Enroll Now
                      </Link>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-brand-yellow rounded-lg text-sm text-brand-black">
                      <span className="font-bold">🎁 Early Bird Offer!</span> First 20 students get 25% extra discount. Batch starts 21st Nov.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
