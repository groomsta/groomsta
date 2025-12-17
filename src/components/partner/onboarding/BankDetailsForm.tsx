"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const schema = z.object({
  bankName: z.string().min(2, "Bank name required"),
  accountNumber: z.string().min(8, "Invalid account number"),
  ifsc: z.string().length(11, "IFSC must be 11 characters"), // Simplified validation
  holderName: z.string().min(2, "Holder name required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  partnerId: string;
  onComplete: (data: any) => void;
}

export default function BankDetailsForm({ partnerId, onComplete }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/partner/onboarding", {
        step: 3,
        data: {
            partnerId,
            ...data
        }
      });
      if (res.data.success) {
        onComplete({});
      }
    } catch (error) {
      console.error("Bank details submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <div className="grid gap-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Input id="bankName" {...register("bankName")} placeholder="HDFC Bank" />
        {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName.message}</p>}
      </div>

       <div className="grid gap-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input id="accountNumber" {...register("accountNumber")} placeholder="0000000000" />
        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>}
      </div>

       <div className="grid gap-2">
        <Label htmlFor="ifsc">IFSC Code</Label>
        <Input id="ifsc" {...register("ifsc")} placeholder="HDFC0001234" className="uppercase" />
        {errors.ifsc && <p className="text-red-500 text-sm">{errors.ifsc.message}</p>}
      </div>

       <div className="grid gap-2">
        <Label htmlFor="holderName">Account Holder Name</Label>
        <Input id="holderName" {...register("holderName")} placeholder="John Doe" />
        {errors.holderName && <p className="text-red-500 text-sm">{errors.holderName.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Finish Registration
      </Button>
    </form>
  );
}
