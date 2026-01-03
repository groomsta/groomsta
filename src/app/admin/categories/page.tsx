"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const MOCK_CATEGORIES = [
  { id: "c1", name: "Hair", subcategories: ["Haircut", "Hair Coloring", "Hair Styling", "Hair Treatment"], serviceCount: 12 },
  { id: "c2", name: "Face", subcategories: ["Facial", "Clean-up", "Face Massage"], serviceCount: 8 },
  { id: "c3", name: "Nails", subcategories: ["Manicure", "Pedicure", "Nail Art"], serviceCount: 6 },
  { id: "c4", name: "Spa", subcategories: ["Body Massage", "Body Scrub", "Aromatherapy"], serviceCount: 5 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof MOCK_CATEGORIES[0] | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory = {
      id: `c${Date.now()}`,
      name: newCategoryName.trim(),
      subcategories: [],
      serviceCount: 0,
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  const handleAddSubcategory = () => {
    if (!selectedCategory || !newSubcategoryName.trim()) return;
    
    setCategories(categories.map(c =>
      c.id === selectedCategory.id
        ? { ...c, subcategories: [...c.subcategories, newSubcategoryName.trim()] }
        : c
    ));
    
    setNewSubcategoryName("");
    setShowAddSubcategory(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!confirm("Are you sure? This will delete all subcategories and services in this category.")) return;
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const handleDeleteSubcategory = (categoryId: string, subcategory: string) => {
    setCategories(categories.map(c =>
      c.id === categoryId
        ? { ...c, subcategories: c.subcategories.filter(s => s !== subcategory) }
        : c
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Category Name</Label>
                <Input
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Hair, Skin, Nails"
                />
              </div>
              <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {categories.map(category => (
          <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <p className="text-sm text-gray-500">{category.serviceCount} services</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowAddSubcategory(true);
                  }}
                >
                  Add Subcategory
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {category.subcategories.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subcategory</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.subcategories.map(sub => (
                      <TableRow key={sub}>
                        <TableCell>{sub}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSubcategory(category.id, sub)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-400 text-center py-4">No subcategories yet</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Subcategory Dialog */}
      <Dialog open={showAddSubcategory} onOpenChange={setShowAddSubcategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Subcategory to {selectedCategory?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Subcategory Name</Label>
              <Input
                value={newSubcategoryName}
                onChange={e => setNewSubcategoryName(e.target.value)}
                placeholder="e.g., Haircut, Coloring"
              />
            </div>
            <Button onClick={handleAddSubcategory} disabled={!newSubcategoryName.trim()}>
              Add Subcategory
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
