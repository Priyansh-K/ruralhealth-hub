"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, FileText, Pill, User, Building2, Phone, MapPin, AlertCircle } from "lucide-react"
import type { Patient, Visit, Diagnosis, Prescription } from "@/types"

export default function PatientDashboard() {
  const { user } = useAuth()
  const [recentVisits, setRecentVisits] = useState<Visit[]>([])
  const [recentDiagnoses, setRecentDiagnoses] = useState<Diagnosis[]>([])
  const [recentPrescriptions, setRecentPrescriptions] = useState<Prescription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const patient = user as Patient

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [visitsResponse, diagnosesResponse, prescriptionsResponse] = await Promise.all([
          apiClient.getPatientVisits(1, 5),
          apiClient.getPatientDiagnoses(1, 5),
          apiClient.getPatientPrescriptions(1, 5),
        ])

        setRecentVisits(visitsResponse.data)
        setRecentDiagnoses(diagnosesResponse.data)
        setRecentPrescriptions(prescriptionsResponse.data)
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
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {patient.full_name}</h1>
        <p className="text-gray-600">Here&apos;s an overview of your health information and recent activity.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Gender</p>
                <p className="text-sm text-gray-600">{patient.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Date of Birth</p>
                <p className="text-sm text-gray-600">{new Date(patient.date_of_birth).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600">{patient.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Clinic</p>
                <p className="text-sm text-gray-600">{patient.clinic?.name}</p>
              </div>
            </div>
          </div>
          {patient.clinic && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <h3 className="font-medium text-blue-900">Your Healthcare Provider</h3>
              <div className="mt-2 space-y-1 text-sm text-blue-800">
                <p className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  {patient.clinic.name}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {patient.clinic.address}
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {patient.clinic.contact_number}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Visits</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{recentVisits.length}</div>
            <p className="text-xs text-blue-600">Recent medical visits</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Diagnoses</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{recentDiagnoses.length}</div>
            <p className="text-xs text-green-600">Medical diagnoses on record</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{recentPrescriptions.length}</div>
            <p className="text-xs text-purple-600">Active and past prescriptions</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Visits
            </CardTitle>
            <CardDescription>Your latest medical appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {recentVisits.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No visits recorded yet</p>
            ) : (
              <div className="space-y-4">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{visit.reason}</h4>
                      <span className="text-sm text-gray-500">{new Date(visit.visit_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      with {visit.staff?.full_name} ({visit.staff?.role})
                    </p>
                    {visit.notes && <p className="text-sm text-gray-500 mt-1">{visit.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5" />
              Recent Prescriptions
            </CardTitle>
            <CardDescription>Your current and recent medications</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPrescriptions.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No prescriptions recorded yet</p>
            ) : (
              <div className="space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{prescription.medication_name}</h4>
                      <span className="text-sm text-gray-500">{prescription.duration_days} days</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {prescription.dosage} - {prescription.instructions}
                    </p>
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
