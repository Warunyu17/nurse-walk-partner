"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { questions } from '../../../lib/assessmentData';

function EditAssessmentContent() {
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [result, setResult] = useState<string | null>(null);
    const [originalResult, setOriginalResult] = useState<string | null>(null);
    const [scores, setScores] = useState<{ group1: number; group2: number; group3: number } | null>(null);
    const [hn, setHn] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const resultRef = useRef<HTMLDivElement>(null);

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: "",
        message: "",
        isConfirmOnly: true,
        onConfirm: () => { },
        onCancel: () => { }
    });

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const showAlert = (title: string, message: string, onConfirm?: () => void) => {
        setModalConfig({
            isOpen: true,
            title,
            message,
            isConfirmOnly: true,
            onConfirm: () => {
                closeModal();
                if (onConfirm) onConfirm();
            },
            onCancel: closeModal
        });
    };

    useEffect(() => {
        const hnParam = searchParams.get('hn');
        if (hnParam) {
            setHn(hnParam);
            fetchAssessment(hnParam);
        } else {
            showAlert("ข้อผิดพลาด", "ไม่พบเลข HN", () => router.push('/statistics'));
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (result) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [result]);

    const fetchAssessment = async (hnToFetch: string) => {
        try {
            const response = await fetch(`/api/assessment?hn=${hnToFetch}`);
            const data = await response.json();
            if (response.ok && data.data) {
                setAnswers(data.data.answers);
                setResult(data.data.result);
                setOriginalResult(data.data.result);
                setScores(data.data.scores);
            } else {
                showAlert("ข้อผิดพลาด", "ไม่พบข้อมูลการประเมิน", () => router.push('/statistics'));
            }
        } catch (error) {
            console.error("Error fetching assessment:", error);
            showAlert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการโหลดข้อมูล", () => router.push('/statistics'));
        }
    };

    const handleOptionChange = (questionId: number, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleReevaluateAndSave = async () => {
        // 1. Validate
        if (Object.keys(answers).length < questions.length) {
            showAlert("แจ้งเตือน", "กรุณาตอบคำถามให้ครบทุกข้อ");
            return;
        }

        // 2. Calculate
        const currentScores = { group1: 0, group2: 0, group3: 0 };
        questions.forEach(q => {
            const selectedOptionIndex = answers[q.id];
            if (selectedOptionIndex !== undefined) {
                const points = q.options[selectedOptionIndex].points;
                if (points.group1) currentScores.group1 += points.group1;
                if (points.group2) currentScores.group2 += points.group2;
                if (points.group3) currentScores.group3 += points.group3;
            }
        });

        const maxScore = Math.max(currentScores.group1, currentScores.group2, currentScores.group3);
        let resultText = "";

        if (currentScores.group3 === maxScore && maxScore > 0) {
            resultText = "ให้ลุกนั่งบนเตียง";
        } else if (currentScores.group2 === maxScore && maxScore > 0) {
            resultText = "ลุกนั่งข้างเตียง";
        } else if (currentScores.group1 === maxScore && maxScore > 0) {
            resultText = "ยืนและลุกเดิน";
        } else {
            resultText = "ไม่สามารถประเมินได้";
        }

        setScores(currentScores);
        setResult(resultText);

        // 3. Auto-Save
        setIsSaving(true);
        try {
            const response = await fetch('/api/assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hn: hn.trim(),
                    answers,
                    result: resultText,
                    scores: currentScores,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                let message = "บันทึกผลการประเมินใหม่เรียบร้อยแล้ว";
                if (originalResult) {
                    if (originalResult === resultText) {
                        message += "\n(ผลการประเมินเหมือนเดิม)";
                    } else {
                        message += `\n(ผลการประเมินเปลี่ยนจาก "${originalResult}" เป็น "${resultText}")`;
                    }
                }

                // Update original result for next save
                setOriginalResult(resultText);

                // Delay slightly to let the user see the result scroll
                setTimeout(() => {
                    showAlert(
                        "บันทึกสำเร็จ",
                        message
                    );
                }, 500);
            } else {
                showAlert("ข้อผิดพลาด", `เกิดข้อผิดพลาด: ${data.error}`);
            }
        } catch (error) {
            console.error("Error saving assessment:", error);
            showAlert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />
            <Modal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
                isConfirmOnly={modalConfig.isConfirmOnly}
            />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto relative">
                    <div className="absolute top-6 left-6">
                        <Link href="/statistics" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            ย้อนกลับ
                        </Link>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center mt-8">
                        แก้ไขการประเมิน (HN: {hn})
                    </h1>

                    {result && (
                        <div ref={resultRef} className="mb-8 text-center animate-fade-in w-full scroll-mt-24">
                            <p className="text-gray-600 text-lg mb-2">ผลการประเมินของคุณคือ:</p>
                            <div className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-teal-500 p-6 rounded-xl shadow-md inline-block w-full md:w-auto mb-6">
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
                            onClick={handleReevaluateAndSave}
                            disabled={isSaving}
                            className={`bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-12 rounded-full shadow-lg transition-transform transform hover:scale-105 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSaving ? 'กำลังบันทึก...' : 'ประเมินอีกครั้ง'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function EditAssessmentPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <EditAssessmentContent />
        </Suspense>
    );
}
