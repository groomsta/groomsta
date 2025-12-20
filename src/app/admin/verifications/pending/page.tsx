import PartnerVerificationQueue from "@/components/admin/PartnerVerificationQueue";

export default function PendingVerificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Partner Verification Queue</h1>
        <p className="text-muted-foreground">
          Review and approve pending partner applications.
        </p>
      </div>
      <PartnerVerificationQueue />
    </div>
  );
}
