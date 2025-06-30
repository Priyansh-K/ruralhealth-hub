"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Pill, Calendar, Stethoscope, Clock, AlertCircle } from "lucide-react"
import type { Prescription, PaginatedResponse } from "@/types"

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const loadPrescriptions = async (page = 1) => {
    try {
      const response: PaginatedResponse<Prescription> = await apiClient.getPatientPrescriptions(page, 10)
      setPrescriptions(response.data)
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prescriptions")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPrescriptions()
  }, [])

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    loadPrescriptions(newPage)
  }

  const getDurationBadgeColor = (days: number) => {
    if (days <= 7) return "bg-green-100 text-green-700 border-green-200"
    if (days <= 30) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  const isRecentPrescription = (createdAt: string) => {
    const prescriptionDate = new Date(createdAt)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return prescriptionDate > thirtyDaysAgo
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
        <p className="text-gray-600">View your complete medication history and prescriptions</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-red-700">
              <Pill className="mr-2 h-5 w-5" />
              Medication History
            </span>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {pagination.total} total
            </Badge>
          </CardTitle>
          <CardDescription>Complete record of your prescribed medications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="text-center py-8">
              <Pill className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
              <p className="text-gray-600">You don&apos;t have any prescriptions recorded yet.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage & Instructions</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Healthcare Provider</TableHead>
                    <TableHead>Visit Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-red-700">{prescription.medication_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{prescription.dosage}</p>
                          <p className="text-sm text-gray-600">{prescription.instructions}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getDurationBadgeColor(prescription.duration_days)}>
                          <Clock className="mr-1 h-3 w-3" />
                          {prescription.duration_days} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Stethoscope className="mr-2 h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{prescription.visit?.staff?.full_name}</p>
                            <p className="text-sm text-gray-500">{prescription.visit?.staff?.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span>
                            {prescription.visit?.visit_date
                              ? new Date(prescription.visit.visit_date).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {isRecentPrescription(prescription.created_at) ? (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Recent</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-600">
                            Past
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {(pagination.page - 1) * pagination.per_page + 1} to{" "}
                    {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total}{" "}
                    prescriptions
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
