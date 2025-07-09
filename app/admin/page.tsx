"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminForm from '@/components/AdminForm';
import OrderList from '@/components/OrderList';

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    // Optional: render a loading state or null while redirecting
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
        <Button onClick={logout} variant="outline" className="bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 text-white">
          Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder for Add Product Form */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Add New Product</CardTitle>
            <CardDescription className="text-gray-400">Fill in the details to add a new product to the store.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminForm />
          </CardContent>
        </Card>

        {/* Order List takes full width on medium screens and up, or spans 2 columns in the grid */}
        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-white">View Orders</CardTitle>
            <CardDescription className="text-gray-400">Browse and manage customer orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
