'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

export default function AdminInquiriesPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <main className="admin-placeholder">
      <h1>Inquiries</h1>
      <p>Inquiry management will be available here soon.</p>
    </main>
  );
}
