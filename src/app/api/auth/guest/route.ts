// app/api/auth/guest/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
// import { randomUUID } from 'crypto';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const guestSessionId = `guest_${Date.now()}`;
    const nickname = `게스트${Math.floor(Math.random() * 10000)}`;

    // 1. users 테이블에 게스트 유저 추가
    const result = await pool.query(
      `INSERT INTO users (nickname, guest_session_id, is_guest)
       VALUES ($1, $2, true)
       RETURNING user_id`,
      [nickname, guestSessionId]
    );

    const userId = result.rows[0].user_id;

    // 2. JWT 토큰 발급
    const token = jwt.sign(
      {
        user_id: userId,
        guest_session_id: guestSessionId,
        is_guest: true,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return NextResponse.json({ token, userId, nickname });
  } catch (err) {
    return NextResponse.json(
      { error: '게스트 로그인 실패', detail: err },
      { status: 500 }
    );
  }
}
