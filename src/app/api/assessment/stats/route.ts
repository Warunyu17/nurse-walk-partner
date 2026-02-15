import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Assessment from '@/models/Assessment';

export async function GET() {
    try {
        await dbConnect();

        const stats = await Assessment.aggregate([
            {
                $group: {
                    _id: "$result",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format data for recharts (e.g., [{ name: 'Result A', count: 10 }, ...])
        const formattedStats = stats.map(item => ({
            name: item._id,
            count: item.count
        }));

        const response = NextResponse.json({ success: true, data: formattedStats }, { status: 200 });

        // Cache for 10s, serve stale while revalidating for up to 59s
        // This dramatically reduces cold start impact on Vercel
        response.headers.set('Cache-Control', 's-maxage=10, stale-while-revalidate=59');

        return response;
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
