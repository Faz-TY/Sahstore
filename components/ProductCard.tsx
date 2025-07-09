import Link from "next/link"
import { ShoppingBag } from "lucide-react"

interface ProductCardProps {
  id?: string
  title?: string
  price?: string
  image?: string
}

export default function ProductCard({ id = "1", title, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover border border-gray-200 light-card">
        {/* Product Image Placeholder */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title || "Product Name"}</h3>
          <p className="text-gray-600 text-sm mb-4">Product details will appear here</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600">{price || "$0.00"}</span>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
