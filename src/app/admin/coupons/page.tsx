"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const MOCK_COUPONS = [
  { id: "c1", code: "WELCOME100", discount: 100, type: "flat", minOrder: 500, usageLimit: 1000, usedCount: 234, expiresAt: "2026-02-28", status: "active" },
  { id: "c2", code: "SAVE20", discount: 20, type: "percent", minOrder: 300, usageLimit: 500, usedCount: 189, expiresAt: "2026-01-31", status: "active" },
  { id: "c3", code: "NEWYEAR50", discount: 50, type: "flat", minOrder: 200, usageLimit: 2000, usedCount: 1850, expiresAt: "2026-01-15", status: "active" },
  { id: "c4", code: "DIWALI500", discount: 500, type: "flat", minOrder: 2000, usageLimit: 100, usedCount: 100, expiresAt: "2025-11-15", status: "exhausted" },
  { id: "c5", code: "SUMMER25", discount: 25, type: "percent", minOrder: 400, usageLimit: 300, usedCount: 75, expiresAt: "2025-08-31", status: "expired" },
];

type CouponType = "flat" | "percent";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(MOCK_COUPONS);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    type: "flat" as CouponType,
    minOrder: 0,
    usageLimit: 100,
    expiresAt: "",
  });

  const handleAddCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiresAt) {
      alert("Please fill all required fields");
      return;
    }

    const coupon = {
      id: `c${Date.now()}`,
      ...newCoupon,
      usedCount: 0,
      status: "active",
    };

    setCoupons([coupon, ...coupons]);
    setNewCoupon({ code: "", discount: 0, type: "flat", minOrder: 0, usageLimit: 100, expiresAt: "" });
    setShowAddDialog(false);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(c => 
      c.id === id 
        ? { ...c, status: c.status === "active" ? "paused" : "active" }
        : c
    ));
  };

  const deleteCoupon = (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      paused: "bg-yellow-100 text-yellow-700",
      expired: "bg-gray-100 text-gray-700",
      exhausted: "bg-red-100 text-red-700",
    };
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>Create Coupon</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Coupon Code</Label>
                <Input
                  value={newCoupon.code}
                  onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SAVE50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Discount</Label>
                  <Input
                    type="number"
                    value={newCoupon.discount || ""}
                    onChange={e => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <select
                    value={newCoupon.type}
                    onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value as CouponType })}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="flat">Flat (₹)</option>
                    <option value="percent">Percent (%)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Order (₹)</Label>
                  <Input
                    type="number"
                    value={newCoupon.minOrder || ""}
                    onChange={e => setNewCoupon({ ...newCoupon, minOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Usage Limit</Label>
                  <Input
                    type="number"
                    value={newCoupon.usageLimit || ""}
                    onChange={e => setNewCoupon({ ...newCoupon, usageLimit: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <Label>Expires At</Label>
                <Input
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={e => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                />
              </div>
              <Button onClick={handleAddCoupon} className="w-full">Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold">{coupons.length}</p>
            <p className="text-sm text-gray-500">Total Coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-green-600">{coupons.filter(c => c.status === "active").length}</p>
            <p className="text-sm text-gray-500">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{coupons.reduce((sum, c) => sum + c.usedCount, 0)}</p>
            <p className="text-sm text-gray-500">Total Uses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-purple-600">₹{(coupons.reduce((sum, c) => sum + (c.type === "flat" ? c.discount * c.usedCount : 0), 0)).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Discounts Given</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map(coupon => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.type === "flat" ? `₹${coupon.discount}` : `${coupon.discount}%`}
                  </TableCell>
                  <TableCell>₹{coupon.minOrder}</TableCell>
                  <TableCell>
                    {coupon.usedCount} / {coupon.usageLimit}
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(coupon.expiresAt).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {coupon.status === "active" || coupon.status === "paused" ? (
                        <Button variant="ghost" size="sm" onClick={() => toggleCouponStatus(coupon.id)}>
                          {coupon.status === "active" ? "Pause" : "Activate"}
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteCoupon(coupon.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
