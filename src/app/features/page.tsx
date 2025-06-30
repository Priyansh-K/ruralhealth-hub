import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Building2,
  Users,
  Calendar,
  FileText,
  Pill,
  Shield,
  CheckCircle,
  Smartphone,
  Database,
  BarChart3,
  UserCheck,
  Stethoscope,
  Activity,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      category: "Clinic Management",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      items: [
        {
          title: "Staff Management",
          description:
            "Add and manage healthcare providers including doctors, nurses, administrators, and pharmacists.",
          icon: UserCheck,
        },
        {
          title: "Patient Registration",
          description: "Register new patients with comprehensive demographic and contact information.",
          icon: Users,
        },
        {
          title: "Visit Documentation",
          description: "Record patient visits with detailed notes, reasons, and healthcare provider assignments.",
          icon: Calendar,
        },
        {
          title: "Dashboard Analytics",
          description: "Real-time insights into clinic operations, patient statistics, and monthly trends.",
          icon: BarChart3,
        },
      ],
    },
    {
      category: "Medical Records",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      items: [
        {
          title: "ICD-10 Diagnosis Coding",
          description: "Standardized medical diagnosis recording with ICD-10 codes and detailed descriptions.",
          icon: FileText,
        },
        {
          title: "Prescription Management",
          description: "Complete medication tracking with dosage, instructions, and duration management.",
          icon: Pill,
        },
        {
          title: "Visit History",
          description: "Comprehensive patient visit history with searchable records and detailed documentation.",
          icon: Activity,
        },
        {
          title: "Medical Documentation",
          description: "Secure storage and retrieval of all patient medical records and clinical notes.",
          icon: Database,
        },
      ],
    },
    {
      category: "Patient Portal",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      items: [
        {
          title: "Personal Health Records",
          description: "Patients can access their complete medical history, diagnoses, and prescriptions.",
          icon: Heart,
        },
        {
          title: "Visit Tracking",
          description: "View appointment history with detailed visit information and healthcare provider notes.",
          icon: Calendar,
        },
        {
          title: "Prescription Access",
          description: "Track current and past medications with dosage information and instructions.",
          icon: Pill,
        },
        {
          title: "Profile Management",
          description: "Update personal information, contact details, and account settings securely.",
          icon: Users,
        },
      ],
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      items: [
        {
          title: "HIPAA Compliance",
          description: "Healthcare data protection with industry-standard security measures and encryption.",
          icon: Shield,
        },
        {
          title: "Role-Based Access",
          description: "Secure access control ensuring users only see appropriate information for their role.",
          icon: UserCheck,
        },
        {
          title: "Data Encryption",
          description: "End-to-end encryption for all sensitive medical data and patient information.",
          icon: Database,
        },
        {
          title: "Audit Trails",
          description: "Complete logging of all system access and data modifications for compliance.",
          icon: Activity,
        },
      ],
    },
    {
      category: "Rural Healthcare Focus",
      icon: Stethoscope,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      items: [
        {
          title: "Offline Capabilities",
          description: "Continue working even with limited internet connectivity in remote areas.",
          icon: Smartphone,
        },
        {
          title: "Low Bandwidth Optimization",
          description: "Optimized for rural internet connections with efficient data usage.",
          icon: Activity,
        },
        {
          title: "Simple Workflows",
          description: "Intuitive design focused on ease of use for healthcare providers of all technical levels.",
          icon: CheckCircle,
        },
        {
          title: "Mobile-First Design",
          description: "Responsive interface that works seamlessly on tablets and mobile devices.",
          icon: Smartphone,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Comprehensive Healthcare Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the powerful features designed specifically for rural healthcare management, from clinic
            operations to patient care and everything in between.
          </p>
        </div>

        {/* Features by Category */}
        <div className="space-y-16">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="text-center mb-12">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.bgColor} mb-4`}
                >
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.category}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {category.items.map((feature, featureIndex) => (
                  <Card
                    key={featureIndex}
                    className={`border-l-4 ${category.borderColor} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className={`p-2 rounded-lg ${category.bgColor} mr-3`}>
                          <feature.icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-lg text-gray-600">Built with modern technology for reliability and performance</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Modern Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• RESTful API design</li>
                  <li>• PostgreSQL database</li>
                  <li>• JWT authentication</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• End-to-end encryption</li>
                  <li>• HIPAA compliance</li>
                  <li>• Role-based permissions</li>
                  <li>• Secure password policies</li>
                  <li>• Audit logging</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Mobile-responsive design</li>
                  <li>• Optimized for low bandwidth</li>
                  <li>• Fast loading times</li>
                  <li>• Offline capabilities</li>
                  <li>• Real-time updates</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Practice?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join healthcare providers already using RuralHealth Hub to improve patient care and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register?type=clinic"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
