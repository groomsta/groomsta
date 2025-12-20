'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MembershipSection() {
    const currentPlan = 'free'; // 'free' | 'gold' | 'platinum'

    const benefits = [
        { name: 'Service Discounts', free: 'None', gold: '10% Off', platinum: '20% Off' },
        { name: 'Convenience Fee', free: '₹49/order', gold: 'Waived', platinum: 'Waived' },
        { name: 'Priority Booking', free: false, gold: true, platinum: true },
        { name: 'Premium Partners', free: false, gold: true, platinum: true },
        { name: 'Cancellation Fee', free: 'Standard', gold: 'Zero', platinum: 'Zero' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Current Plan Hero */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                {/* Gold accent elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0C3C85]/20 rounded-full blur-3xl -ml-16 -mb-16" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                            <Crown className="w-6 h-6 text-yellow-500" />
                        </div>
                        <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase">Current Membership</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Groomsta <span className="text-gray-400 font-light">Basic</span></h2>
                            <p className="text-gray-400 max-w-md">
                                You are currently on the free plan. Upgrade to Gold to unlock premium grooming experiences and exclusive savings.
                            </p>
                        </div>
                        <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold border-0 shadow-lg shadow-yellow-900/20 px-8">
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Plans Comparison */}
            <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Explore Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Plan */}
                    <Card className="p-6 border-gray-200 shadow-sm hover:shadow-md transition-all">
                        <div className="mb-4">
                            <h4 className="font-bold text-lg text-gray-900">Basic</h4>
                            <p className="text-gray-500 text-sm">For occasional grooming</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">Free</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500" /> Standard Pricing
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500" /> Access to all services
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                    </Card>

                    {/* Gold Plan */}
                    <Card className="p-6 border-yellow-200 bg-gradient-to-b from-yellow-50/50 to-white shadow-md relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                        <div className="mb-4">
                            <h4 className="font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Gold
                            </h4>
                            <p className="text-gray-500 text-sm">For regular grooming</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">₹299</span><span className="text-gray-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <Check className="w-4 h-4 text-yellow-600" /> 10% Off on Services
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <Check className="w-4 h-4 text-yellow-600" /> Zero Convenience Fee
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                <Check className="w-4 h-4 text-yellow-600" /> Top-rated Partners
                            </li>
                        </ul>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black border-0">Choose Gold</Button>
                    </Card>

                    {/* Platinum Plan */}
                    <Card className="p-6 border-blue-100 bg-white hover:border-blue-200 shadow-sm hover:shadow-md transition-all">
                        <div className="mb-4">
                            <h4 className="font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-600" /> Platinum
                            </h4>
                            <p className="text-gray-500 text-sm">Ultimate luxury experience</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">₹599</span><span className="text-gray-500 text-sm">/month</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-blue-600" /> 20% Off on Services
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-blue-600" /> Priority Booking Slots
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-blue-600" /> dedicated Support
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">Choose Platinum</Button>
                    </Card>
                </div>
            </div>

            {/* Benefit Table (Hidden on small mobile) */}
            <div className="hidden md:block">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Detailed Comparison</h3>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium">
                            <tr>
                                <th className="px-6 py-4">Benefit</th>
                                <th className="px-6 py-4 text-center">Free</th>
                                <th className="px-6 py-4 text-center text-yellow-600 bg-yellow-50/50">Gold</th>
                                <th className="px-6 py-4 text-center">Platinum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {benefits.map((bg, idx) => (
                                <tr key={idx} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{bg.name}</td>
                                    <td className="px-6 py-4 text-center text-gray-500">
                                        {typeof bg.free === 'boolean' ? (bg.free ? <Check className="inline w-4 h-4 text-green-500" /> : <div className="w-4 h-4 mx-auto border sm:border-t-2 border-gray-300 transform rotate-45 opacity-20"></div>) : bg.free}
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-900 bg-yellow-50/30">
                                        {typeof bg.gold === 'boolean' ? (bg.gold ? <Check className="inline w-4 h-4 text-green-500" /> : '-') : bg.gold}
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-900">
                                        {typeof bg.platinum === 'boolean' ? (bg.platinum ? <Check className="inline w-4 h-4 text-green-500" /> : '-') : bg.platinum}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
