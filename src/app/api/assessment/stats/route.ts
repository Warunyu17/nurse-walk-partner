
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Fetch all results to calculate stats
        // Note: For large datasets, consider using a database function (RPC) or View for better performance
        const { data, error } = await supabase
            .from('assessments')
            .select('result');

        if (error) throw error;

        // Group and count results in application logic
        const resultStats = data.reduce((acc: { [key: string]: number }, curr: { result: any }) => {
            const res = curr.result;
            if (res) {
                acc[res] = (acc[res] || 0) + 1;
            }
            return acc;
        }, {});

        // Format data for recharts (e.g., [{ name: 'Result A', count: 10 }, ...])
        const formattedStats = Object.keys(resultStats).map(key => ({
            name: key,
            count: resultStats[key]
        }));

        const response = NextResponse.json({ success: true, data: formattedStats }, { status: 200 });

        // Allow short-lived cache to reduce DB hits; revalidate in background
        response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');

        return response;
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
