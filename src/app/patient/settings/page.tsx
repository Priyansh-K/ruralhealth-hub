"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { apiClient } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Settings, Lock, Save, AlertCircle, CheckCircle, User, Shield } from "lucide-react"
import type { ChangePasswordData, Patient } from "@/types"

export default function PatientSettingsPage() {
  const { user } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [passwordForm, setPasswordForm] = useState<ChangePasswordData>({
    current_password: "",
    new_password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")

  const patient = user as Patient

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (passwordForm.new_password !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordForm.new_password.length < 8) {
      setError("New password must be at least 8 characters long")
      return
    }

    setIsChangingPassword(true)

    try {
      await apiClient.changePassword(passwordForm)
      setSuccess("Password changed successfully!")
      setPasswordForm({
        current_password: "",
        new_password: "",
      })
      setConfirmPassword("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and security preferences</p>
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
        {/* Account Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Your patient account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="text-sm font-medium mt-1">{patient?.full_name}</p>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <p className="text-sm font-medium mt-1">Your login email (cannot be changed here)</p>
                </div>
                <div>
                  <Label>Account Type</Label>
                  <p className="text-sm font-medium mt-1">Patient Portal</p>
                </div>
                <div>
                  <Label>Healthcare Provider</Label>
                  <p className="text-sm font-medium mt-1">{patient?.clinic?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password for security</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    placeholder="Enter your current password"
                    required
                    disabled={isChangingPassword}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    placeholder="Enter your new password"
                    required
                    disabled={isChangingPassword}
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    disabled={isChangingPassword}
                  />
                </div>

                <Button type="submit" disabled={isChangingPassword} className="bg-blue-900 hover:bg-blue-800">
                  {isChangingPassword ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Change Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Security & Privacy */}
        <div className="space-y-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-900">Data Protection</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your medical data is encrypted and securely stored in compliance with healthcare privacy
                    regulations.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Access Control</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Only authorized healthcare providers at your clinic can access your medical records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Tips</CardTitle>
              <CardDescription>Keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use a strong, unique password</li>
                <li>• Don&apos;t share your login credentials</li>
                <li>• Log out when using shared devices</li>
                <li>• Review your medical records regularly</li>
                <li>• Report any suspicious activity</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Settings className="mr-2 h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-medium">{new Date(patient?.created_at || "").getFullYear()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-medium">{new Date(patient?.updated_at || "").toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
