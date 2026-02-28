'use client';

import { useState } from 'react';
import ProfileSidebar from '@/app/components/profile/ProfileSidebar';
import BookingHistory from '@/app/components/profile/BookingHistory';
import ProfileDetails from '@/app/components/profile/ProfileDetails';
import SavedAddresses from '@/app/components/profile/SavedAddresses';
import { CreditCard, Bell } from 'lucide-react';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileDetails />;
            case 'bookings':
                return <BookingHistory />;
            case 'addresses':
                return <SavedAddresses />;
            default:
                // Placeholder for Wallet and Notifications
                return (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 animate-in fade-in">
                        {activeTab === 'wallet' ? (
                            <CreditCard className="w-16 h-16 mb-4 opacity-20" />
                        ) : (
                            <Bell className="w-16 h-16 mb-4 opacity-20" />
                        )}
                        <h3 className="font-bold text-lg text-gray-500">Coming Soon</h3>
                        <p className="text-sm">This feature is under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="font-montserrat text-3xl font-bold text-[#1A1A1A] mb-8">My Account</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Area */}
                    <div className="w-full lg:w-80 shrink-0">
                        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </div>
    );
}
