'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the hash from the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const token = hashParams.get('access_token');
      const type = hashParams.get('type');

      console.log('Auth callback - token:', !!token, 'type:', type);

      if (token && type === 'recovery') {
        // Verify the token and establish session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery',
        });

        console.log('Verify OTP result:', { user: data?.user?.email, error });

        if (data.session) {
          // Session verified, redirect to password reset page
          router.push('/admin/reset-password');
        } else if (error) {
          console.error('Auth error:', error);
          router.push('/admin/login?error=invalid_token');
        }
      } else if (token && type === 'signup') {
        // Email verification
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (data.session) {
          router.push('/admin');
        } else if (error) {
          router.push('/admin/login?error=invalid_token');
        }
      } else {
        // No token, check if user is already logged in
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.push('/admin');
        } else {
          router.push('/admin/login');
        }
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Processing authentication...</p>
      </div>
    </div>
  );
}
