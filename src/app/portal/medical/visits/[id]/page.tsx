"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, User, FileText, Pill, AlertCircle, Plus } from "lucide-react"
import type { Visit, CreateDiagnosisData, CreatePrescriptionData } from "@/types"

export default function MedicalVisitDetailPage() {
  const params = useParams()
  const visitId = Number(params.id)
  const { userType } = useAuth()
  const [visit, setVisit] = useState<Visit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

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
    duration_days: 7,
    instructions: "",
  })

  useEffect(() => {
    const loadVisit = async () => {
      try {
        const visitData = await apiClient.getMedicalVisit(visitId)
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
    setIsAddingDiagnosis(true)

    try {
      await apiClient.createMedicalDiagnosis(diagnosisForm)
      // Reload visit data to show new diagnosis
      const updatedVisit = await apiClient.getMedicalVisit(visitId)
      setVisit(updatedVisit)
      setIsDiagnosisDialogOpen(false)
      setDiagnosisForm({
        visit_id: visitId,
        diagnosis_code: "",
        description: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add diagnosis")
    } finally {
      setIsAddingDiagnosis(false)
    }
  }

  const handleAddPrescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingPrescription(true)

    try {
      await apiClient.createMedicalPrescription(prescriptionForm)
      // Reload visit data to show new prescription
      const updatedVisit = await apiClient.getMedicalVisit(visitId)
      setVisit(updatedVisit)
      setIsPrescriptionDialogOpen(false)
      setPrescriptionForm({
        visit_id: visitId,
        medication_name: "",
        dosage: "",
        duration_days: 7,
        instructions: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add prescription")
    } finally {
      setIsAddingPrescription(false)
    }
  }

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
            <Link href="/portal/medical/visits">
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

  const canCreateDiagnoses = userType === "doctor"
  const canCreatePrescriptions = userType === "doctor"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hover:bg-red-200">
              <Link href="/portal/medical/visits">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Visits
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visit Details</h1>
              <p className="text-gray-700 mt-1">Medical assessment and treatment</p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm border-red-300 text-red-700 bg-red-50">
            Visit #{visit.id}
          </Badge>
        </div>
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
                <Link href={`/portal/medical/patients/${visit.patient?.id}`}>
                  View Patient Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Diagnoses
              </span>
              {canCreateDiagnoses && (
                <Dialog open={isDiagnosisDialogOpen} onOpenChange={setIsDiagnosisDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Diagnosis
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Diagnosis</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddDiagnosis} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis-code">Diagnosis Code</Label>
                        <Input
                          id="diagnosis-code"
                          value={diagnosisForm.diagnosis_code}
                          onChange={(e) => setDiagnosisForm({ ...diagnosisForm, diagnosis_code: e.target.value })}
                          placeholder="e.g., ICD-10 code"
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
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDiagnosisDialogOpen(false)}
                          disabled={isAddingDiagnosis}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isAddingDiagnosis}>
                          {isAddingDiagnosis ? "Adding..." : "Add Diagnosis"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardTitle>
            <CardDescription>
              Medical diagnoses for this visit
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!visit.diagnoses || visit.diagnoses.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Diagnoses</h3>
                <p className="text-gray-600">No medical diagnoses recorded for this visit yet.</p>
                {canCreateDiagnoses && (
                  <Button
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => setIsDiagnosisDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Diagnosis
                  </Button>
                )}
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
              {canCreatePrescriptions && (
                <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Prescription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Prescription</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddPrescription} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="medication-name">Medication Name</Label>
                        <Input
                          id="medication-name"
                          value={prescriptionForm.medication_name}
                          onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication_name: e.target.value })}
                          placeholder="e.g., Amoxicillin"
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
                          placeholder="e.g., 500mg twice daily"
                          required
                          disabled={isAddingPrescription}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (days)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={prescriptionForm.duration_days}
                          onChange={(e) => setPrescriptionForm({ ...prescriptionForm, duration_days: parseInt(e.target.value) })}
                          min="1"
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
                          placeholder="e.g., Take with food, avoid alcohol"
                          required
                          disabled={isAddingPrescription}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsPrescriptionDialogOpen(false)}
                          disabled={isAddingPrescription}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isAddingPrescription}>
                          {isAddingPrescription ? "Adding..." : "Add Prescription"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardTitle>
            <CardDescription>
              Medications prescribed for this visit
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!visit.prescriptions || visit.prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <Pill className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions</h3>
                <p className="text-gray-600">No medications prescribed for this visit yet.</p>
                {canCreatePrescriptions && (
                  <Button
                    className="mt-4 bg-orange-600 hover:bg-orange-700"
                    onClick={() => setIsPrescriptionDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Prescription
                  </Button>
                )}
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
