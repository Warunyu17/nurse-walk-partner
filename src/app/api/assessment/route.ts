
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { hn, answers, result, scores } = body;

        if (!hn || !answers || !result || !scores) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Use upsert to handle both create and update based on the unique 'hn' constraint
        const { data, error } = await supabase
            .from('assessments')
            .upsert({
                hn,
                answers,
                result,
                scores,
                // created_at is automatic, updated_at logic is not strictly needed for this simple case or can be handled if column exists
            }, { onConflict: 'hn' })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hn = searchParams.get('hn');

        if (!hn) {
            return NextResponse.json(
                { error: 'HN is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('hn', hn)
            .single();

        if (error) {
            // Check if error is "No rows found" which corresponds to 404
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { error: 'ไม่พบข้อมูลในระบบ' },
                    { status: 404 }
                );
            }
            throw error;
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
