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
import { ArrowLeft, Calendar, User, FileText, Pill, AlertCircle } from "lucide-react"
import type { Visit } from "@/types"

export default function VisitDetailPage() {
  const params = useParams()
  const visitId = Number(params.id)
  const [visit, setVisit] = useState<Visit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadVisit = async () => {
      try {
        const visitData = await apiClient.getClinicVisit(visitId)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !visit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/clinic/visits">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Visits
            </Link>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Visit not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/clinic/visits">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Visits
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visit Details</h1>
            <p className="text-gray-600">Administrative view of patient visit</p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          Visit #{visit.id}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visit Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Visit Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Visit Date</label>
              <p className="text-sm text-gray-900">
                {new Date(visit.visit_date).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Reason for Visit</label>
              <p className="text-sm text-gray-900">{visit.reason}</p>
            </div>
            {visit.notes && (
              <div>
                <label className="text-sm font-medium text-gray-700">Visit Notes</label>
                <p className="text-sm text-gray-900">{visit.notes}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700">Attending Staff</label>
              <p className="text-sm text-gray-900">
                {visit.staff?.full_name} ({visit.staff?.role})
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Recorded</label>
              <p className="text-sm text-gray-900">
                {new Date(visit.created_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information */}
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
              <p className="text-sm text-gray-900">{visit.patient?.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <p className="text-sm text-gray-900">{visit.patient?.gender}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="text-sm text-gray-900">{visit.patient?.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <p className="text-sm text-gray-900">{visit.patient?.address}</p>
            </div>
            <div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/clinic/patients/${visit.patient?.id}`}>
                  View Patient Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records - Read Only */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Diagnoses
              </span>
              <Badge variant="secondary" className="text-xs">
                Read Only
              </Badge>
            </CardTitle>
            <CardDescription>
              Medical diagnoses are managed by medical staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!visit.diagnoses || visit.diagnoses.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Diagnoses</h3>
                <p className="text-gray-600">No medical diagnoses recorded for this visit yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visit.diagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{diagnosis.diagnosis_code}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(diagnosis.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 mt-1">{diagnosis.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Pill className="mr-2 h-5 w-5" />
                Prescriptions
              </span>
              <Badge variant="secondary" className="text-xs">
                Read Only
              </Badge>
            </CardTitle>
            <CardDescription>
              Prescriptions are managed by medical staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!visit.prescriptions || visit.prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <Pill className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions</h3>
                <p className="text-gray-600">No medications prescribed for this visit yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visit.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border-l-4 border-orange-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{prescription.medication_name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(prescription.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                    <p className="text-sm text-gray-600">Duration: {prescription.duration_days} days</p>
                    <p className="text-sm text-gray-600">Instructions: {prescription.instructions}</p>
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
