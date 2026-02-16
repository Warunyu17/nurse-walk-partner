"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HistoryPage() {
    const [hn, setHn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [assessmentData, setAssessmentData] = useState<any | null>(null);
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hn.trim()) return;

        setLoading(true);
        setError(null);
        setAssessmentData(null);

        try {
            const response = await fetch(`/api/assessment?hn=${hn.trim()}`);
            const data = await response.json();

            if (response.ok) {
                setAssessmentData(data.data);
            } else {
                setError(data.error || "ไม่พบข้อมูลในระบบ");
            }
        } catch {
            setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (hn) {
            sessionStorage.setItem("edit_hn", hn);
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
                            <h1 className="text-3xl font-bold text-blue-800 text-center w-full pt-4 md:pt-8">
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
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'ค้นหา...' : 'ค้นหา'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        </form>

                        {assessmentData && (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="w-full md:w-auto">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">ผลการประเมิน</h2>
                                        <p className="text-gray-600">HN: <span className="font-semibold text-gray-900">{assessmentData.hn}</span></p>
                                        <p className="text-gray-600">
                                            วันที่ประเมิน: <span className="font-semibold text-gray-900">
                                                {new Date(assessmentData.created_at || assessmentData.createdAt).toLocaleDateString('th-TH', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })} เวลา {new Date(assessmentData.created_at || assessmentData.createdAt).toLocaleTimeString('th-TH', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })} น.
                                            </span>
                                        </p>
                                    </div>
                                    <div className="w-full md:w-auto mt-2 md:mt-0">
                                        <div
                                            className={`text-xl font-bold text-white px-6 py-3 rounded-lg inline-block w-full md:w-auto text-center shadow-md ${assessmentData.result === "ให้ลุกนั่งบนเตียง" ? "bg-[#FF8042]" :
                                                assessmentData.result === "ลุกนั่งข้างเตียง" ? "bg-[#FFBB28]" :
                                                    assessmentData.result === "ยืนและลุกเดิน" ? "bg-[#00C49F]" :
                                                        "bg-gray-400"
                                                }`}
                                        >
                                            {assessmentData.result}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-lg shadow transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        ประเมินอีกครั้ง
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
