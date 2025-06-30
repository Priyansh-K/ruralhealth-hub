"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, Search, MoreHorizontal, MapPin, Phone, Users, Calendar } from "lucide-react"
import type { Clinic } from "@/types"

interface ClinicWithStats extends Clinic {
  patient_count: number
  staff_count: number
  visit_count: number
  status: "active" | "inactive" | "pending"
}

export default function ClinicManagement() {
  const [clinics, setClinics] = useState<ClinicWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClinic, setSelectedClinic] = useState<ClinicWithStats | null>(null)

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockClinics: ClinicWithStats[] = [
          {
            id: 1,
            name: "Rural Health Clinic",
            address: "123 Main St, Rural Town, State 12345",
            contact_number: "+1234567890",
            district: "North District",
            created_at: "2024-01-10T09:15:00Z",
            updated_at: "2024-01-20T16:45:00Z",
            patient_count: 245,
            staff_count: 8,
            visit_count: 1234,
            status: "active",
          },
          {
            id: 2,
            name: "City Medical Center",
            address: "456 Oak Ave, City, State 67890",
            contact_number: "+1234567891",
            district: "Central District",
            created_at: "2024-01-08T13:45:00Z",
            updated_at: "2024-01-19T10:30:00Z",
            patient_count: 567,
            staff_count: 15,
            visit_count: 2890,
            status: "active",
          },
          {
            id: 3,
            name: "Community Health Center",
            address: "789 Pine St, Village, State 13579",
            contact_number: "+1234567892",
            district: "South District",
            created_at: "2024-01-15T11:20:00Z",
            updated_at: "2024-01-20T14:15:00Z",
            patient_count: 123,
            staff_count: 5,
            visit_count: 456,
            status: "pending",
          },
          {
            id: 4,
            name: "Mountain View Clinic",
            address: "321 Hill Rd, Mountain View, State 24680",
            contact_number: "+1234567893",
            district: "West District",
            created_at: "2024-01-05T08:30:00Z",
            updated_at: "2024-01-18T12:00:00Z",
            patient_count: 89,
            staff_count: 3,
            visit_count: 234,
            status: "inactive",
          },
        ]

        setClinics(mockClinics)
      } catch (error) {
        console.error("Failed to fetch clinics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClinics()
  }, [])

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinic Management</h1>
          <p className="text-gray-600 mt-2">Manage healthcare facilities</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Building2 className="h-4 w-4 mr-2" />
          Add Clinic
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clinics</p>
                <p className="text-2xl font-bold">{clinics.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{clinics.filter((c) => c.status === "active").length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold">{clinics.reduce((sum, c) => sum + c.patient_count, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold">{clinics.reduce((sum, c) => sum + c.visit_count, 0)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clinics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clinic</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClinics.map((clinic) => (
                  <TableRow key={clinic.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{clinic.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {clinic.address}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {clinic.contact_number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{clinic.district}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-1" />
                        {clinic.patient_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-green-600 mr-1" />
                        {clinic.staff_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-purple-600 mr-1" />
                        {clinic.visit_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(clinic.status)}>{clinic.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedClinic(clinic)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Clinic</DropdownMenuItem>
                          <DropdownMenuItem>View Staff</DropdownMenuItem>
                          <DropdownMenuItem>View Patients</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClinics.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No clinics found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clinic Details Dialog */}
      <Dialog open={!!selectedClinic} onOpenChange={() => setSelectedClinic(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Clinic Details</DialogTitle>
          </DialogHeader>
          {selectedClinic && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Clinic Name</label>
                  <p className="text-sm text-gray-900">{selectedClinic.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">District</label>
                  <p className="text-sm text-gray-900">{selectedClinic.district}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">{selectedClinic.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact Number</label>
                  <p className="text-sm text-gray-900">{selectedClinic.contact_number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge className={getStatusColor(selectedClinic.status)}>{selectedClinic.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedClinic.patient_count}</p>
                    <p className="text-sm text-gray-600">Patients</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedClinic.staff_count}</p>
                    <p className="text-sm text-gray-600">Staff</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedClinic.visit_count}</p>
                    <p className="text-sm text-gray-600">Visits</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-900">{new Date(selectedClinic.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-sm text-gray-900">{new Date(selectedClinic.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
