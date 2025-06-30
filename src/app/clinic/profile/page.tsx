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
import { Building2, Save, Edit, AlertCircle, CheckCircle } from "lucide-react"
import type { Clinic } from "@/types"

export default function ClinicProfilePage() {
  const { refreshProfile } = useAuth()
  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_number: "",
    district: "",
  })

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await apiClient.getClinicProfile()
        setClinic(profile)
        setFormData({
          name: profile.name,
          address: profile.address,
          contact_number: profile.contact_number,
          district: profile.district,
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
      const updatedClinic = await apiClient.updateClinicProfile(formData)
      setClinic(updatedClinic)
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
    if (clinic) {
      setFormData({
        name: clinic.name,
        address: clinic.address,
        contact_number: clinic.contact_number,
        district: clinic.district,
      })
    }
    setIsEditing(false)
    setError("")
    setSuccess("")
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
          <h1 className="text-3xl font-bold text-gray-900">Clinic Profile</h1>
          <p className="text-gray-600">Manage your clinic information and settings</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Clinic Information
          </CardTitle>
          <CardDescription>
            {isEditing ? "Update your clinic details below" : "Your clinic information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Clinic Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSaving}
                />
              ) : (
                <p className="text-sm font-medium">{clinic?.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              {isEditing ? (
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  disabled={isSaving}
                />
              ) : (
                <p className="text-sm font-medium">{clinic?.district}</p>
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
              <p className="text-sm font-medium">{clinic?.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Number</Label>
            {isEditing ? (
              <Input
                id="contact"
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                disabled={isSaving}
              />
            ) : (
              <p className="text-sm font-medium">{clinic?.contact_number}</p>
            )}
          </div>

          {clinic && (
            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
              <div className="space-y-2">
                <Label>Created</Label>
                <p className="text-sm text-gray-600">{new Date(clinic.created_at).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Last Updated</Label>
                <p className="text-sm text-gray-600">{new Date(clinic.updated_at).toLocaleDateString()}</p>
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
  )
}
