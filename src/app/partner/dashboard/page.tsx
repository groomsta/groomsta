"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import IncomingJobCard from "@/components/partner/dashboard/IncomingJobCard";
import ActiveJobCard, { type JobStatus } from "@/components/partner/dashboard/ActiveJobCard";
import JobDetailModal from "@/components/partner/dashboard/JobDetailModal";

// Mock data for development without DB
const MOCK_INCOMING_JOB = {
  id: "job-001",
  customerName: "Vikram Mehta",
  serviceName: "Premium Haircut",
  price: 450,
  distance: "2.3 km",
  address: "B-42, Sector 18, Noida, UP 201301",
  expiresAt: Date.now() + 20000,
};

const MOCK_ACTIVE_JOBS = [
  {
    id: "job-002",
    customerName: "Ananya Sharma",
    customerPhone: "+91 98765 43210",
    serviceName: "Hair Coloring + Styling",
    serviceAddons: ["Deep Conditioning", "Blow Dry"],
    price: 1200,
    address: "A-101, DLF Phase 3, Gurgaon",
    status: "on_the_way" as JobStatus,
    paymentMethod: "online" as "online" | "cash",
    bookingTime: "10:30 AM",
    startOtp: "4521",
    endOtp: "8732",
  },
];

export default function PartnerDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [incomingJob, setIncomingJob] = useState<typeof MOCK_INCOMING_JOB | null>(null);
  const [activeJobs, setActiveJobs] = useState(MOCK_ACTIVE_JOBS);
  const [selectedJob, setSelectedJob] = useState<(typeof MOCK_ACTIVE_JOBS)[0] | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);

  // Simulate incoming job via SSE (mock for now)
  useEffect(() => {
    if (!isOnline) return;

    const timer = setTimeout(() => {
      setIncomingJob({
        ...MOCK_INCOMING_JOB,
        expiresAt: Date.now() + 20000,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOnline]);

  const handleAcceptJob = (jobId: string) => {
    console.log("Accepting job:", jobId);
    // In real app: POST /api/partners/jobs/:jobId/accept
    setIncomingJob(null);
    setActiveJobs((prev) => [
      ...prev,
      {
        ...MOCK_INCOMING_JOB,
        id: jobId,
        customerPhone: "+91 98765 12345",
        serviceAddons: [],
        status: "on_the_way" as JobStatus,
        paymentMethod: "cash" as const,
        bookingTime: new Date().toLocaleTimeString(),
        startOtp: "1234",
        endOtp: "5678",
      },
    ]);
  };

  const handleRejectJob = (jobId: string) => {
    console.log("Rejecting job:", jobId);
    // In real app: POST /api/partners/jobs/:jobId/reject
    setIncomingJob(null);
  };

  const handleStatusUpdate = (jobId: string, newStatus: JobStatus) => {
    console.log("Updating status:", jobId, newStatus);
    // In real app: PUT /api/partners/jobs/:jobId/status
    setActiveJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job))
    );
  };

  const handleViewDetails = (jobId: string) => {
    const job = activeJobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowJobModal(true);
    }
  };

  const todayEarnings = activeJobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + j.price, 0);

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Partner Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Partner!</p>
        </div>
        <Button
          variant={isOnline ? "default" : "outline"}
          onClick={() => setIsOnline(!isOnline)}
          className={isOnline ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isOnline ? "🟢 Online" : "⚪ Offline"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Today's Earnings</p>
            <p className="text-2xl font-bold text-green-600">₹{todayEarnings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">Active Jobs</p>
            <p className="text-2xl font-bold">{activeJobs.filter((j) => j.status !== "completed").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Incoming Job */}
      {incomingJob && isOnline && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            Incoming Request
          </h2>
          <IncomingJobCard job={incomingJob} onAccept={handleAcceptJob} onReject={handleRejectJob} />
        </div>
      )}

      {/* Active Jobs */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Active Jobs</h2>
        {activeJobs.filter((j) => j.status !== "completed").length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-gray-500">
              No active jobs. Stay online to receive requests!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {activeJobs
              .filter((j) => j.status !== "completed")
              .map((job) => (
                <ActiveJobCard
                  key={job.id}
                  job={job}
                  onStatusUpdate={handleStatusUpdate}
                  onViewDetails={handleViewDetails}
                />
              ))}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal job={selectedJob} open={showJobModal} onClose={() => setShowJobModal(false)} />
    </div>
  );
}
