"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface ProductMedia {
  id: string
  type: "image" | "video"
  url: string
  fileName: string
  fileSize: number
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  category: string
  media: ProductMedia[]
  createdAt: string
}

export interface Order {
  id: string
  productId: string
  productName: string
  quantity: number
  customerName: string
  customerEmail: string
  orderDate: string
  totalPrice: number
}

interface StoreContextType {
  products: Product[]
  orders: Order[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  deleteProduct: (productId: string) => void
  updateProductQuantity: (productId: string, newQuantity: number) => void
  addOrder: (order: Omit<Order, "id" | "orderDate">) => void
  getTotalRevenue: () => number
  getTotalProducts: () => number
  getTotalOrders: () => number
  getRecentOrders: (limit?: number) => Order[]
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load data from localStorage on mount
  useEffect(() => {
    if (!isClient) return

    const savedProducts = localStorage.getItem("sahstore-products")
    const savedOrders = localStorage.getItem("sahstore-orders")

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        console.error("Error loading products:", error)
      }
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Error loading orders:", error)
      }
    }
  }, [isClient])

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (!isClient) return
    localStorage.setItem("sahstore-products", JSON.stringify(products))
  }, [products, isClient])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (!isClient) return
    localStorage.setItem("sahstore-orders", JSON.stringify(orders))
  }, [orders, isClient])

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const updateProductQuantity = (productId: string, newQuantity: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: Math.max(0, newQuantity) } : p)))
  }

  const addOrder = (orderData: Omit<Order, "id" | "orderDate">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date().toISOString(),
    }
    setOrders((prev) => [...prev, newOrder])

    // Update product quantity
    updateProductQuantity(
      orderData.productId,
      products.find((p) => p.id === orderData.productId)?.quantity! - orderData.quantity,
    )
  }

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.totalPrice, 0)
  }

  const getTotalProducts = () => {
    return products.length
  }

  const getTotalOrders = () => {
    return orders.length
  }

  const getRecentOrders = (limit = 10) => {
    return orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, limit)
  }

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        addProduct,
        deleteProduct,
        updateProductQuantity,
        addOrder,
        getTotalRevenue,
        getTotalProducts,
        getTotalOrders,
        getRecentOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
