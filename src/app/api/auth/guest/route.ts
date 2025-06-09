import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  try {
    const guestToken = `guest-${randomUUID()}`;

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO users (is_guest, guest_token)
      VALUES ($1, $2)
      RETURNING user_id;
    `;
    const values = [true, guestToken];
    const result = await client.query(insertQuery, values);
    client.release();

    const userId = result.rows[0]?.user_id;

    if (!userId) {
      throw new Error("❌ user_id를 가져오지 못했습니다.");
    }

    // 🔐 환경 변수 확인 (보안적으로 중요한 체크)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("❌ JWT_SECRET 환경변수가 설정되지 않았습니다.");
    }

    // 🧠 JWT Payload 구성
    const payload = {
      user_id: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: randomUUID(),
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    console.log("✅ guest login - user_id:", userId);
    console.log("✅ token generated:", token);

    return NextResponse.json({
      success: true,
      token,
      user_id: userId,
      guest_token: guestToken,
    });
  } catch (error) {
    console.error("🔥 /auth/guest 오류:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
