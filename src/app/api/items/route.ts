import {NextRequest, NextResponse} from 'next/server';
import {Client} from 'pg';

// ✅ POST: /api/items
export async function POST(req: NextRequest) {
    const body = await req.json();
    const {user_id} = body;

    if(!user_id) {
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

    try{
        await client.connect();

        const existing = await client.query(
            `SELECT * FROM user_items WHERE user_id = $1`,
            [user_id]
        );
        if (existing.rows.length > 0) {
            return NextResponse.json({success: false, error: 'User already has items'}, {status: 400});
        }

        await client.query(
            `INSERT INTO user_items (user_id, user_cash, user_timeitem, user_glueitem)
            VALUES ($1, $2, $3, $4)`,
            [user_id, 0, 0, 0]
        );

        return NextResponse.json({success: true, message: 'Items created successfully'}, {status: 201});
    }catch (error: any) {
        console.error("Error creating items:", error.message);
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }finally{
        await client.end();
        }
}

// ✅ GET: /api/items?user_id=9
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
            `SELECT user_cash, user_timeitem, user_glueitem
            FROM user_items
            WHERE user_id = $1`,
            [user_id]
        );

        

        if(result.rows.length === 0) {
            return NextResponse.json({ success: false, error: "해당 유저의 아이템 정보가 없습니다" }, {status: 404});
        }

        return NextResponse.json({success: true, items: result.rows[0]});
    } catch (error: any) {
        console.error("Error fetching items:", error.message);
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }finally{
        await client.end();
    }
}

// ✅ PATCH: /api/items
export async function PATCH(req: NextRequest) {
    const body = await req.json();
    const { user_id, user_cash, user_timeitem, user_glueitem } = body;

    if(!user_id) {
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
            `UPDATE user_items
            SET user_cash = $1, user_timeitem = $2, user_glueitem = $3
            WHERE user_id = $4`,
            [user_cash, user_timeitem, user_glueitem, user_id]
        );

        return NextResponse.json({ success: true, updated: result.rowCount && result.rowCount > 0 });
    }catch (error: any) {
        console.error("Error updating items:", error.message);
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }finally{
        await client.end();
    }
}

