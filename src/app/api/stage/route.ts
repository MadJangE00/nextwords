import { NextRequest, NextResponse } from "next/server";
import {Client} from 'pg';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { user_id, stage_id, is_cleared, high_score, stars } = body;
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
            `INSERT INTO stage_clear_data (user_id, stage_id, is_cleared, high_score, stars)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [user_id, stage_id, is_cleared, high_score, stars]
        );

        const recordId = result.rows[0].id;
        return NextResponse.json({ success: true, stage_record_id: recordId});
    } catch (error: any) {
        console.error('Error inserting stage record:', error.message, error.stack);
        return NextResponse.json({ success: false, error: error.message}, {status: 500});
    } finally {
        await client.end();
    }

}

export async function GET(req: NextRequest) {
    const { searchParams} = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json({success: false, error: 'User ID is required'}, {status: 400});
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
            `SELECT stage_id, is_cleared, high_score, stars
            FROM stage_clear_data
            WHERE user_id = $1`,
            [user_id]
        );

        return NextResponse.json({success: true, stage_records: result.rows});
    } catch (error: any) {
        console.error("Error fetching stage records:", error.message, error.stack);
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }finally{
        await client.end();
    }
}

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { user_id, stage_id, is_cleared, high_score, stars } = body;

    if (!user_id || !stage_id) {
        return NextResponse.json({success: false, error: 'User ID and stage ID are required'}, {status: 400});
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
            `UPDATE stage_clear_data
            SET high_score = $1, stars = $2, is_cleared = $3
            WHERE user_id = $4 AND stage_id = $5`,
            [high_score, stars, is_cleared, user_id, stage_id]
        );
        return NextResponse.json({ success: true, updated: result.rowCount > 0 });
    } catch (error: any) {
        console.error("Error updating stage record:", error.message);
        return NextResponse.json({ success: false, error: error.message}, {status: 500});
    } finally {
        await client.end();
    }
}