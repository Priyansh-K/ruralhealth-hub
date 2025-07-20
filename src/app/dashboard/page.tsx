"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  Pill, 
  TrendingUp, 
  MapPin,
  AlertCircle,
  Activity,
  UserCheck,
  Target
} from "lucide-react"
import type { SystemAnalytics } from "@/types/analytics"

export default function DashboardAnalytics() {
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await apiClient.getSystemAnalytics()
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics")
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Rural Health Management System</h1>
        <p className="text-lg text-gray-600">Comprehensive Healthcare Analytics Dashboard</p>
        <p className="text-sm text-gray-500 mt-2">Real-time insights across all healthcare facilities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-medium">Total Clinics</p>
                <p className="text-3xl font-bold text-blue-900">{analytics.overall_stats.total_clinics}</p>
              </div>
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 font-medium">Total Patients</p>
                <p className="text-3xl font-bold text-green-900">{analytics.overall_stats.total_patients.toLocaleString()}</p>
              </div>
              <Users className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800 font-medium">Total Visits</p>
                <p className="text-3xl font-bold text-purple-900">{analytics.overall_stats.total_visits.toLocaleString()}</p>
              </div>
              <Calendar className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-800 font-medium">Medical Staff</p>
                <p className="text-3xl font-bold text-orange-900">{analytics.overall_stats.total_staff}</p>
              </div>
              <UserCheck className="h-12 w-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-medium">{analytics.overall_stats.visits_this_month} visits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-medium">{analytics.overall_stats.visits_today} visits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Diagnoses</span>
                <span className="font-medium">{analytics.overall_stats.total_diagnoses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Prescriptions</span>
                <span className="font-medium">{analytics.overall_stats.total_prescriptions.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center text-green-900">
              <Target className="mr-2 h-5 w-5" />
              Coverage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Patients/Clinic</span>
                <span className="font-medium">{Math.round(analytics.overall_stats.total_patients / analytics.overall_stats.total_clinics)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Staff/Clinic</span>
                <span className="font-medium">{Math.round(analytics.overall_stats.total_staff / analytics.overall_stats.total_clinics)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Visits/Patient</span>
                <span className="font-medium">{(analytics.overall_stats.total_visits / analytics.overall_stats.total_patients).toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-900">
              <TrendingUp className="mr-2 h-5 w-5" />
              Health Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Diagnoses/Visit</span>
                <span className="font-medium">{(analytics.overall_stats.total_diagnoses / analytics.overall_stats.total_visits).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Prescriptions/Visit</span>
                <span className="font-medium">{(analytics.overall_stats.total_prescriptions / analytics.overall_stats.total_visits).toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diagnosis & Prescription Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-red-600" />
              Top 10 Diagnosis Codes
            </CardTitle>
            <CardDescription>Most frequent diagnoses across all clinics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.top_diagnoses.slice(0, 10).map((diagnosis, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs font-mono">
                        {diagnosis.diagnosis_code}
                      </Badge>
                      <span className="text-sm font-medium">{diagnosis.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${diagnosis.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right min-w-[60px]">
                      <div className="text-sm font-medium">{diagnosis.count}</div>
                      <div className="text-xs text-gray-500">{diagnosis.percentage.toFixed(1)}%</div>
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
              <Pill className="mr-2 h-5 w-5 text-blue-600" />
              Top Prescriptions
            </CardTitle>
            <CardDescription>Most prescribed medications with usage patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.top_prescriptions.slice(0, 10).map((prescription, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{prescription.medication_name}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{prescription.count} prescriptions</div>
                      <div className="text-xs text-gray-500">{prescription.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Avg duration: {prescription.avg_duration_days.toFixed(1)} days</span>
                    <span>Common: {prescription.common_dosages[0]?.dosage || "N/A"}</span>
                  </div>
                  <Progress value={prescription.percentage} className="h-1 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-green-600" />
              Age Group Distribution
            </CardTitle>
            <CardDescription>Patient demographics by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.demographics.age_groups.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-medium">{group.age_group}</span>
                  <div className="flex items-center space-x-3">
                    <Progress value={group.percentage} className="w-20 h-2" />
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm font-medium">{group.count.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{group.percentage.toFixed(1)}%</div>
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
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              Gender Distribution
            </CardTitle>
            <CardDescription>Patient distribution by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.demographics.gender_distribution.map((gender, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-medium">{gender.gender}</span>
                  <div className="flex items-center space-x-3">
                    <Progress value={gender.percentage} className="w-20 h-2" />
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm font-medium">{gender.count.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{gender.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-indigo-600" />
            District Analytics
          </CardTitle>
          <CardDescription>Healthcare statistics by district/region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.district_analytics.map((district, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-3">{district.district}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clinics</span>
                    <span className="font-medium">{district.clinic_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Patients</span>
                    <span className="font-medium">{district.patient_count.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Visits</span>
                    <span className="font-medium">{district.visit_count.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Top Diagnosis:</p>
                    <p className="text-sm font-medium">{district.top_diagnosis}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-orange-600" />
            Seasonal Health Trends
          </CardTitle>
          <CardDescription>Illness patterns by season showing healthcare demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.seasonal_trends.map((season, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-2">{season.season}</h4>
                <p className="text-sm text-gray-600 mb-3">{season.months.join(", ")}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Visits</span>
                    <span className="font-medium">{season.total_visits.toLocaleString()}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-1">Common Illnesses:</p>
                    <div className="space-y-1">
                      {season.common_illnesses.slice(0, 3).map((illness, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                          {illness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Illness Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-red-600" />
            Monthly Illness Trends
          </CardTitle>
          <CardDescription>Healthcare trends over the last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.illness_trends.slice(-12).map((trend, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{trend.month}</span>
                  <span className="text-sm text-gray-600">{trend.count} cases</span>
                </div>
                <div className="text-xs text-gray-600">
                  <span>Top: {trend.top_diagnosis}</span>
                </div>
                <Progress value={(trend.count / Math.max(...analytics.illness_trends.map(t => t.count))) * 100} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 py-6">
        <p>Data updated in real-time • Serving rural communities with comprehensive healthcare analytics</p>
      </div>
    </div>
  )
}
