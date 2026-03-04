# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows you to manage inquiries and collaborations. It uses Supabase for authentication and requires specific configuration.

## Current Setup

### Pages
- **Login**: `/admin/login` - Sign in with email and password
- **Dashboard**: `/admin` - View and manage inquiries (protected)
- **Reset Password**: `/admin/reset-password` - Set new password after recovery
- **Auth Callback**: `/admin/auth/callback` - Handles OAuth and password reset flows

### Features
- ✅ Email/password authentication via Supabase
- ✅ Password reset via email link
- ✅ Protected routes (auto-redirects to login if not authenticated)
- ✅ Inquiry management dashboard
- ✅ "Forgot Password" functionality on login page

## Required Supabase Configuration

### 1. Set Redirect URL in Supabase
You **must** configure the redirect URL in your Supabase project settings:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project: `jonchalant`
3. Go to **Authentication** → **URL Configuration**
4. Add these redirect URLs:
   - `http://localhost:3000/admin/auth/callback` (local development)
   - `https://yourdomain.com/admin/auth/callback` (production)
   - `https://yourdeployment.netlify.app/admin/auth/callback` (Netlify)

### 2. Email Configuration
Make sure email is enabled in Supabase:
1. Go to **Authentication** → **Providers**
2. Enable **Email**
3. Configure email settings:
   - Enable "Email" provider
   - Set "Site URL" to your domain

### 3. Email Templates
The password recovery email (which users receive after clicking "Forgot Password") should include:
- Link format: `https://yourdomain.com/admin/auth/callback#type=recovery&token_hash=...`
- The link will automatically redirect to `/admin/reset-password`

## How the Flow Works

### Password Reset Flow
1. User clicks "Forgot Password?" on login page
2. User enters their email
3. Supabase sends recovery email with link
4. User clicks link in email (redirects to `/admin/auth/callback`)
5. Auth callback verifies token and redirects to `/admin/reset-password`
6. User sets new password
7. System redirects to admin dashboard

### Login Flow
1. User navigates to `/admin/login`
2. Enters email and password
3. Authenticated → redirects to `/admin`
4. Not authenticated → shows error

### Dashboard Protection
- The `/admin` page checks if user is logged in
- If not logged in → redirects to `/admin/login`
- If logged in → displays inquiry dashboard

## Troubleshooting

### "Reset link expired or invalid"
- The token in the email link has expired (usually 24 hours)
- Solution: User must request a new password reset email

### User not redirecting to reset password page
- Check Supabase redirect URL configuration (see step 1 above)
- The callback URL must match exactly with what's configured in Supabase
- Check browser console for errors (F12)

### "Still goes to home page when reset link clicked"
- **This is the issue you're experiencing**
- **Fix**: Ensure `/admin/auth/callback` is added to Supabase redirect URLs
- The callback page extracts the token from the URL hash and establishes the session
- Without proper redirect URL config, Supabase won't send the user to the callback page

### Page shows "Verifying access..." then redirects to login
- The user's session expired
- They need to request a new password reset email

## Testing

### Local Testing
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Click "Forgot Password?"
4. Enter your test email
5. Check email for reset link
6. Click link and verify it redirects to `/admin/reset-password`
7. Set new password

### Production Testing
- Same as above but with your deployed domain
- Make sure the deployed domain's callback URL is configured in Supabase

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=https://pkptmmesoscxtgzdjwyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are already configured in `.env.local`.

## API Integration

### Create Inquiry Endpoint
The admin dashboard fetches inquiries from:
- Endpoint: `/api/inquiries` 
- Method: GET
- Returns: List of inquiries from Supabase `inquiries` table

### Inquiry Status Types
- `new` - Newly received inquiry
- `in_progress` - Being reviewed
- `completed` - Addressed
- `closed` - Archived

## Next Steps

1. **Verify Supabase Configuration**
   - Go to Supabase dashboard
   - Check URL Configuration
   - Add callback redirect URL

2. **Test Password Reset**
   - Use the forgot password flow
   - Verify email is received
   - Click link and check redirect URL

3. **Add Admin Users**
   - Create user accounts in Supabase Authentication
   - Users can then log in with email/password

4. **Customize Dashboard**
   - Modify `/app/admin/page.tsx` to customize inquiry display
   - Add filters, sorting, actions as needed
