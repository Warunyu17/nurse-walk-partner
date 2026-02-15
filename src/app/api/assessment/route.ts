import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Assessment from '@/models/Assessment';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { hn, answers, result, scores } = body;

        if (!hn || !answers || !result || !scores) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if assessment already exists for this HN
        const existingAssessment = await Assessment.findOne({ hn });

        if (existingAssessment) {
            // Update existing
            existingAssessment.answers = answers;
            existingAssessment.result = result;
            existingAssessment.scores = scores;
            await existingAssessment.save();
            return NextResponse.json({ success: true, data: existingAssessment }, { status: 200 });
        } else {
            // Create new
            const newAssessment = await Assessment.create({
                hn,
                answers,
                result,
                scores,
            });
            return NextResponse.json({ success: true, data: newAssessment }, { status: 201 });
        }
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const hn = searchParams.get('hn');

        if (!hn) {
            return NextResponse.json(
                { error: 'HN is required' },
                { status: 400 }
            );
        }

        const assessment = await Assessment.findOne({ hn }).lean();

        if (!assessment) {
            return NextResponse.json(
                { error: 'ไม่พบข้อมูลในระบบ' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: assessment }, { status: 200 });
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
