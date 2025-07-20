"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User, Calendar, Phone, MapPin, FileText, Pill, AlertCircle } from "lucide-react"
import type { Patient, Visit, Diagnosis, Prescription } from "@/types"

export default function MedicalPatientDetailPage() {
  const params = useParams()
  const patientId = Number(params.id)

  const [patient, setPatient] = useState<Patient | null>(null)
  const [visits, setVisits] = useState<Visit[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const [patientResponse, visitsResponse] = await Promise.all([
          apiClient.getMedicalPatient(patientId),
          apiClient.getMedicalVisits(1, 20, patientId),
        ])

        setPatient(patientResponse)
        setVisits(visitsResponse.data)

        // Extract diagnoses and prescriptions from visits
        const allDiagnoses: Diagnosis[] = []
        const allPrescriptions: Prescription[] = []

        visitsResponse.data.forEach(visit => {
          if (visit.diagnoses) {
            allDiagnoses.push(...visit.diagnoses)
          }
          if (visit.prescriptions) {
            allPrescriptions.push(...visit.prescriptions)
          }
        })

        setDiagnoses(allDiagnoses)
        setPrescriptions(allPrescriptions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load patient data")
      } finally {
        setIsLoading(false)
      }
    }

    if (patientId) {
      loadPatientData()
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

  if (error || !patient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/portal/medical/patients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Patients
            </Link>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Patient not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hover:bg-red-200">
              <Link href="/portal/medical/patients">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patients
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{patient.full_name}</h1>
              <p className="text-gray-700 mt-1">Patient medical records and history</p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm border-red-300 text-red-700 bg-red-50">
            Patient ID: {patient.id}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-sm text-gray-900">{patient.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Age & Gender</label>
                <p className="text-sm text-gray-900">
                  {calculateAge(patient.date_of_birth)} years old, {patient.gender}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="text-sm text-gray-900">
                  {new Date(patient.date_of_birth).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">{patient.address}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Registered</label>
                <p className="text-sm text-gray-900">
                  {new Date(patient.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Medical Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">{visits.length}</p>
                  <p className="text-sm text-blue-600">Visits</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">{diagnoses.length}</p>
                  <p className="text-sm text-green-600">Diagnoses</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-700">{prescriptions.length}</p>
                  <p className="text-sm text-orange-600">Prescriptions</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-700">
                    {visits.length > 0 ? Math.round((Date.now() - new Date(visits[0].visit_date).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </p>
                  <p className="text-sm text-purple-600">Days Since Last Visit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medical History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              {visits.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No visits recorded</p>
              ) : (
                <div className="space-y-4">
                  {visits.slice(0, 5).map((visit) => (
                    <div key={visit.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{visit.reason}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(visit.visit_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{visit.notes}</p>
                      <p className="text-sm text-gray-500">
                        Attended by {visit.staff?.full_name} ({visit.staff?.role})
                      </p>
                    </div>
                  ))}
                  {visits.length > 5 && (
                    <div className="text-center">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/portal/medical/visits">
                          View All Visits
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Diagnoses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Diagnoses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diagnoses.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No diagnoses recorded</p>
              ) : (
                <div className="space-y-4">
                  {diagnoses.slice(0, 5).map((diagnosis) => (
                    <div key={diagnosis.id} className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-1">
                            {diagnosis.diagnosis_code}
                          </Badge>
                          <p className="text-sm font-medium">{diagnosis.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(diagnosis.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="mr-2 h-5 w-5" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prescriptions.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No prescriptions recorded</p>
              ) : (
                <div className="space-y-4">
                  {prescriptions.slice(0, 5).map((prescription) => (
                    <div key={prescription.id} className="border-l-4 border-orange-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{prescription.medication_name}</p>
                          <p className="text-sm text-gray-600">{prescription.dosage}</p>
                          <p className="text-sm text-gray-500">{prescription.instructions}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">
                            {new Date(prescription.created_at).toLocaleDateString()}
                          </span>
                          <p className="text-sm text-gray-500">{prescription.duration_days} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
