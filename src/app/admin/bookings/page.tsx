"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock bookings data
const MOCK_BOOKINGS = [
  { id: "B001", customer: "Rahul Mehta", phone: "+91 98765 43210", partner: "Amit Kumar", service: "Haircut + Shaving", amount: 350, status: "completed", date: "2026-01-03", time: "10:30 AM" },
  { id: "B002", customer: "Priya Sharma", phone: "+91 87654 32109", partner: "Sneha Patel", service: "Hair Coloring", amount: 550, status: "in_progress", date: "2026-01-03", time: "11:00 AM" },
  { id: "B003", customer: "Vikram Singh", phone: "+91 76543 21098", partner: "Rahul Sharma", service: "Facial", amount: 400, status: "accepted", date: "2026-01-03", time: "02:00 PM" },
  { id: "B004", customer: "Ananya Gupta", phone: "+91 65432 10987", partner: null, service: "Manicure", amount: 200, status: "pending", date: "2026-01-03", time: "03:30 PM" },
  { id: "B005", customer: "Karan Malhotra", phone: "+91 54321 09876", partner: null, service: "Haircut", amount: 180, status: "cancelled", date: "2026-01-02", time: "04:00 PM" },
  { id: "B006", customer: "Neha Verma", phone: "+91 43210 98765", partner: "Priya Singh", service: "Hair Spa", amount: 800, status: "disputed", date: "2026-01-02", time: "11:00 AM" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  accepted: { label: "Accepted", color: "bg-blue-100 text-blue-700" },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-700" },
  completed: { label: "Completed", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-700" },
  disputed: { label: "Disputed", color: "bg-red-100 text-red-700" },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<typeof MOCK_BOOKINGS[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const matchesSearch = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCancel = (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    ));
    setShowDetail(false);
  };

  const handleRefund = (bookingId: string) => {
    alert(`Refund initiated for booking ${bookingId}`);
    // In real app: POST /api/admin/bookings/:id/refund
  };

  const viewDetails = (booking: typeof MOCK_BOOKINGS[0]) => {
    setSelectedBooking(booking);
    setShowDetail(true);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    inProgress: bookings.filter(b => b.status === "in_progress").length,
    completed: bookings.filter(b => b.status === "completed").length,
    disputed: bookings.filter(b => b.status === "disputed").length,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setFilterStatus("all")}>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setFilterStatus("pending")}>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setFilterStatus("in_progress")}>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setFilterStatus("completed")}>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => setFilterStatus("disputed")}>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.disputed}</p>
            <p className="text-sm text-gray-500">Disputed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input 
          placeholder="Search by customer or booking ID..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <select 
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border rounded-md px-3"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="disputed">Disputed</option>
        </select>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.partner || <span className="text-gray-400">Unassigned</span>}</TableCell>
                  <TableCell>{booking.date} {booking.time}</TableCell>
                  <TableCell>₹{booking.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${STATUS_CONFIG[booking.status].color}`}>
                      {STATUS_CONFIG[booking.status].label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => viewDetails(booking)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Booking Detail Modal */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-mono">{selectedBooking.id}</span>
              </div>
              <hr />
              <div>
                <h4 className="font-medium mb-2">Customer</h4>
                <p>{selectedBooking.customer}</p>
                <p className="text-sm text-gray-500">{selectedBooking.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Service</h4>
                <p>{selectedBooking.service}</p>
                <p className="text-sm text-gray-500">{selectedBooking.date} at {selectedBooking.time}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Partner</h4>
                <p>{selectedBooking.partner || "Not assigned"}</p>
              </div>
              <div className="flex justify-between items-center">
                <span>Amount</span>
                <span className="text-xl font-bold">₹{selectedBooking.amount}</span>
              </div>
              
              <div className="flex gap-2 pt-4">
                {selectedBooking.status !== "cancelled" && selectedBooking.status !== "completed" && (
                  <Button variant="destructive" onClick={() => handleCancel(selectedBooking.id)}>
                    Cancel Booking
                  </Button>
                )}
                {(selectedBooking.status === "completed" || selectedBooking.status === "disputed") && (
                  <Button variant="outline" onClick={() => handleRefund(selectedBooking.id)}>
                    Process Refund
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
