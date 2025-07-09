import type React from "react"
import type { Metadata } from "next"
import { Belanosima } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from '@/context/AuthContext'

const belanosima = Belanosima({ subsets: ["latin"], weight: ["400", "600", "700"] })

export const metadata: Metadata = {
  title: "SahStore - Premium Accessories & Electronics",
  description:
    "Your one-stop shop for accessories, electric trimmers, wireless vacuum cleaners, and car-related products.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${belanosima.className} bg-white text-gray-900 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
