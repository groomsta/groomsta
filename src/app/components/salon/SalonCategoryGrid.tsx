'use client';

import { Scissors, Sparkles, User, Zap, Star, ShieldCheck, Heart, Crown } from 'lucide-react';
import ServiceCategoryCard from '@/app/components/customer/ServiceCategoryCard';

const categories = [
    { id: 'haircut', title: 'Haircut', icon: Scissors, href: '/services/salon/haircut' },
    { id: 'beard', title: 'Beard Grooming', icon: User, href: '/services/salon/beard' },
    { id: 'facial', title: 'Facial & Cleanup', icon: Sparkles, href: '/services/salon/facial' },
    { id: 'massage', title: 'Massage', icon: Heart, href: '/services/salon/massage' },
    { id: 'hair-color', title: 'Hair Color', icon: Zap, href: '/services/salon/color' },
    { id: 'packages', title: 'Packages', icon: Star, href: '/services/salon/packages' },
    { id: 'luxury', title: 'Luxury Experience', icon: Crown, href: '/services/salon/luxury' },
    { id: 'safety', title: 'Safety Protocols', icon: ShieldCheck, href: '/services/salon/safety' },
];

export default function SalonCategoryGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
                <ServiceCategoryCard
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    href={category.href}
                />
            ))}
        </div>
    );
}
