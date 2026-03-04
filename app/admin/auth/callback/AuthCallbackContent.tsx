'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase sends tokens in URL hash
        const hashParams = new URLSearchParams(
          typeof window !== 'undefined' ? window.location.hash.substring(1) : ''
        );
        const token = hashParams.get('access_token');
        const tokenHash = hashParams.get('token_hash');
        const type = hashParams.get('type');

        console.log('Auth callback params:', { token: !!token, tokenHash: !!tokenHash, type });

        // Handle recovery/password reset flow
        if (tokenHash && type === 'recovery') {
          console.log('Processing recovery token...');
          
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'recovery',
          });

          console.log('Verify recovery OTP result:', { 
            hasUser: !!data?.user, 
            hasSession: !!data?.session,
            error: error?.message 
          });

          if (data?.user && data?.session) {
            // Explicitly set the session to ensure it persists
            const { error: setError } = await supabase.auth.setSession(data.session);
            
            if (setError) {
              console.error('Error setting session:', setError);
              router.push('/admin/login?error=session_failed');
              return;
            }
            
            console.log('Session set, redirecting to reset password...');
            // Wait a moment for session to persist
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push('/admin/reset-password');
            return;
          } else if (error) {
            console.error('Recovery verification error:', error);
            router.push('/admin/login?error=invalid_token');
            return;
          }
        }

        // Handle email verification flow
        if (tokenHash && type === 'email') {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'email',
          });

          if (data?.session) {
            router.push('/admin');
            return;
          } else if (error) {
            router.push('/admin/login?error=invalid_email_verification');
            return;
          }
        }

        // If we have an access token in URL, use it to establish session
        if (token && hashParams.get('refresh_token')) {
          const refreshToken = hashParams.get('refresh_token');
          const { data, error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: refreshToken || '',
          });

          if (data?.session) {
            router.push('/admin');
            return;
          }
        }

        // Fallback: check if user is already logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/admin');
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/admin/login?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-300">Verifying your credentials...</p>
      </div>
    </div>
  );
}
