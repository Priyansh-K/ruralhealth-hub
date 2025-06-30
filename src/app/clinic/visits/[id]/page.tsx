"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, User, Stethoscope, FileText, Pill, Plus, AlertCircle, CheckCircle } from "lucide-react"
import type { Visit, CreateDiagnosisData, CreatePrescriptionData } from "@/types"

export default function VisitDetailPage() {
  const params = useParams()
  const visitId = Number(params.id)
  const [visit, setVisit] = useState<Visit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Diagnosis form state
  const [isDiagnosisDialogOpen, setIsDiagnosisDialogOpen] = useState(false)
  const [isAddingDiagnosis, setIsAddingDiagnosis] = useState(false)
  const [diagnosisForm, setDiagnosisForm] = useState<CreateDiagnosisData>({
    visit_id: visitId,
    diagnosis_code: "",
    description: "",
  })

  // Prescription form state
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false)
  const [isAddingPrescription, setIsAddingPrescription] = useState(false)
  const [prescriptionForm, setPrescriptionForm] = useState<CreatePrescriptionData>({
    visit_id: visitId,
    medication_name: "",
    dosage: "",
    instructions: "",
    duration_days: 7,
  })

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

  const handleAddDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsAddingDiagnosis(true)

    try {
      await apiClient.createDiagnosis(diagnosisForm)
      setSuccess("Diagnosis added successfully!")
      setIsDiagnosisDialogOpen(false)
      setDiagnosisForm({
        visit_id: visitId,
        diagnosis_code: "",
        description: "",
      })
      // Reload visit data
      const updatedVisit = await apiClient.getClinicVisit(visitId)
      setVisit(updatedVisit)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add diagnosis")
    } finally {
      setIsAddingDiagnosis(false)
    }
  }

  const handleAddPrescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsAddingPrescription(true)

    try {
      await apiClient.createPrescription(prescriptionForm)
      setSuccess("Prescription added successfully!")
      setIsPrescriptionDialogOpen(false)
      setPrescriptionForm({
        visit_id: visitId,
        medication_name: "",
        dosage: "",
        instructions: "",
        duration_days: 7,
      })
      // Reload visit data
      const updatedVisit = await apiClient.getClinicVisit(visitId)
      setVisit(updatedVisit)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add prescription")
    } finally {
      setIsAddingPrescription(false)
    }
  }

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
          <Link href="/clinic/visits">
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
          <Link href="/clinic/visits">
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/clinic/visits">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Visits
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visit Details</h1>
            <p className="text-gray-600">
              {visit.patient?.full_name} - {date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDiagnosisDialogOpen} onOpenChange={setIsDiagnosisDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Add Diagnosis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Diagnosis</DialogTitle>
                <DialogDescription>Add a medical diagnosis for this visit.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddDiagnosis} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis-code">Diagnosis Code</Label>
                  <Input
                    id="diagnosis-code"
                    value={diagnosisForm.diagnosis_code}
                    onChange={(e) => setDiagnosisForm({ ...diagnosisForm, diagnosis_code: e.target.value })}
                    placeholder="e.g., Z00.00, J11.1"
                    required
                    disabled={isAddingDiagnosis}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis-description">Description</Label>
                  <Textarea
                    id="diagnosis-description"
                    value={diagnosisForm.description}
                    onChange={(e) => setDiagnosisForm({ ...diagnosisForm, description: e.target.value })}
                    placeholder="Enter diagnosis description"
                    required
                    disabled={isAddingDiagnosis}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={isAddingDiagnosis} className="flex-1 bg-blue-900 hover:bg-blue-800">
                    {isAddingDiagnosis ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Diagnosis
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDiagnosisDialogOpen(false)}
                    disabled={isAddingDiagnosis}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Pill className="mr-2 h-4 w-4" />
                Add Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Prescription</DialogTitle>
                <DialogDescription>Add a medication prescription for this visit.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPrescription} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medication-name">Medication Name</Label>
                  <Input
                    id="medication-name"
                    value={prescriptionForm.medication_name}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication_name: e.target.value })}
                    placeholder="e.g., Acetaminophen, Amoxicillin"
                    required
                    disabled={isAddingPrescription}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={prescriptionForm.dosage}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                    placeholder="e.g., 500mg, 1 tablet"
                    required
                    disabled={isAddingPrescription}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={prescriptionForm.instructions}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
                    placeholder="e.g., Take every 6 hours as needed for fever"
                    required
                    disabled={isAddingPrescription}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="365"
                    value={prescriptionForm.duration_days}
                    onChange={(e) =>
                      setPrescriptionForm({ ...prescriptionForm, duration_days: Number(e.target.value) })
                    }
                    required
                    disabled={isAddingPrescription}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isAddingPrescription}
                    className="flex-1 bg-blue-900 hover:bg-blue-800"
                  >
                    {isAddingPrescription ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Prescription
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPrescriptionDialogOpen(false)}
                    disabled={isAddingPrescription}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Visit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Visit Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Patient</h3>
                <div className="mt-2 flex items-center">
                  <User className="mr-2 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{visit.patient?.full_name}</p>
                    <p className="text-sm text-gray-500">{visit.patient?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

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
                <h3 className="font-medium text-gray-900">Attending Staff</h3>
                <div className="mt-2 flex items-center">
                  <Stethoscope className="mr-2 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{visit.staff?.full_name}</p>
                    <p className="text-sm text-gray-500">{visit.staff?.role}</p>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Diagnoses
              </span>
              <Badge variant="secondary">{visit.diagnoses?.length || 0}</Badge>
            </CardTitle>
            <CardDescription>Medical diagnoses for this visit</CardDescription>
          </CardHeader>
          <CardContent>
            {visit.diagnoses && visit.diagnoses.length > 0 ? (
              <div className="space-y-4">
                {visit.diagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{diagnosis.diagnosis_code}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(diagnosis.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{diagnosis.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No diagnoses recorded yet</p>
                <Button
                  size="sm"
                  className="mt-2 bg-blue-900 hover:bg-blue-800"
                  onClick={() => setIsDiagnosisDialogOpen(true)}
                >
                  Add First Diagnosis
                </Button>
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
              <Badge variant="secondary">{visit.prescriptions?.length || 0}</Badge>
            </CardTitle>
            <CardDescription>Medications prescribed during this visit</CardDescription>
          </CardHeader>
          <CardContent>
            {visit.prescriptions && visit.prescriptions.length > 0 ? (
              <div className="space-y-4">
                {visit.prescriptions.map((prescription) => (
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
            ) : (
              <div className="text-center py-6">
                <Pill className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No prescriptions recorded yet</p>
                <Button
                  size="sm"
                  className="mt-2 bg-blue-900 hover:bg-blue-800"
                  onClick={() => setIsPrescriptionDialogOpen(true)}
                >
                  Add First Prescription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
