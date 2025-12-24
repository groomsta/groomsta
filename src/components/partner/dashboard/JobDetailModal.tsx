"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type JobStatus } from "./ActiveJobCard";

interface JobDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceAddons: string[];
  price: number;
  address: string;
  status: JobStatus;
  paymentMethod: "cash" | "online" | "wallet";
  bookingTime: string;
  notes?: string;
}

interface JobDetailModalProps {
  job: JobDetails | null;
  open: boolean;
  onClose: () => void;
}

export default function JobDetailModal({ job, open, onClose }: JobDetailModalProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Booking ID</span>
            <span className="font-mono text-sm">{job.id}</span>
          </div>

          <hr />

          <div>
            <h3 className="font-semibold mb-2">Customer</h3>
            <p>{job.customerName}</p>
            <p className="text-sm text-gray-600">{job.customerPhone}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-sm">{job.address}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Services</h3>
            <p>{job.serviceName}</p>
            {job.serviceAddons.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {job.serviceAddons.map((addon, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{addon}</Badge>
                ))}
              </div>
            )}
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Payment</span>
              <p className="font-medium capitalize">{job.paymentMethod}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Total</span>
              <p className="text-xl font-bold text-green-600">₹{job.price}</p>
            </div>
          </div>

          {job.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
              <p className="text-xs text-yellow-700">Customer Note</p>
              <p className="text-sm">{job.notes}</p>
            </div>
          )}

          <Button onClick={() => window.open(`tel:${job.customerPhone}`)} className="w-full">
            Call Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
