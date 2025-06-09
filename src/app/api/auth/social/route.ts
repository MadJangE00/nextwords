import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const { provider, social_id, guest_token } = await req.json();

  if (!provider || !social_id) {
    return NextResponse.json(
      { success: false, error: "Missing provider or social_id" },
      { status: 400 }
    );
  }

  console.log("🔐 소셜 로그인 요청:", { provider, social_id, guest_token });

  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  try {
    let user_id: number | null = null;

    // 1. guest_token으로 전환 가능한지 시도
    if (guest_token) {
      const guestResult = await client.query(
        `UPDATE users
         SET is_guest = false, social_provider = $1, social_id = $2
         WHERE guest_token = $3 AND is_guest = true
         RETURNING user_id`,
        [provider, social_id, guest_token]
      );

      if (guestResult.rows.length > 0) {
        user_id = guestResult.rows[0].user_id;
        console.log("🔁 게스트 전환 성공:", user_id);
      } else {
        console.warn("⚠️ 게스트 전환 실패 - guest_token 무효 또는 이미 소셜 유저");
      }
    }

    // 2. 기존 소셜 계정으로 로그인
    if (!user_id) {
      const socialResult = await client.query(
        `SELECT user_id FROM users WHERE social_provider = $1 AND social_id = $2`,
        [provider, social_id]
      );

      if (socialResult.rows.length > 0) {
        user_id = socialResult.rows[0].user_id;
        console.log("🔑 기존 소셜 유저 로그인:", user_id);
      }
    }

    // 3. 새 유저 가입
    if (!user_id) {
      const newResult = await client.query(
        `INSERT INTO users (is_guest, social_provider, social_id)
         VALUES (false, $1, $2)
         RETURNING user_id`,
        [provider, social_id]
      );
      user_id = newResult.rows[0].user_id;
      console.log("🆕 새 유저 생성:", user_id);
    }

    await client.end();

    // 4. JWT 발급
    const jwtPayload = {
      user_id,
      is_guest: false,
      iat: Math.floor(Date.now() / 1000),
      jti: randomUUID()
    };

    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ success: true, token, user_id });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error("🔥 소셜 로그인 에러:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
