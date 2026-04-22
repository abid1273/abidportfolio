

## Admin Dashboard with Authentication and Content Management

### Overview
Add a secure admin system to manage Portfolio Projects and Client Reviews, with login, forgot password, and password reset flows. Uses Lovable Cloud for authentication and database storage.

### Database Changes (3 migrations)

**Migration 1 — Portfolio projects table**
- `portfolio_projects` table: id (uuid), title, category, description, image_url, tags (text[]), display_order (int), created_at, updated_at
- RLS enabled: only authenticated users can CRUD; public can SELECT

**Migration 2 — Client reviews table**
- `client_reviews` table: id (uuid), name, role, avatar_url, content, rating (int), project, display_order (int), created_at, updated_at
- RLS enabled: only authenticated users can CRUD; public can SELECT

**Migration 3 — User roles table**
- `app_role` enum: admin, user
- `user_roles` table with user_id referencing auth.users, role column
- `has_role` security definer function
- RLS policies using `has_role` for admin-only write access on both content tables

### Auth Configuration
- Enable email/password authentication (no auto-confirm — user must verify email)
- Enable Google sign-in
- Rate limiting on login attempts handled by Lovable Cloud's built-in auth

### New Pages and Components

**1. Footer update** (`src/components/Footer.tsx`)
- Add small "Admin Login" text link in the footer bottom area

**2. Auth page** (`src/pages/Auth.tsx`)
- Route: `/auth`
- Login form with email + password fields
- "Forgot Password?" link below login button
- Google sign-in button
- On successful login, redirect to `/admin`

**3. Reset password page** (`src/pages/ResetPassword.tsx`)
- Route: `/reset-password`
- Handles the recovery token from email link
- New password + confirm password fields
- On success, redirect to `/auth`

**4. Admin dashboard** (`src/pages/Admin.tsx`)
- Route: `/admin`
- Protected: redirects to `/auth` if not authenticated or not admin
- Clean panel with sidebar navigation (Portfolio, Reviews)
- Header with user info and logout button

**5. Portfolio management** (`src/components/admin/PortfolioManager.tsx`)
- Table listing all projects with edit/delete actions
- Add/Edit modal with form fields: title, category, description, image URL, tags
- Drag or reorder by display_order

**6. Reviews management** (`src/components/admin/ReviewsManager.tsx`)
- Table listing all reviews with edit/delete actions
- Add/Edit modal with form fields: name, role, avatar URL, content, rating, project name

**7. Auth guard component** (`src/components/auth/AuthGuard.tsx`)
- Wraps admin routes, checks authentication + admin role
- Redirects unauthorized users

### Route Updates (`src/App.tsx`)
- `/auth` — Auth page
- `/reset-password` — Reset password page
- `/admin` — Admin dashboard (protected)

### Frontend Data Integration
- Update `PortfolioSection.tsx` to fetch projects from database (fallback to hardcoded data if empty)
- Update `TestimonialsSection.tsx` to fetch reviews from database (fallback to hardcoded data if empty)

### Security
- Passwords hashed by Lovable Cloud auth (bcrypt)
- Secure reset tokens with expiry (built-in)
- RLS policies enforce admin-only write access
- `has_role` security definer function prevents RLS recursion
- Rate limiting on auth endpoints (built-in)

### Technical Details
- All database queries use the Supabase SDK client from `@/integrations/supabase/client`
- React Query for data fetching and cache management
- Framer Motion animations on admin panel consistent with site style
- Responsive design matching the warm/inviting theme

