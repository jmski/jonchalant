'use client';

import { Suspense } from 'react';
import AuthCallbackContent from './AuthCallbackContent';

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Processing authentication...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
