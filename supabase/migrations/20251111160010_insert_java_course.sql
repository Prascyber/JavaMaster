/*
  # Insert Java Full Live Coaching Program Course

  This migration adds the main Java course to the database with all features and pricing.
*/

INSERT INTO courses (
  title,
  description,
  original_price,
  discounted_price,
  seats_available,
  seats_reserved,
  batch_start_date,
  features,
  modules
) VALUES (
  'Java Full Live Coaching Program',
  'Master Java through live interactive coaching sessions with expert mentors. Learn from basics to advanced concepts with real-world projects and lifetime support.',
  4999,
  2999,
  20,
  0,
  '2024-11-21',
  ARRAY[
    'Live Classes (3 days/week)',
    'Recorded Lectures',
    'Assignments & Quizzes',
    'Notes & PDFs',
    'Real-world Projects',
    'Doubt Support',
    'Completion Certificate',
    'Lifetime Access'
  ],
  '[
    {"name": "Java Fundamentals", "topics": ["Variables", "Data Types", "Operators", "Control Flow"]},
    {"name": "Object-Oriented Programming", "topics": ["Classes & Objects", "Inheritance", "Polymorphism", "Abstraction", "Encapsulation"]},
    {"name": "Collections Framework", "topics": ["Lists", "Sets", "Maps", "Queues"]},
    {"name": "Exception Handling", "topics": ["Try-Catch", "Custom Exceptions", "Finally Block"]},
    {"name": "File I/O", "topics": ["Reading Files", "Writing Files", "Serialization"]},
    {"name": "Database Connectivity", "topics": ["JDBC", "SQL", "Connection Pooling"]},
    {"name": "Web Development", "topics": ["Servlets", "JSP", "Spring Basics"]},
    {"name": "Projects", "topics": ["Banking System", "E-commerce Platform", "Task Management App"]}
  ]'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin@javacoach.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin')
ON CONFLICT (email) DO NOTHING;
