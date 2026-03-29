"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Navbar from '../../components/Navbar';
import ExerciseModal from '../../components/ExerciseModal';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type HistoryRecord = {
    id: number;
    hn: string;
    assessment_no: number;
    assessment_date: string;
    result: string;
    created_at: string;
};

type HistoryResponse = {
    success: boolean;
    data?: {
        hn: string;
        totalAssessments: number;
        records: HistoryRecord[];
    };
    warning?: string;
    error?: string;
};

function getResultBadgeClass(result: string) {
    if (result === "ให้ลุกนั่งบนเตียง") return "bg-[#FF8042]";
    if (result === "ลุกนั่งข้างเตียง") return "bg-[#FFBB28]";
    if (result === "ยืนและลุกเดิน") return "bg-[#00C49F]";
    return "bg-gray-400";
}

function formatThaiDateTime(value: string) {
    const date = new Date(value);
    return {
        date: date.toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        time: date.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }),
    };
}

function HistoryContent() {
    const [hn, setHn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [historyData, setHistoryData] = useState<HistoryResponse["data"] | null>(null);
    const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchByHn = useCallback(async (hnValue: string) => {
        if (!hnValue.trim()) return;

        setLoading(true);
        setError(null);
        setWarning(null);
        setHistoryData(null);

        try {
            const response = await fetch(`/api/assessment/history?hn=${hnValue.trim()}`);
            const data: HistoryResponse = await response.json();

            if (response.ok && data.data) {
                setHistoryData(data.data);
                if (data.warning === 'history_table_not_available') {
                    setWarning("แสดงผลเฉพาะข้อมูลล่าสุด เนื่องจากยังไม่สามารถอ่านตารางประวัติได้");
                }
            } else {
                setError(data.error || "ไม่พบข้อมูลในระบบ");
            }
        } catch {
            setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-fill and auto-search when redirected with ?hn= query param
    useEffect(() => {
        const hnParam = searchParams.get('hn');
        if (hnParam) {
            setHn(hnParam);
            searchByHn(hnParam);
        }
    }, [searchParams, searchByHn]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        searchByHn(hn);
    };

    const handleEdit = () => {
        const selectedHn = historyData?.hn ?? hn.trim();
        if (selectedHn) {
            sessionStorage.setItem("edit_hn", selectedHn);
            router.push('/assessment/edit');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="max-w-5xl mx-auto">
                    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 relative">
                            <div className="md:absolute md:top-0 md:left-0 self-start md:self-auto mb-4 md:mb-0">
                                <Link href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    ย้อนกลับ
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-[#0e4a8f] text-center w-full pt-4 md:pt-8">
                                ดูประวัติการประเมิน
                            </h1>
                        </div>

                        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder="กรอกเลข HN เพื่อค้นหา"
                                    value={hn}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setHn(value);
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg text-black"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0e4a8f] hover:bg-[#0a3a72] text-white font-bold py-3 px-6 rounded-lg shadow transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'ค้นหา...' : 'ค้นหา'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                            {warning && <p className="text-amber-600 mt-2 text-center">{warning}</p>}
                        </form>

                        {historyData && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">ประวัติการประเมิน</h2>
                                            <p className="text-gray-600">HN: <span className="font-semibold text-gray-900">{historyData.hn}</span></p>
                                            <p className="text-gray-600">จำนวนครั้งที่ประเมิน: <span className="font-semibold text-gray-900">{historyData.totalAssessments} ครั้ง</span></p>
                                        </div>
                                        <button
                                            onClick={handleEdit}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg shadow transition-colors flex items-center self-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            ประเมินอีกครั้ง
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {historyData.records.map((record) => {
                                        const { date, time } = formatThaiDateTime(record.assessment_date || record.created_at);
                                        return (
                                            <div key={record.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                                <div className="space-y-2">
                                                    <p className="text-gray-800 font-bold text-lg">ครั้งที่ {record.assessment_no}</p>
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                        <p className="text-gray-600 md:whitespace-nowrap">
                                                            วันที่ประเมิน: <span className="font-semibold text-gray-900">{date} เวลา {time} น.</span>
                                                        </p>
                                                        <div className="flex items-center gap-2 md:shrink-0">
                                                            <span className="text-base font-semibold text-gray-900">ผลการประเมิน :</span>
                                                            <div
                                                                onClick={() => setExerciseModalOpen(true)}
                                                                className={`text-base font-bold text-white px-4 py-2 rounded-lg text-center shadow cursor-pointer hover:scale-105 transition-transform ${getResultBadgeClass(record.result)}`}
                                                            >
                                                                {record.result}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main >

            <ExerciseModal
                isOpen={exerciseModalOpen}
                onClose={() => setExerciseModalOpen(false)}
            />
        </div >
    );
}

export default function HistoryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <HistoryContent />
        </Suspense>
    );
}
