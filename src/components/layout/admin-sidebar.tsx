"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Building2,
  UserCheck,
  Activity,
  Settings,
  FileText,
  Shield,
  Database,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
    color: "text-green-600",
  },
  {
    name: "Clinic Management",
    href: "/admin/clinics",
    icon: Building2,
    color: "text-purple-600",
  },
  {
    name: "Staff Management",
    href: "/admin/staff",
    icon: UserCheck,
    color: "text-orange-600",
  },
  {
    name: "System Health",
    href: "/admin/health",
    icon: Activity,
    color: "text-red-600",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    color: "text-indigo-600",
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: FileText,
    color: "text-teal-600",
  },
  {
    name: "Audit Logs",
    href: "/admin/audit",
    icon: Shield,
    color: "text-yellow-600",
  },
  {
    name: "Database",
    href: "/admin/database",
    icon: Database,
    color: "text-gray-600",
  },
  {
    name: "Alerts",
    href: "/admin/alerts",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    color: "text-gray-500",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-red-600" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Portal</h2>
            <p className="text-sm text-gray-500">System Management</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", item.color)} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
