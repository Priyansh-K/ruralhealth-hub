"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { TrendingUp, Users, Calendar, Activity, Building2, UserCheck } from "lucide-react"

interface AnalyticsData {
  user_growth: Array<{ month: string; patients: number; clinics: number }>
  visit_trends: Array<{ date: string; visits: number }>
  geographic_distribution: Array<{ district: string; clinics: number; patients: number }>
  top_diagnoses: Array<{ code: string; description: string; count: number }>
  system_usage: {
    daily_active_users: number
    monthly_active_users: number
    average_session_duration: string
    bounce_rate: number
  }
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockAnalytics: AnalyticsData = {
          user_growth: [
            { month: "Jan", patients: 120, clinics: 5 },
            { month: "Feb", patients: 180, clinics: 8 },
            { month: "Mar", patients: 250, clinics: 12 },
            { month: "Apr", patients: 320, clinics: 15 },
            { month: "May", patients: 420, clinics: 18 },
            { month: "Jun", patients: 520, clinics: 22 },
          ],
          visit_trends: [
            { date: "2024-01-15", visits: 45 },
            { date: "2024-01-16", visits: 52 },
            { date: "2024-01-17", visits: 38 },
            { date: "2024-01-18", visits: 61 },
            { date: "2024-01-19", visits: 48 },
            { date: "2024-01-20", visits: 55 },
          ],
          geographic_distribution: [
            { district: "North District", clinics: 8, patients: 245 },
            { district: "Central District", clinics: 12, patients: 567 },
            { district: "South District", clinics: 6, patients: 189 },
            { district: "West District", clinics: 4, patients: 123 },
            { district: "East District", clinics: 7, patients: 298 },
          ],
          top_diagnoses: [
            { code: "J06.9", description: "Acute upper respiratory infection", count: 156 },
            { code: "K59.0", description: "Constipation", count: 134 },
            { code: "M79.3", description: "Panniculitis", count: 98 },
            { code: "R50.9", description: "Fever", count: 87 },
            { code: "J00", description: "Acute nasopharyngitis", count: 76 },
          ],
          system_usage: {
            daily_active_users: 89,
            monthly_active_users: 1247,
            average_session_duration: "12m 34s",
            bounce_rate: 23.5,
          },
        }

        setAnalytics(mockAnalytics)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive system analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800">Daily Active Users</p>
                <p className="text-2xl font-bold text-blue-900">{analytics.system_usage.daily_active_users}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800">Monthly Active Users</p>
                <p className="text-2xl font-bold text-green-900">
                  {analytics.system_usage.monthly_active_users.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800">Avg Session Duration</p>
                <p className="text-2xl font-bold text-purple-900">{analytics.system_usage.average_session_duration}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-800">Bounce Rate</p>
                <p className="text-2xl font-bold text-orange-900">{analytics.system_usage.bounce_rate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              User Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.user_growth.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Patients: {data.patients}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Clinics: {data.clinics}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visit Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Daily Visit Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.visit_trends.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{new Date(data.date).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(data.visits / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{data.visits}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution and Top Diagnoses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-purple-600" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.geographic_distribution.map((district, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{district.district}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-gray-600">Clinics: </span>
                      <span className="font-medium ml-1">{district.clinics}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-gray-600">Patients: </span>
                      <span className="font-medium ml-1">{district.patients}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-orange-600" />
              Top Diagnoses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.top_diagnoses.map((diagnosis, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{diagnosis.code}</span>
                      <span className="text-sm font-medium">{diagnosis.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(diagnosis.count / 156) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{diagnosis.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
