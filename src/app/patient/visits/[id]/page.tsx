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
import { ArrowLeft, Calendar, Stethoscope, FileText, Pill, Building2, AlertCircle, Clock } from "lucide-react"
import type { Visit } from "@/types"

export default function PatientVisitDetailPage() {
  const params = useParams()
  const visitId = Number(params.id)
  const [visit, setVisit] = useState<Visit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadVisit = async () => {
      try {
        const visitData = await apiClient.getPatientVisit(visitId)
        setVisit(visitData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load visit details")
      } finally {
        setIsLoading(false)
      }
    }

    if (visitId) {
      loadVisit()
    }
  }, [visitId])

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error && !visit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/patient/visits">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Visits
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

  if (!visit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/patient/visits">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Visits
            </Button>
          </Link>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Visit not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  const { date, time } = formatDateTime(visit.visit_date)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patient/visits">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Visits
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visit Details</h1>
          <p className="text-gray-600">
            {date} - {visit.reason}
          </p>
        </div>
      </div>

      {/* Visit Information */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Calendar className="mr-2 h-5 w-5" />
            Visit Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Date & Time</h3>
                <div className="mt-2">
                  <p className="font-medium">{date}</p>
                  <p className="text-sm text-gray-500">{time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Healthcare Provider</h3>
                <div className="mt-2 flex items-center">
                  <Stethoscope className="mr-2 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{visit.staff?.full_name}</p>
                    <p className="text-sm text-gray-500">{visit.staff?.role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Clinic</h3>
                <div className="mt-2 flex items-center">
                  <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{visit.clinic?.name}</p>
                    <p className="text-sm text-gray-500">{visit.clinic?.district}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Reason for Visit</h3>
              <p className="mt-1 text-gray-600">{visit.reason}</p>
            </div>

            {visit.notes && (
              <div>
                <h3 className="font-medium text-gray-900">Visit Notes</h3>
                <p className="mt-1 text-gray-600">{visit.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical Records */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Diagnoses */}
        <Card className="border-l-4 border-l-teal-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center text-teal-700">
                <FileText className="mr-2 h-5 w-5" />
                Diagnoses
              </span>
              <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                {visit.diagnoses?.length || 0}
              </Badge>
            </CardTitle>
            <CardDescription>Medical diagnoses from this visit</CardDescription>
          </CardHeader>
          <CardContent>
            {visit.diagnoses && visit.diagnoses.length > 0 ? (
              <div className="space-y-4">
                {visit.diagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="border-l-4 border-teal-500 pl-4 bg-teal-50 p-3 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-teal-900">{diagnosis.diagnosis_code}</h4>
                      <span className="text-sm text-teal-600">
                        {new Date(diagnosis.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-teal-800 mt-1">{diagnosis.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No diagnoses recorded for this visit</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center text-red-700">
                <Pill className="mr-2 h-5 w-5" />
                Prescriptions
              </span>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                {visit.prescriptions?.length || 0}
              </Badge>
            </CardTitle>
            <CardDescription>Medications prescribed during this visit</CardDescription>
          </CardHeader>
          <CardContent>
            {visit.prescriptions && visit.prescriptions.length > 0 ? (
              <div className="space-y-4">
                {visit.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-red-900">{prescription.medication_name}</h4>
                      <Badge variant="outline" className="border-red-300 text-red-700">
                        <Clock className="mr-1 h-3 w-3" />
                        {prescription.duration_days} days
                      </Badge>
                    </div>
                    <p className="text-sm text-red-800 mt-1">
                      <strong>Dosage:</strong> {prescription.dosage}
                    </p>
                    <p className="text-sm text-red-800">
                      <strong>Instructions:</strong> {prescription.instructions}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Pill className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No prescriptions recorded for this visit</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const runtime = "edge"