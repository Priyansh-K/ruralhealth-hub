"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { PatientSidebar } from "@/components/layout/patient-sidebar"
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, userType, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userType !== "patient")) {
      router.push("/auth/login?redirect=/patient")
    }
  }, [isAuthenticated, userType, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated || userType !== "patient") {
    return null
  }

  return (
    <SidebarProvider>
      <PatientSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <BreadcrumbNav userType="patient" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
