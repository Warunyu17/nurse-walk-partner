"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

export default function StatisticsPage() {
    const [hn, setHn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [assessmentData, setAssessmentData] = useState<any | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [statsData, setStatsData] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/assessment/stats');
            const data = await response.json();
            if (response.ok) {
                // Sort data by count in descending order
                const sortedData = data.data.sort((a: any, b: any) => b.count - a.count);
                setStatsData(sortedData);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

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

    // Fixed colors for each result type
    const RESULT_COLORS: { [key: string]: string } = {
        "ให้ลุกนั่งบนเตียง": "#FF8042", // Orange
        "ลุกนั่งข้างเตียง": "#FFBB28", // Yellow
        "ยืนและลุกเดิน": "#00C49F", // Green
        "ไม่สามารถประเมินได้": "#8884d8", // Purple
    };

    // Calculate max count for bar height scaling
    const maxCount = Math.max(...statsData.map(d => d.count), 0);

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="max-w-5xl mx-auto space-y-12">

                    {/* Section 1: Assessment Statistics (Custom Bar Chart) */}
                    <section className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8 md:mb-12 text-center">
                            สถิติการประเมินภาพรวม
                        </h1>

                        {/* Custom CSS Bar Chart */}
                        <div className="w-full h-[350px] md:h-[400px] flex items-end justify-around pl-10 md:pl-16 pr-4 pb-12 pt-12 relative">

                            {/* Y-Axis Label (Vertical) */}
                            <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                จำนวนผู้ป่วย (คน)
                            </div>

                            {/* Axes Lines (Unified L-Shape) */}
                            <div className="absolute left-8 md:left-12 right-4 top-10 bottom-12 border-l-2 border-b-2 border-gray-800 z-20 pointer-events-none"></div>

                            {/* Y-Axis Grid Lines (Optional background) */}
                            <div className="absolute left-8 md:left-12 right-4 top-10 bottom-12 flex flex-col justify-between pointer-events-none z-0">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-full border-t border-gray-100 h-0 relative"></div>
                                ))}
                            </div>

                            {statsData.map((entry, index) => {
                                const heightPercent = maxCount > 0 ? (entry.count / maxCount) * 100 : 0;
                                const color = RESULT_COLORS[entry.name] || "#9CA3AF";

                                return (
                                    <div key={index} className="flex flex-col items-center justify-end h-full w-full z-10 group relative">
                                        {/* Tooltip on Hover */}
                                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none whitespace-nowrap z-20">
                                            {entry.name}: {entry.count} คน
                                        </div>

                                        {/* Count Label */}
                                        <div className="mb-2 font-bold text-gray-700 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                            {entry.count} คน
                                        </div>

                                        {/* Bar */}
                                        <div
                                            className="w-12 md:w-20 rounded-t-xl transition-all duration-700 ease-out hover:opacity-90 hover:scale-105 shadow-sm"
                                            style={{
                                                height: `${heightPercent}%`,
                                                backgroundColor: color,
                                                background: `linear-gradient(to bottom, ${color} 10%, ${color}99 100%)`, // Slight gradient
                                                boxShadow: `0 4px 6px -1px ${color}40` // Colored shadow
                                            }}
                                        />

                                        {/* X-Axis Label */}
                                        <div className="absolute -bottom-12 w-32 text-center">
                                            <p className="text-xs md:text-sm font-medium text-gray-600 truncate transform -rotate-12 md:rotate-0 origin-top">
                                                {entry.name}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section 2: Assessment History (Search) */}
                    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
                            ดูประวัติการประเมิน
                        </h1>

                        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
                            <div className="flex gap-2">
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
