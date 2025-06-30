"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Calendar, FileText, Pill, Settings, Heart, LogOut } from "lucide-react"
import type { Patient } from "@/types"

const patientNavItems = [
  {
    title: "Dashboard",
    href: "/patient",
    icon: Heart,
    color: "text-blue-600",
  },
  {
    title: "Profile",
    href: "/patient/profile",
    icon: User,
    color: "text-green-600",
  },
  {
    title: "Visits",
    href: "/patient/visits",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    title: "Diagnoses",
    href: "/patient/diagnoses",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    title: "Prescriptions",
    href: "/patient/prescriptions",
    icon: Pill,
    color: "text-red-600",
  },
  {
    title: "Settings",
    href: "/patient/settings",
    icon: Settings,
    color: "text-gray-600",
  },
]

export function PatientSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const patient = user as Patient

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Heart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">RuralHealth Hub</span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Patient Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {patientNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-gray-50 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                  >
                    <Link href={item.href} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon
                        className={`h-4 w-4 ${pathname === item.href ? "text-blue-600" : item.color} group-hover:scale-110 transition-transform`}
                      />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8 bg-blue-100">
            <AvatarFallback className="text-blue-700 text-sm font-medium">
              {getInitials(patient?.full_name || "P")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{patient?.full_name}</p>
            <p className="text-xs text-gray-500 truncate">Patient</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
