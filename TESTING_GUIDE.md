# JavaCoach Platform - Testing Guide

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Test Flows

### 1. Student Registration & Login Flow

**Step 1: Sign Up**
1. Click "Sign Up" in navbar or go to `/signup`
2. Fill form:
   - Full Name: Your Name
   - Email: test@example.com
   - Mobile: 9876543210
   - College Name: IIT Delhi
   - Year: 2nd Year
   - Password: Password123
3. Click "Sign Up"
4. Auto-redirect to Dashboard

**Step 2: Logout & Login Again**
1. Go to navbar, click "Logout"
2. Click "Login"
3. Enter your test email and password
4. Click "Login"
5. Verify redirect to Dashboard

### 2. Course Purchase Flow

**Step 1: Browse Courses**
1. Click "Courses" in navbar
2. View Java course with:
   - Original price: ₹4999 (strikethrough)
   - Discounted price: ₹2999
   - "25% Extra Discount" badge
   - "5 seats remaining" message
   - Features list
   - Curriculum preview

**Step 2: Checkout**
1. Click "Enroll Now" button
2. Verify form is pre-filled with your signup data
3. Update any fields if needed
4. Review order summary on right:
   - Original Price: ₹4999
   - Discounted Price: ₹2999
   - You Save: ₹2000
5. Click "Complete Purchase"

**Step 3: Order Confirmation**
1. See success page with:
   - Green checkmark
   - Transaction ID
   - "Welcome to JavaCoach!" message
   - What's Next steps
   - Links to dashboard and courses
2. Click "Go to Dashboard"

### 3. Student Dashboard

**Your Dashboard Should Show:**
1. Welcome card with your name
2. Courses Enrolled: 1
3. College name
4. Year of study
5. Your enrolled course card with:
   - Course title
   - Enrollment date
   - Amount paid: ₹2999
   - Status: ✓ Active
   - Receipt and Course Page buttons

### 4. Orders History

**Step 1: View Orders**
1. Click "My Orders" in navbar (after login)
2. See your purchase listed with:
   - Course name
   - Amount paid (₹2999)
   - Purchase date
   - Download Receipt button
   - Transaction ID

**Step 2: Download Receipt**
1. Click "Download Receipt"
2. Verify text file downloads with:
   - Transaction ID
   - Your details
   - Course info
   - Amount paid

### 5. Admin Dashboard

**Login as Admin:**
1. Go to Login page
2. Check "Admin Login" checkbox
3. Email: `admin@javacoach.com`
4. Password: `admin`
5. Click "Login"

**Admin Dashboard Shows:**
1. **Top Stats:**
   - Total Revenue: ₹2999 (per enrollment)
   - Total Orders: 1 (or more if multiple purchases)
   - Total Students: (count of registered students)
   - Avg Order Value: ₹2999

2. **Revenue Chart:** 7-day bar chart with random data

3. **Enrollment Pie Chart:** Shows enrolled vs pending students

4. **Recent Orders Table:**
   - Student names
   - Emails
   - Course names
   - Amount paid
   - Purchase dates
   - Status

5. **Students List:** All registered students with contact info

### 6. Navigation Testing

**Public Pages (no login required):**
- Home: Landing page with stats and features
- Courses: Course listing
- About: About page with mission and advantages
- Contact: Contact form and info
- Privacy: Privacy policy

**Protected Pages (login required):**
- Checkout: Only accessible after clicking "Enroll Now"
- Order Confirmation: Only after purchase
- Dashboard: After login
- Orders: After login
- Admin Dashboard: After admin login

**Navbar Tests:**
- Before login: Shows "Login" and "Sign Up" buttons
- After student login: Shows student name and "Logout" button
- After admin login: Shows "Admin" and "Logout" button
- Hamburger menu works on mobile

### 7. Form Validation Tests

**Sign Up Form:**
- Try submit with empty fields → shows error
- Try invalid email → validation error
- Try non-matching passwords → error message
- Success with valid data

**Login Form:**
- Try non-existent email → "Invalid credentials" error
- Try wrong password → "Invalid credentials" error
- Success with correct email/password

