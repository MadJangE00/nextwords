import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

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
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const result = await client.query(
      `SELECT friend_name, friend_iconnum, friend_joindate, is_send
FROM user_friends_detail
WHERE user_id = $1
`,
      [user_id]
    );

    return NextResponse.json({
      success: true,
      friends: result.rows,
    });
  } catch (error: any) {
    console.error("Error fetching friend list:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}
