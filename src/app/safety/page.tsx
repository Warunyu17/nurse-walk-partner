import React from 'react';
import Navbar from '../../components/Navbar';

export default function SafetyPage() {
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
                        การเตรียมความพร้อม
                    </h1>

                    <div className="space-y-6 text-gray-700 text-xl leading-relaxed px-4 md:px-12">
                        <ul className="list-disc space-y-4 pl-6">
                            <li>ผูกผ้าถุงหรือกางเกงให้แน่น</li>
                            <li>จัดสายให้น้ำเกลือ/สายสวนให้เรียบร้อย</li>
                            <li>ใส่รองเท้าที่มีพื้นกันลื่น</li>
                            <li>พื้นหอผู้ป่วยต้องแห้ง ไม่ลื่น</li>
                            <li>มีแสงสว่างเพียงพอ ทั้งกลางวันและกลางคืน</li>
                            <li>หากมีอาการเหนื่อยเพิ่มขึ้นวิงเวียนศีรษะ หน้ามืด ควรหยุดเดินทันทีและกลับมาพักผ่อนบนเตียง</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
