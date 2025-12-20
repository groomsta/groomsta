'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowDownLeft, ArrowUpRight, History, CreditCard } from 'lucide-react';

export default function WalletSection() {
    const transactions = [
        { id: 1, type: 'credit', title: 'Added to Wallet', date: 'Dec 18, 2024', amount: 500, status: 'Success' },
        { id: 2, type: 'debit', title: 'Booking #BK-2024-001', date: 'Dec 15, 2024', amount: 150, status: 'Success' },
        { id: 3, type: 'credit', title: 'Referral Bonus', date: 'Dec 10, 2024', amount: 100, status: 'Success' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-r from-[#0C3C85] to-[#1258c0] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-blue-100 font-medium mb-1">Total Balance</p>
                        <h2 className="text-4xl font-bold">₹450.00</h2>
                        <div className="flex items-center gap-2 mt-2 text-sm text-blue-200">
                            <CreditCard className="w-4 h-4" />
                            <span>Wallet ID: GR-9988-7766</span>
                        </div>
                    </div>
                    <Button className="bg-white text-[#0C3C85] hover:bg-blue-50 font-semibold shadow-none border-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Money
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Add Money', 'Send to Bank', 'Voucher', 'Auto-Topup'].map((action) => (
                    <Button key={action} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-gray-50 hover:border-blue-200 transition-all">
                        <span className="text-gray-600 font-medium">{action}</span>
                    </Button>
                ))}
            </div>

            {/* Transaction History */}
            <Card className="border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-[#1A1A1A] flex items-center gap-2">
                        <History className="w-5 h-5 text-gray-400" />
                        Recent Transactions
                    </h3>
                    <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
                </div>

                <div className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-[#1A1A1A]">{tx.title}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-[#1A1A1A]'
                                    }`}>
                                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                </p>
                                <Badge variant="secondary" className="text-[10px] bg-gray-100 text-gray-500 font-normal">
                                    {tx.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
