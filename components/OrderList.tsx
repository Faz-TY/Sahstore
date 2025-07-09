"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Re-added based on usage

// Placeholder data for orders
const placeholderOrders = [
  {
    id: 'ORD001',
    productName: 'Super Stream Deck',
    quantity: 1,
    customerName: 'Alice Wonderland',
    customerEmail: 'alice@example.com',
    status: 'Shipped',
  },
  {
    id: 'ORD002',
    productName: 'Pro Gamer Headset',
    quantity: 2,
    customerName: 'Bob The Builder',
    customerEmail: 'bob@example.com',
    status: 'Processing',
  },
  {
    id: 'ORD003',
    productName: 'RGB Keyboard XL',
    quantity: 1,
    customerName: 'Carol Danvers',
    customerEmail: 'carol@example.com',
    status: 'Delivered',
  },
  {
    id: 'ORD004',
    productName: '4K Streaming Cam',
    quantity: 1,
    customerName: 'David Copperfield',
    customerEmail: 'david@example.com',
    status: 'Pending',
  },
];

export default function OrderList() {
  // In a real app, you'd fetch this data from an API
  const orders = placeholderOrders;

  return (
    // The parent Card element is expected to be in `app/admin/page.tsx`
    // So this component will just return the table.
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-750">
            <TableHead className="text-purple-400 px-4 py-3">Order ID</TableHead>
            <TableHead className="text-purple-400 px-4 py-3">Product Name</TableHead>
            <TableHead className="text-purple-400 px-4 py-3 text-right">Quantity</TableHead>
            <TableHead className="text-purple-400 px-4 py-3">Customer Name</TableHead>
            <TableHead className="text-purple-400 px-4 py-3">Customer Email</TableHead>
            <TableHead className="text-purple-400 px-4 py-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="border-gray-700 hover:bg-gray-750 transition-colors">
                <TableCell className="font-medium text-gray-300 px-4 py-3">{order.id}</TableCell>
                <TableCell className="text-gray-300 px-4 py-3">{order.productName}</TableCell>
                <TableCell className="text-gray-300 px-4 py-3 text-right">{order.quantity}</TableCell>
                <TableCell className="text-gray-300 px-4 py-3">{order.customerName}</TableCell>
                <TableCell className="text-gray-300 px-4 py-3">{order.customerEmail}</TableCell>
                <TableCell className="text-gray-300 px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Shipped' ? 'bg-blue-600 text-blue-100' :
                    order.status === 'Processing' ? 'bg-yellow-600 text-yellow-100' :
                    order.status === 'Delivered' ? 'bg-green-600 text-green-100' :
                    'bg-gray-600 text-gray-100' // Pending or other statuses
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
