import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';

export async function POST(_req: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
  });

  const guestToken = `guest-${uuidv4()}`;

  try {
    await client.connect();

    const result = await client.query(
      `INSERT INTO users (guest_token, is_guest)
       VALUES ($1, true)
       RETURNING user_id;`,
      [guestToken]
    );

    const userId = result.rows[0].user_id;

    await client.end();

    const token = jwt.sign(
      {
        user_id: userId,
        is_guest: true
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ success: true, token, user_id: userId, guest_token: guestToken });
  } catch (err) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error("🔥 게스트 로그인 에러:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
