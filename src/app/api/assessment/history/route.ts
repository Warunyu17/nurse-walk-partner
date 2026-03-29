import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type AssessmentHistoryRow = {
    id: number;
    hn: string;
    assessment_no: number;
    assessment_date: string;
    result: string;
    answers: Record<string, number>;
    scores: Record<string, number>;
    note: string | null;
    created_at: string;
};

function mapLatestAssessmentToHistoryRow(assessment: {
    id: number;
    hn: string;
    created_at: string;
    result: string;
    answers: Record<string, number>;
    scores: Record<string, number>;
}): AssessmentHistoryRow {
    return {
        id: assessment.id,
        hn: assessment.hn,
        assessment_no: 1,
        assessment_date: assessment.created_at,
        result: assessment.result,
        answers: assessment.answers,
        scores: assessment.scores,
        note: null,
        created_at: assessment.created_at,
    };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hn = searchParams.get('hn');

        if (!hn || hn.trim().length === 0) {
            return NextResponse.json({ error: 'HN is required' }, { status: 400 });
        }

        const normalizedHn = hn.trim();

        const { data: historyRows, error: historyError } = await supabase
            .from('assessment_history')
            .select('*')
            .eq('hn', normalizedHn)
            .order('assessment_no', { ascending: false });

        if (!historyError && historyRows && historyRows.length > 0) {
            return NextResponse.json({
                success: true,
                data: {
                    hn: normalizedHn,
                    totalAssessments: historyRows.length,
                    records: historyRows,
                },
            }, { status: 200 });
        }

        const { data: latestAssessment, error: latestError } = await supabase
            .from('assessments')
            .select('*')
            .eq('hn', normalizedHn)
            .single();

        if (latestError) {
            if (latestError.code === 'PGRST116') {
                return NextResponse.json({ error: 'ไม่พบข้อมูลในระบบ' }, { status: 404 });
            }
            throw latestError;
        }

        const fallbackRecord = mapLatestAssessmentToHistoryRow(latestAssessment);
        const warning = historyError ? 'history_table_not_available' : undefined;

        return NextResponse.json({
            success: true,
            data: {
                hn: normalizedHn,
                totalAssessments: 1,
                records: [fallbackRecord],
            },
            ...(warning ? { warning } : {}),
        }, { status: 200 });
    } catch (error: unknown) {
        console.error('History API Error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
