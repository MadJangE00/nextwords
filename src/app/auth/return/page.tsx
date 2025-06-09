// /app/auth/return/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthReturnPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // ✅ Unity로 전달 (커스텀 URI or JS Bridge 사용 가능)
      window.location.href = `unityapp://login?token=${token}`;
    }
  }, [searchParams]);

  return <p>Unity로 로그인 정보 전송 중...</p>;
}
