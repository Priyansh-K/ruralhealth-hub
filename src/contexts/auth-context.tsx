"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { Patient, Clinic, AuthResponse, LoginData, RegisterPatientData, RegisterClinicData } from "@/types"
import { apiClient } from "@/lib/api"

interface AuthContextType {
  user: Patient | Clinic | null
  userType: "patient" | "clinic_staff" | "doctor" | "nurse" | "admin" | null
  loginType: "staff" | "medical" | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginData) => Promise<void>
  clinicLogin: (data: LoginData) => Promise<void>
  registerPatient: (data: RegisterPatientData) => Promise<void>
  registerClinic: (data: RegisterClinicData) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Patient | Clinic | null>(null)
  const [userType, setUserType] = useState<"patient" | "clinic_staff" | "doctor" | "nurse" | "admin" | null>(null)
  const [loginType, setLoginType] = useState<"staff" | "medical" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = !!user && !!userType

  const handleAuthResponse = (response: AuthResponse, requestedLoginType?: "staff" | "medical") => {
    localStorage.setItem("token", response.token)
    localStorage.setItem("userType", response.user_type)
    
    // Handle login_type - use from response first, then from request, then infer
    let inferredLoginType = response.login_type || requestedLoginType
    if (!inferredLoginType) {
      if (response.user_type === "clinic_staff") {
        inferredLoginType = "staff"
      } else if (response.user_type === "doctor" || response.user_type === "nurse") {
        inferredLoginType = "medical"
      }
    }
    
    if (inferredLoginType) {
      localStorage.setItem("loginType", inferredLoginType)
      setLoginType(inferredLoginType)
    }
    
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
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const clinicLogin = async (data: LoginData) => {
    try {
      const response = await apiClient.clinicLogin(data)
      handleAuthResponse(response)

      // Redirect based on login type and user type
      if (data.login_type === "staff" && response.user_type === "clinic_staff") {
        router.push("/clinic")
      } else if (data.login_type === "medical" && (response.user_type === "doctor" || response.user_type === "nurse")) {
        router.push("/portal/medical")
      } else {
        // Fallback redirect based on user type
        if (response.user_type === "clinic_staff") {
          router.push("/clinic")
        } else if (response.user_type === "doctor" || response.user_type === "nurse") {
          router.push("/portal/medical")
        }
      }
    } catch (error) {
      console.error("Clinic login failed:", error)
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
    localStorage.removeItem("loginType")
    setUser(null)
    setUserType(null)
    setLoginType(null)
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
      const storedUserType = localStorage.getItem("userType") as "patient" | "clinic_staff" | "doctor" | "nurse" | "admin" | null
      const storedLoginType = localStorage.getItem("loginType") as "staff" | "medical" | null

      if (token && storedUserType) {
        try {
          const profile = await apiClient.getProfile()
          setUser(profile)
          setUserType(storedUserType)
          setLoginType(storedLoginType)
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
        } else if (userType === "clinic_staff") {
          router.push("/clinic")
        } else if (userType === "doctor" || userType === "nurse") {
          router.push("/portal/medical")
        } else if (userType === "admin") {
          router.push("/admin")
        }
      }
    }
  }, [isAuthenticated, isLoading, pathname, userType, loginType, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loginType,
        isLoading,
        isAuthenticated,
        login,
        clinicLogin,
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
