import PartnerDetails from "@/components/admin/PartnerDetails";

export default async function VerificationDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;

  return (
    <div className="container mx-auto py-8">
      <PartnerDetails partnerId={id} />
    </div>
  );
}
