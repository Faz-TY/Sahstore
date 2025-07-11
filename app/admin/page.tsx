"use client"

import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useStore } from "@/context/StoreContext"
import AdminForm from "@/components/AdminForm"
import OrdersList from "@/components/OrdersList"
import { LogOut, Shield, BarChart3, Package, ShoppingBag, Trash2, Tag } from "lucide-react"

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth()
  const { products, getTotalRevenue, getTotalProducts, getTotalOrders, deleteProduct } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} DZD`
  }

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      deleteProduct(productId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">SahStore Admin</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real Dynamic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalProducts()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalOrders()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(getTotalRevenue())}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Product Creation Form */}
          <div>
            <AdminForm />
          </div>

          {/* Orders List */}
          <div>
            <OrdersList />
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Package className="h-6 w-6 text-purple-600 mr-3" />
              Manage Products
            </h2>
            <p className="text-gray-600 mt-1">View and manage your product inventory</p>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-500">Create your first product using the form above.</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {product.media.length > 0 && (
                      <div className="mb-3">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {product.media[0].type === "image" ? (
                            <img
                              src={product.media[0].url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        {product.media.length > 1 && (
                          <p className="text-xs text-gray-500 mt-1">+{product.media.length - 1} more</p>
                        )}
                      </div>
                    )}

                    <p className="text-purple-600 font-semibold text-lg mb-2">{formatPrice(product.price)}</p>

                    {product.category && (
                      <div className="flex items-center mb-2">
                        <Tag className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
                      </span>
                      <span className="text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
