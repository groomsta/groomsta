'use client';

import { cn } from '@/lib/utils';
import { User, ShoppingBag, MapPin, CreditCard, Bell, LogOut } from 'lucide-react';

interface ProfileSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MENU_ITEMS = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: ShoppingBag },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'wallet', label: 'Wallet & Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* User Short Info */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#0C3C85] font-bold text-xl">
                    JD
                </div>
                <div>
                    <h3 className="font-bold text-[#1A1A1A]">John Doe</h3>
                    <p className="text-xs text-gray-500">+91 98765 43210</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-2 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-[#0C3C85]"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-[#1A1A1A]"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-[#0C3C85]" : "text-gray-400")} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100 mt-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
