"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  partnerType: z.enum(["individual", "salon"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onComplete: (data: any) => void;
}

export default function PersonalDetailsForm({ onComplete }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
        partnerType: "individual"
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/partner/onboarding", {
        step: 1,
        data
      });
      if (res.data.success) {
        onComplete({ partnerId: res.data.partnerId });
      }
    } catch (error) {
      console.error("Registration failed", error);
      const msg = axios.isAxiosError(error) ? error.response?.data?.error : "Registration failed";
      alert(`Registration failed: ${typeof msg === 'string' ? msg : JSON.stringify(msg)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" {...register("phone")} placeholder="9876543210" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input id="email" {...register("email")} placeholder="john@example.com" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="partnerType">Partner Type</Label>
        <Select onValueChange={(val) => setValue("partnerType", val as "individual" | "salon")}>
            <SelectTrigger>
                <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="salon">Salon</SelectItem>
            </SelectContent>
        </Select>
        {errors.partnerType && <p className="text-red-500 text-sm">{errors.partnerType.message}</p>}
      </div>

      <div className="grid gap-2">
         <Label htmlFor="password">Password</Label>
         <Input id="password" type="password" {...register("password")} />
         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Next Step"}
      </Button>
    </form>
  );
}
