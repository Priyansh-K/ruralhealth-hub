"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Patient, Clinic, AuthResponse, LoginData, RegisterPatientData, RegisterClinicData } from "@/types"
import { apiClient } from "@/lib/api"

interface AuthContextType {
  user: Patient | Clinic | null
  userType: "patient" | "clinic" | "admin" | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginData) => Promise<void>
  registerPatient: (data: RegisterPatientData) => Promise<void>
  registerClinic: (data: RegisterClinicData) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Patient | Clinic | null>(null)
  const [userType, setUserType] = useState<"patient" | "clinic" | "admin" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = !!user && !!userType

  const handleAuthResponse = (response: AuthResponse) => {
    localStorage.setItem("token", response.token)
    localStorage.setItem("userType", response.user_type)
    setUser(response.user)
    setUserType(response.user_type)
  }

  const login = async (data: LoginData) => {
    try {
      const response = await apiClient.login(data)
      handleAuthResponse(response)

      // Redirect to appropriate dashboard
      if (response.user_type === "patient") {
        router.push("/patient")
      } else if (response.user_type === "clinic") {
        router.push("/clinic")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const registerPatient = async (data: RegisterPatientData) => {
    try {
      const response = await apiClient.registerPatient(data)
      handleAuthResponse(response)
      router.push("/patient")
    } catch (error) {
      console.error("Patient registration failed:", error)
      throw error
    }
  }

  const registerClinic = async (data: RegisterClinicData) => {
    try {
      const response = await apiClient.registerClinic(data)
      handleAuthResponse(response)
      router.push("/clinic")
    } catch (error) {
      console.error("Clinic registration failed:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userType")
    setUser(null)
    setUserType(null)
  }

  const refreshProfile = async () => {
    try {
      const profile = await apiClient.getProfile()
      setUser(profile)
    } catch (error) {
      console.error("Failed to refresh profile:", error)
      logout()
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token")
      const storedUserType = localStorage.getItem("userType") as "patient" | "clinic" | "admin" | null

      if (token && storedUserType) {
        try {
          const profile = await apiClient.getProfile()
          setUser(profile)
          setUserType(storedUserType)
        } catch (error) {
          console.error("Failed to load profile:", error)
          logout()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (pathname.startsWith("/auth")) {
        if (userType === "patient") {
          router.push("/patient")
        } else if (userType === "clinic") {
          router.push("/clinic")
        }
      }
    }
  }, [isAuthenticated, isLoading, pathname, userType, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isLoading,
        isAuthenticated,
        login,
        registerPatient,
        registerClinic,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
