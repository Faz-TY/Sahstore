"use client"

import { ShoppingBag, User, Mail, Package, Calendar } from "lucide-react"
import { useStore } from "@/context/StoreContext"

export default function OrdersList() {
  const { getRecentOrders } = useStore()
  const recentOrders = getRecentOrders(10)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} DZD`
  }

  if (recentOrders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingBag className="h-6 w-6 text-purple-600 mr-3" />
            Recent Orders
          </h2>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>

        <div className="p-12 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500">Orders will appear here when customers make purchases.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShoppingBag className="h-6 w-6 text-purple-600 mr-3" />
          Recent Orders
        </h2>
        <p className="text-gray-600 mt-1">Manage and track customer orders</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{order.id.slice(0, 12)}...</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{order.productName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{order.quantity}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{order.customerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">{order.customerEmail}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-green-600">{formatPrice(order.totalPrice)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{formatDate(order.orderDate)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {recentOrders.length} recent orders</p>
        </div>
      </div>
    </div>
  )
}
