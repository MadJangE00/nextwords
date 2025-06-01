import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

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

    const result = await client.query(
      `DELETE FROM user_friends_detail
       WHERE (user_id = $1 AND friend_id = $2)
          OR (user_id = $2 AND friend_id = $1)`,
      [user_id, friend_id]
    );

    return NextResponse.json({ success: true, message: "친구가 삭제되었습니다." });
  } catch (error: any) {
    console.error("Error deleting friend:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
