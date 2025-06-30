"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MainNav } from "@/components/layout/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, AlertCircle, Building2, User } from "lucide-react"
import type { Clinic } from "@/types"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("patient")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loadingClinics, setLoadingClinics] = useState(true)

  // Patient form state
  const [patientForm, setPatientForm] = useState({
    email: "",
    password: "",
    full_name: "",
    gender: "" as "Male" | "Female" | "Other" | "",
    date_of_birth: "",
    address: "",
    phone: "",
    clinic_id: 0,
  })

  // Clinic form state
  const [clinicForm, setClinicForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    contact_number: "",
    district: "",
  })

  const { registerPatient, registerClinic } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  useEffect(() => {
    if (type === "clinic" || type === "patient") {
      setActiveTab(type)
    }
  }, [type])

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

    loadClinics()
  }, [])

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!patientForm.gender) {
      setError("Please select a gender")
      setIsLoading(false)
      return
    }

    try {
      await registerPatient(patientForm as typeof patientForm & { gender: "Male" | "Female" | "Other" })
      router.push("/patient")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await registerClinic(clinicForm)
      router.push("/clinic")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-blue-900" />
            <CardTitle className="text-2xl font-bold text-gray-900">Join RuralHealth Hub</CardTitle>
            <CardDescription>Create your account to get started with rural healthcare management</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Patient</span>
                </TabsTrigger>
                <TabsTrigger value="clinic" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Clinic</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient" className="mt-6">
                <form onSubmit={handlePatientSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="Enter your email"
                        value={patientForm.email}
                        onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <Input
                        id="patient-password"
                        type="password"
                        placeholder="Enter your password"
                        value={patientForm.password}
                        onChange={(e) => setPatientForm({ ...patientForm, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Full Name</Label>
                    <Input
                      id="patient-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={patientForm.full_name}
                      onChange={(e) => setPatientForm({ ...patientForm, full_name: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-gender">Gender</Label>
                      <Select
                        value={patientForm.gender}
                        onValueChange={(value: "Male" | "Female" | "Other") =>
                          setPatientForm({ ...patientForm, gender: value })
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-dob">Date of Birth</Label>
                      <Input
                        id="patient-dob"
                        type="date"
                        value={patientForm.date_of_birth}
                        onChange={(e) => setPatientForm({ ...patientForm, date_of_birth: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-address">Address</Label>
                    <Input
                      id="patient-address"
                      type="text"
                      placeholder="Enter your address"
                      value={patientForm.address}
                      onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">Phone</Label>
                      <Input
                        id="patient-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={patientForm.phone}
                        onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-clinic">Clinic</Label>
                      {loadingClinics ? (
                        <div className="flex items-center justify-center p-2">
                          <LoadingSpinner size="sm" />
                        </div>
                      ) : (
                        <Select
                          value={patientForm.clinic_id.toString()}
                          onValueChange={(value) =>
                            setPatientForm({ ...patientForm, clinic_id: Number.parseInt(value) })
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a clinic" />
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

                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Patient Account"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="clinic" className="mt-6">
                <form onSubmit={handleClinicSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-email">Email</Label>
                      <Input
                        id="clinic-email"
                        type="email"
                        placeholder="Enter clinic email"
                        value={clinicForm.email}
                        onChange={(e) => setClinicForm({ ...clinicForm, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinic-password">Password</Label>
                      <Input
                        id="clinic-password"
                        type="password"
                        placeholder="Enter password"
                        value={clinicForm.password}
                        onChange={(e) => setClinicForm({ ...clinicForm, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinic-name">Clinic Name</Label>
                    <Input
                      id="clinic-name"
                      type="text"
                      placeholder="Enter clinic name"
                      value={clinicForm.name}
                      onChange={(e) => setClinicForm({ ...clinicForm, name: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinic-address">Address</Label>
                    <Input
                      id="clinic-address"
                      type="text"
                      placeholder="Enter clinic address"
                      value={clinicForm.address}
                      onChange={(e) => setClinicForm({ ...clinicForm, address: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-contact">Contact Number</Label>
                      <Input
                        id="clinic-contact"
                        type="tel"
                        placeholder="Enter contact number"
                        value={clinicForm.contact_number}
                        onChange={(e) => setClinicForm({ ...clinicForm, contact_number: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clinic-district">District</Label>
                      <Input
                        id="clinic-district"
                        type="text"
                        placeholder="Enter district"
                        value={clinicForm.district}
                        onChange={(e) => setClinicForm({ ...clinicForm, district: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Clinic Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-blue-900 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
