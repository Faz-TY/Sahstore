"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const authStatus = localStorage.getItem("sahstore-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [isClient])

  const login = (password: string) => {
    if (password === "ReYou") {
      setIsAuthenticated(true)
      if (isClient) {
        localStorage.setItem("sahstore-auth", "true")
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    if (isClient) {
      localStorage.removeItem("sahstore-auth")
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
