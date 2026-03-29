
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type AssessmentRequestBody = {
    hn?: string;
    answers?: Record<string, unknown>;
    result?: string;
    scores?: Record<string, unknown>;
};

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as AssessmentRequestBody;
        const { hn, answers, result, scores } = body;

        if (
            typeof hn !== 'string' ||
            hn.trim().length === 0 ||
            !answers ||
            typeof answers !== 'object' ||
            typeof result !== 'string' ||
            result.trim().length === 0 ||
            !scores ||
            typeof scores !== 'object'
        ) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const normalizedHn = hn.trim();
        const assessedAt = new Date().toISOString();

        // Always keep only the latest result in `assessments`
        const { data, error } = await supabase
            .from('assessments')
            .upsert({
                hn: normalizedHn,
                answers,
                result,
                scores,
                created_at: assessedAt,
            }, { onConflict: 'hn' })
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Save every assessment attempt into history.
        // This is best-effort so the latest assessment is never blocked if history table is not ready.
        let warning: string | undefined;
        const { data: lastHistoryRows, error: lastHistoryError } = await supabase
            .from('assessment_history')
            .select('assessment_no')
            .eq('hn', normalizedHn)
            .order('assessment_no', { ascending: false })
            .limit(1);

        if (lastHistoryError) {
            warning = 'saved_latest_only';
        } else {
            const nextAssessmentNo = (lastHistoryRows?.[0]?.assessment_no ?? 0) + 1;

            let { error: historyInsertError } = await supabase
                .from('assessment_history')
                .insert({
                    hn: normalizedHn,
                    assessment_no: nextAssessmentNo,
                    assessment_date: assessedAt,
                    result,
                    answers,
                    scores,
                });

            // Handle race condition when two records calculate the same assessment_no
            if (historyInsertError?.code === '23505') {
                const { data: retryRows } = await supabase
                    .from('assessment_history')
                    .select('assessment_no')
                    .eq('hn', normalizedHn)
                    .order('assessment_no', { ascending: false })
                    .limit(1);

                const retryNo = (retryRows?.[0]?.assessment_no ?? 0) + 1;
                const retry = await supabase
                    .from('assessment_history')
                    .insert({
                        hn: normalizedHn,
                        assessment_no: retryNo,
                        assessment_date: assessedAt,
                        result,
                        answers,
                        scores,
                    });

                historyInsertError = retry.error ?? null;
            }

            if (historyInsertError) {
                warning = 'saved_latest_only';
            }
        }

        return NextResponse.json({ success: true, data, ...(warning ? { warning } : {}) }, { status: 200 });

    } catch (error: unknown) {
        console.error('Database Error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hn = searchParams.get('hn');

        if (!hn || hn.trim().length === 0) {
            return NextResponse.json(
                { error: 'HN is required' },
                { status: 400 }
            );
        }

        const normalizedHn = hn.trim();

        const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('hn', normalizedHn)
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
    } catch (error: unknown) {
        console.error('Database Error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
