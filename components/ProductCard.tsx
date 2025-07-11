"use client"

import Link from "next/link"
import { ShoppingBag, Package } from "lucide-react"

interface ProductCardProps {
  id?: string
  title?: string
  price?: number
  description?: string
  image?: string
  quantity?: number
  onOrder?: () => void
}

export default function ProductCard({
  id = "1",
  title,
  price,
  description,
  image,
  quantity = 0,
  onOrder,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} DZD`
  }

  const isOutOfStock = quantity === 0

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover border border-gray-200 light-card">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
        {image ? (
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title || "Product Name"}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description || "Product details will appear here"}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-purple-600">{price ? formatPrice(price) : "0 DZD"}</span>
          {quantity !== undefined && (
            <div className="flex items-center text-sm text-gray-500">
              <Package className="w-4 h-4 mr-1" />
              <span>{quantity} left</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/product/${id}`} className="flex-1">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors">
              View Details
            </button>
          </Link>

          {onOrder && (
            <button
              onClick={onOrder}
              disabled={isOutOfStock}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : "Quick Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
