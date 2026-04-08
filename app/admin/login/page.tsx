'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal?.currentLevel === 'aal2') {
          router.push('/admin');
        } else {
          router.push('/mfa?redirect=%2Fadmin');
        }
      }
    };

    checkAuth();

    // Check for error messages in URL
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    const errorMsg = params.get('error') || hashParams.get('error_description');
    
    if (errorMsg === 'invalid_token') {
      setError('Reset link expired or invalid. Please request a new one.');
    } else if (errorMsg === 'invalid_email_verification') {
      setError('Email verification link expired. Please check your email for a new link.');
    } else if (errorMsg === 'auth_failed') {
      setError('Authentication failed. Please try again.');
    } else if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Route through MFA before reaching admin
        router.push('/mfa?redirect=%2Fadmin');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setForgotLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/admin/auth/callback`,
      });

      if (resetError) {
        setError(resetError.message);
        setForgotLoading(false);
        return;
      }

      setForgotSuccess(true);
      setForgotEmail('');
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {showForgotPassword ? (
            <>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                Reset Password
              </h1>
              <p className="text-slate-600 text-center mb-8">Enter your email to receive a reset link</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {forgotSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                  Check your email for a password reset link!
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label
                    htmlFor="forgotEmail"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgotEmail"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                  setForgotEmail('');
                }}
                className="w-full text-center text-blue-600 hover:text-blue-700 text-sm mt-4"
              >
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-center mb-8">Sign in to manage inquiries</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-900 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <button
                onClick={() => {
                  setShowForgotPassword(true);
                  setError('');
                }}
                className="w-full text-center text-blue-600 hover:text-blue-700 text-sm mt-4"
              >
                Forgot Password?
              </button>

              <p className="text-center text-slate-600 text-sm mt-6">
                Don't have an account? Contact support.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
