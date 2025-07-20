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
import {
  LayoutDashboard,
  Users,
  Calendar,
  Heart,
  LogOut,
} from "lucide-react"
import type { Staff } from "@/types"

const medicalNavItems = [
  {
    title: "Dashboard",
    href: "/portal/medical",
    icon: LayoutDashboard,
    color: "text-blue-600",
  },
  {
    title: "Patients",
    href: "/portal/medical/patients",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Visits",
    href: "/portal/medical/visits",
    icon: Calendar,
    color: "text-purple-600",
  },
]

export function MedicalSidebar() {
  const pathname = usePathname()
  const { user, userType, logout } = useAuth()
  const staff = user as unknown as Staff

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

  // All navigation items are now available to all medical staff
  const filteredNavItems = medicalNavItems

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Heart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">RuralHealth Hub</span>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              Medical Portal
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
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className="group/item hover:bg-gray-50 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700"
                  >
                    <Link href={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors">
                      <item.icon className={`h-4 w-4 ${item.color} group-data-[active=true]/item:text-blue-600`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-red-100 text-red-700 font-medium">
              {staff?.full_name ? getInitials(staff.full_name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {staff?.full_name || "Medical Staff"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userType === "doctor" ? "Doctor" : "Nurse"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
