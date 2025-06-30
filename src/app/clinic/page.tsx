"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, UserPlus, Calendar, FileText, Pill, Building2, TrendingUp, AlertCircle } from "lucide-react"
import type { Clinic, DashboardStats, Visit, Patient, Staff } from "@/types"

export default function ClinicDashboard() {
  const { user } = useAuth()
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
        const [statsResponse, visitsResponse, patientsResponse, staffResponse] = await Promise.all([
          apiClient.getClinicDashboard(),
          apiClient.getClinicVisits(1, 5),
          apiClient.getClinicPatients(1, 5),
          apiClient.getClinicStaff(1, 5),
        ])

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{clinic.name} Dashboard</h1>
        <p className="text-gray-600">Overview of your clinic operations and recent activity.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Clinic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Clinic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-sm">{clinic.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-sm">{clinic.contact_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">District</p>
              <p className="text-sm">{clinic.district}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <CardTitle className="text-sm font-medium text-green-900">Staff Members</CardTitle>
              <UserPlus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.total_staff}</div>
              <p className="text-xs text-green-600">Healthcare providers</p>
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

          <Card className="border-l-4 border-l-teal-500 bg-gradient-to-r from-teal-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-900">Diagnoses</CardTitle>
              <FileText className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-700">{stats.total_diagnoses}</div>
              <p className="text-xs text-teal-600">Total diagnoses recorded</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900">Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{stats.total_prescriptions}</div>
              <p className="text-xs text-red-600">Total prescriptions issued</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Visits
            </CardTitle>
            <CardDescription>Latest patient appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {recentVisits.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No recent visits</p>
            ) : (
              <div className="space-y-4">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{visit.patient?.full_name}</h4>
                      <span className="text-sm text-gray-500">{new Date(visit.visit_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{visit.reason}</p>
                    <p className="text-sm text-gray-500">Attended by {visit.staff?.full_name}</p>
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
            <CardDescription>Newly registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPatients.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No patients registered yet</p>
            ) : (
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{patient.full_name}</h4>
                      <span className="text-sm text-gray-500">{new Date(patient.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {patient.gender}, {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} years
                      old
                    </p>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Staff Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Staff Overview
          </CardTitle>
          <CardDescription>Your healthcare team</CardDescription>
        </CardHeader>
        <CardContent>
          {recentStaff.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No staff members added yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentStaff.map((staff) => (
                <div key={staff.id} className="rounded-lg border p-4">
                  <h4 className="font-medium">{staff.full_name}</h4>
                  <p className="text-sm text-blue-600">{staff.role}</p>
                  <p className="text-sm text-gray-500">{staff.email}</p>
                  <p className="text-sm text-gray-500">{staff.phone}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
