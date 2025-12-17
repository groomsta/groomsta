"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PartnerDetailsProps {
  partnerId: string;
}

const fetchPartnerDetails = async (id: string) => {
  const { data } = await axios.get(`/api/admin/verifications/${id}`);
  return data.data;
};

const approvePartner = async (id: string) => {
  const { data } = await axios.post(`/api/admin/verifications/${id}/approve`);
  return data;
};

const rejectPartner = async (id: string, reason: string) => {
  const { data } = await axios.post(`/api/admin/verifications/${id}/reject`, { reason });
  return data;
};

export default function PartnerDetails({ partnerId }: PartnerDetailsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: partner, isLoading, isError } = useQuery({
    queryKey: ["partner", partnerId],
    queryFn: () => fetchPartnerDetails(partnerId),
  });

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: () => approvePartner(partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVerifications"] });
      queryClient.invalidateQueries({ queryKey: ["partner", partnerId] });
      alert("Partner approved successfully!");
      router.push("/admin/verifications/pending");
    },
    onError: (error) => {
      console.error("Approval failed", error);
      alert("Failed to approve partner.");
    }
  });

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: ({ reason }: { reason: string }) => rejectPartner(partnerId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingVerifications"] });
      queryClient.invalidateQueries({ queryKey: ["partner", partnerId] });
      alert("Partner rejected.");
      router.push("/admin/verifications/pending");
    },
    onError: (error) => {
      console.error("Rejection failed", error);
      alert("Failed to reject partner.");
    }
  });

  if (isLoading) return <div>Loading details...</div>;
  if (isError) return <div className="text-red-500">Error loading partner details.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{partner.fullName}</h2>
          <p className="text-muted-foreground">{partner.user?.email || partner.email} • {partner.user?.phone || partner.phone}</p>
        </div>
        <div className="flex gap-2">
          {partner.verificationStatus === "pending" && (
            <>
            <>
               <Button variant="destructive" onClick={() => {
                   const reason = prompt("Enter rejection reason:");
                   if (reason) reject({ reason });
               }} disabled={isRejecting}>
                 {isRejecting ? "Rejecting..." : "Reject Partner"}
               </Button>
               <Button onClick={() => approve()} disabled={isApproving}>
                 {isApproving ? "Approving..." : "Approve Partner"}
               </Button>
            </>
            </>
          )}
          {partner.verificationStatus === "verified" && (
            <Badge className="bg-green-500">Verified</Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         <Card>
            <CardHeader className="text-sm font-medium text-muted-foreground">Type</CardHeader>
            <CardContent className="text-xl font-bold capitalize">{partner.partnerType}</CardContent>
         </Card>
          <Card>
            <CardHeader className="text-sm font-medium text-muted-foreground">Status</CardHeader>
            <CardContent>
              <Badge variant={partner.verificationStatus === "verified" ? "default" : "secondary"}>
                {partner.verificationStatus}
              </Badge>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="text-sm font-medium text-muted-foreground">Service Radius</CardHeader>
            <CardContent className="text-xl font-bold">{partner.serviceRadiusKm} km</CardContent>
         </Card>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="salon">Salon Details</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="mt-4">
           <Card>
             <CardHeader><CardTitle>Uploaded Documents</CardTitle></CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {partner.documents.map((doc: any) => (
                   <div key={doc.id} className="flex items-center justify-between border p-4 rounded-lg">
                     <div>
                       <p className="font-semibold capitalize">{doc.documentType}</p>
                       <a href={doc.documentUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm">
                         View Document
                       </a>
                     </div>
                     <Badge variant={doc.verificationStatus === "verified" ? "default" : "secondary"}>{doc.verificationStatus}</Badge>
                   </div>
                 ))}
                 {partner.documents.length === 0 && <p className="text-muted-foreground">No documents uploaded.</p>}
               </div>
             </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="bank" className="mt-4">
             <Card>
             <CardHeader><CardTitle>Bank Account</CardTitle></CardHeader>
             <CardContent>
                {partner.bankDetails ? (
                   <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-1">
                        <Label>Bank Name</Label>
                        <Input readOnly value={partner.bankDetails.bankName} />
                      </div>
                      <div className="grid gap-1">
                        <Label>Account No</Label>
                         <Input readOnly value={partner.bankDetails.accountNumber} />
                      </div>
                      <div className="grid gap-1">
                        <Label>IFSC</Label>
                         <Input readOnly value={partner.bankDetails.ifscCode} />
                      </div>
                       <div className="grid gap-1">
                        <Label>Holder Name</Label>
                         <Input readOnly value={partner.bankDetails.accountHolderName} />
                      </div>
                   </div>
                ) : (
                  <p className="text-muted-foreground">No bank details provided.</p>
                )}
             </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="salon" className="mt-4">
            <Card>
             <CardHeader><CardTitle>Salon Information</CardTitle></CardHeader>
             <CardContent>
                {partner.salonDetails ? (
                   <div className="grid gap-4">
                      <div className="grid gap-1">
                        <Label>Salon Name</Label>
                        <Input readOnly value={partner.salonDetails.salonName} />
                      </div>
                       <div className="grid gap-1">
                        <Label>Address</Label>
                        <Input readOnly value={partner.salonDetails.salonAddress} />
                      </div>
                   </div>
                ) : (
                  <p className="text-muted-foreground">Not applicable (Individual Partner).</p>
                )}
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
