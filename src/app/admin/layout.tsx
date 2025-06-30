"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { MainNav } from "@/components/layout/main-nav"
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, userType, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userType !== "admin")) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, userType, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated || userType !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <BreadcrumbNav />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
