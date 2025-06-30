"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { FileText, Calendar, Stethoscope, AlertCircle } from "lucide-react"
import type { Diagnosis, PaginatedResponse } from "@/types"

export default function PatientDiagnosesPage() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDiagnoses = async (page = 1) => {
    try {
      const response: PaginatedResponse<Diagnosis> = await apiClient.getPatientDiagnoses(page, 10)
      setDiagnoses(response.data)
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load diagnoses")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDiagnoses()
  }, [])

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    loadDiagnoses(newPage)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Diagnoses</h1>
        <p className="text-gray-600">View your complete medical diagnosis history</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-teal-700">
              <FileText className="mr-2 h-5 w-5" />
              Medical Diagnoses
            </span>
            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
              {pagination.total} total
            </Badge>
          </CardTitle>
          <CardDescription>Complete record of your medical diagnoses</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : diagnoses.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No diagnoses found</h3>
              <p className="text-gray-600">You don&apos;t have any medical diagnoses recorded yet.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Diagnosis Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Healthcare Provider</TableHead>
                    <TableHead>Visit Date</TableHead>
                    <TableHead>Recorded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {diagnoses.map((diagnosis) => (
                    <TableRow key={diagnosis.id}>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-teal-700 border-teal-200 bg-teal-50">
                          {diagnosis.diagnosis_code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{diagnosis.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Stethoscope className="mr-2 h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{diagnosis.visit?.staff?.full_name}</p>
                            <p className="text-sm text-gray-500">{diagnosis.visit?.staff?.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span>
                            {diagnosis.visit?.visit_date
                              ? new Date(diagnosis.visit.visit_date).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(diagnosis.created_at).toLocaleDateString()}
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
                    {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total} diagnoses
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
