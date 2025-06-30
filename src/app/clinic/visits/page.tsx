"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Calendar, Plus, Eye, User, Stethoscope, AlertCircle, FileText, Pill } from "lucide-react"
import type { Visit, PaginatedResponse } from "@/types"

export default function ClinicVisitsPage() {
  const searchParams = useSearchParams()
  const patientIdParam = searchParams.get("patient_id")
  const [visits, setVisits] = useState<Visit[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const loadVisits = async (page = 1, patientId?: number) => {
    try {
      const response: PaginatedResponse<Visit> = await apiClient.getClinicVisits(page, 10, patientId)
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

  useEffect(() => {
    const patientId = patientIdParam ? Number(patientIdParam) : undefined
    loadVisits(1, patientId)
  }, [patientIdParam])

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    const patientId = patientIdParam ? Number(patientIdParam) : undefined
    loadVisits(newPage, patientId)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{patientIdParam ? "Patient Visits" : "All Visits"}</h1>
          <p className="text-gray-600">
            {patientIdParam ? "Manage visits for the selected patient" : "Manage all patient visits and appointments"}
          </p>
        </div>
        <Link href="/clinic/visits/new">
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="mr-2 h-4 w-4" />
            New Visit
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Visits Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {patientIdParam ? "Patient Visits" : "All Visits"}
            </span>
            <Badge variant="secondary">{pagination.total} total</Badge>
          </CardTitle>
          <CardDescription>
            {patientIdParam ? "All visits for the selected patient" : "Complete record of all patient visits"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : visits.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
              <p className="text-gray-600 mb-4">
                {patientIdParam ? "No visits recorded for this patient yet." : "No visits recorded yet."}
              </p>
              <Link href="/clinic/visits/new">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Record First Visit
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((visit) => {
                    const { date, time } = formatDateTime(visit.visit_date)
                    return (
                      <TableRow key={visit.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visit.patient?.full_name}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {visit.patient?.gender}, {visit.patient?.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{date}</p>
                            <p className="text-sm text-gray-500">{time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{visit.reason}</p>
                            {visit.notes && (
                              <p className="text-sm text-gray-500 mt-1">
                                {visit.notes.length > 50 ? `${visit.notes.substring(0, 50)}...` : visit.notes}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Stethoscope className="mr-2 h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{visit.staff?.full_name}</p>
                              <p className="text-sm text-gray-500">{visit.staff?.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {visit.diagnoses && visit.diagnoses.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <FileText className="mr-1 h-3 w-3" />
                                {visit.diagnoses.length} Dx
                              </Badge>
                            )}
                            {visit.prescriptions && visit.prescriptions.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <Pill className="mr-1 h-3 w-3" />
                                {visit.prescriptions.length} Rx
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/clinic/visits/${visit.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {(pagination.page - 1) * pagination.per_page + 1} to{" "}
                    {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total} visits
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.total_pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
