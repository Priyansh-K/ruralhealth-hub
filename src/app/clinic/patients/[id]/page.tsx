"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, User, Calendar, FileText, Pill, Phone, MapPin, AlertCircle } from "lucide-react"
import type { Patient } from "@/types"

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = Number(params.id)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const patientData = await apiClient.getClinicPatient(patientId)
        setPatient(patientData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load patient details")
      } finally {
        setIsLoading(false)
      }
    }

    if (patientId) {
      loadPatient()
    }
  }, [patientId])

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

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
        <div className="flex items-center gap-4">
          <Link href="/clinic/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/clinic/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Patient not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/clinic/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.full_name}</h1>
            <p className="text-gray-600">Patient Details & Medical History</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/clinic/visits/new?patient_id=${patient.id}`}>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Calendar className="mr-2 h-4 w-4" />
              New Visit
            </Button>
          </Link>
        </div>
      </div>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Personal Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Gender:</span>
                    <Badge
                      variant={
                        patient.gender === "Male" ? "default" : patient.gender === "Female" ? "secondary" : "outline"
                      }
                    >
                      {patient.gender}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Age:</span>
                    <span className="text-sm font-medium">{calculateAge(patient.date_of_birth)} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Date of Birth:</span>
                    <span className="text-sm font-medium">{new Date(patient.date_of_birth).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400 mt-0.5" />
                    <span>{patient.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Registration</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Registered:</span>
                    <span className="text-sm font-medium">{new Date(patient.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Updated:</span>
                    <span className="text-sm font-medium">{new Date(patient.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Recent Visits
            </CardTitle>
            <CardDescription>Latest medical appointments for this patient</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.visits && patient.visits.length > 0 ? (
              <div className="space-y-4">
                {patient.visits.slice(0, 5).map((visit) => (
                  <div key={visit.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{visit.reason}</h4>
                      <span className="text-sm text-gray-500">{new Date(visit.visit_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">Attended by {visit.staff?.full_name}</p>
                    {visit.notes && <p className="text-sm text-gray-500 mt-1">{visit.notes}</p>}
                    {/* diagnosis and prescription */}
                    {visit.diagnoses && visit.diagnoses.length > 0 && (
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-700">Diagnoses:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {visit.diagnoses.map((diag) => (
                            <li key={diag.id}>{diag.diagnosis_code}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {visit.prescriptions && visit.prescriptions.length > 0 && (
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-700">Prescriptions:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {visit.prescriptions.map((prescription) => (
                            <li key={prescription.id}>{prescription.medication_name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                {patient.visits.length > 5 && (
                  <Link href={`/clinic/visits?patient_id=${patient.id}`}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Visits ({patient.visits.length})
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No visits recorded yet</p>
                <Link href={`/clinic/visits/new?patient_id=${patient.id}`}>
                  <Button size="sm" className="mt-2 bg-blue-900 hover:bg-blue-800">
                    Schedule First Visit
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common actions for this patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href={`/clinic/visits/new?patient_id=${patient.id}`}>
              <Button className="w-full justify-start bg-blue-900 hover:bg-blue-800">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Visit
              </Button>
            </Link>
            <Link href={`/clinic/visits?patient_id=${patient.id}`}>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                View All Visits
              </Button>
            </Link>
            <Link href={`/clinic/prescriptions?patient_id=${patient.id}`}>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Pill className="mr-2 h-4 w-4" />
                View Prescriptions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const runtime = "edge"