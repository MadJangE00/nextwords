import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false }
});

export async function POST() { // eslint-disable-line @typescript-eslint/no-unused-vars

  
  try {
    const guestToken = `guest-${randomUUID()}`;
    
    const insertQuery = `
    INSERT INTO users (is_guest, guest_token)
    VALUES ($1, $2)
    RETURNING user_id;
    `;

    const values = [true, guestToken];

    const client = await pool.connect();
    const result = await client.query(insertQuery, values);
    client.release();

    const userId = result.rows[0].user_id;

    const jwtPayload = { user_id: userId};
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return NextResponse.json({ success: true, token, user_id: userId, guest_token: guestToken });
  } catch (err) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("🔥 게스트 로그인 에러:", err);
    return NextResponse.json(
      {success: false, err: err},
      {status: 500}
    );
  }
}
