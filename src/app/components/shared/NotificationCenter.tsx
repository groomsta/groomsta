'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, Clock, Calendar, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Types matching the DB schema
type Notification = {
    id: string;
    title: string;
    message: string;
    notificationType: string;
    isRead: boolean;
    createdAt: string;
};

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for UI demonstration since we don't have a logged-in user context
    useEffect(() => {
        const mockNotifications: Notification[] = [
            {
                id: '1',
                title: 'Booking Confirmed!',
                message: 'Your booking GRM-2024-1234 has been confirmed. Partner Amit will arrive at 10:00 AM.',
                notificationType: 'booking_confirmed',
                isRead: false,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                title: '₹100 Added to Wallet',
                message: 'Your friend completed their first booking! ₹100 referral bonus has been credited to your wallet.',
                notificationType: 'wallet_credit',
                isRead: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
            },
            {
                id: '3',
                title: 'Rate your experience',
                message: 'How was your recent Haircut service? Leave a review to help others.',
                notificationType: 'review_reminder',
                isRead: true,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
            }
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
    }, []);

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'booking_confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'wallet_credit': return <span className="text-xl">💰</span>;
            case 'review_reminder': return <span className="text-xl">⭐️</span>;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-[#1A1A1A] hover:text-[#0C3C85] rounded-full hover:bg-gray-100">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-[10px] rounded-full bg-red-500 border-none font-bold text-white">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 sm:w-96 p-0 mr-4 mt-2 shadow-xl border-gray-100 rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#1A1A1A]">Notifications</h3>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-blue-100 text-[#0C3C85] hover:bg-blue-100 font-semibold rounded-full px-2">
                                {unreadCount} New
                            </Badge>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-[#0C3C85] text-xs font-semibold hover:bg-transparent hover:underline"
                            onClick={handleMarkAllRead}
                        >
                            <Check className="w-3 h-3 mr-1" /> Mark all read
                        </Button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center justify-center text-gray-400">
                            <Bell className="w-12 h-12 mb-3 text-gray-200" />
                            <p>You have no notifications right now.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 cursor-pointer hover:bg-gray-50 transition-colors flex gap-4",
                                        !notification.isRead ? "bg-blue-50/30" : ""
                                    )}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        {getIcon(notification.notificationType)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={cn("text-sm font-semibold", !notification.isRead ? "text-[#1A1A1A]" : "text-gray-700")}>
                                                {notification.title}
                                            </p>
                                            {!notification.isRead && (
                                                <span className="w-2 h-2 rounded-full bg-[#0C3C85] mt-1.5 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-1.5 pt-1 text-gray-400 text-[10px] uppercase font-semibold tracking-wider">
                                            <Clock className="w-3 h-3" />
                                            {formatTime(notification.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-center">
                    <Button variant="link" size="sm" className="h-auto p-0 text-[#0C3C85] font-semibold text-xs hover:no-underline">
                        View All Notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
