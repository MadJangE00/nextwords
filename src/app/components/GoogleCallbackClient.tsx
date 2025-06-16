'use client'

import { useEffect } from 'react'

export default function GoogleCallbackClient() {
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const idToken = params.get('id_token')
    const guestToken = localStorage.getItem('guest_token') ?? ''

    if (idToken) {
      fetch('http://localhost:8000/auth/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken, guest_token: guestToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert('JWT 발급 완료: ' + data.access_token)
        })
    }
  }, [])

  return <div>구글 로그인 처리 중...</div>
}
