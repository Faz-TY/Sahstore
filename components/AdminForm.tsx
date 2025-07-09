"use client";

import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Re-added based on usage

export default function AdminForm() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // In a real app, you would send this data to a backend API
    console.log({ productName, price, description });
    setMessage(`Product "${productName}" added (simulated). Price: ${price}, Description: ${description}`);
    // Clear form
    setProductName('');
    setPrice('');
    setDescription('');
    // Hide message after a few seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    // The parent Card element is expected to be in `app/admin/page.tsx`
    // So this component will just return the form elements.
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="productName" className="text-gray-300">Product Name</Label>
        <Input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-gray-300">Price</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price (e.g., 29.99)"
          required
          min="0.01"
          step="0.01"
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-300">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          required
          className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Add Product
      </Button>

      {message && (
        <p className="text-sm text-green-400 text-center pt-2">{message}</p>
      )}
    </form>
  );
}
