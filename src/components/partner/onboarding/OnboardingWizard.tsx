"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonalDetailsForm from "./PersonalDetailsForm";
import KYCUpload from "./KYCUpload";
import BankDetailsForm from "./BankDetailsForm";
import ServiceSelection from "./ServiceSelection";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [partnerId, setPartnerId] = useState<string | null>(null);

  const handleStepComplete = (data: any) => {
    // data might contain partnerId returned from Step 1
    if (data?.partnerId) {
        setPartnerId(data.partnerId);
    }
    setStep(prev => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Partner Registration - Step {step} of 4</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
             <PersonalDetailsForm onComplete={handleStepComplete} />
          )}
          {step === 2 && partnerId && (
             <KYCUpload partnerId={partnerId} onComplete={handleStepComplete} />
          )}
          {step === 3 && partnerId && (
             <BankDetailsForm partnerId={partnerId} onComplete={handleStepComplete} />
          )}
          {step === 4 && (
             <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Submitted!</h2>
                <p>Your application is under review. You will be notified once approved.</p>
                <Button className="mt-6" onClick={() => window.location.href = "/"}>Go Home</Button>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
