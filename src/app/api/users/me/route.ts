import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";
import { verifyToken } from "@/utils/verifyToken";

export async function PUT(req:NextRequest) {
    const authHeader = req.headers.get("authorization");
    const payload = verifyToken(authHeader ?? undefined);

    if (!payload) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const {nickname, profile_pic_index, heart } = await req.json();

    if (!nickname && profile_pic_index === undefined && heart === undefined){
        return NextResponse.json({ success: false, error: "No valid fields to update" }, { status: 400 });
    }

    const client = new Client({
        host: process.env.DBHOST,
        port: Number(process.env.DBPORT),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl:{ rejectUnauthorized: false },
    });

    const fields = [];
    const values = [];
    let i = 1;

    if (nickname !== undefined) {
        fields.push(`nickname = $${i++}`);
        values.push(nickname);
    }

    if (profile_pic_index !== undefined) {
        fields.push(`profile_pic_index = $${i++}`);
        values.push(profile_pic_index);
    }
    if (heart !== undefined) {
        fields.push(`heart = $${i++}`);
        values.push(heart);
    }

    values.push(payload.user_id);

    const query = `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE user_id = $${i}
    RETURNING user_id, nickname, profile_pic_index, heart;
    `;

    try {
        await client.connect();
        const result = await client.query(query, values);
        await client.end();

        return NextResponse.json({ success: true, user: result.rows[0] }, { status: 200 });
    }catch(err){
        const msg = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
