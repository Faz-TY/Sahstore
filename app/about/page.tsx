import { Store, Users, Award, Truck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About SahStore</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for premium accessories and electronics
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Business information will be added soon. This section will contain detailed information about SahStore,
              our mission, values, and commitment to providing quality products.
            </p>
            <p>
              We specialize in accessories, electric trimmers, wireless vacuum cleaners (dual-use for car & home), and
              car-related products, bringing you the best in modern convenience and style.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <Store className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Products</h3>
            <p className="text-gray-600">
              We carefully curate our selection to bring you only the highest quality accessories and electronics.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We're committed to providing exceptional customer service.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <Award className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Brand</h3>
            <p className="text-gray-600">
              Built on trust and reliability, SahStore has become a name you can depend on.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <Truck className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable shipping to get your products to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Shop?</h2>
            <p className="text-purple-100 mb-6">Explore our collection and find the perfect products for your needs.</p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
