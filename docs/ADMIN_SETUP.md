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

### 1. Set Redirect URL in Supabase ⚠️ CRITICAL
You **must** configure the redirect URL in your Supabase project settings. This affects BOTH:
- Password reset emails sent from the forgot password form
- Password reset emails sent from the Supabase dashboard

**Steps:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project: `jonchalant`
3. Go to **Authentication** → **URL Configuration**
4. Under "Redirect URLs", add all of these:
   - `http://localhost:3000/admin/auth/callback` (local development - REQUIRED)
   - `http://localhost:3000/` (local home page)
   - `https://yourdomain.com/admin/auth/callback` (production - REQUIRED)
   - `https://yourdomain.com/` (production home)
   - `https://yourdeployment.netlify.app/admin/auth/callback` (Netlify - REQUIRED)
   - `https://yourdeployment.netlify.app/` (Netlify home)
5. Click **Save**
6. **Wait 1-2 minutes** for changes to propagate

⚠️ **Why this matters:**
- Without the recovery redirect URL, Supabase won't know where to send users when they click password reset links from emails
- This is why Supabase dashboard reset emails were going to the home page
- The auth callback page MUST be in this list for recovery tokens to work

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

### "Getting logged in automatically without password reset form"
**Symptoms:** 
- Click recovery link in email
- Taken directly to admin dashboard
- Never see the password reset form

**Causes:**
1. Session cookie not persisting fast enough before page redirect
2. Recovery token not being properly verified

**Solutions:**
1. **Clear browser cache and cookies** - Try the password reset flow again
2. **Check browser console (F12)** for error messages about session or token verification
3. **Verify the callback page is loading** - Add `?debug=1` to your callback URL to see detailed logs
4. **Wait for Supabase config changes** - If you recently updated redirect URLs, wait 2 minutes

**If still not working:**
- Open DevTools (F12) → Console
- Click forgotten password link again
- Look for logs from the callback page
- Check what parameters are in the URL (look at hash: `#access_token=...&type=recovery...`)
- Search for "Verify recovery OTP" in console to see verification results

### "Supabase dashboard password reset emails go to home page"
**Symptoms:**
- Use Supabase dashboard to send reset password email
- Click link in email
- Redirected to home page instead of admin reset password page

**Cause:**
- The redirect URL in Supabase is not properly configured to include `/admin/auth/callback`

**Solution:**
1. Go to Supabase dashboard → Authentication → URL Configuration
2. Check the "Redirect URLs" section
3. **MUST include:** `http://localhost:3000/admin/auth/callback` (and production URL)
4. If not there, add it and save
5. **Wait 2 minutes** for changes to propagate
6. Send another test password reset email and try again

### "Reset link expired or invalid"
- The token in the email link has expired (usually 24 hours)
- Solution: User must request a new password reset email

### User not redirecting to reset password page
- Check Supabase redirect URL configuration (see step 1 above)
- The callback URL must match exactly with what's configured in Supabase
- Check browser console for errors (F12)

### "Still goes to home page when reset link clicked"
- **This is usually a redirect URL configuration issue**
- **Fix**: Ensure `/admin/auth/callback` is added to Supabase redirect URLs
- The callback page extracts the token from the URL hash and establishes the session
- Without proper redirect URL config, Supabase won't send the user to the callback page

### Page shows "Verifying access..." then redirects to login
- The user's session expired
- They need to request a new password reset email

### "Session failed" error on reset page
- The recovery token was verified but session couldn't be established
- Try clearing browser cookies and requesting a new reset link
- Check Supabase project is still active and not rate-limited

## Testing

### Local Testing - Forgot Password Flow
1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Click "Forgot Password?"
4. Enter your test email
5. Check email for reset link
6. **Before clicking** - Open DevTools (F12) and go to Console tab
7. Click the reset link in the email
8. **You should see:**
   - Browser loads `/admin/auth/callback`
   - Console shows "Auth callback params" log with `tokenHash` and `type=recovery`
   - Console shows "Verify recovery OTP result" with `hasSession: true`
   - Console shows "Session set, redirecting to reset password..."
   - Page redirects to `/admin/reset-password`
9. **Reset password page should show:**
   - "Set Your Password" heading
   - Two password input fields
10. Enter new password and confirm
11. Click "Set Password"
12. Should see success message
13. Auto-redirects to `/admin` dashboard after 2 seconds

**If not working:**
- Check step 8 logs in console - which step fails?
- If no logs appear, callback page didn't load - check Supabase redirect URL config
- If "Verify recovery OTP result" shows error, recovery token format is wrong

### Test Supabase Dashboard Password Reset
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to Authentication
3. Find a test user
4. Click the menu (⋮) → "Reset password"
5. This sends a password reset email
6. Click the link in the email
7. **Check where you land:**
   - ✅ Should go to `/admin/reset-password`
   - ❌ If goes to home page: Redirect URL not configured in Supabase
8. Test the password reset flow as above

### Production Testing
- Same as above but with your deployed domain
- Make sure the deployed domain's callback URL is configured in Supabase
- `https://yourdomain.com/admin/auth/callback`

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
