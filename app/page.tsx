import ProductCard from "@/components/ProductCard"
import { Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-purple py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to SahStore</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Your premium destination for accessories, electric trimmers, wireless vacuum cleaners, and car-related
            products.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-gray-600 text-lg">Discover our premium collection</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Empty state - No products yet */}
            <div className="col-span-full">
              <div className="text-center py-20">
                <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">No products yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We're working hard to bring you amazing products. Check back soon for our latest collection of
                  accessories, trimmers, vacuum cleaners, and car products.
                </p>
              </div>
            </div>

            {/* Placeholder product cards for layout demonstration */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
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
                <p className="text-gray-600">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
