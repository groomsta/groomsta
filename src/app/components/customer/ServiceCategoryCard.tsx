'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCategoryCardProps {
    title: string;
    icon: LucideIcon;
    href: string;
    className?: string;
}

export default function ServiceCategoryCard({ title, icon: Icon, href, className = '' }: ServiceCategoryCardProps) {
    return (
        <Link href={href} className={`group block ${className}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#F2C94C] transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="p-4 bg-blue-50 rounded-full group-hover:bg-[#0C3C85] transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#0C3C85] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-[#1A1A1A] group-hover:text-[#0C3C85] transition-colors">
                    {title}
                </h3>
            </div>
        </Link>
    );
}
