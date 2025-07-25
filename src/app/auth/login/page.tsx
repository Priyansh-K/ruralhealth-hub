"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MainNav } from "@/components/layout/main-nav"
import { Heart, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginType, setLoginType] = useState<"patient" | "staff" | "medical">("patient")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login, clinicLogin } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (loginType === "patient") {
        await login({ email, password })
      } else {
        // For staff and medical, use clinicLogin with login_type
        await clinicLogin({ email, password, login_type: loginType })
      }

      // Redirect based on user type or provided redirect
      if (redirect) {
        router.push(redirect)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <Heart className="mx-auto mb-4 h-12 w-12 text-blue-900" />
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your RuralHealth Hub account
              <br />
              <span className="text-sm">Choose your role: Patient, Clinic Staff, or Medical Staff</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Type Selector */}
              <div className="space-y-2">
                <Label>Login As</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={loginType === "patient" ? "default" : "outline"}
                    onClick={() => setLoginType("patient")}
                    className="text-sm"
                  >
                    Patient
                  </Button>
                  <Button
                    type="button"
                    variant={loginType === "staff" ? "default" : "outline"}
                    onClick={() => setLoginType("staff")}
                    className="text-sm"
                  >
                    Clinic Staff
                  </Button>
                  <Button
                    type="button"
                    variant={loginType === "medical" ? "default" : "outline"}
                    onClick={() => setLoginType("medical")}
                    className="text-sm"
                  >
                    Medical Staff
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  {loginType === "patient" 
                    ? "Access your patient portal and medical records" 
                    : loginType === "staff"
                    ? "For clinic administrators and administrative staff"
                    : "For doctors and nurses practicing medicine"
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="font-medium text-blue-900 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
