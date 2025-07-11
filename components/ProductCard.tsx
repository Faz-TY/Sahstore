"use client"

import { ShoppingCart, Package } from "lucide-react"

interface ProductCardProps {
  id: string
  title: string
  price: number
  description: string
  image?: string
  quantity: number
  onOrder: () => void
}

export default function ProductCard({ title, price, description, image, quantity, onOrder }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} DZD`
  }

  const isOutOfStock = quantity <= 0

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              target.nextElementSibling?.classList.remove("hidden")
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center bg-gray-200 ${image ? "hidden" : ""}`}>
          <Package className="h-16 w-16 text-gray-400" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-purple-600">{formatPrice(price)}</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isOutOfStock ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `${quantity} in stock`}
          </span>
        </div>

        <button
          onClick={onOrder}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
            isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Quick Order"}
        </button>
      </div>
    </div>
  )
}
