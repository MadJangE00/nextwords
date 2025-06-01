import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: NextRequest) {
  const { user_id, friend_id, friend_name, friend_iconnum } = await req.json();

  if (!user_id || !friend_id || !friend_name || friend_iconnum === undefined) {
    return NextResponse.json({ success: false, error: "모든 값(user_id, friend_id, friend_name, friend_iconnum)이 필요합니다." }, { status: 400 });
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

    // 1. 친구 관계 저장
    await client.query(
      `INSERT INTO user_friends (user_id, friend_id)
       VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [user_id, friend_id]
    );

    // 2. 친구 상세 정보 저장 (친구가 유저 입장에서 보여지는 정보)
    await client.query(
      `INSERT INTO user_friends_detail (user_id, friend_name, friend_iconnum, friend_joindate, is_send)
       VALUES ($1, $2, $3, CURRENT_DATE, '{}') ON CONFLICT (user_id) DO NOTHING`,
      [friend_id, friend_name, friend_iconnum]
    );

    return NextResponse.json({ success: true, message: "친구 요청 완료" });
  } catch (err: any) {
    console.error("❌ 친구 요청 에러:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
  
    if (!user_id) {
      return NextResponse.json({ success: false, error: "user_id가 필요합니다." }, { status: 400 });
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
        `SELECT u.user_id, u.nickname, u.profile_pic_index
         FROM user_friends_requests r
         JOIN users u ON r.user_id = u.user_id
         WHERE r.friend_id = $1`,
        [user_id]
      );
  
      return NextResponse.json({ success: true, requests: result.rows });
    } catch (error: any) {
      console.error("❌ 친구 요청 목록 조회 에러:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } finally {
      await client.end();
    }
  }
