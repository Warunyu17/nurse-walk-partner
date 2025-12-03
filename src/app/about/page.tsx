import React from 'react';
import Navbar from '../../components/Navbar';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Header / Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12 flex-grow">
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto relative">
                    <div className="absolute top-6 left-6">
                        <a href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            ย้อนกลับ
                        </a>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8 text-center mt-6">
                        ที่มาและความสำคัญ
                    </h1>

                    <div className="space-y-8 text-gray-700 text-xl leading-relaxed">
                        <p className="indent-10">
                            หอผู้ป่วยศัลยศาสตร์หญิง โรงพยาบาลศิริราช เป็นหอผู้ป่วยที่ให้การดูแลผู้ป่วยก่อนและหลังผ่าตัดในโรคทางศัลยกรรมหลากหลายประเภท โดยการผ่าตัดเปิดหน้าท้อง
                            ซึ่งเป็นหัตถการขนาดใหญ่ที่ส่งผลทำให้ผู้ป่วยมีการบาดเจ็บของเนื้อเยื่อทำให้ผู้ป่วย
                            มีอาการปวดแผล มีการเคลื่อนไหวได้ลดลงและต้องใช้ระยะเวลาในการฟื้นตัวนานกว่าการผ่าตัดส่องกล้อง ส่งผลให้ผู้ป่วยไม่กล้าเดินส่งผลให้เกิดภาวะแทรกซ้อนหลังผ่าตัดได้ง่าย เช่น ปอดแฟบ ปอดอักเสบ ลิ่มเลือดอุดตัน ท้องอืด เนื่องจากลำไส้เคลื่อนไหว
                            ลดลง รวมถึงเพิ่มระยะเวลานอนโรงพยาบาลและเสียค่าใช้จ่ายในการรักษา
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
