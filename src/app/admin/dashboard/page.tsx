"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock analytics data
const MOCK_STATS = {
  todayBookings: 45,
  todayRevenue: 32500,
  activePartners: 28,
  pendingVerifications: 5,
  completedToday: 38,
  cancelledToday: 3,
  avgRating: 4.6,
  totalCustomers: 1250,
};

const WEEKLY_DATA = [
  { day: "Mon", bookings: 42, revenue: 28000 },
  { day: "Tue", bookings: 38, revenue: 25500 },
  { day: "Wed", bookings: 51, revenue: 34200 },
  { day: "Thu", bookings: 47, revenue: 31800 },
  { day: "Fri", bookings: 55, revenue: 38500 },
  { day: "Sat", bookings: 63, revenue: 45000 },
  { day: "Sun", bookings: 45, revenue: 32500 },
];

const TOP_SERVICES = [
  { name: "Haircut", count: 156, revenue: 28080 },
  { name: "Hair Coloring", count: 72, revenue: 39600 },
  { name: "Facial", count: 68, revenue: 23800 },
  { name: "Shaving", count: 89, revenue: 8900 },
  { name: "Manicure", count: 54, revenue: 10800 },
];

const TOP_PARTNERS = [
  { name: "Amit Kumar", jobs: 45, rating: 4.9, revenue: 22500 },
  { name: "Priya Singh", jobs: 42, rating: 4.8, revenue: 21000 },
  { name: "Rahul Sharma", jobs: 38, rating: 4.7, revenue: 19000 },
  { name: "Sneha Patel", jobs: 35, rating: 4.6, revenue: 17500 },
];

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...WEEKLY_DATA.map(d => d.revenue));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{MOCK_STATS.todayBookings}</p>
            <p className="text-sm text-gray-500">Today's Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">₹{MOCK_STATS.todayRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Today's Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-purple-600">{MOCK_STATS.activePartners}</p>
            <p className="text-sm text-gray-500">Active Partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-yellow-600">{MOCK_STATS.pendingVerifications}</p>
            <p className="text-sm text-gray-500">Pending Verifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Completed Today</p>
            <p className="text-xl font-bold text-green-600">{MOCK_STATS.completedToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Cancelled Today</p>
            <p className="text-xl font-bold text-red-600">{MOCK_STATS.cancelledToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Avg Rating</p>
            <p className="text-xl font-bold">⭐ {MOCK_STATS.avgRating}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-xl font-bold">{MOCK_STATS.totalCustomers.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weekly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {WEEKLY_DATA.map(day => (
                <div key={day.day} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(day.revenue / maxRevenue) * 160}px` }}
                  />
                  <p className="text-xs text-gray-500 mt-2">{day.day}</p>
                  <p className="text-xs font-medium">₹{(day.revenue / 1000).toFixed(0)}k</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TOP_SERVICES.map((service, i) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-4">{i + 1}.</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{service.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{service.count} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Partners */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {TOP_PARTNERS.map((partner, i) => (
              <div key={partner.name} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold text-blue-600">
                  {i + 1}
                </div>
                <p className="font-medium">{partner.name}</p>
                <p className="text-sm text-gray-500">{partner.jobs} jobs • ⭐ {partner.rating}</p>
                <p className="text-green-600 font-medium mt-1">₹{partner.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
