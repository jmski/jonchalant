'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AdminInquiriesPage() {
  const router = useRouter();
  const supabase = createClient();

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
