"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Calendar, FileText, Pill, TrendingUp, AlertCircle } from "lucide-react"
import type { DashboardStats, Visit, Patient, Staff } from "@/types"

export default function MedicalDashboard() {
  const { user, userType } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentVisits, setRecentVisits] = useState<Visit[]>([])
  const [recentPatients, setRecentPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const staff = user as unknown as Staff

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsResponse, visitsResponse, patientsResponse] = await Promise.all([
          apiClient.getMedicalDashboard(),
          apiClient.getMedicalVisits(1, 5),
          apiClient.getMedicalPatients(1, 5),
        ])

        setStats(statsResponse)
        setRecentVisits(visitsResponse.data)
        setRecentPatients(patientsResponse.data)
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
        <h1 className="text-3xl font-bold text-gray-900">Medical Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Welcome, <span className="font-semibold text-red-700">{staff?.full_name || "Medical Professional"}</span>. 
          Overview of your medical practice and recent activity.
        </p>
        <div className="mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            {userType === "doctor" ? "Doctor" : "Nurse"} • Medical Portal
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
              <p className="text-xs text-blue-600">In your clinic</p>
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

          {userType === "doctor" && (
            <>
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-900">Diagnoses</CardTitle>
                  <FileText className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">{stats.total_diagnoses}</div>
                  <p className="text-xs text-green-600">Medical diagnoses</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Prescriptions</CardTitle>
                  <Pill className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">{stats.total_prescriptions}</div>
                  <p className="text-xs text-orange-600">Medications prescribed</p>
                </CardContent>
              </Card>
            </>
          )}

          {userType === "nurse" && (
            <Card className="border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-900">This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-700">{stats.visits_this_month}</div>
                <p className="text-xs text-indigo-600">Visits this month</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <h4 className="font-medium">{visit.patient?.full_name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(visit.visit_date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{visit.reason}</p>
                    <p className="text-sm text-gray-500">Visit #{visit.id}</p>
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
                      <h4 className="font-medium">{patient.full_name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {patient.gender}, {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} years old
                    </p>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
