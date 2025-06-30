"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Building2, UserCheck, Activity, TrendingUp, AlertTriangle, Calendar, Database } from "lucide-react"

interface AdminStats {
  total_users: number
  total_patients: number
  total_clinics: number
  total_staff: number
  total_visits: number
  visits_today: number
  visits_this_week: number
  visits_this_month: number
  system_health: "healthy" | "warning" | "critical"
  active_sessions: number
  database_size: string
  uptime: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockStats: AdminStats = {
          total_users: 1247,
          total_patients: 892,
          total_clinics: 45,
          total_staff: 310,
          total_visits: 5634,
          visits_today: 23,
          visits_this_week: 156,
          visits_this_month: 678,
          system_health: "healthy",
          active_sessions: 89,
          database_size: "2.4 GB",
          uptime: "99.9%",
        }

        setStats(mockStats)
      } catch {
        setError("Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">{error}</AlertDescription>
      </Alert>
    )
  }

  if (!stats) return null

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and management</p>
      </div>

      {/* System Health Alert */}
      <Card
        className={`border-l-4 ${stats.system_health === "healthy" ? "border-l-green-500" : stats.system_health === "warning" ? "border-l-yellow-500" : "border-l-red-500"}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${getHealthColor(stats.system_health)}`}>
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">System Status</h3>
                <p className="text-sm text-gray-600">
                  System is {stats.system_health} • Uptime: {stats.uptime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Active Sessions</p>
              <p className="text-2xl font-bold">{stats.active_sessions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-900">{stats.total_users.toLocaleString()}</div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700 mt-1">All registered users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-900">{stats.total_patients.toLocaleString()}</div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-700 mt-1">Registered patients</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Clinics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-900">{stats.total_clinics}</div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-700 mt-1">Active clinics</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-900">{stats.total_staff}</div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-orange-700 mt-1">Healthcare staff</p>
          </CardContent>
        </Card>
      </div>

      {/* Visit Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span>Visit Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Visits</span>
                <span className="text-lg font-semibold">{stats.total_visits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today</span>
                <span className="text-lg font-semibold text-green-600">{stats.visits_today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-lg font-semibold text-blue-600">{stats.visits_this_week}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-lg font-semibold text-purple-600">{stats.visits_this_month}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-gray-600" />
              <span>System Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database Size</span>
                <span className="text-lg font-semibold">{stats.database_size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-lg font-semibold text-green-600">{stats.uptime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="text-lg font-semibold text-blue-600">{stats.active_sessions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(stats.system_health)}`}>
                  {stats.system_health.toUpperCase()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-6 w-6 text-indigo-600 mb-2" />
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-gray-600">Detailed system analytics</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
              <h3 className="font-medium">System Alerts</h3>
              <p className="text-sm text-gray-600">View system alerts</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Database className="h-6 w-6 text-gray-600 mb-2" />
              <h3 className="font-medium">Database Management</h3>
              <p className="text-sm text-gray-600">Manage database</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
