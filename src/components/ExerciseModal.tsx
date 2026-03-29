"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ExerciseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TOTAL_PAGES = 4;

const ExerciseModal: React.FC<ExerciseModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);

    if (!isOpen) return null;

    const handleGoToPreparation = () => {
        onClose();
        setCurrentPage(0);
        router.push('/safety');
    };

    const handleClose = () => {
        setCurrentPage(0);
        onClose();
    };

    const handleNext = () => {
        if (currentPage < TOTAL_PAGES - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const pages = [
        // ===== POD #0 =====
        <div key="pod0" className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h4 className="text-2xl font-bold text-[#0e4a8f]">POD # 0</h4>
                <p className="text-gray-500 text-sm mt-1">แนวทางการปฏิบัติในวันผ่าตัด</p>
            </div>

            {/* Exercise 1: Lung */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารปอด</p>
                        <p className="text-gray-600 mt-1">ดูด Triflo หรือหายใจเข้าลึกๆ ค้างไว้ให้นานที่สุด แล้วผ่อมออกยาวๆ</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/ปอด.png" alt="บริหารปอด" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 2: Ankle */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารข้อเท้า</p>
                        <ul className="text-gray-600 mt-1 space-y-0.5">
                            <li>• ท่ากดปลายเท้าลง</li>
                            <li>• ท่ากระดกปลายเท้าขึ้น-ลง</li>
                            <li>• ท่าหมุนข้อเท้าทวนเข็มนาฬิกา</li>
                            <li>• ท่าหมุนข้อเท้าตามเข็มนาฬิกา</li>
                        </ul>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติท่าละ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-square rounded-xl overflow-hidden">
                        <Image src="/หมุนเท้า.png" alt="บริหารข้อเท้า" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 3: Turn body */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">พลิกตะแคงตัว</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/พลิกตัว.png" alt="พลิกตะแคงตัว" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>,

        // ===== POD #1 =====
        <div key="pod1" className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h4 className="text-2xl font-bold text-[#0e4a8f]">POD # 1</h4>
                <p className="text-gray-500 text-sm mt-1">แนวทางการปฏิบัติหลังผ่าตัดวันที่ 1</p>
            </div>

            {/* Exercise 1: Lung */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารปอด</p>
                        <p className="text-gray-600 mt-1">ดูด Triflo หรือหายใจเข้าลึกๆ ค้างไว้ให้นานที่สุด แล้วผ่อนออกยาวๆ</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/ปอด.png" alt="บริหารปอด" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 2: Ankle */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารข้อเท้า</p>
                        <ul className="text-gray-600 mt-1 space-y-0.5">
                            <li>• ท่ากดปลายเท้าลง</li>
                            <li>• ท่ากระดกปลายเท้าขึ้น-ลง</li>
                            <li>• ท่าหมุนข้อเท้าทวนเข็มนาฬิกา</li>
                            <li>• ท่าหมุนข้อเท้าตามเข็มนาฬิกา</li>
                        </ul>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติท่าละ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-square rounded-xl overflow-hidden">
                        <Image src="/หมุนเท้า.png" alt="บริหารข้อเท้า" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 3: Head high */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งศีรษะสูง</p>
                        <p className="text-gray-600 mt-1">≥ 60 องศา ≥ 2 ชั่วโมง (6-8 ชั่วโมง/วัน)</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/นอนสูง.png" alt="นั่งศีรษะสูง" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 4: Swing legs */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งบนเก้าอี้/นั่งแกว่งเท้า</p>
                        <p className="text-gray-600 mt-1">30 นาที/ครั้ง</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/แกว่งเท้า.png" alt="นั่งแกว่งเท้า" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 5: Walk 20m */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">เดินบริเวณทางเดินหน้าห้องผู้ป่วย</p>
                        <p className="text-gray-600 mt-1">ระยะ 20 เมตร</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/walk20m.png" alt="เดิน 20 เมตร" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>,

        // ===== POD #2 =====
        <div key="pod2" className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h4 className="text-2xl font-bold text-[#0e4a8f]">POD # 2</h4>
                <p className="text-gray-500 text-sm mt-1">แนวทางการปฏิบัติหลังผ่าตัดวันที่ 2</p>
            </div>

            {/* Exercise 1: Lung */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารปอด</p>
                        <p className="text-gray-600 mt-1">ดูด Triflo หรือหายใจเข้าลึกๆ ค้างไว้ให้นานที่สุด แล้วผ่อนออกยาวๆ</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/ปอด.png" alt="บริหารปอด" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 2: Head high */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งศีรษะสูง</p>
                        <p className="text-gray-600 mt-1">≥ 60 องศา ≥ 2 ชั่วโมง (6-8 ชั่วโมง/วัน)</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/นอนสูง.png" alt="นั่งศีรษะสูง" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 3: Swing legs */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งบนเก้าอี้/นั่งแกว่งเท้า</p>
                        <p className="text-gray-600 mt-1">30 นาที/ครั้ง</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/แกว่งเท้า.png" alt="นั่งแกว่งเท้า" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 4: Walk 40m */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">เดินบริเวณทางเดินหน้าห้องผู้ป่วย</p>
                        <p className="text-gray-600 mt-1">ระยะ 40 เมตร</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/walk40m.png" alt="เดิน 40 เมตร" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>,

        // ===== POD #3 =====
        <div key="pod3" className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h4 className="text-2xl font-bold text-[#0e4a8f]">POD # 3</h4>
                <p className="text-gray-500 text-sm mt-1">แนวทางการปฏิบัติหลังผ่าตัดวันที่ 3</p>
            </div>

            {/* Exercise 1: Lung */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">บริหารปอด</p>
                        <p className="text-gray-600 mt-1">ดูด Triflo หรือหายใจเข้าลึกๆ ค้างไว้ให้นานที่สุด แล้วผ่อนออกยาวๆ</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 ปฏิบัติ 10 ครั้ง ทุก 1 ชั่วโมง ขณะตื่น</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/ปอด.png" alt="บริหารปอด" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 2: Head high */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งศีรษะสูง</p>
                        <p className="text-gray-600 mt-1">≥ 60 องศา ≥ 2 ชั่วโมง (6-8 ชั่วโมง/วัน)</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/นอนสูง.png" alt="นั่งศีรษะสูง" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 3: Swing legs */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">นั่งบนเก้าอี้/นั่งแกว่งเท้า</p>
                        <p className="text-gray-600 mt-1">30 นาที/ครั้ง</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/แกว่งเท้า.png" alt="นั่งแกว่งเท้า" fill className="object-contain" />
                    </div>
                </div>
            </div>

            {/* Exercise 4: Walk 60m */}
            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#0e4a8f] text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    <div>
                        <p className="font-bold text-[#0e4a8f] text-lg">เดินบริเวณทางเดินหน้าห้องผู้ป่วย</p>
                        <p className="text-gray-600 mt-1">ระยะ 60 เมตร</p>
                        <p className="text-sm text-[#0e4a8f]/70 mt-1 font-medium">📌 อย่างน้อย 3 ครั้ง/วัน</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden">
                        <Image src="/walk60m.png" alt="เดิน 60 เมตร" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </div>,
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0e4a8f] to-[#1a6bc4] px-6 py-5 rounded-t-2xl relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h3 className="text-2xl font-bold text-white text-center">
                        แนวทางการปฏิบัติหลังผ่าตัด
                    </h3>
                    {/* Step Indicators */}
                    <div className="flex justify-center gap-2 mt-3">
                        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`transition-all duration-300 rounded-full ${
                                    i === currentPage
                                        ? 'w-8 h-3 bg-white'
                                        : i < currentPage
                                            ? 'w-3 h-3 bg-white/70'
                                            : 'w-3 h-3 bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 px-6 py-5">
                    {pages[currentPage]}
                </div>

                {/* Footer Navigation */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <div className="flex items-center justify-between">
                        {/* Left: Close / Back */}
                        <div>
                            {currentPage === 0 ? (
                                <button
                                    onClick={handleClose}
                                    className="px-5 py-2.5 rounded-lg text-gray-600 font-semibold hover:bg-gray-200 transition-colors border border-gray-300"
                                >
                                    ปิด
                                </button>
                            ) : (
                                <button
                                    onClick={handlePrev}
                                    className="px-5 py-2.5 rounded-lg text-[#0e4a8f] font-semibold hover:bg-blue-50 transition-colors border border-[#0e4a8f]/30 flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    ย้อนกลับ
                                </button>
                            )}
                        </div>

                        {/* Center: Page number */}
                        <span className="text-sm text-gray-400 font-medium hidden sm:block">
                            {currentPage + 1} / {TOTAL_PAGES}
                        </span>

                        {/* Right: Next / Preparation */}
                        <div>
                            {currentPage < TOTAL_PAGES - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="px-5 py-2.5 rounded-lg bg-[#0e4a8f] text-white font-semibold hover:bg-[#0a3a72] shadow-md transition-all hover:scale-105 flex items-center gap-1"
                                >
                                    ถัดไป
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handleGoToPreparation}
                                    className="px-5 py-2.5 rounded-lg bg-[#0e4a8f] text-white font-semibold hover:bg-[#0a3a72] shadow-md transition-all hover:scale-105"
                                >
                                    ไปหน้าการเตรียมตัว
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseModal;
