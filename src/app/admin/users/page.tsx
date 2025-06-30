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
import { Users, Search, MoreHorizontal, UserPlus, Filter, Eye, Ban, CheckCircle } from "lucide-react"

interface User {
  id: number
  email: string
  user_type: "patient" | "clinic" | "admin"
  status: "active" | "inactive" | "suspended"
  created_at: string
  last_login?: string
  profile?: {
    name: string
    phone?: string
  }
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUsers: User[] = [
          {
            id: 1,
            email: "john.doe@example.com",
            user_type: "patient",
            status: "active",
            created_at: "2024-01-15T10:30:00Z",
            last_login: "2024-01-20T14:22:00Z",
            profile: { name: "John Doe", phone: "+1234567890" },
          },
          {
            id: 2,
            email: "rural.clinic@example.com",
            user_type: "clinic",
            status: "active",
            created_at: "2024-01-10T09:15:00Z",
            last_login: "2024-01-20T16:45:00Z",
            profile: { name: "Rural Health Clinic", phone: "+1234567891" },
          },
          {
            id: 3,
            email: "admin@ruralhealthhub.com",
            user_type: "admin",
            status: "active",
            created_at: "2024-01-01T08:00:00Z",
            last_login: "2024-01-20T18:30:00Z",
            profile: { name: "System Administrator" },
          },
          {
            id: 4,
            email: "jane.smith@example.com",
            user_type: "patient",
            status: "inactive",
            created_at: "2024-01-12T11:20:00Z",
            profile: { name: "Jane Smith", phone: "+1234567892" },
          },
          {
            id: 5,
            email: "city.clinic@example.com",
            user_type: "clinic",
            status: "suspended",
            created_at: "2024-01-08T13:45:00Z",
            last_login: "2024-01-18T12:15:00Z",
            profile: { name: "City Medical Center", phone: "+1234567893" },
          },
        ]

        setUsers(mockUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || user.user_type === filterType
    return matchesSearch && matchesFilter
  })

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "patient":
        return "bg-blue-100 text-blue-800"
      case "clinic":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUserAction = async (userId: number, action: string) => {
    // Simulate API call
    console.log(`Performing ${action} on user ${userId}`)
    // In real app, make API call and refresh data
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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage all system users</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Patients</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.user_type === "patient").length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clinics</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.user_type === "clinic").length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter: {filterType === "all" ? "All" : filterType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("all")}>All Users</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("patient")}>Patients</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("clinic")}>Clinics</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("admin")}>Admins</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.profile?.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.profile?.phone && <div className="text-sm text-gray-500">{user.profile.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUserTypeColor(user.user_type)}>{user.user_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{user.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "suspend")}>
                            <Ban className="h-4 w-4 mr-2" />
                            {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedUser.profile?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">User Type</label>
                  <Badge className={getUserTypeColor(selectedUser.user_type)}>{selectedUser.user_type}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-900">{new Date(selectedUser.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Login</label>
                  <p className="text-sm text-gray-900">
                    {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString() : "Never"}
                  </p>
                </div>
              </div>
              {selectedUser.profile?.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedUser.profile.phone}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
