import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, friend_id } = body;

  if (!user_id || !friend_id) {
    return NextResponse.json({ success: false, error: "user_id와 friend_id가 필요합니다." }, { status: 400 });
  }

  if (user_id === friend_id) {
    return NextResponse.json({ success: false, error: "자기 자신에게 친구 요청을 보낼 수 없습니다." }, { status: 400 });
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

    // 중복 요청 체크
    const check = await client.query(
      `SELECT * FROM friend_request
       WHERE from_user_id = $1 AND to_user_id = $2 AND status = 'pending'`,
      [user_id, friend_id]
    );

    if (check.rowCount && check.rowCount > 0) {
      return NextResponse.json({ success: false, error: "이미 친구 요청을 보냈습니다." }, { status: 409 });
    }

    // 요청 삽입
    await client.query(
      `INSERT INTO friend_request (from_user_id, to_user_id, status)
       VALUES ($1, $2, 'pending')`,
      [user_id, friend_id]
    );

    return NextResponse.json({ success: true, message: "친구 요청을 보냈습니다." });
  } catch (error: any) {
    console.error("Error sending friend request:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
