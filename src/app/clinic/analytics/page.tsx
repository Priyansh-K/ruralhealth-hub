"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  TrendingUp, 
  AlertCircle,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Building2
} from "lucide-react"
import type { ClinicAnalytics } from "@/types/analytics"
import type { DashboardStats, Visit, Patient, Staff, Clinic } from "@/types"

export default function ClinicDashboardAnalytics() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<ClinicAnalytics | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentVisits, setRecentVisits] = useState<Visit[]>([])
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])
  const [recentStaff, setRecentStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const clinic = user as Clinic

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [analyticsResponse, statsResponse, visitsResponse, patientsResponse, staffResponse] = await Promise.all([
          apiClient.getClinicDashboardContent(),
          apiClient.getClinicDashboard(),
          apiClient.getClinicVisits(1, 5),
          apiClient.getClinicPatients(1, 5),
          apiClient.getClinicStaff(1, 5),
        ])

        setAnalytics(analyticsResponse)
        setStats(statsResponse)
        setRecentVisits(visitsResponse.data)
        setRecentPatients(patientsResponse.data)
        setRecentStaff(staffResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
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
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-900">Clinic Dashboard Analytics</h1>
        <p className="text-gray-700 mt-2">
          Welcome to <span className="font-semibold text-blue-700">{clinic?.name || "Your Clinic"}</span>. 
          Comprehensive analytics and insights for your healthcare facility.
        </p>
        <div className="mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Building2 className="mr-1 h-3 w-3" />
            Clinic Analytics Portal
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="diagnosis">Diagnoses</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-900">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">{stats.total_patients}</div>
                  <p className="text-xs text-blue-600">Registered patients</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-900">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">{stats.total_staff}</div>
                  <p className="text-xs text-green-600">Medical & admin staff</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-900">Total Visits</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-700">{stats.total_visits}</div>
                  <p className="text-xs text-purple-600">All time visits</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">{stats.visits_this_month}</div>
                  <p className="text-xs text-orange-600">Visits this month</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Activity Overview */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Activity className="mr-2 h-5 w-5" />
                    Clinic Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-medium">{analytics.clinic_stats.visits_this_month} visits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Today</span>
                      <span className="font-medium">{analytics.clinic_stats.visits_today} visits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Diagnoses</span>
                      <span className="font-medium">{analytics.clinic_stats.total_diagnoses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Prescriptions</span>
                      <span className="font-medium">{analytics.clinic_stats.total_prescriptions.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-900">
                    <Target className="mr-2 h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Visits per Patient</span>
                      <span className="font-medium">{(analytics.clinic_stats.total_visits / analytics.clinic_stats.total_patients).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Diagnoses per Visit</span>
                      <span className="font-medium">{(analytics.clinic_stats.total_diagnoses / analytics.clinic_stats.total_visits).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Prescriptions per Visit</span>
                      <span className="font-medium">{(analytics.clinic_stats.total_prescriptions / analytics.clinic_stats.total_visits).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Staff per Patient</span>
                      <span className="font-medium">{(analytics.clinic_stats.total_staff / analytics.clinic_stats.total_patients * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-900">
                    <PieChart className="mr-2 h-5 w-5" />
                    Demographics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.demographics.age_groups.slice(0, 3).map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{group.age_group}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={group.percentage} className="w-16 h-2" />
                          <span className="text-xs font-medium">{group.percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Visits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Visits
                </CardTitle>
                <CardDescription>Latest patient visits</CardDescription>
              </CardHeader>
              <CardContent>
                {recentVisits.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No visits found</p>
                ) : (
                  <div className="space-y-4">
                    {recentVisits.map((visit) => (
                      <div key={visit.id} className="border-l-4 border-indigo-500 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{visit.patient?.full_name}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(visit.visit_date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{visit.reason}</p>
                        <p className="text-xs text-gray-500">Visit #{visit.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Recent Patients
                </CardTitle>
                <CardDescription>Recently registered patients</CardDescription>
              </CardHeader>
              <CardContent>
                {recentPatients.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No patients found</p>
                ) : (
                  <div className="space-y-4">
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{patient.full_name}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(patient.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {patient.gender}, {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} years old
                        </p>
                        <p className="text-xs text-gray-500">{patient.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Staff */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Recent Staff
                </CardTitle>
                <CardDescription>Recently added staff members</CardDescription>
              </CardHeader>
              <CardContent>
                {recentStaff.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No staff found</p>
                ) : (
                  <div className="space-y-4">
                    {recentStaff.map((staff) => (
                      <div key={staff.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{staff.full_name}</h4>
                          <Badge variant="outline" className="text-xs">{staff.role}</Badge>
                        </div>
                        <p className="text-xs text-gray-600">{staff.email}</p>
                        <p className="text-xs text-gray-500">{staff.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          {analytics && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
                    Age Group Distribution
                  </CardTitle>
                  <CardDescription>Patient demographics in your clinic</CardDescription>
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
                    <PieChart className="mr-2 h-5 w-5 text-purple-600" />
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
          )}
        </TabsContent>

        <TabsContent value="diagnosis" className="space-y-6">
          {analytics && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-red-600" />
                  Top Diagnosis Codes (This Clinic)
                </CardTitle>
                <CardDescription>Most frequent diagnoses in your clinic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.top_diagnoses.map((diagnosis, index) => (
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
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          {analytics && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="mr-2 h-5 w-5 text-blue-600" />
                  Top Prescriptions (This Clinic)
                </CardTitle>
                <CardDescription>Most prescribed medications in your clinic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.top_prescriptions.map((prescription, index) => (
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
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {analytics && (
            <>
              {/* Seasonal Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-orange-600" />
                    Seasonal Health Trends (Your Clinic)
                  </CardTitle>
                  <CardDescription>Illness patterns by season in your clinic</CardDescription>
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

              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-red-600" />
                    Monthly Illness Trends (Your Clinic)
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
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
