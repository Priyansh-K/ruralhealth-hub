"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, AlertTriangle, CheckCircle, Mail, Bell, Shield, Database } from "lucide-react"

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure system-wide settings and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {saved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="RuralHealth Hub" />
                </div>
                <div>
                  <Label htmlFor="system-version">Version</Label>
                  <Input id="system-version" defaultValue="1.0.0" disabled />
                </div>
                <div>
                  <Label htmlFor="admin-email">Administrator Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@ruralhealthhub.com" />
                </div>
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@ruralhealthhub.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="max-users">Maximum Users</Label>
                  <Input id="max-users" type="number" defaultValue="10000" />
                </div>
                <div>
                  <Label htmlFor="max-clinics">Maximum Clinics</Label>
                  <Input id="max-clinics" type="number" defaultValue="1000" />
                </div>
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="file-upload-limit">File Upload Limit (MB)</Label>
                  <Input id="file-upload-limit" type="number" defaultValue="10" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>
                <div>
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" defaultValue="noreply@ruralhealthhub.com" />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-enabled" defaultChecked />
                  <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="user-registration" defaultChecked />
                  <Label htmlFor="user-registration">New User Registrations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="system-alerts" defaultChecked />
                  <Label htmlFor="system-alerts">System Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="security-alerts" defaultChecked />
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-alerts" defaultChecked />
                  <Label htmlFor="maintenance-alerts">Maintenance Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="daily-reports" />
                  <Label htmlFor="daily-reports">Daily Reports</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="weekly-reports" defaultChecked />
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input id="password-min-length" type="number" defaultValue="8" />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                  <Input id="lockout-duration" type="number" defaultValue="15" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-2fa" />
                  <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="password-complexity" defaultChecked />
                  <Label htmlFor="password-complexity">Enforce Password Complexity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="session-security" defaultChecked />
                  <Label htmlFor="session-security">Enhanced Session Security</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="allowed-domains">Allowed Email Domains</Label>
                  <Textarea id="allowed-domains" placeholder="example.com&#10;healthcare.org&#10;clinic.net" rows={4} />
                </div>
                <div>
                  <Label htmlFor="blocked-ips">Blocked IP Addresses</Label>
                  <Textarea id="blocked-ips" placeholder="192.168.1.100&#10;10.0.0.50" rows={3} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ip-whitelist" />
                  <Label htmlFor="ip-whitelist">Enable IP Whitelist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="geo-blocking" />
                  <Label htmlFor="geo-blocking">Enable Geographic Blocking</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Database Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>
                <div>
                  <Label htmlFor="db-port">Database Port</Label>
                  <Input id="db-port" type="number" defaultValue="5432" />
                </div>
                <div>
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" defaultValue="ruralhealthhub" />
                </div>
                <div>
                  <Label htmlFor="max-connections">Max Connections</Label>
                  <Input id="max-connections" type="number" defaultValue="100" />
                </div>
                <div>
                  <Label htmlFor="connection-timeout">Connection Timeout (seconds)</Label>
                  <Input id="connection-timeout" type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-backup" defaultChecked />
                  <Label htmlFor="auto-backup">Enable Automatic Backups</Label>
                </div>
                <div>
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                  <Input id="backup-retention" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="backup-location">Backup Location</Label>
                  <Input id="backup-location" defaultValue="/var/backups/ruralhealthhub" />
                </div>
                <Button className="w-full">Create Manual Backup</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="space-y-6">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Maintenance operations can affect system availability. Schedule during low-usage periods.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Mode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                  </div>
                  <div>
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      defaultValue="System is currently under maintenance. Please try again later."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-end">Estimated End Time</Label>
                    <Input id="maintenance-end" type="datetime-local" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Cleanup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-cleanup" defaultChecked />
                    <Label htmlFor="auto-cleanup">Enable Automatic Cleanup</Label>
                  </div>
                  <div>
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input id="log-retention" type="number" defaultValue="90" />
                  </div>
                  <div>
                    <Label htmlFor="temp-file-cleanup">Temp File Cleanup (hours)</Label>
                    <Input id="temp-file-cleanup" type="number" defaultValue="24" />
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-transparent" variant="outline">
                      Clear System Cache
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      Clean Temporary Files
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      Optimize Database
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
