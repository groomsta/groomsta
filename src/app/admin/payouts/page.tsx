"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Mock payout data
const MOCK_PENDING_PAYOUTS = [
  { partnerId: "P001", name: "Amit Kumar", jobs: 12, gross: 5400, commission: 1080, net: 4320, bank: "HDFC ****1234", status: "pending" },
  { partnerId: "P002", name: "Sneha Patel", jobs: 8, gross: 3200, commission: 640, net: 2560, bank: "ICICI ****5678", status: "pending" },
  { partnerId: "P003", name: "Rahul Sharma", jobs: 15, gross: 7500, commission: 1500, net: 6000, bank: "SBI ****9012", status: "pending" },
  { partnerId: "P004", name: "Priya Singh", jobs: 6, gross: 2100, commission: 420, net: 1680, bank: "Axis ****3456", status: "pending" },
  { partnerId: "P005", name: "Vikram Mehta", jobs: 10, gross: 4800, commission: 960, net: 3840, bank: "HDFC ****7890", status: "pending" },
];

const MOCK_PAYOUT_HISTORY = [
  { id: "PAY-001", date: "2025-12-28", totalPartners: 42, totalAmount: 185400, status: "completed" },
  { id: "PAY-002", date: "2025-12-21", totalPartners: 38, totalAmount: 162800, status: "completed" },
  { id: "PAY-003", date: "2025-12-14", totalPartners: 35, totalAmount: 148200, status: "completed" },
];

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState(MOCK_PENDING_PAYOUTS);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalGross = payouts.reduce((sum, p) => sum + p.gross, 0);
  const totalCommission = payouts.reduce((sum, p) => sum + p.commission, 0);
  const totalNet = payouts.reduce((sum, p) => sum + p.net, 0);

  const toggleSelectAll = () => {
    if (selectedPartners.length === payouts.length) {
      setSelectedPartners([]);
    } else {
      setSelectedPartners(payouts.map(p => p.partnerId));
    }
  };

  const togglePartner = (partnerId: string) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleProcessPayouts = async () => {
    if (selectedPartners.length === 0) {
      alert("Please select partners to process payouts");
      return;
    }
    
    if (!confirm(`Process payouts for ${selectedPartners.length} partners?`)) return;
    
    setIsProcessing(true);
    // In real app: POST /api/admin/payouts/process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPayouts(payouts.filter(p => !selectedPartners.includes(p.partnerId)));
    setSelectedPartners([]);
    setIsProcessing(false);
    alert("Payouts processed successfully!");
  };

  const handleExportCSV = () => {
    const csv = [
      ["Partner ID", "Name", "Jobs", "Gross", "Commission", "Net", "Bank Account"],
      ...payouts.map(p => [p.partnerId, p.name, p.jobs, p.gross, p.commission, p.net, p.bank])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payouts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const selectedTotal = payouts
    .filter(p => selectedPartners.includes(p.partnerId))
    .reduce((sum, p) => sum + p.net, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payout Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button 
            onClick={handleProcessPayouts} 
            disabled={isProcessing || selectedPartners.length === 0}
          >
            {isProcessing ? "Processing..." : `Process Selected (${selectedPartners.length})`}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-gray-500">Pending Payouts</p>
            <p className="text-2xl font-bold">{payouts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-gray-500">Total Gross</p>
            <p className="text-2xl font-bold">₹{totalGross.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-gray-500">Commission (20%)</p>
            <p className="text-2xl font-bold text-green-600">₹{totalCommission.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-gray-500">Total Payout</p>
            <p className="text-2xl font-bold text-blue-600">₹{totalNet.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Selected Summary */}
      {selectedPartners.length > 0 && (
        <Card className="mb-4 bg-blue-50 border-blue-200">
          <CardContent className="py-3">
            <p>
              Selected: <strong>{selectedPartners.length}</strong> partners | 
              Total payout: <strong>₹{selectedTotal.toLocaleString()}</strong>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pending Payouts Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pending Payouts (Week of Jan 3, 2026)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedPartners.length === payouts.length && payouts.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Partner ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Gross</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Net Payout</TableHead>
                <TableHead>Bank Account</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map(payout => (
                <TableRow key={payout.partnerId}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedPartners.includes(payout.partnerId)}
                      onCheckedChange={() => togglePartner(payout.partnerId)}
                    />
                  </TableCell>
                  <TableCell className="font-mono">{payout.partnerId}</TableCell>
                  <TableCell>{payout.name}</TableCell>
                  <TableCell>{payout.jobs}</TableCell>
                  <TableCell>₹{payout.gross.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">-₹{payout.commission.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-green-600">₹{payout.net.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-500">{payout.bank}</TableCell>
                </TableRow>
              ))}
              {payouts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No pending payouts
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Partners</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PAYOUT_HISTORY.map(payout => (
                <TableRow key={payout.id}>
                  <TableCell className="font-mono">{payout.id}</TableCell>
                  <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payout.totalPartners}</TableCell>
                  <TableCell className="font-medium">₹{payout.totalAmount.toLocaleString()}</TableCell>
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
  );
}
