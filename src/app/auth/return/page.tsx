// src/app/auth/return/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthReturnPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      window.location.href = `unityapp://login?token=${token}`;
    }
  }, [searchParams]);

  return (
    <div>
      <p>Unity로 로그인 토큰을 전송 중입니다...</p>
    </div>
  );
}
