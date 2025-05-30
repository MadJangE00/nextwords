import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';
import { verifyToken } from '@/utils/verifyToken';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const payload = verifyToken(authHeader ?? undefined);

  if (!payload) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    const result = await client.query(
      `SELECT user_id, nickname, profile_pic_index, is_guest, social_provider
       FROM users
       WHERE user_id = $1`,
      [payload.user_id]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
