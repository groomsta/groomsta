'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

export default function SearchBar({ placeholder = "Search for services...", className = '' }: SearchBarProps) {
    return (
        <div className={`relative max-w-xl w-full mx-auto ${className}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <Input
                type="text"
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-6 border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-[#0C3C85] focus-visible:border-transparent transition-all text-base shadow-sm hover:shadow-md bg-white border"
            />
        </div>
    );
}
