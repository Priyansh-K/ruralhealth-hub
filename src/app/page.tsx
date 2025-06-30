import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/layout/main-nav"
import { Heart, Users, Building2, Calendar, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <Heart className="h-16 w-16 text-blue-900" />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Rural Healthcare
            <span className="text-blue-900"> Management</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
            Connecting rural communities with comprehensive healthcare management. Streamline clinic operations and
            empower patients with digital health records.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Comprehensive Healthcare Solutions</h2>
          <p className="text-lg text-gray-600">Everything you need to manage rural healthcare effectively</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Building2 className="h-8 w-8 text-blue-900" />
              <CardTitle>Clinic Management</CardTitle>
              <CardDescription>
                Complete clinic operations including staff management, patient registration, and visit documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Staff and patient management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Visit documentation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Dashboard analytics
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-900" />
              <CardTitle>Patient Portal</CardTitle>
              <CardDescription>
                Secure patient access to medical records, visit history, and prescription management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Medical history access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Prescription tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Profile management
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Calendar className="h-8 w-8 text-blue-900" />
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>
                Comprehensive medical record management with diagnoses, prescriptions, and visit notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  ICD-10 diagnosis coding
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Prescription management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Visit documentation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-900" />
              <CardTitle>Security & Privacy</CardTitle>
              <CardDescription>
                HIPAA-compliant security with role-based access control and data encryption.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  JWT authentication
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Role-based access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Data encryption
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Clock className="h-8 w-8 text-blue-900" />
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Instant updates across all platforms ensuring everyone has the latest information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Live dashboard updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Instant notifications
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Synchronized data
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Heart className="h-8 w-8 text-blue-900" />
              <CardTitle>Rural Focus</CardTitle>
              <CardDescription>
                Specifically designed for rural healthcare challenges with offline capabilities and simple workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Simple, intuitive design
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Mobile-friendly interface
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Low bandwidth optimized
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Rural Healthcare?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Join clinics and patients already using RuralHealth Hub to improve healthcare delivery.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?type=clinic">
              <Button size="lg" variant="secondary">
                Register Clinic
              </Button>
            </Link>
            <Link href="/auth/register?type=patient">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                Register Patient
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-900" />
                <span className="text-lg font-bold text-blue-900">RuralHealth Hub</span>
              </div>
              <p className="text-sm text-gray-600">
                Connecting rural communities with comprehensive healthcare management solutions.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-blue-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-blue-900">
                    Features
                  </Link>
                </li>
               
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
               
                <li>
                  <Link href="/contact" className="hover:text-blue-900">
                    Contact
                  </Link>
                </li>
                
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/privacy" className="hover:text-blue-900">
                    Privacy Policy
                  </Link>
                </li>
                
                {/* <li>
                  <Link href="/security" className="hover:text-blue-900">
                    Security
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} RuralHealth Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
