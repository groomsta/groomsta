'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationCenter from '@/app/components/shared/NotificationCenter';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 bg-[#0C3C85] rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#1A1A1A]">Groomsta</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/services/home"
                            className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium"
                        >
                            Home Services
                        </Link>
                        <Link
                            href="/services/salon"
                            className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium"
                        >
                            Salon Services
                        </Link>
                        <Link
                            href="/track"
                            className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium"
                        >
                            Track Booking
                        </Link>
                        <Link
                            href="/about"
                            className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/profile"
                            className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium"
                        >
                            Profile
                        </Link>
                        <NotificationCenter />
                        <Button asChild className="bg-[#0C3C85] hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md h-auto py-2.5 px-6 rounded-lg">
                            <Link href="/auth/login">
                                Login
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#1A1A1A]"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/services/home"
                                className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium px-2 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home Services
                            </Link>
                            <Link
                                href="/services/salon"
                                className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium px-2 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Salon Services
                            </Link>
                            <Link
                                href="/track"
                                className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium px-2 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Track Booking
                            </Link>
                            <Link
                                href="/about"
                                className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium px-2 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/profile"
                                className="text-[#1A1A1A] hover:text-[#0C3C85] transition-colors font-medium px-2 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <div className="px-2 py-2 border-t border-b flex justify-between items-center">
                                <span className="font-medium text-[#1A1A1A]">Notifications</span>
                                <NotificationCenter />
                            </div>
                            <Button asChild className="bg-[#0C3C85] hover:bg-blue-700 text-white font-semibold w-full h-auto py-2.5 rounded-lg">
                                <Link
                                    href="/auth/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
