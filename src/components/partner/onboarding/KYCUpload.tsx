"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud, X, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  partnerId: string;
  onComplete: (data: any) => void;
}

export default function KYCUpload({ partnerId, onComplete }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<{ type: string; url: string; name: string }[]>([]);
  const [uploadingState, setUploadingState] = useState<Record<string, boolean>>({});

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Set uploading state for this specific type
    setUploadingState(prev => ({ ...prev, [type]: true }));

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${partnerId}/${type}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('partner_documents')
        .upload(filePath, file, {
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('partner_documents')
        .getPublicUrl(filePath);

      setDocuments(prev => [
        ...prev.filter(d => d.type !== type), 
        { type, url: publicUrl, name: file.name }
      ]);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setUploadingState(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async () => {
    if (documents.length < 2) {
        alert("Please upload at least 2 documents (e.g. Aadhaar & PAN)");
        return;
    }

    setIsSubmitting(true);
    try {
      // Send document URLs to backend
      const res = await axios.post("/api/partner/onboarding", {
        step: 2,
        data: {
            partnerId,
            documents
        }
      });
      if (res.data.success) {
        onComplete({});
      }
    } catch (error) {
      console.error("KYC submission failed", error);
      alert("Failed to save documents. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeDoc = (type: string) => {
      setDocuments(prev => prev.filter(d => d.type !== type));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
         {/* Document Types */}
         {["aadhaar_front", "aadhaar_back", "pan_card", "profile_photo"].map((type) => {
             const existing = documents.find(d => d.type === type);
             const isUploading = uploadingState[type];

             return (
                 <Card key={type} className={`border-2 border-dashed transition-all ${existing ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3 relative min-h-[160px]">
                        {isUploading ? (
                           <div className="flex flex-col items-center animate-pulse">
                              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                              <span className="text-sm text-muted-foreground">Uploading...</span>
                           </div>
                        ) : existing ? (
                            <>
                                <div className="absolute top-2 right-2 cursor-pointer p-1 hover:bg-red-100 rounded-full transition-colors" onClick={() => removeDoc(type)}>
                                    <X className="h-4 w-4 text-red-500" />
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <span className="block text-sm font-semibold text-green-700 capitalize mb-1">{type.replace('_', ' ')}</span>
                                    <p className="text-xs text-muted-foreground max-w-[150px] truncate mx-auto">{existing.name}</p>
                                </div>
                                <a href={existing.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2">View</a>
                            </>
                        ) : (
                            <>
                                <div className="bg-slate-100 p-3 rounded-full mb-1">
                                    <UploadCloud className="h-6 w-6 text-slate-500" />
                                </div>
                                <Label htmlFor={`file-${type}`} className="cursor-pointer">
                                    <span className="block text-sm font-medium capitalize text-slate-700 hover:text-primary transition-colors">
                                        Upload {type.replace('_', ' ')}
                                    </span>
                                </Label>
                                <Input 
                                    id={`file-${type}`} 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => handleFileUpload(e, type)}
                                    accept="image/*,application/pdf"
                                />
                            </>
                        )}
                    </CardContent>
                 </Card>
             );
         })}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSubmit} disabled={isSubmitting || documents.length < 2} size="lg">
           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Contracts & Continue
        </Button>
      </div>
    </div>
  );
}
