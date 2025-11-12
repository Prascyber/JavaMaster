# JavaCoach - Java Live Coaching Platform

A complete e-commerce platform for selling Java Live Coaching courses to college students with student authentication, shopping cart, payment processing, and admin analytics dashboard.

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar with auth-aware menu
│   └── Footer.tsx          # Footer with links and contact info
├── context/
│   └── AuthContext.tsx     # Student and Admin authentication context
├── pages/
│   ├── Home.tsx            # Landing page with stats and features
│   ├── Signup.tsx          # Student registration page
│   ├── Login.tsx           # Student & Admin login
│   ├── Courses.tsx         # Course listing page
│   ├── Checkout.tsx        # Course purchase form
│   ├── OrderConfirmation.tsx # Order confirmation page
│   ├── Dashboard.tsx       # Student dashboard
│   ├── Orders.tsx          # Student orders history
│   ├── AdminDashboard.tsx  # Admin analytics & management
│   ├── About.tsx           # About page
│   ├── Contact.tsx         # Contact form
│   └── Privacy.tsx         # Privacy policy
├── lib/
│   └── supabase.ts         # Supabase client setup
├── types/
│   └── index.ts            # TypeScript type definitions
└── App.tsx                 # Main app with routing
```

## Features Implemented

### User Authentication
- Student sign up with email, password, name, college, year, and mobile
- Student login with email and password
- Admin login for dashboard access
- Secure password hashing with SHA-256
- Protected routes for authenticated pages
- Session management with localStorage

### Student Pages
- **Home**: Hero section, stats counters, why choose us, video showcase section
- **Courses**: Course listing with pricing, features, and early bird offer badge
- **Checkout**: Pre-filled form with student details, order summary
- **Dashboard**: Welcome card, enrolled courses, quick stats
- **Orders**: Purchase history with receipt download functionality
- **About**: Instructor info and course benefits
- **Contact**: Contact form and contact information

### Courses Page
- Course title: "Java Full Live Coaching Program"
- Original price: ₹4999 (strikethrough)
- Discounted price: ₹2999
- Features: Live classes, recordings, assignments, projects, certificates
- Limited seats display (20 max)
- Batch start date: 21st Nov 2024
- Early bird offer badge with conversion urgency

### Admin Dashboard
- **Sales Overview**: Total revenue, orders, students, average order value
- **Revenue Chart**: 7-day revenue trend with bar chart
- **Enrollment Status**: Pie chart showing enrolled vs pending students
- **Recent Orders Table**: Last 10 transactions with student info
- **Students List**: All registered students with contact details
- **Real-time Statistics**: Auto-updating dashboard

### Database (Supabase)
- `students` table: Student profiles with college and year info
- `courses` table: Course details with pricing and curriculum
- `orders` table: Purchase records with payment status
- `cart_items` table: Shopping cart functionality
- `admin_users` table: Admin accounts
- Row Level Security (RLS) policies for data protection

## Default Test Credentials

**Admin Login:**
- Email: `admin@javacoach.com`
- Password: `admin`

**Test Student Account:**
Create one through the sign up page

## Theme Colors

- Primary: Yellow (#FFD700)
- Secondary: Black (#000000)
- Dark: #1a1a1a
- Light: #f5f5f5

## How to Use

1. **Sign Up**: Navigate to /signup to create a student account
2. **Browse Courses**: Go to /courses to see the Java program
3. **Purchase**: Click "Enroll Now" to checkout (must be logged in)
4. **View Orders**: Visit /orders to see purchase history
5. **Admin Access**: Login with admin credentials at /login (check Admin Login box)

## Payment System

Currently simulates payment with instant "completed" status. To integrate a real payment gateway:

1. Update `Checkout.tsx` to call your payment provider API
2. Handle payment success/failure callbacks
3. Update order status in database
4. Trigger receipt email

## Email Notifications

Currently simulated. To enable real emails:

1. Set up Supabase Edge Function for email sending
2. Integrate SendGrid, Resend, or similar service
3. Create email templates for receipts and welcome messages
4. Call email function on successful payment

## Running the Project

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Security Features

- Row Level Security (RLS) policies on all tables
- Password hashing with SHA-256
- Protected routes for authenticated users
- Admin-only dashboard access
- Transaction ID tracking for orders

## File Size Optimization

The build includes recharts which can make the bundle larger. To optimize:

1. Implement code splitting for admin dashboard
2. Use dynamic imports for heavy components
3. Consider using a lighter charting library

## Future Enhancements

- Real payment gateway integration (Razorpay/Stripe)
- Automated email receipts and welcome emails
- Student progress tracking
- Live class integration
- Recorded lecture access
- Certificate generation
- Discussion forum
- Mobile app
