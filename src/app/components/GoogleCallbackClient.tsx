'use client'

import { useEffect } from 'react'

export default function GoogleCallbackClient() {
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const idToken = params.get('id_token')
    const guestToken = params.get('state')?? ''

    if (idToken) {
      fetch('https://indieverseapi.org/auth/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken, guest_token: guestToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access_token
          if (accessToken) {
            const redirectUrl = `indieverse://callback?access_token=${accessToken}&guest_token=${guestToken}`
            window.location.href = redirectUrl
          }else{
            alert('토큰이 없습니다.')
          }
        })
    }
  }, [])

  return <div>구글 로그인 처리 중...</div>
}
