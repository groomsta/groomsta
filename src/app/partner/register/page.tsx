import OnboardingWizard from "@/components/partner/onboarding/OnboardingWizard";

export default function PartnerRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Become a Groomsta Partner</h1>
          <p className="mt-2 text-lg text-gray-600">Join our network of elite grooming professionals.</p>
        </div>
        <OnboardingWizard />
      </div>
    </div>
  );
}
