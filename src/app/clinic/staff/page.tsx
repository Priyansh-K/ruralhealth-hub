"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Users, Mail, Phone, AlertCircle, CheckCircle, Plus } from "lucide-react"
import type { Staff, PaginatedResponse, CreateStaffData } from "@/types"

export default function ClinicStaffPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  })
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Add staff form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [addForm, setAddForm] = useState<CreateStaffData>({
    full_name: "",
    role: "Doctor",
    phone: "",
    email: "",
    password: "",
  })

  const loadStaff = async (page = 1, role = "") => {
    try {
      const response: PaginatedResponse<Staff> = await apiClient.getClinicStaff(page, 10, role)
      setStaff(response.data)
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        total_pages: response.total_pages,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load staff")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStaff()
  }, [])

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role)
    setIsLoading(true)
    loadStaff(1, role)
  }

  const handlePageChange = (newPage: number) => {
    setIsLoading(true)
    loadStaff(newPage, selectedRole)
  }

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsAdding(true)

    try {
      await apiClient.createStaff(addForm)
      setSuccess(`${addForm.role} "${addForm.full_name}" has been added successfully! They can now login at /auth/login using their email and password.`)
      setIsAddDialogOpen(false)
      setAddForm({
        full_name: "",
        role: "Doctor",
        phone: "",
        email: "",
        password: "",
      })
      // Reload staff list
      setIsLoading(true)
      loadStaff(pagination.page, selectedRole)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add staff member")
    } finally {
      setIsAdding(false)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Doctor":
        return "default"
      case "Nurse":
        return "secondary"
      case "Administrator":
        return "outline"
      case "Pharmacist":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage your clinic&apos;s healthcare team</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new healthcare provider to your clinic team.
                <br />
                <strong>Note:</strong> Doctors and nurses will be able to login to the medical portal using their email and password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staff-name">Full Name</Label>
                <Input
                  id="staff-name"
                  value={addForm.full_name}
                  onChange={(e) => setAddForm({ ...addForm, full_name: e.target.value })}
                  placeholder="Enter full name"
                  required
                  disabled={isAdding}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-role">Role</Label>
                <Select
                  value={addForm.role}
                  onValueChange={(value: "Doctor" | "Nurse" | "Clinic_Administrator" | "Pharmacist") => {
                    setAddForm({ 
                      ...addForm, 
                      role: value,
                      // Clear password if switching to non-medical role
                      password: (value === "Doctor" || value === "Nurse") ? addForm.password : ""
                    })
                  }}
                  disabled={isAdding}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Clinic_Administrator">Administrator</SelectItem>
                    <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input
                  id="staff-email"
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                  disabled={isAdding}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-phone">Phone</Label>
                <Input
                  id="staff-phone"
                  type="tel"
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  placeholder="Enter phone number"
                  required
                  disabled={isAdding}
                />
              </div>

              {/* Password field - required for doctors and nurses who need login access */}
              {(addForm.role === "Doctor" || addForm.role === "Nurse") && (
                <div className="space-y-2">
                  <Label htmlFor="staff-password">Password</Label>
                  <Input
                    id="staff-password"
                    type="password"
                    value={addForm.password || ""}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                    placeholder="Enter login password"
                    required={addForm.role === "Doctor" || addForm.role === "Nurse"}
                    disabled={isAdding}
                  />
                  <p className="text-sm text-gray-600">
                    Password required for medical staff to access the medical portal
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isAdding} className="flex-1 bg-blue-900 hover:bg-blue-800">
                  {isAdding ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Staff
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isAdding}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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

      {/* Role Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Role</CardTitle>
          <CardDescription>Filter staff members by their role in the clinic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedRole === "" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("")}
            >
              All Roles
            </Button>
            <Button
              variant={selectedRole === "Doctor" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("Doctor")}
            >
              Doctors
            </Button>
            <Button
              variant={selectedRole === "Nurse" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("Nurse")}
            >
              Nurses
            </Button>
            <Button
              variant={selectedRole === "Administrator" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("Administrator")}
            >
              Administrators
            </Button>
            <Button
              variant={selectedRole === "Pharmacist" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("Pharmacist")}
            >
              Pharmacists
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Staff Members
            </span>
            <Badge variant="secondary">{pagination.total} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
              <p className="text-gray-600 mb-4">
                {selectedRole ? `No ${selectedRole.toLowerCase()}s found.` : "No staff members added yet."}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-900 hover:bg-blue-800">
                <UserPlus className="mr-2 h-4 w-4" />
                Add First Staff Member
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {member.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3" />
                          {member.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(member.created_at).toLocaleDateString()}
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
                    {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total} staff
                    members
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
