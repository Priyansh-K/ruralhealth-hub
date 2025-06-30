"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Save, Edit, AlertCircle, CheckCircle, Building2, Phone, MapPin, Calendar } from "lucide-react"
import type { Patient } from "@/types"

export default function PatientProfilePage() {
  const {  refreshProfile } = useAuth()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "" as "Male" | "Female" | "Other" | "",
    date_of_birth: "",
    address: "",
    phone: "",
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await apiClient.getPatientProfile()
        setPatient(profile)
        setFormData({
          full_name: profile.full_name,
          gender: profile.gender,
          date_of_birth: profile.date_of_birth,
          address: profile.address,
          phone: profile.phone,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSave = async () => {
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const updateData = {
        ...formData,
        gender: formData.gender === "" ? undefined : formData.gender
      }
      const updatedPatient = await apiClient.updatePatientProfile(updateData)
      setPatient(updatedPatient)
      setIsEditing(false)
      setSuccess("Profile updated successfully!")
      await refreshProfile()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (patient) {
      setFormData({
        full_name: patient.full_name,
        gender: patient.gender,
        date_of_birth: patient.date_of_birth,
        address: patient.address,
        phone: patient.phone,
      })
    }
    setIsEditing(false)
    setError("")
    setSuccess("")
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and contact details</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-900 hover:bg-blue-800">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        )}
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                {isEditing ? "Update your personal details below" : "Your personal information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={isSaving}
                  />
                ) : (
                  <p className="text-sm font-medium">{patient?.full_name}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  {isEditing ? (
                    <Select
                      value={formData.gender}
                      onValueChange={(value: "Male" | "Female" | "Other") =>
                        setFormData({ ...formData, gender: value })
                      }
                      disabled={isSaving}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium">{patient?.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      disabled={isSaving}
                    />
                  ) : (
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(patient?.date_of_birth || "").toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">{calculateAge(patient?.date_of_birth || "")} years old</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={isSaving}
                  />
                ) : (
                  <p className="text-sm font-medium">{patient?.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSaving}
                  />
                ) : (
                  <p className="text-sm font-medium">{patient?.phone}</p>
                )}
              </div>

              {patient && (
                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Registered</Label>
                    <p className="text-sm text-gray-600">{new Date(patient.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Updated</Label>
                    <p className="text-sm text-gray-600">{new Date(patient.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} disabled={isSaving} className="bg-blue-900 hover:bg-blue-800">
                    {isSaving ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Healthcare Provider Card */}
        <div>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Building2 className="mr-2 h-5 w-5" />
                Healthcare Provider
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patient?.clinic ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-blue-900">{patient.clinic.name}</h3>
                    <div className="mt-2 space-y-2 text-sm text-blue-800">
                      <p className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {patient.clinic.address}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        {patient.clinic.contact_number}
                      </p>
                      <p className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        {patient.clinic.district}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-xs text-blue-600">
                      Registered: {new Date(patient.clinic.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No healthcare provider assigned</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Calendar className="mr-2 h-5 w-5" />
                Health Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Age</span>
                  <span className="font-medium">{calculateAge(patient?.date_of_birth || "")} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Patient Since</span>
                  <span className="font-medium">{new Date(patient?.created_at || "").getFullYear()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gender</span>
                  <span className="font-medium">{patient?.gender}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
