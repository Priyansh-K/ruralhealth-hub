import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  )
}
