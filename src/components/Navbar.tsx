"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/Text.jpg"
                                alt="Nurse Walk Partner"
                                width={180}
                                height={60}
                                className="object-contain h-10 w-auto -ml-6"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Hamburger Button (Mobile) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-gray-600 focus:outline-none h-8 w-8 flex items-center justify-center"
                        >
                            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                        <Link
                            href="/about"
                            className={`${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors text-base`}
                        >
                            ที่มาและความสำคัญ
                        </Link>
                        <Link
                            href="/statistics"
                            className={`${isActive('/statistics') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors text-base`}
                        >
                            สถิติการประเมิน
                        </Link>
                        <Link
                            href="/history"
                            className={`${isActive('/history') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors text-base`}
                        >
                            ประวัติการประเมิน
                        </Link>
                        <Link
                            href="/assessment"
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2.5 px-7 rounded-lg shadow-lg transition-colors text-lg"
                        >
                            เริ่มการประเมิน
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 flex flex-col divide-y divide-gray-200 border-t border-gray-200 text-sm text-center">
                        <Link
                            href="/about"
                            className={`${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors py-4 block text-xl`}
                            onClick={() => setIsOpen(false)}
                        >
                            ที่มาและความสำคัญ
                        </Link>
                        <Link
                            href="/statistics"
                            className={`${isActive('/statistics') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors py-4 block text-xl`}
                            onClick={() => setIsOpen(false)}
                        >
                            สถิติการประเมิน
                        </Link>
                        <Link
                            href="/history"
                            className={`${isActive('/history') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} font-bold transition-colors py-4 block text-xl`}
                            onClick={() => setIsOpen(false)}
                        >
                            ประวัติการประเมิน
                        </Link>
                        <div className="pt-4 pb-1">
                            <Link
                                href="/assessment"
                                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors inline-block text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                เริ่มการประเมิน
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
