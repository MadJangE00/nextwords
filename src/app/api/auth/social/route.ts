import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';

export async function POST(req: NextRequest) {
  const { provider, social_id, guest_token } = await req.json();

  if (!provider || !social_id) {
    return NextResponse.json({ success: false, error: "Missing provider or social_id" }, { status: 400 });
  }

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
    let result;

    // 이미 해당 소셜 ID로 가입된 유저가 있다면
    result = await client.query(
      `SELECT user_id FROM users WHERE social_provider = $1 AND social_id = $2`,
      [provider, social_id]
    );

    let user_id: string;

    if (result.rows.length > 0) {
      // 로그인
      user_id = result.rows[0].user_id;
    } else if (guest_token) {
      // 게스트 전환
      result = await client.query(
        `UPDATE users
         SET is_guest = false, social_provider = $1, social_id = $2
         WHERE guest_token = $3
         RETURNING user_id`,
        [provider, social_id, guest_token]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ success: false, error: "Guest token invalid" }, { status: 404 });
      }

      user_id = result.rows[0].user_id;
    } else {
      // 신규 가입
      result = await client.query(
        `INSERT INTO users (is_guest, social_provider, social_id)
         VALUES (false, $1, $2)
         RETURNING user_id`,
        [provider, social_id]
      );
      user_id = result.rows[0].user_id;
    }

    await client.end();

    const token = jwt.sign(
      { user_id, is_guest: false },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ success: true, token, user_id });
  } catch (err: any) {
    console.error("🔥 소셜 로그인 에러:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