**Checkout Form:**
- All fields required
- Mobile number format validation
- Success with valid data

**Contact Form:**
- All fields required
- Email validation
- Success shows "Thank you" message

### 8. Mobile Responsiveness

Test on different screen sizes:
- iPhone 12 (390×844)
- iPad (768×1024)
- Desktop (1920×1080)

**What to verify:**
- Navbar hamburger menu appears on mobile
- All pages stack vertically on mobile
- Buttons and forms remain clickable
- Text is readable on all sizes
- Images scale properly
- Tables scroll horizontally on mobile

### 9. Responsive Design Breakpoints

**Mobile (< 768px):**
- Sidebar becomes hamburger menu
- Cards stack vertically
- Dashboard grid becomes single column
- Tables scroll horizontally
- Full-width forms

**Tablet (768px - 1024px):**
- 2-column layouts
- Hamburger menu available
- Cards in 2-column grid

**Desktop (> 1024px):**
- Full navigation bar
- Multi-column layouts
- Admin dashboard with 4 stats
- Charts at full size

### 10. Database Verification

After making purchases, verify data in Supabase:

**Students Table:**
- Your signup creates a row
- Email is unique
- College and year saved

**Orders Table:**
- Each purchase creates an order
- Student_id links to your account
- Course_id links to Java course
- Amount paid: ₹2999
- Payment status: completed
- Transaction ID unique

**Courses Table:**
- Java course has all details
- Seats reserved increases with each purchase
- Pricing shows ₹4999 → ₹2999

## Test Accounts to Create

Create 2-3 test student accounts with different data:

**Student 1:**
- Email: student1@college.com
- Name: Raj Kumar
- College: Delhi University
- Year: 1st Year

**Student 2:**
- Email: student2@college.com
- Name: Priya Singh
- College: IIT Bombay
- Year: 3rd Year

Then test purchases with each account and verify admin dashboard shows all students and orders.

## Common Issues & Fixes

**Issue: Page blank after login**
- Fix: Check browser console for errors
- Ensure localStorage is enabled
- Try clearing localStorage and logging in again

**Issue: Form not submitting**
- Fix: Check all required fields are filled
- Verify email format is correct
- Check browser console for validation errors

**Issue: Orders not showing in dashboard**
- Fix: Refresh page (F5)
- Verify logged in as correct user
- Check database has order record

**Issue: Admin dashboard not loading charts**
- Fix: Ensure admin login was successful
- Check browser has recharts library loaded
- Try refreshing the page

**Issue: Styles not loading**
- Fix: Clear browser cache (Ctrl+Shift+Delete)
- Rebuild project: `npm run build`
- Restart dev server: `npm run dev`

## Performance Testing

**Lighthouse Audit:**
```bash
npm run build
npm run preview
# Then run Chrome Lighthouse audit on localhost:4173
```

**Load Testing:**
- Create 10+ test accounts
- Make 5+ purchases
- Refresh admin dashboard
- Verify no slowdown

**Bundle Size:**
```bash
# Check bundle size
npm run build
```
Current: 754.85 KB (gzipped: 209.08 KB)

## Success Criteria

✅ Signup creates student account
✅ Login works with saved credentials
✅ Courses page displays Java course
✅ Checkout pre-fills student data
✅ Purchase creates order in database
✅ Confirmation page shows after purchase
✅ Dashboard shows enrolled courses
✅ Orders page shows purchase history
✅ Receipt downloads successfully
✅ Admin dashboard shows sales data
✅ Navigation works on all pages
✅ Mobile responsive on all pages
✅ All forms validate correctly
✅ Logout clears session
✅ Protected routes require login

## Demo Script

1. Start dev server: `npm run dev`
2. Open http://localhost:5173
3. Sign up with new account
4. Browse courses page
5. Purchase Java course
6. View dashboard
7. Check orders
8. Download receipt
9. Logout
10. Admin login
11. View analytics dashboard
12. Logout

Time: ~5 minutes for complete flow demonstration
