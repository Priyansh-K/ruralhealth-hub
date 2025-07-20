"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Eye } from "lucide-react"
import Link from "next/link"
import type { Visit, Patient, PaginatedResponse, CreateVisitData } from "@/types"

export default function MedicalVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [selectedPatientId, setSelectedPatientId] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Create visit form state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createForm, setCreateForm] = useState<CreateVisitData>({
    patient_id: 0,
    staff_id: 0, // Will be set automatically by backend
    reason: "",
    notes: "",
  })

  const loadVisits = async (page = 1, patientId?: number) => {
    try {
      setIsLoading(true)
      const response: PaginatedResponse<Visit> = await apiClient.getMedicalVisits(page, 10, patientId)
      setVisits(response.data)
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load visits")
    } finally {
      setIsLoading(false)
    }
  }

  const loadPatients = async () => {
    try {
      const response = await apiClient.getMedicalPatients(1, 100) // Get more patients for selection
      setPatients(response.data)
    } catch (err) {
      console.error("Failed to load patients:", err)
    }
  }

  useEffect(() => {
    loadVisits()
    loadPatients()
  }, [])

  const handlePatientFilter = (patientId: number) => {
    setSelectedPatientId(patientId)
    loadVisits(1, patientId || undefined)
  }

  const handlePageChange = (newPage: number) => {
    loadVisits(newPage, selectedPatientId || undefined)
  }

  const handleCreateVisit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsCreating(true)

    try {
      await apiClient.createMedicalVisit(createForm)
      setSuccess("Visit created successfully!")
      setIsCreateDialogOpen(false)
      setCreateForm({
        patient_id: 0,
        staff_id: 0,
        reason: "",
        notes: "",
      })
      // Reload visits
      loadVisits(pagination.page, selectedPatientId || undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create visit")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Visits</h1>
            <p className="text-gray-700 mt-1">Create and manage patient visits</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                New Visit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Visit</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateVisit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visit-patient">Patient *</Label>
                <Select
                  value={createForm.patient_id.toString()}
                  onValueChange={(value) => setCreateForm({ ...createForm, patient_id: Number(value) })}
                  disabled={isCreating}
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
                <Label htmlFor="visit-reason">Reason for Visit *</Label>
                <Input
                  id="visit-reason"
                  value={createForm.reason}
                  onChange={(e) => setCreateForm({ ...createForm, reason: e.target.value })}
                  placeholder="Enter reason for visit"
                  required
                  disabled={isCreating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-notes">Notes</Label>
                <Textarea
                  id="visit-notes"
                  value={createForm.notes || ""}
                  onChange={(e) => setCreateForm({ ...createForm, notes: e.target.value })}
                  placeholder="Additional notes about the visit"
                  disabled={isCreating}
                  rows={3}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating || !createForm.patient_id || !createForm.reason}>
                  {isCreating ? <LoadingSpinner size="sm" /> : "Create Visit"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      {/* Filter by Patient */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                value={selectedPatientId.toString()}
                onValueChange={(value) => handlePatientFilter(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All patients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All patients</SelectItem>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {pagination.total} visits
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Visits Table */}
      <Card>
        <CardHeader>
          <CardTitle>Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : visits.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
              <p className="text-gray-600 mb-4">
                {selectedPatientId ? "No visits found for this patient." : "No visits recorded yet."}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create First Visit
              </Button>
            </div>
          ) : (
            <>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visit.patient?.full_name}</p>
                            <p className="text-sm text-gray-500">
                              {visit.patient?.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {new Date(visit.visit_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(visit.visit_date).toLocaleTimeString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{visit.reason}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{visit.staff?.full_name}</p>
                          <p className="text-xs text-gray-500">{visit.staff?.role}</p>
                        </TableCell>
                        <TableCell>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                          >
                            <Link href={`/portal/medical/visits/${visit.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.total_pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.total_pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
