'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, Share2, Wallet, Users, ArrowRight, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ReferralSection() {
    const [copied, setCopied] = useState(false);
    const referralCode = "GROOM50";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareUrl = `https://groomsta.com/invite/${referralCode}`;
    const shareText = `Get ₹50 off your first premium grooming service at Groomsta! Use my code: ${referralCode}`;

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    };

    const handleSMSShare = () => {
        window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_self');
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

                        <div className="flex gap-3 justify-center md:justify-start max-w-xs mx-auto md:mx-0 mt-4">
                            <Button
                                onClick={handleWhatsAppShare}
                                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-10 shadow-sm transition-all"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleSMSShare}
                                className="flex-1 bg-white/10 hover:bg-white text-white hover:text-purple-700 border-white/20 font-bold h-10 transition-all"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                SMS
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
