"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Save, AlertCircle, CheckCircle } from "lucide-react"
import type { Patient, Staff, CreateVisitData } from "@/types"

export default function NewVisitPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedPatientId = searchParams.get("patient_id")

  const [patients, setPatients] = useState<Patient[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState<CreateVisitData>({
    patient_id: preselectedPatientId ? Number(preselectedPatientId) : 0,
    staff_id: 0,
    visit_date: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    reason: "",
    notes: "",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [patientsResponse, staffResponse] = await Promise.all([
          apiClient.getClinicPatients(1, 100), // Get more patients for selection
          apiClient.getClinicStaff(1, 100), // Get all staff for selection
        ])

        setPatients(patientsResponse.data)
        setStaff(staffResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const visitData = {
        ...formData,
        visit_date: new Date(formData.visit_date!).toISOString(),
      }

      const newVisit = await apiClient.createVisit(visitData)
      setSuccess("Visit created successfully!")

      // Redirect to the visit detail page after a short delay
      setTimeout(() => {
        router.push(`/clinic/visits/${newVisit.id}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create visit")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/clinic/visits">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Visits
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Visit</h1>
          <p className="text-gray-600">Record a new patient visit</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Visit Information
          </CardTitle>
          <CardDescription>Enter the details for the patient visit</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient *</Label>
                <Select
                  value={formData.patient_id.toString()}
                  onValueChange={(value) => setFormData({ ...formData, patient_id: Number(value) })}
                  disabled={isSaving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.full_name} - {patient.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff">Attending Staff *</Label>
                <Select
                  value={formData.staff_id.toString()}
                  onValueChange={(value) => setFormData({ ...formData, staff_id: Number(value) })}
                  disabled={isSaving}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.full_name} - {member.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit-date">Visit Date & Time *</Label>
              <Input
                id="visit-date"
                type="datetime-local"
                value={formData.visit_date}
                onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                required
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit *</Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="e.g., Annual checkup, Flu symptoms, Follow-up"
                required
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Visit Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes about the visit (optional)"
                rows={4}
                disabled={isSaving}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSaving} className="bg-blue-900 hover:bg-blue-800">
                {isSaving ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Visit...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Visit
                  </>
                )}
              </Button>
              <Link href="/clinic/visits">
                <Button type="button" variant="outline" disabled={isSaving}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {patients.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No patients found. You need to register patients before creating visits.{" "}
            <Link href="/auth/register?type=patient" className="font-medium text-blue-900 hover:underline">
              Register a patient
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {staff.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No staff members found. You need to add staff before creating visits.{" "}
            <Link href="/clinic/staff" className="font-medium text-blue-900 hover:underline">
              Add staff members
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
