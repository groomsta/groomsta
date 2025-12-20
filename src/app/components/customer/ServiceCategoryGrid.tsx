'use client';

import { Scissors, Sparkles, User, Zap, Star, ShieldCheck, Heart, Crown } from 'lucide-react';
import ServiceCategoryCard from './ServiceCategoryCard';

const categories = [
    { id: 'haircut', title: 'Haircut', icon: Scissors, href: '/services/home/haircut' },
    { id: 'beard', title: 'Beard Grooming', icon: User, href: '/services/home/beard' },
    { id: 'facial', title: 'Facial & Cleanup', icon: Sparkles, href: '/services/home/facial' },
    { id: 'massage', title: 'Massage', icon: Heart, href: '/services/home/massage' },
    { id: 'hair-color', title: 'Hair Color', icon: Zap, href: '/services/home/color' },
    { id: 'packages', title: 'Packages', icon: Star, href: '/services/home/packages' },
    { id: 'luxury', title: 'Luxury Experience', icon: Crown, href: '/services/home/luxury' },
    { id: 'safety', title: 'Safety Protocols', icon: ShieldCheck, href: '/services/home/safety' },
];

export default function ServiceCategoryGrid() {
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
