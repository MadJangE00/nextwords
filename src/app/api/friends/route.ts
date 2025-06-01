import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

export async function GET(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if(!user_id) {
        return NextResponse.json({success: false, error: 'User ID is required'}, {status: 400});
    }

    const client= new Client({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: { rejectUnauthorized: false },
    });

    try{
        await client.connect();
        
        const result = await client.query(
            `
            SELECT
            f.friend_id,
            d.friend_name,
            d.friend_iconnum,
            d.friend_joindate,
            d.is_send
            FROM user_friends f
            LEFT JOIN user_friends_detail d
            ON f.friend_id = d.user_id
            WHERE f.user_id = $1
            `,
            [user_id]
        );

        return NextResponse.json({success: true, friends: result.rows});
    }catch (error: any) {
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }finally{
        await client.end();
    }
}

export async function DELETE(req: NextRequest) {
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

    // 양방향 친구 정보 삭제
    await client.query(
      `DELETE FROM user_friends_detail 
       WHERE (user_id = $1 AND friend_name = (SELECT nickname FROM users WHERE user_id = $2))
          OR (user_id = $2 AND friend_name = (SELECT nickname FROM users WHERE user_id = $1))`,
      [user_id, friend_id]
    );

    await client.query('COMMIT');

    return NextResponse.json({ success: true, message: "친구 삭제가 완료되었습니다." });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error("❌ 친구 삭제 에러:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
