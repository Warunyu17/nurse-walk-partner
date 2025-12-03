"use client";

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';

interface Option {
    label: string;
    points: {
        group1?: number;
        group2?: number;
        group3?: number;
    };
}

interface Question {
    id: number;
    title: string;
    options: Option[];
}

export default function AssessmentPage() {
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [result, setResult] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const questions: Question[] = [
        {
            id: 1,
            title: "ความดันโลหิต (Blood Pressure)",
            options: [
                { label: "90-140 / 60-90 mmHg", points: { group1: 1, group2: 1 } },
                { label: "สูงหรือต่ำกว่า 90-140 / 60-90 mmHg", points: { group3: 1 } }
            ]
        },
        {
            id: 2,
            title: "ชีพจร (Pulse)",
            options: [
                { label: "น้อยกว่า 100 ครั้ง/นาที", points: { group1: 1, group2: 1 } },
                { label: "มากกว่า 100 ครั้ง/นาที", points: { group3: 1 } }
            ]
        },
        {
            id: 3,
            title: "อัตราการหายใจ (Respiratory Rate)",
            options: [
                { label: "น้อยกว่า 30 ครั้ง/นาที", points: { group1: 1, group2: 1 } },
                { label: "มากกว่า 30 ครั้ง/นาที", points: { group3: 1 } }
            ]
        },
        {
            id: 4,
            title: "ระดับออกซิเจนในเลือด (SPO2)",
            options: [
                { label: "มากกว่า 95%", points: { group1: 1, group2: 1 } },
                { label: "น้อยกว่า 95%", points: { group3: 1 } }
            ]
        },
        {
            id: 5,
            title: "อุณหภูมิร่างกาย (Temperature)",
            options: [
                { label: "น้อยกว่า 38 องศาเซลเซียส", points: { group1: 1, group2: 1 } },
                { label: "มากกว่า 38 องศาเซลเซียส", points: { group3: 1 } }
            ]
        },
        {
            id: 6,
            title: "ระดับความเจ็บปวด (Pain Score)",
            options: [
                { label: "1-3 คะแนน", points: { group1: 1, group2: 1 } },
                { label: "4-10 คะแนน", points: { group3: 1 } }
            ]
        },
        {
            id: 7,
            title: "อาการวิงเวียนศีรษะขณะเปลี่ยนท่า",
            options: [
                { label: "ไม่มีอาการ", points: { group1: 1 } },
                { label: "มีอาการเล็กน้อย", points: { group2: 1 } },
                { label: "มีอาการชัดเจน", points: { group3: 1 } }
            ]
        },
        {
            id: 8,
            title: "การทรงตัว",
            options: [
                { label: "มั่นคง", points: { group1: 1 } },
                { label: "ไม่มั่นคง", points: { group2: 1 } },
                { label: "ทรงตัวไม่ได้ในท่านั่ง", points: { group3: 1 } }
            ]
        },
        {
            id: 9,
            title: "ความสามารถในการนั่ง (อย่างน้อย 1 นาที)",
            options: [
                { label: "ไม่มีอาการหน้ามืด/คลื่นไส้", points: { group1: 1 } },
                { label: "มีอาการหน้ามืด/คลื่นไส้บ้าง", points: { group2: 1 } },
                { label: "มีอาการหน้ามืด/คลื่นไส้บ่อย", points: { group3: 1 } }
            ]
        },
        {
            id: 10,
            title: "อาการอ่อนเพลีย",
            options: [
                { label: "ไม่มีอาการ", points: { group1: 1 } },
                { label: "มีอาการ", points: { group3: 1 } }
            ]
        }
    ];

    const handleOptionChange = (questionId: number, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [result]);

    const calculateResult = () => {
        // Check if all questions are answered
        if (Object.keys(answers).length < questions.length) {
            alert("กรุณาตอบคำถามให้ครบทุกข้อ");
            return;
        }

        const scores = { group1: 0, group2: 0, group3: 0 };

        questions.forEach(q => {
            const selectedOptionIndex = answers[q.id];
            if (selectedOptionIndex !== undefined) {
                const points = q.options[selectedOptionIndex].points;
                if (points.group1) scores.group1 += points.group1;
                if (points.group2) scores.group2 += points.group2;
                if (points.group3) scores.group3 += points.group3;
            }
        });

        const maxScore = Math.max(scores.group1, scores.group2, scores.group3);

        // Tie-breaking: Priority Set 3 > Set 2 > Set 1 (Safety first)
        if (scores.group3 === maxScore && maxScore > 0) {
            setResult("ให้ลุกนั่งบนเตียง");
        } else if (scores.group2 === maxScore && maxScore > 0) {
            setResult("ลุกนั่งข้างเตียง");
        } else if (scores.group1 === maxScore && maxScore > 0) {
            setResult("ยืนและลุกเดิน");
        } else {
            setResult("ไม่สามารถประเมินได้");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Header / Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto relative">
                    <div className="absolute top-6 left-6">
                        <a href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            ย้อนกลับ
                        </a>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center mt-8">
                        แบบประเมิน
                    </h1>

                    {result && (
                        <div ref={resultRef} className="mb-8 text-center animate-fade-in w-full scroll-mt-24">
                            <p className="text-gray-600 text-lg mb-2">ผลการประเมินของคุณคือ:</p>
                            <div className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-teal-500 p-6 rounded-xl shadow-md inline-block w-full md:w-auto">
                                {result}
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        {questions.map((q, index) => (
                            <div key={q.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {index + 1}. {q.title}
                                </h3>
                                <div className="space-y-3">
                                    {q.options.map((option, optIndex) => (
                                        <label key={optIndex} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200">
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                checked={answers[q.id] === optIndex}
                                                onChange={() => handleOptionChange(q.id, optIndex)}
                                            />
                                            <span className="text-gray-700 text-lg">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-6 mt-10">
                        <button
                            onClick={calculateResult}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg transition-transform transform hover:scale-105"
                        >
                            ประเมินผล
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
