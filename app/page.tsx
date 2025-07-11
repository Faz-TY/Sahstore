"use client"

import type React from "react"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { useStore } from "@/context/StoreContext"

export default function HomePage() {
  const { products, addOrder } = useStore()
  const [orderForm, setOrderForm] = useState<{
    isOpen: boolean
    productId: string
    productName: string
    productPrice: number
    maxQuantity: number
  } | null>(null)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    quantity: 1,
  })

  const handleQuickOrder = (productId: string, productName: string, productPrice: number, maxQuantity: number) => {
    setOrderForm({ isOpen: true, productId, productName, productPrice, maxQuantity })
    setCustomerData({ name: "", email: "", quantity: 1 })
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderForm) return

    addOrder({
      productId: orderForm.productId,
      productName: orderForm.productName,
      quantity: customerData.quantity,
      customerName: customerData.name,
      customerEmail: customerData.email,
      totalPrice: orderForm.productPrice * customerData.quantity,
    })

    setOrderForm(null)
    setCustomerData({ name: "", email: "", quantity: 1 })
    alert("Order placed successfully!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-purple py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to SahStore</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Votre destination premium pour les accessoires, tondeuses électriques, aspirateurs sans fil, et produits
            automobiles. Liverison 58 WILYA!! 🚚
          </p>
          <a
            href="#products"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-gray-600 text-lg">Discover our premium collection</p>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available</h3>
                <p className="text-gray-600">Products will appear here once they are added by the admin.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.media.find((m) => m.type === "image")?.url}
                  quantity={product.quantity}
                  onOrder={() => handleQuickOrder(product.id, product.name, product.price, product.quantity)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Accessories", "Electric Trimmers", "Wireless Vacuum Cleaners", "Car Products"].map((category) => (
              <div
                key={category}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-purple-500 transition-colors shadow-sm light-card"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600">Explore our collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {orderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Place Order</h3>
            <p className="text-gray-600 mb-4">
              Ordering: <strong>{orderForm.productName}</strong>
            </p>
            <p className="text-purple-600 font-semibold mb-6">
              Price: {(orderForm.productPrice * customerData.quantity).toLocaleString()} DZD
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={orderForm.maxQuantity}
                  value={customerData.quantity}
                  onChange={(e) => setCustomerData((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Maximum available: {orderForm.maxQuantity}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOrderForm(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
