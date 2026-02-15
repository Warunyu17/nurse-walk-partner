import React from 'react';
import Image from 'next/image';
import { FaShieldAlt } from 'react-icons/fa';
import { AiOutlineAreaChart, AiOutlinePlusCircle } from 'react-icons/ai';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 font-sans flex flex-col overflow-y-auto">

                {/* === ส่วน Header / Navbar === */}
                <Navbar />

                {/* === ส่วน Main Content === */}
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8 flex-grow flex flex-col">

                    {/* ส่วน Banner/Hero Section */}
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-center gap-8 lg:gap-0">

                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-sm">
                                <span className="text-[#0e4a8f]">Nurse</span> <span className="text-[#5dae28]">Walk</span> <br className="lg:hidden" /> <span className="text-[#0e4a8f]">Partner</span>
                            </h1>
                            <div className="mt-4 space-y-2">
                                <p className="text-2xl text-[#0e4a8f] font-bold">
                                    โปรแกรมการเดินสำหรับ
                                </p>
                                <p className="text-2xl text-[#0e4a8f] font-bold">
                                    ผู้ป่วยผ่าตัดเปิดหน้าท้อง
                                </p>
                            </div>
                        </div>

                        {/* Right Content (Image) */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-xs h-auto flex justify-center">
                                <Image
                                    src="/logo.jpg"
                                    alt="Nurse Walk Partner"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-contain"
                                    priority
                                />
                            </div>
                        </div>

                    </div>



                    {/* === ส่วน Feature Cards 3 อันล่าง === */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2 pb-8 lg:pb-0">

                        {/* Card 1: การเตรียมความพร้อม */}
                        <Link href="/safety" className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                                <FaShieldAlt className="w-12 h-12 text-gray-600" />
                            </div>
                            <p className="mt-4 text-xl font-bold text-gray-800">การเตรียมความพร้อม</p>
                        </Link>

                        {/* Card 2: สถิติการประเมิน */}
                        <Link href="/statistics" className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                                <AiOutlineAreaChart className="w-12 h-12 text-gray-600" />
                            </div>
                            <p className="mt-4 text-xl font-bold text-gray-800">สถิติการประเมิน</p>
                        </Link>

                        {/* Card 3: ทำการประเมิน */}
                        <Link href="/assessment" className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                                <AiOutlinePlusCircle className="w-12 h-12 text-gray-600" />
                            </div>
                            <p className="mt-4 text-xl font-bold text-gray-800">ทำการประเมิน</p>
                        </Link>

                    </div>
                </main>
            </div>
        </>
    );
}
