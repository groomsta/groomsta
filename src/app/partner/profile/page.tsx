"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PartnerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Test Partner",
    phone: "9876543210",
    email: "test@groomsta.com",
    type: "Individual",
    status: "Verified"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here we would sync with backend
    alert("Profile updated (Mock)");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button variant="outline" size="sm" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                    {isEditing ? "Save" : "Edit"}
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input 
                        disabled={!isEditing} 
                        value={profile.fullName} 
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Phone Number</Label>
                    <Input 
                        disabled={true} 
                        value={profile.phone} 
                    />
                    <p className="text-xs text-muted-foreground">Phone number cannot be changed.</p>
                </div>
                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input 
                        disabled={!isEditing} 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                </div>
            </CardContent>
        </Card>

        {/* Status Card */}
        <Card>
            <CardHeader>
                <CardTitle>Partner Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <span className="font-semibold text-lg">{profile.status}</span>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    Partner ID: 123456<br/>
                    Joined: Dec 2025
                </p>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                   <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> To change sensitive information like Bank Details, please contact support.
                   </p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
