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
  Building2,
  Users,
  UserPlus,
  Calendar,
  Settings,
  Heart,
  LogOut,
  BarChart3,
} from "lucide-react"
import type { Clinic } from "@/types"

const clinicNavItems = [
  {
    title: "Dashboard",
    href: "/clinic",
    icon: LayoutDashboard,
    color: "text-blue-600",
  },
  {
    title: "Profile",
    href: "/clinic/profile",
    icon: Building2,
    color: "text-green-600",
  },
  {
    title: "Patients",
    href: "/clinic/patients",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Staff Management",
    href: "/clinic/staff",
    icon: UserPlus,
    color: "text-orange-600",
  },
  {
    title: "Visits",
    href: "/clinic/visits",
    icon: Calendar,
    color: "text-indigo-600",
  },
  {
    title: "Analytics",
    href: "/clinic/analytics",
    icon: BarChart3,
    color: "text-orange-600",
  },
  {
    title: "Settings",
    href: "/clinic/settings",
    icon: Settings,
    color: "text-gray-600",
  },
]

export function ClinicSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const clinic = user as Clinic

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
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Clinic Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
            Administrative Functions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {clinicNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-gray-50 data-[active=true]:bg-green-50 data-[active=true]:text-green-700 data-[active=true]:border-r-2 data-[active=true]:border-green-600"
                  >
                    <Link href={item.href} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon
                        className={`h-4 w-4 ${pathname === item.href ? "text-green-600" : item.color} group-hover:scale-110 transition-transform`}
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
          <Avatar className="h-8 w-8 bg-green-100">
            <AvatarFallback className="text-green-700 text-sm font-medium">
              {getInitials(clinic?.name || "C")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{clinic?.name}</p>
            <p className="text-xs text-gray-500 truncate">Administrative Staff</p>
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
