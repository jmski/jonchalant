'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function AdminNavbar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-content">
        {/* Left side - Links */}
        <div className="admin-navbar-links">
          <Link href="/admin" className="admin-navbar-link">
            Dashboard
          </Link>
          <Link href="/admin/inquiries" className="admin-navbar-link">
            Inquiries
          </Link>
          {/* Additional links can be added here for future expansion */}
        </div>

        {/* Right side - User actions */}
        <div className="admin-navbar-actions">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="admin-navbar-logout"
          >
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>
    </nav>
  );
}
