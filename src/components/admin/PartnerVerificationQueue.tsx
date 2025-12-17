"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

// Define Types (should be shared types preferably)
interface Partner {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  partnerType: string;
  verificationStatus: string;
  createdAt: string;
  documents: {
    id: string;
    documentType: string;
    verificationStatus: string;
  }[];
}

const fetchPendingVerifications = async (): Promise<Partner[]> => {
  const { data } = await axios.get("/api/admin/verifications/pending");
  // Ensure data structure matches. API returns { success: true, data: [...] }
  return data.data || [];
};

export default function PartnerVerificationQueue() {
  const queryClient = useQueryClient();

  const { data: partners, isLoading, isError } = useQuery({
    queryKey: ["pendingVerifications"],
    queryFn: fetchPendingVerifications,
  });

  const handleReviewClick = (partnerId: string) => {
    // Navigate to detail page or open modal
    // For now, assume a route exists
    window.location.href = `/admin/verifications/${partnerId}`;
  };

  if (isLoading) {
    return <div className="p-4">Loading verification queue...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error loading verifications.</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pending Partner Verifications</CardTitle>
      </CardHeader>
      <CardContent>
        {partners && partners.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No pending verifications found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners?.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">
                    <div>{partner.fullName}</div>
                    <div className="text-sm text-gray-400">{partner.phone}</div>
                  </TableCell>
                  <TableCell className="capitalize">{partner.partnerType}</TableCell>
                  <TableCell>
                    {format(new Date(partner.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {partner.documents.length} Uploaded
                    {/* Could show breakdown like (2 Pending) */}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {partner.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleReviewClick(partner.id)}>
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
