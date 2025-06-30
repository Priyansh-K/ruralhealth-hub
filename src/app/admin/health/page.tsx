"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"

interface SystemHealth {
  overall_status: "healthy" | "warning" | "critical"
  uptime: string
  last_check: string
  services: {
    api: { status: "online" | "offline" | "degraded"; response_time: number }
    database: { status: "online" | "offline" | "degraded"; connections: number; max_connections: number }
    storage: { status: "online" | "offline" | "degraded"; used_space: string; total_space: string }
    cache: { status: "online" | "offline" | "degraded"; hit_rate: number }
  }
  metrics: {
    cpu_usage: number
    memory_usage: number
    disk_usage: number
    network_latency: number
    active_users: number
    requests_per_minute: number
  }
  recent_incidents: Array<{
    id: number
    title: string
    status: "resolved" | "investigating" | "monitoring"
    created_at: string
    severity: "low" | "medium" | "high" | "critical"
  }>
}

export default function SystemHealth() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchHealthData = async () => {
    try {
      setRefreshing(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockHealth: SystemHealth = {
        overall_status: "healthy",
        uptime: "99.9%",
        last_check: new Date().toISOString(),
        services: {
          api: { status: "online", response_time: 120 },
          database: { status: "online", connections: 45, max_connections: 100 },
          storage: { status: "online", used_space: "2.4 GB", total_space: "10 GB" },
          cache: { status: "online", hit_rate: 94.5 },
        },
        metrics: {
          cpu_usage: 35,
          memory_usage: 68,
          disk_usage: 24,
          network_latency: 45,
          active_users: 89,
          requests_per_minute: 1250,
        },
        recent_incidents: [
          {
            id: 1,
            title: "Database connection timeout",
            status: "resolved",
            created_at: "2024-01-19T14:30:00Z",
            severity: "medium",
          },
          {
            id: 2,
            title: "High CPU usage alert",
            status: "monitoring",
            created_at: "2024-01-20T09:15:00Z",
            severity: "low",
          },
        ],
      }

      setHealth(mockHealth)
    } catch (error) {
      console.error("Failed to fetch health data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
      case "healthy":
        return "text-green-600 bg-green-100"
      case "degraded":
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "offline":
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "monitoring":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (!health) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-2">Monitor system performance and status</p>
        </div>
        <Button onClick={fetchHealthData} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Overall Status */}
      <Alert
        className={`border-l-4 ${health.overall_status === "healthy" ? "border-l-green-500" : health.overall_status === "warning" ? "border-l-yellow-500" : "border-l-red-500"}`}
      >
        <Activity className="h-4 w-4" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <div>
              <strong>System Status: </strong>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(health.overall_status)}`}>
                {health.overall_status.toUpperCase()}
              </span>
              <span className="ml-4 text-sm text-gray-600">
                Uptime: {health.uptime} • Last check: {new Date(health.last_check).toLocaleString()}
              </span>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Services Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-blue-600" />
              API Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={getStatusColor(health.services.api.status)}>{health.services.api.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium">{health.services.api.response_time}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-green-600" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={getStatusColor(health.services.database.status)}>
                  {health.services.database.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connections</span>
                <span className="text-sm font-medium">
                  {health.services.database.connections}/{health.services.database.max_connections}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <HardDrive className="h-4 w-4 mr-2 text-purple-600" />
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={getStatusColor(health.services.storage.status)}>
                  {health.services.storage.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Usage</span>
                <span className="text-sm font-medium">
                  {health.services.storage.used_space} / {health.services.storage.total_space}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wifi className="h-4 w-4 mr-2 text-orange-600" />
              Cache
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={getStatusColor(health.services.cache.status)}>{health.services.cache.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hit Rate</span>
                <span className="text-sm font-medium">{health.services.cache.hit_rate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm text-gray-600">CPU Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${health.metrics.cpu_usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{health.metrics.cpu_usage}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MemoryStick className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm text-gray-600">Memory Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${health.metrics.memory_usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{health.metrics.memory_usage}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm text-gray-600">Disk Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${health.metrics.disk_usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{health.metrics.disk_usage}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="h-4 w-4 mr-2 text-orange-600" />
                  <span className="text-sm text-gray-600">Network Latency</span>
                </div>
                <span className="text-sm font-medium">{health.metrics.network_latency}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-2xl font-bold text-blue-600">{health.metrics.active_users}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Requests/Minute</span>
                <span className="text-2xl font-bold text-green-600">
                  {health.metrics.requests_per_minute.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {health.recent_incidents.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500">No recent incidents</p>
            </div>
          ) : (
            <div className="space-y-3">
              {health.recent_incidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{incident.title}</h4>
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{new Date(incident.created_at).toLocaleString()}</p>
                  </div>
                  <Badge className={getIncidentStatusColor(incident.status)}>{incident.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
