"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react"
import type { Clinic, RegisterPatientData } from "@/types"

interface RegisterPatientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function RegisterPatientModal({ open, onOpenChange, onSuccess }: RegisterPatientModalProps) {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loadingClinics, setLoadingClinics] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState<RegisterPatientData>({
    email: "",
    password: "",
    full_name: "",
    gender: "Male",
    date_of_birth: "",
    address: "",
    phone: "",
    clinic_id: 0,
  })

  useEffect(() => {
    const loadClinics = async () => {
      try {
        const response = await apiClient.getClinics(1, 50)
        setClinics(response.data)
      } catch (err) {
        console.error("Failed to load clinics:", err)
      } finally {
        setLoadingClinics(false)
      }
    }

    if (open) {
      loadClinics()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsRegistering(true)

    try {
      await apiClient.registerPatient(formData)
      setSuccess("Patient registered successfully!")

      // Reset form
      setFormData({
        email: "",
        password: "",
        full_name: "",
        gender: "Male",
        date_of_birth: "",
        address: "",
        phone: "",
        clinic_id: 0,
      })

      // Close modal after success
      setTimeout(() => {
        onOpenChange(false)
        onSuccess?.()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsRegistering(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isRegistering) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setError("")
        setSuccess("")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-blue-600" />
            Register New Patient
          </DialogTitle>
          <DialogDescription>
            Add a new patient to your clinic&apos;s system. They will receive login credentials to access their portal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patient-email">Email Address *</Label>
              <Input
                id="patient-email"
                type="email"
                placeholder="patient@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isRegistering}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-password">Password *</Label>
              <Input
                id="patient-password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isRegistering}
                minLength={8}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-name">Full Name *</Label>
            <Input
              id="patient-name"
              type="text"
              placeholder="Enter patient's full name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
              disabled={isRegistering}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patient-gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: "Male" | "Female" | "Other") => setFormData({ ...formData, gender: value })}
                disabled={isRegistering}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-dob">Date of Birth *</Label>
              <Input
                id="patient-dob"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                required
                disabled={isRegistering}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-address">Address *</Label>
            <Input
              id="patient-address"
              type="text"
              placeholder="Enter patient's address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              disabled={isRegistering}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patient-phone">Phone Number *</Label>
              <Input
                id="patient-phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                disabled={isRegistering}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-clinic">Clinic *</Label>
              {loadingClinics ? (
                <div className="flex items-center justify-center p-2">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <Select
                  value={formData.clinic_id.toString()}
                  onValueChange={(value) => setFormData({ ...formData, clinic_id: Number.parseInt(value) })}
                  disabled={isRegistering}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select clinic" />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic.id} value={clinic.id.toString()}>
                        {clinic.name} - {clinic.district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isRegistering} className="flex-1 bg-blue-900 hover:bg-blue-800">
              {isRegistering ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Registering Patient...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register Patient
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isRegistering}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
