"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

interface JobRequest {
  id: string;
  customerName: string;
  serviceName: string;
  price: number;
  distance: string;
  address: string;
  expiresAt: number; // timestamp
}

interface IncomingJobCardProps {
  job: JobRequest;
  onAccept: (jobId: string) => void;
  onReject: (jobId: string) => void;
}

export default function IncomingJobCard({ job, onAccept, onReject }: IncomingJobCardProps) {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((job.expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [job.expiresAt]);

  const getTimerColor = useCallback(() => {
    if (timeLeft > 10) return "text-green-600";
    if (timeLeft > 5) return "text-yellow-600";
    return "text-red-600";
  }, [timeLeft]);

  if (isExpired) {
    return (
      <Card className="border-red-200 bg-red-50 opacity-60">
        <CardContent className="p-4 text-center text-red-600">
          Job request expired
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg animate-pulse-subtle">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">New Job Request</CardTitle>
          <div className={`text-2xl font-bold ${getTimerColor()}`}>
            {timeLeft}s
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Customer:</span>
            <p className="font-medium">{job.customerName}</p>
          </div>
          <div>
            <span className="text-gray-500">Service:</span>
            <p className="font-medium">{job.serviceName}</p>
          </div>
          <div>
            <span className="text-gray-500">Distance:</span>
            <p className="font-medium">{job.distance}</p>
          </div>
          <div>
            <span className="text-gray-500">Earnings:</span>
            <p className="font-medium text-green-600">₹{job.price}</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 truncate">{job.address}</p>
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onAccept(job.id)} 
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isExpired}
          >
            Accept
          </Button>
          <Button 
            onClick={() => onReject(job.id)} 
            variant="outline" 
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            disabled={isExpired}
          >
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
