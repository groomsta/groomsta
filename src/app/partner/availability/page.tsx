"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DEFAULT_HOURS = {
  0: { enabled: false, start: "09:00", end: "18:00" }, // Sunday
  1: { enabled: true, start: "09:00", end: "18:00" },
  2: { enabled: true, start: "09:00", end: "18:00" },
  3: { enabled: true, start: "09:00", end: "18:00" },
  4: { enabled: true, start: "09:00", end: "18:00" },
  5: { enabled: true, start: "09:00", end: "18:00" },
  6: { enabled: true, start: "10:00", end: "16:00" }, // Saturday
};

export default function PartnerAvailabilityPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [workingHours, setWorkingHours] = useState(DEFAULT_HOURS);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const toggleDay = (day: number) => {
    setWorkingHours({
      ...workingHours,
      [day]: { ...workingHours[day as keyof typeof workingHours], enabled: !workingHours[day as keyof typeof workingHours].enabled }
    });
  };

  const updateHours = (day: number, field: "start" | "end", value: string) => {
    setWorkingHours({
      ...workingHours,
      [day]: { ...workingHours[day as keyof typeof workingHours], [field]: value }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // In real app: PUT /api/partners/availability
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Availability saved!");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Availability Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Online Toggle */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Online Status</h3>
              <p className="text-sm text-gray-500">Toggle to receive new job requests</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${isOnline ? "text-green-600 font-medium" : "text-gray-500"}`}>
                {isOnline ? "🟢 Online" : "⚪ Offline"}
              </span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {DAYS.map((day, index) => {
            const hours = workingHours[index as keyof typeof workingHours];
            return (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24">
                  <Label className="font-medium">{day}</Label>
                </div>
                <Switch checked={hours.enabled} onCheckedChange={() => toggleDay(index)} />
                {hours.enabled && (
                  <div className="flex items-center gap-2">
                    <input 
                      type="time" 
                      value={hours.start}
                      onChange={e => updateHours(index, "start", e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input 
                      type="time" 
                      value={hours.end}
                      onChange={e => updateHours(index, "end", e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                  </div>
                )}
                {!hours.enabled && (
                  <span className="text-sm text-gray-400">Not available</span>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Block Dates */}
      <Card>
        <CardHeader>
          <CardTitle>Block Dates</CardTitle>
          <p className="text-sm text-gray-500">Select dates when you're unavailable (vacations, holidays)</p>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={blockedDates}
            onSelect={(dates) => setBlockedDates(dates || [])}
            className="rounded-md border"
          />
          {blockedDates.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Blocked: {blockedDates.length} date(s)</p>
              <Button variant="outline" size="sm" onClick={() => setBlockedDates([])}>
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
