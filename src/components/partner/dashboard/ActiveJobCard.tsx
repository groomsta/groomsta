"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type JobStatus = "on_the_way" | "arrived" | "started" | "completed";

interface ActiveJob {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  price: number;
  address: string;
  status: JobStatus;
  startOtp?: string;
  endOtp?: string;
}

interface ActiveJobCardProps {
  job: ActiveJob;
  onStatusUpdate: (jobId: string, status: JobStatus) => void;
  onViewDetails: (jobId: string) => void;
}

const STATUS_CONFIG: Record<JobStatus, { label: string; color: string; next?: JobStatus }> = {
  on_the_way: { label: "On The Way", color: "bg-blue-500", next: "arrived" },
  arrived: { label: "Arrived", color: "bg-yellow-500", next: "started" },
  started: { label: "In Progress", color: "bg-orange-500", next: "completed" },
  completed: { label: "Completed", color: "bg-green-500" },
};

export default function ActiveJobCard({ job, onStatusUpdate, onViewDetails }: ActiveJobCardProps) {
  const config = STATUS_CONFIG[job.status];

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{job.serviceName}</CardTitle>
          <Badge className={`${config.color} text-white`}>{config.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className="font-medium">{job.customerName}</p>
          <p className="text-gray-500 truncate">{job.address}</p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Earnings:</span>
          <span className="font-bold text-green-600">₹{job.price}</span>
        </div>

        {job.status === "arrived" && job.startOtp && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 text-center">
            <p className="text-xs text-yellow-700">Start OTP</p>
            <p className="text-xl font-bold text-yellow-800">{job.startOtp}</p>
          </div>
        )}

        {job.status === "started" && job.endOtp && (
          <div className="bg-green-50 border border-green-200 rounded-md p-2 text-center">
            <p className="text-xs text-green-700">Completion OTP</p>
            <p className="text-xl font-bold text-green-800">{job.endOtp}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(job.id)} className="flex-1">
            Details
          </Button>
          {config.next && (
            <Button 
              size="sm" 
              onClick={() => onStatusUpdate(job.id, config.next!)} 
              className="flex-1"
            >
              {config.next === "arrived" && "I've Arrived"}
              {config.next === "started" && "Start Service"}
              {config.next === "completed" && "Complete"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
