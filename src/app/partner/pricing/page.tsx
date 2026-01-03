"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

// Mock services data
const MOCK_PARTNER_SERVICES = [
  { id: "s1", name: "Haircut", category: "Hair", basePrice: 150, minPrice: 120, maxPrice: 180, partnerPrice: 150, enabled: true, duration: 30 },
  { id: "s2", name: "Hair Coloring", category: "Hair", basePrice: 500, minPrice: 400, maxPrice: 600, partnerPrice: 550, enabled: true, duration: 60 },
  { id: "s3", name: "Shaving", category: "Hair", basePrice: 100, minPrice: 80, maxPrice: 120, partnerPrice: 100, enabled: true, duration: 15 },
  { id: "s4", name: "Facial", category: "Face", basePrice: 350, minPrice: 280, maxPrice: 420, partnerPrice: 350, enabled: false, duration: 45 },
  { id: "s5", name: "Manicure", category: "Nails", basePrice: 200, minPrice: 160, maxPrice: 240, partnerPrice: 200, enabled: true, duration: 30 },
];

export default function PartnerPricingPage() {
  const [services, setServices] = useState(MOCK_PARTNER_SERVICES);
  const [isSaving, setIsSaving] = useState(false);

  const handlePriceChange = (serviceId: string, newPrice: number) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, partnerPrice: newPrice } : s
    ));
  };

  const handleToggleService = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // In real app: PUT /api/partners/services/:serviceId/pricing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Pricing saved successfully!");
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Services & Pricing</h1>
          <p className="text-sm text-gray-500">Adjust your prices within the allowed range</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">{category}</h2>
          <div className="space-y-4">
            {categoryServices.map(service => (
              <Card key={service.id} className={!service.enabled ? "opacity-60" : ""}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration} mins</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-green-600">₹{service.partnerPrice}</span>
                      <Switch 
                        checked={service.enabled}
                        onCheckedChange={() => handleToggleService(service.id)}
                      />
                    </div>
                  </div>
                  
                  {service.enabled && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: ₹{service.minPrice}</span>
                        <span>Base: ₹{service.basePrice}</span>
                        <span>Max: ₹{service.maxPrice}</span>
                      </div>
                      <Slider
                        value={[service.partnerPrice]}
                        min={service.minPrice}
                        max={service.maxPrice}
                        step={10}
                        onValueChange={([value]) => handlePriceChange(service.id, value)}
                        className="w-full"
                      />
                      <p className="text-xs text-center text-gray-400">
                        {service.partnerPrice > service.basePrice ? "+" : ""}{Math.round((service.partnerPrice - service.basePrice) / service.basePrice * 100)}% from base price
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
