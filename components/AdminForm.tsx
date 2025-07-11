"use client"

import type React from "react"
import { useState } from "react"
import { Package, DollarSign, FileText, Upload, X, Hash, ImageIcon, Video, Tag } from "lucide-react"
import { useStore, type ProductMedia } from "@/context/StoreContext"

interface ProductFormData {
  name: string
  price: string
  description: string
  quantity: string
  category: string
  media: ProductMedia[]
}

const PRODUCT_CATEGORIES = [
  "Accessories",
  "Electric Trimmers",
  "Wireless Vacuum Cleaners",
  "Car Products",
  "TECH",
  "Other Products",
]

export default function AdminForm() {
  const { addProduct } = useStore()
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    media: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      description: formData.description,
      quantity: Number.parseInt(formData.quantity),
      category: formData.category,
      media: formData.media,
    }

    addProduct(productData)

    // Reset form
    setFormData({
      name: "",
      price: "",
      description: "",
      quantity: "",
      category: "",
      media: [],
    })

    alert("Product created successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (formData.media.length >= 12) return // Max 12 files total

      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")

      if (!isImage && !isVideo) return

      const imageCount = formData.media.filter((m) => m.type === "image").length
      const videoCount = formData.media.filter((m) => m.type === "video").length

      if (isImage && imageCount >= 10) return // Max 10 images
      if (isVideo && videoCount >= 3) return // Max 3 videos

      const mediaItem: ProductMedia = {
        id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: isImage ? "image" : "video",
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
      }

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, mediaItem],
      }))
    })
  }

  const removeMedia = (mediaId: string) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== mediaId),
    }))
  }

  const imageCount = formData.media.filter((m) => m.type === "image").length
  const videoCount = formData.media.filter((m) => m.type === "video").length

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Package className="h-6 w-6 text-purple-600 mr-3" />
          Add New Product
        </h2>
        <p className="text-gray-600 mt-1">Create a new product for your store</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Enter product name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (DZD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none bg-white"
              required
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
              placeholder="Enter product description"
              required
            />
          </div>
        </div>

        {/* Media Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Media</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="media-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">Upload images and videos</span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Images: {imageCount}/10 • Videos: {videoCount}/3
                  </span>
                  <span className="mt-1 block text-xs text-gray-400">Supported: JPG, PNG, MP4</span>
                </label>
                <input
                  id="media-upload"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.mp4"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Media Preview */}
          {formData.media.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.media.map((media) => (
                <div key={media.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {media.type === "image" ? (
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt="Product media"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">Video</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedia(media.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {media.type === "image" ? <ImageIcon className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Create Product
        </button>
      </form>
    </div>
  )
}
