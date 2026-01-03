"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock earnings data
const MOCK_EARNINGS = {
  currentWeek: 12450,
  lastWeek: 9800,
  totalJobs: 28,
  completedJobs: 25,
  commission: 2490,
  netEarnings: 9960,
};

const MOCK_PAYOUT_HISTORY = [
  { id: "p1", date: "2025-12-28", amount: 9800, status: "completed", jobs: 22 },
  { id: "p2", date: "2025-12-21", amount: 11200, status: "completed", jobs: 26 },
  { id: "p3", date: "2025-12-14", amount: 8500, status: "completed", jobs: 19 },
  { id: "p4", date: "2025-12-07", amount: 10100, status: "completed", jobs: 23 },
];

const MOCK_RECENT_JOBS = [
  { id: "j1", service: "Haircut + Shaving", customer: "Rahul M.", date: "Today", amount: 350, status: "completed" },
  { id: "j2", service: "Hair Coloring", customer: "Priya S.", date: "Today", amount: 550, status: "completed" },
  { id: "j3", service: "Facial", customer: "Amit K.", date: "Yesterday", amount: 400, status: "completed" },
  { id: "j4", service: "Haircut", customer: "Sneha P.", date: "Yesterday", amount: 180, status: "completed" },
];

export default function PartnerEarningsPage() {
  const growthPercent = Math.round(((MOCK_EARNINGS.currentWeek - MOCK_EARNINGS.lastWeek) / MOCK_EARNINGS.lastWeek) * 100);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Earnings Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-2xl font-bold text-green-600">₹{MOCK_EARNINGS.currentWeek.toLocaleString()}</p>
            <p className={`text-xs ${growthPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
              {growthPercent >= 0 ? "↑" : "↓"} {Math.abs(growthPercent)}% vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Jobs Completed</p>
            <p className="text-2xl font-bold">{MOCK_EARNINGS.completedJobs}</p>
            <p className="text-xs text-gray-400">of {MOCK_EARNINGS.totalJobs} total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Commission (20%)</p>
            <p className="text-2xl font-bold text-red-500">-₹{MOCK_EARNINGS.commission.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Net Payout</p>
            <p className="text-2xl font-bold text-blue-600">₹{MOCK_EARNINGS.netEarnings.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Next payout: Sunday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_RECENT_JOBS.map(job => (
                <div key={job.id} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{job.service}</p>
                    <p className="text-sm text-gray-500">{job.customer} • {job.date}</p>
                  </div>
                  <span className="font-bold text-green-600">+₹{job.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PAYOUT_HISTORY.map(payout => (
                  <TableRow key={payout.id}>
                    <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                    <TableCell>{payout.jobs}</TableCell>
                    <TableCell className="font-medium">₹{payout.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {payout.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Commission Breakdown */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span>Gross Earnings</span>
              <span className="font-medium">₹{MOCK_EARNINGS.currentWeek.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2 text-red-600">
              <span>Platform Commission (20%)</span>
              <span>-₹{MOCK_EARNINGS.commission.toLocaleString()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Net Payout</span>
              <span className="text-green-600">₹{MOCK_EARNINGS.netEarnings.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Payouts are processed every Sunday. Amount will be credited to your registered bank account within 1-2 business days.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
