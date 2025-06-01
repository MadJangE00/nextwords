import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, friend_id } = body;

  if (!user_id || !friend_id) {
    return NextResponse.json({ success: false, error: "user_id와 friend_id가 필요합니다." }, { status: 400 });
  }

  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query('BEGIN');

    // ✅ 1. 친구 요청 상태를 accepted 로 변경
    const updateRes = await client.query(
      `UPDATE friend_request
       SET status = 'accepted'
       WHERE from_user_id = $1 AND to_user_id = $2`,
      [friend_id, user_id]  // 상대가 나한테 보낸 요청을 내가 수락함
    );

    if (updateRes.rowCount === 0) {
      throw new Error("친구 요청이 존재하지 않습니다.");
    }

    // ✅ 2. 친구 관계 양방향으로 삽입
    await client.query(
      `INSERT INTO friend_detail (user_id, friend_id)
       VALUES ($1, $2), ($2, $1)
       ON CONFLICT DO NOTHING`,
      [user_id, friend_id]
    );

    await client.query('COMMIT');

    return NextResponse.json({ success: true, message: "친구 요청을 수락했습니다." });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error("Error accepting friend request:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
