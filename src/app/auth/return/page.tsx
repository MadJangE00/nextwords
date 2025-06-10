'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthReturnPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const token = (session.user as any).token; // 타입 우회
      if (token) {
        window.location.href = `unityapp://login?token=${token}`;
      } else {
        console.warn("⚠️ 토큰이 없음");
      }
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>로그인 세션 확인 중...</p>;
  }

  return (
    <div>
      <p>Unity로 로그인 토큰을 전송 중입니다...</p>
    </div>
  );
}
