import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432'),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl:{
        rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT id, user_id, name, email FROM "user"');
    await client.end();
    return NextResponse.json({ success: true, users: res.rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
