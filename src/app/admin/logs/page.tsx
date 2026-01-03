"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock system logs
const MOCK_LOGS = [
  { id: "l1", timestamp: "2026-01-03T17:55:00", level: "INFO", service: "auth", message: "User login successful: user_id=u123", source: "auth-service" },
  { id: "l2", timestamp: "2026-01-03T17:54:45", level: "INFO", service: "booking", message: "Booking created: booking_id=B001, customer=Rahul", source: "booking-service" },
  { id: "l3", timestamp: "2026-01-03T17:54:30", level: "INFO", service: "partner", message: "Partner went online: partner_id=P001", source: "partner-service" },
  { id: "l4", timestamp: "2026-01-03T17:54:15", level: "WARN", service: "payment", message: "Payment retry attempt 2 for order_id=ORD123", source: "payment-service" },
  { id: "l5", timestamp: "2026-01-03T17:54:00", level: "INFO", service: "notification", message: "SMS sent to +91 98765xxxxx", source: "notification-service" },
  { id: "l6", timestamp: "2026-01-03T17:53:45", level: "ERROR", service: "payment", message: "Payment failed: razorpay_error=INSUFFICIENT_FUNDS", source: "payment-service" },
  { id: "l7", timestamp: "2026-01-03T17:53:30", level: "INFO", service: "booking", message: "Job accepted by partner: booking_id=B001, partner_id=P001", source: "broadcast-service" },
  { id: "l8", timestamp: "2026-01-03T17:53:00", level: "DEBUG", service: "geo", message: "Found 5 partners within 5km radius", source: "geo-service" },
  { id: "l9", timestamp: "2026-01-03T17:52:45", level: "INFO", service: "partner", message: "Partner verification approved: partner_id=P005", source: "admin-service" },
  { id: "l10", timestamp: "2026-01-03T17:52:30", level: "WARN", service: "auth", message: "Failed login attempt from IP 192.168.1.100", source: "auth-service" },
];

const LOG_LEVELS: Record<string, { color: string; bg: string }> = {
  DEBUG: { color: "text-gray-600", bg: "bg-gray-100" },
  INFO: { color: "text-blue-600", bg: "bg-blue-100" },
  WARN: { color: "text-yellow-600", bg: "bg-yellow-100" },
  ERROR: { color: "text-red-600", bg: "bg-red-100" },
};

const SERVICES = ["all", "auth", "booking", "partner", "payment", "notification", "geo"];

export default function AdminLogsPage() {
  const [logs] = useState(MOCK_LOGS);
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesService = filterService === "all" || log.service === filterService;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesService && matchesSearch;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Logs</h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input 
              type="checkbox" 
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh
          </label>
          <Button variant="outline">Export Logs</Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Level</label>
              <select 
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Levels</option>
                <option value="DEBUG">DEBUG</option>
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Service</label>
              <select 
                value={filterService}
                onChange={e => setFilterService(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s === "all" ? "All Services" : s}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-500 mb-1 block">Search</label>
              <Input 
                placeholder="Search logs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold">{logs.length}</p>
            <p className="text-sm text-gray-500">Total Logs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{logs.filter(l => l.level === "INFO").length}</p>
            <p className="text-sm text-gray-500">Info</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{logs.filter(l => l.level === "WARN").length}</p>
            <p className="text-sm text-gray-500">Warnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-red-600">{logs.filter(l => l.level === "ERROR").length}</p>
            <p className="text-sm text-gray-500">Errors</p>
          </CardContent>
        </Card>
      </div>

      {/* Logs List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y font-mono text-sm">
            {filteredLogs.map(log => (
              <div key={log.id} className="p-3 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 text-xs whitespace-nowrap">
                    {formatTime(log.timestamp)}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${LOG_LEVELS[log.level].bg} ${LOG_LEVELS[log.level].color}`}>
                    {log.level}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700">
                    {log.service}
                  </span>
                  <span className="flex-1 text-gray-700">{log.message}</span>
                  <span className="text-gray-400 text-xs">{log.source}</span>
                </div>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No logs matching filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
