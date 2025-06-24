'use client'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'

export default function GoogleCallbackClient() {
  useEffect(() => {
    const sendTokenToFastAPI = async () => {
      const session = await getSession()
      const accessToken = session?.user?.token
      const guestToken = localStorage.getItem('guest_token') ?? ''

      if (accessToken) {
        const res = await fetch('https://indieverseapi.org/auth/social', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_token: accessToken, // ← 이게 실제 사용할 토큰
            guest_token: guestToken,
          }),
        })
        const data = await res.json()
        alert('FastAPI JWT 발급 완료: ' + data.access_token)

        // 여기서 Unity로 토큰을 전달하거나 redirect 가능
      } else {
        alert('로그인 세션이 없습니다.')
      }
    }

    sendTokenToFastAPI()
  }, [])

  return <div>구글 로그인 처리 중...</div>
}
