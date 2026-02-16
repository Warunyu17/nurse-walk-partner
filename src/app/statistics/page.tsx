"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function StatisticsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [statsData, setStatsData] = useState<any[]>([]);

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
                    {/* Section 1: Assessment Statistics (Custom Bar Chart) */}
                    <section className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 md:mb-12 relative">
                            <div className="md:absolute md:top-0 md:left-0 self-start md:self-auto mb-4 md:mb-0">
                                <Link href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    ย้อนกลับ
                                </Link>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-center w-full">
                                สถิติการประเมินภาพรวม
                            </h1>
                        </div>

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



                </div>
            </main>
        </div>
    );
}
