import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users, Shield, Globe, Award, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Heart className="mx-auto mb-6 h-16 w-16 text-blue-900" />
          <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">About RuralHealth Hub</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            We&apos;re dedicated to bridging the healthcare gap in rural communities through innovative technology solutions
            that connect patients, clinics, and healthcare providers.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-8 w-8 text-blue-900" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To democratize healthcare access in rural areas by providing comprehensive, user-friendly digital health
                management tools that empower both healthcare providers and patients to deliver and receive better care.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Globe className="h-8 w-8 text-blue-900" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A world where geographic location doesn&apos;t determine healthcare quality. We envision rural communities
                with seamless access to modern healthcare management systems that rival urban medical facilities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Why Choose RuralHealth Hub?</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-900" />
                <CardTitle>Patient-Centered Care</CardTitle>
                <CardDescription>Empowering patients with access to their complete medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Secure medical record access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Prescription tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Visit history management
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-900" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>HIPAA-compliant security protecting sensitive health information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Role-based access control
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Audit trail logging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Award className="h-8 w-8 text-blue-900" />
                <CardTitle>Rural-Optimized</CardTitle>
                <CardDescription>Designed specifically for rural healthcare challenges and constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Low bandwidth optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Mobile-first design
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Offline capabilities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">How It Works</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-900">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Register</h3>
              <p className="text-gray-600">
                Clinics and patients register for secure accounts with role-based access to appropriate features.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-900">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Connect</h3>
              <p className="text-gray-600">
                Healthcare providers document visits, diagnoses, and prescriptions in the comprehensive system.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-900">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Access</h3>
              <p className="text-gray-600">
                Patients gain secure access to their complete medical history, prescriptions, and health records.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16 rounded-lg bg-blue-900 p-8 text-white">
          <h2 className="mb-8 text-center text-3xl font-bold">Making a Difference</h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">50+</div>
              <div className="text-blue-200">Rural Clinics</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">10K+</div>
              <div className="text-blue-200">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">25K+</div>
              <div className="text-blue-200">Medical Records</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Core Values</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Accessibility</h3>
              <p className="text-gray-600">
                Healthcare should be accessible to everyone, regardless of location or economic status.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Privacy</h3>
              <p className="text-gray-600">
                Patient privacy and data security are fundamental rights that we protect rigorously.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to solve rural healthcare challenges with cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
