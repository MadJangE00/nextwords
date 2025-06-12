'use client'

import { useEffect } from 'react'

export default function GoogleCallbackPage() {
  useEffect(() => {
    const hash = window.location.hash.substring(1) // #access_token=...&id_token=...
    const params = new URLSearchParams(hash)
    const idToken = params.get('id_token')

    const guestToken = localStorage.getItem('guest_token') ?? ''
    if (idToken) {
      // ✅ FastAPI로 전달
      fetch('http://localhost:8000/auth/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken, guest_token: guestToken, }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert('JWT 발급 완료: ' + data.access_token)

          // Unity 연동용: id_token을 로컬 저장 or 전송 처리
          // window.UnityInstance?.SendMessage(...) 등 가능
        })
    }
  }, [])

  return (
    <div className="p-8">
      <h1>구글 로그인 처리 중...</h1>
    </div>
  )
}
