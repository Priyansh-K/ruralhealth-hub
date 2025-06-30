"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Stethoscope, AlertCircle, FileText, Pill } from "lucide-react"
import type { Visit, PaginatedResponse } from "@/types"

export default function PatientVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const loadVisits = async (page = 1) => {
    try {
      const response: PaginatedResponse<Visit> = await apiClient.getPatientVisits(page, 10)
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
    loadVisits()
  }, [])

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    loadVisits(newPage)
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Visits</h1>
        <p className="text-gray-600">View your medical appointment history and visit details</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-purple-700">
              <Calendar className="mr-2 h-5 w-5" />
              Visit History
            </span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {pagination.total} total
            </Badge>
          </CardTitle>
          <CardDescription>Complete record of your medical appointments</CardDescription>
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
              <p className="text-gray-600">You haven&apos;t had any medical visits recorded yet.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Healthcare Provider</TableHead>
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
                              <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                                <FileText className="mr-1 h-3 w-3" />
                                {visit.diagnoses.length} Dx
                              </Badge>
                            )}
                            {visit.prescriptions && visit.prescriptions.length > 0 && (
                              <Badge variant="outline" className="text-xs border-red-200 text-red-700">
                                <Pill className="mr-1 h-3 w-3" />
                                {visit.prescriptions.length} Rx
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link href={`/patient/visits/${visit.id}`}>
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
