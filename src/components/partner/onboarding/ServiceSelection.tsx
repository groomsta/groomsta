"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Scissors, Zap, Sparkles, User, Clock, ArrowRight } from "lucide-react";

// Grouped Mock Services Data
const SERVICE_CATEGORIES = [
  {
    name: "Hair Services",
    icon: Scissors,
    services: [
      { id: "1", name: "Classic Haircut", basePrice: 150, duration: "30 mins" },
      { id: "2", name: "Beard Trim & Shape", basePrice: 100, duration: "20 mins" },
      { id: "3", name: "Premium Hair Cut & Wash", basePrice: 200, duration: "45 mins" },
      { id: "4", name: "Hair Color (Ammonia Free)", basePrice: 500, duration: "60 mins" },
    ]
  },
  {
    name: "Facial & Cleanup",
    icon: Sparkles,
    services: [
      { id: "5", name: "Detan Cleanup", basePrice: 350, duration: "30 mins" },
      { id: "6", name: "Charcoal Face Mask", basePrice: 250, duration: "20 mins" },
      { id: "7", name: "Gold Facial", basePrice: 800, duration: "60 mins" },
    ]
  },
  {
    name: "Massage & Spa",
    icon: Zap,
    services: [
      { id: "8", name: "Head Massage (Oil)", basePrice: 200, duration: "20 mins" },
      { id: "9", name: "Shoulder & Back Massage", basePrice: 400, duration: "30 mins" },
    ]
  }
];

interface ServiceSelectionProps {
  onComplete: (data: any) => void;
  // In a real app, initialData might come from API
}

export default function ServiceSelection({ onComplete }: ServiceSelectionProps) {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});

  const toggleService = (id: string) => {
    const next = new Set(selectedServices);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedServices(next);
  };

  const updatePrice = (id: string, price: string) => {
    setCustomPrices((prev) => ({
      ...prev,
      [id]: parseFloat(price) || 0,
    }));
  };

  const handleSubmit = () => {
    if (selectedServices.size === 0) {
      alert("Please select at least one service to continue.");
      return;
    }

    // Flatten services for payload
    const allServices = SERVICE_CATEGORIES.flatMap(c => c.services);
    
    const payload = Array.from(selectedServices).map((id) => {
      const service = allServices.find((s) => s.id === id);
      return {
        serviceId: id,
        name: service?.name,
        isCustomPrice: !!customPrices[id] && customPrices[id] !== service?.basePrice,
        price: customPrices[id] || service?.basePrice,
      };
    });

    onComplete({ services: payload });
  };

  const calculatePotentialEarnings = () => {
     let total = 0;
     const allServices = SERVICE_CATEGORIES.flatMap(c => c.services);
     selectedServices.forEach(id => {
         const s = allServices.find(serv => serv.id === id);
         if (s) {
             total += customPrices[id] || s.basePrice;
         }
     });
     // Simple projection: assumes 1 of each service per day
     return total * 30; 
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
          <User className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
             <p className="font-semibold">Maximize your earnings</p>
             <p>Partners offering more than 5 services typically earn 40% more. You can customize prices for each service below.</p>
          </div>
      </div>

      <div className="space-y-8">
        {SERVICE_CATEGORIES.map((category) => (
          <div key={category.name} className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <category.icon className="h-5 w-5 text-primary" />
                {category.name}
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
                {category.services.map((service) => {
                const isSelected = selectedServices.has(service.id);
                const currentPrice = customPrices[service.id] || service.basePrice;
                
                return (
                    <Card 
                        key={service.id} 
                        className={`transition-all duration-200 cursor-pointer ${isSelected ? "border-primary ring-1 ring-primary/20 shadow-md bg-accent/5" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
                        onClick={() => toggleService(service.id)}
                    >
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleService(service.id)}
                                id={`service-${service.id}`}
                                className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <Label htmlFor={`service-${service.id}`} className="font-semibold cursor-pointer text-base text-slate-900">
                                        {service.name}
                                    </Label>
                                    <Badge variant="secondary" className="text-xs font-normal">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {service.duration}
                                    </Badge>
                                </div>
                                
                                <p className="text-sm text-muted-foreground">Standard Rate: ₹{service.basePrice}</p>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isSelected ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                                    onClick={(e) => e.stopPropagation()} // Prevent card click when editing price
                                >
                                    <div className="bg-white p-2 rounded border border-slate-200 flex items-center gap-2">
                                        <Label htmlFor={`price-${service.id}`} className="text-xs font-medium whitespace-nowrap text-slate-600">
                                            My Price (₹):
                                        </Label>
                                        <Input 
                                            id={`price-${service.id}`}
                                            type="number" 
                                            value={currentPrice}
                                            onChange={(e) => updatePrice(service.id, e.target.value)}
                                            className="h-8 w-24 text-right font-bold text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 z-10">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
              <CardContent className="p-4 flex items-center justify-between">
                  <div>
                      <p className="text-sm text-slate-400">Services Selected: {selectedServices.size}</p>
                      {selectedServices.size > 0 && (
                          <p className="text-xs text-green-400">Potential monthly revenue: ₹{calculatePotentialEarnings().toLocaleString()}</p>
                      )}
                  </div>
                  <Button onClick={handleSubmit} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                      Complete Registration <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
