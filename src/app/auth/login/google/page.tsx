// /app/auth/login/page.tsx
'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function GoogleLoginPage() {
  useEffect(() => {
    signIn('google', {
      callbackUrl: 'https://nextwords-six.vercel.app/api/auth/google/callback'
    });
  }, []);

  return <p>구글 로그인 중입니다...</p>;
}
