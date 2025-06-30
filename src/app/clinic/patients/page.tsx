"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Users, Search, Eye, UserPlus, AlertCircle, Phone, MapPin } from "lucide-react"
import type { Patient, PaginatedResponse } from "@/types"
import { RegisterPatientModal } from "@/components/modals/register-patient-modal"

export default function ClinicPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const loadPatients = async (page = 1, search = "") => {
    try {
      setIsSearching(!!search)
      const response: PaginatedResponse<Patient> = await apiClient.getClinicPatients(page, 10, search)
      setPatients(response.data)
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load patients")
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  useEffect(() => {
    loadPatients()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    loadPatients(1, searchTerm)
  }

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    loadPatients(newPage, searchTerm)
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage your clinic&apos;s registered patients</p>
        </div>
        <Button onClick={() => setIsRegisterModalOpen(true)} className="bg-blue-900 hover:bg-blue-800">
          <UserPlus className="mr-2 h-4 w-4" />
          Register New Patient
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Patients
          </CardTitle>
          <CardDescription>Search by patient name or phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Enter patient name or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? <LoadingSpinner size="sm" className="mr-2" /> : <Search className="mr-2 h-4 w-4" />}
              Search
            </Button>
            {searchTerm && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setIsLoading(true)
                  loadPatients()
                }}
              >
                Clear
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Registered Patients
            </span>
            <Badge variant="secondary">{pagination.total} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "No patients match your search criteria." : "No patients registered yet."}
              </p>
              <Button onClick={() => setIsRegisterModalOpen(true)} className="bg-blue-900 hover:bg-blue-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Register First Patient
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{patient.full_name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {patient.address.length > 30 ? `${patient.address.substring(0, 30)}...` : patient.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            patient.gender === "Male"
                              ? "default"
                              : patient.gender === "Female"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {patient.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>{calculateAge(patient.date_of_birth)} years</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3" />
                          {patient.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link href={`/clinic/patients/${patient.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                        </Link>
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
                    {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total} patients
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
      <RegisterPatientModal
        open={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
        onSuccess={() => {
          setIsLoading(true)
          loadPatients()
        }}
      />
    </div>
  )
}
