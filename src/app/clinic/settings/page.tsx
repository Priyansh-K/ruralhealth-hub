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
import { Settings, Lock, Save, AlertCircle, CheckCircle } from "lucide-react"
import type { ChangePasswordData } from "@/types"

export default function ClinicSettingsPage() {
  const { user } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [passwordForm, setPasswordForm] = useState<ChangePasswordData>({
    current_password: "",
    new_password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")

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
        <p className="text-gray-600">Manage your clinic account settings and security</p>
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

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>Your clinic account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Clinic Name</Label>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <p className="text-sm font-medium mt-1">{(user as any)?.name}</p>
            </div>
            <div>
              <Label>Email Address</Label>
              <p className="text-sm font-medium mt-1">Your login email (cannot be changed here)</p>
            </div>
            <div>
              <Label>Account Type</Label>
              <p className="text-sm font-medium mt-1">Clinic Portal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
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

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Security Tips</CardTitle>
          <CardDescription>Keep your clinic account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use a strong, unique password for your clinic account</li>
            <li>• Don&apos;t share your login credentials with unauthorized staff</li>
            <li>• Log out when using shared computers</li>
            <li>• Regularly review your clinic&apos;s patient and staff data</li>
            <li>• Report any suspicious activity immediately</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
