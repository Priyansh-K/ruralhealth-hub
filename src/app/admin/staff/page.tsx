"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserCheck, Search, MoreHorizontal, Phone, Building2, Filter } from "lucide-react"
import type { Staff } from "@/types"

interface StaffWithClinic extends Omit<Staff, 'clinic'> {
  clinic: {
    id: number
    name: string
    district: string
  }
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffWithClinic[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockStaff: StaffWithClinic[] = [
          {
            id: 1,
            full_name: "Dr. Sarah Johnson",
            role: "Doctor",
            phone: "+1234567890",
            email: "sarah.johnson@clinic.com",
            clinic_id: 1,
            created_at: "2024-01-10T09:15:00Z",
            updated_at: "2024-01-20T16:45:00Z",
            clinic: {
              id: 1,
              name: "Rural Health Clinic",
              district: "North District",
            },
          },
          {
            id: 2,
            full_name: "Nurse Mary Smith",
            role: "Nurse",
            phone: "+1234567891",
            email: "mary.smith@clinic.com",
            clinic_id: 1,
            created_at: "2024-01-12T10:30:00Z",
            updated_at: "2024-01-19T14:20:00Z",
            clinic: {
              id: 1,
              name: "Rural Health Clinic",
              district: "North District",
            },
          },
          {
            id: 3,
            full_name: "Dr. Michael Brown",
            role: "Doctor",
            phone: "+1234567892",
            email: "michael.brown@citymedical.com",
            clinic_id: 2,
            created_at: "2024-01-08T13:45:00Z",
            updated_at: "2024-01-18T11:30:00Z",
            clinic: {
              id: 2,
              name: "City Medical Center",
              district: "Central District",
            },
          },
          {
            id: 4,
            full_name: "Admin Lisa Wilson",
            role: "Administrator",
            phone: "+1234567893",
            email: "lisa.wilson@citymedical.com",
            clinic_id: 2,
            created_at: "2024-01-15T11:20:00Z",
            updated_at: "2024-01-20T09:15:00Z",
            clinic: {
              id: 2,
              name: "City Medical Center",
              district: "Central District",
            },
          },
          {
            id: 5,
            full_name: "Pharmacist John Davis",
            role: "Pharmacist",
            phone: "+1234567894",
            email: "john.davis@community.com",
            clinic_id: 3,
            created_at: "2024-01-18T14:30:00Z",
            updated_at: "2024-01-20T16:45:00Z",
            clinic: {
              id: 3,
              name: "Community Health Center",
              district: "South District",
            },
          },
        ]

        setStaff(mockStaff)
      } catch (error) {
        console.error("Failed to fetch staff:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [])

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Doctor":
        return "bg-blue-100 text-blue-800"
      case "Nurse":
        return "bg-green-100 text-green-800"
      case "Administrator":
        return "bg-purple-100 text-purple-800"
      case "Pharmacist":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const roleStats = {
    total: staff.length,
    doctors: staff.filter((s) => s.role === "Doctor").length,
    nurses: staff.filter((s) => s.role === "Nurse").length,
    administrators: staff.filter((s) => s.role === "Administrator").length,
    pharmacists: staff.filter((s) => s.role === "Pharmacist").length,
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
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage healthcare staff across all clinics</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <UserCheck className="h-4 w-4 mr-2" />
          Add Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">{roleStats.total}</p>
              </div>
              <UserCheck className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doctors</p>
                <p className="text-2xl font-bold">{roleStats.doctors}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nurses</p>
                <p className="text-2xl font-bold">{roleStats.nurses}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold">{roleStats.administrators}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pharmacists</p>
                <p className="text-2xl font-bold">{roleStats.pharmacists}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Role: {roleFilter === "all" ? "All" : roleFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setRoleFilter("all")}>All Roles</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Doctor")}>Doctors</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Nurse")}>Nurses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Administrator")}>Administrators</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Pharmacist")}>Pharmacists</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Clinic</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.full_name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                          {member.clinic.name}
                        </div>
                        <div className="text-sm text-gray-500">{member.clinic.district}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {member.phone}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                          <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No staff members found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
