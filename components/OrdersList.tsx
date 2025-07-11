"use client"

import { useStore } from "@/context/StoreContext"
import { ShoppingBag, Calendar, User, Mail, Package } from "lucide-react"

export default function OrdersList() {
  const { getRecentOrders } = useStore()
  const recentOrders = getRecentOrders(5)

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} DZD`
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return "Invalid date"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShoppingBag className="h-6 w-6 text-purple-600 mr-3" />
          Recent Orders
        </h2>
        <p className="text-gray-600 mt-1">Latest customer orders</p>
      </div>

      <div className="p-6">
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here once customers start purchasing.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{order.productName}</h3>
                  </div>
                  <span className="text-purple-600 font-semibold">{formatPrice(order.totalPrice)}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(order.orderDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    <span>Qty: {order.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
