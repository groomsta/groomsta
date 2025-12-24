"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data
const MOCK_CATEGORIES = [
  { id: "c1", name: "Hair Services", slug: "hair" },
  { id: "c2", name: "Face Services", slug: "face" },
  { id: "c3", name: "Body Services", slug: "body" },
];

const MOCK_SERVICES = [
  { id: "s1", name: "Haircut", categoryId: "c1", basePrice: 150, duration: 30, isActive: true },
  { id: "s2", name: "Shaving", categoryId: "c1", basePrice: 100, duration: 15, isActive: true },
  { id: "s3", name: "Hair Color", categoryId: "c1", basePrice: 500, duration: 60, isActive: true },
  { id: "s4", name: "Facial", categoryId: "c2", basePrice: 350, duration: 45, isActive: true },
  { id: "s5", name: "Cleanup", categoryId: "c2", basePrice: 200, duration: 30, isActive: false },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState(MOCK_SERVICES);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    categoryId: "c1",
    basePrice: 0,
    duration: 30,
  });

  const handleAddService = async () => {
    // In real app: POST /api/admin/services
    const service = {
      id: "s" + (services.length + 1),
      ...newService,
      isActive: true,
    };
    setServices([...services, service]);
    setShowAddDialog(false);
    setNewService({ name: "", categoryId: "c1", basePrice: 0, duration: 30 });
  };

  const handleToggleActive = async (serviceId: string) => {
    // In real app: PUT /api/admin/services/:serviceId
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    // In real app: DELETE /api/admin/services/:serviceId
    setServices(services.filter(s => s.id !== serviceId));
  };

  const getCategoryName = (categoryId: string) => {
    return MOCK_CATEGORIES.find(c => c.id === categoryId)?.name || "Unknown";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Service Management</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>+ Add Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Service Name</Label>
                <Input 
                  value={newService.name} 
                  onChange={e => setNewService({...newService, name: e.target.value})}
                  placeholder="e.g., Premium Haircut"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={newService.categoryId}
                  onChange={e => setNewService({...newService, categoryId: e.target.value})}
                >
                  {MOCK_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Base Price (₹)</Label>
                  <Input 
                    type="number"
                    value={newService.basePrice} 
                    onChange={e => setNewService({...newService, basePrice: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Duration (mins)</Label>
                  <Input 
                    type="number"
                    value={newService.duration} 
                    onChange={e => setNewService({...newService, duration: Number(e.target.value)})}
                  />
                </div>
              </div>
              <Button onClick={handleAddService} className="w-full">Create Service</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-2 flex-wrap">
          {MOCK_CATEGORIES.map(cat => (
            <Card key={cat.id} className="w-48">
              <CardContent className="pt-4">
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-gray-500">{services.filter(s => s.categoryId === cat.id).length} services</p>
              </CardContent>
            </Card>
          ))}
          <Card className="w-48 border-dashed cursor-pointer hover:bg-gray-50">
            <CardContent className="pt-4 text-center text-gray-500">
              + Add Category
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map(service => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{getCategoryName(service.categoryId)}</TableCell>
                  <TableCell>₹{service.basePrice}</TableCell>
                  <TableCell>{service.duration} mins</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggleActive(service.id)}>
                        {service.isActive ? "Disable" : "Enable"}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(service.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
