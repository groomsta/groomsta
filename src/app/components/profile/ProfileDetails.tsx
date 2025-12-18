'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileDetails() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat font-bold text-lg text-[#1A1A1A]">Personal Information</h2>
                <Button
                    variant="ghost"
                    className="text-[#0C3C85]"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>

            <div className="space-y-6 max-w-lg">
                <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        defaultValue="John Doe"
                        disabled={!isEditing}
                        className="bg-gray-50 border-gray-200"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                        <Input
                            value="+91"
                            disabled
                            className="w-16 bg-gray-100 border-gray-200 text-center"
                        />
                        <Input
                            id="phone"
                            defaultValue="98765 43210"
                            disabled
                            className="flex-1 bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <p className="text-xs text-gray-400">Phone number cannot be changed.</p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        disabled={!isEditing}
                        className="bg-gray-50 border-gray-200"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                        id="gender"
                        disabled={!isEditing}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3C85] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                {isEditing && (
                    <Button className="w-full bg-[#0C3C85] hover:bg-blue-800 text-white mt-4">
                        Save Changes
                    </Button>
                )}
            </div>
        </div>
    );
}
