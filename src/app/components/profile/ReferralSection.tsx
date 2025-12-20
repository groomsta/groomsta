'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, Share2, Wallet, Users, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ReferralSection() {
    const [copied, setCopied] = useState(false);
    const referralCode = "GROOM50";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Main Referral Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold mb-2">Invite Friends & Earn ₹100</h2>
                        <p className="text-purple-100 mb-6">
                            Share your unique code with friends. They get <span className="font-bold text-white">₹50 off</span> their first booking, and you get <span className="font-bold text-white">₹100</span> in your wallet!
                        </p>

                        <div className="flex items-center gap-2 max-w-xs mx-auto md:mx-0">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Share2 className="h-4 w-4" />
                                </div>
                                <Input
                                    readOnly
                                    value={referralCode}
                                    className="pl-9 bg-white/90 text-purple-900 font-bold border-0 h-12 text-lg text-center tracking-wider focus-visible:ring-0"
                                />
                            </div>
                            <Button
                                onClick={handleCopy}
                                className="h-12 px-6 bg-white text-purple-700 hover:bg-purple-50 font-bold shadow-sm"
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Stats for Mobile/Desktop */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 min-w-[240px]">
                        <div className="text-center pb-4 border-b border-white/10 mb-4">
                            <p className="text-purple-200 text-sm mb-1 uppercase tracking-wide">Total Earned</p>
                            <h3 className="text-3xl font-bold">₹400</h3>
                        </div>
                        <div className="text-center">
                            <p className="text-purple-200 text-sm mb-1 uppercase tracking-wide">Successful Referrals</p>
                            <h3 className="text-3xl font-bold">4</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Share2, title: 'Share Your Code', desc: 'Send your unique code to friends via WhatsApp or social media.', color: 'text-purple-600 bg-purple-50' },
                        { icon: Users, title: 'Friend Signs Up', desc: 'They use your code to book their first service.', color: 'text-blue-600 bg-blue-50' },
                        { icon: Wallet, title: 'You Earn Rewards', desc: '₹100 is credited to your wallet instantly after their service.', color: 'text-green-600 bg-green-50' }
                    ].map((step, idx) => (
                        <Card key={idx} className="p-6 border-gray-100 hover:border-gray-200 transition-colors flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                                <step.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-[#1A1A1A] mb-2">{step.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Referrals List */}
            <Card className="border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-[#1A1A1A]">Referral History</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { name: "Rahul S.", status: "Completed", amount: "+ ₹100", date: "Dec 12, 2024" },
                        { name: "Priya M.", status: "Completed", amount: "+ ₹100", date: "Nov 28, 2024" },
                        { name: "Amit K.", status: "Pending", amount: "₹0", date: "Dec 18, 2024" },
                    ].map((ref, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                    {ref.name[0]}
                                </div>
                                <div>
                                    <p className="font-medium text-[#1A1A1A] text-sm">{ref.name}</p>
                                    <p className="text-xs text-gray-400">{ref.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${ref.status === 'Completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                    {ref.amount}
                                </p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{ref.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 text-center border-t border-gray-100">
                    <Button variant="link" className="text-[#0C3C85] text-xs h-auto p-0 hover:no-underline">View detailed history <ArrowRight className="w-3 h-3 ml-1" /></Button>
                </div>
            </Card>
        </div>
    );
}
