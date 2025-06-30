import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle, Users, Building2 } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: Scale,
      content: [
        "By accessing or using RuralHealth Hub, you agree to be bound by these Terms of Service",
        "If you disagree with any part of these terms, you may not access the service",
        "These terms apply to all visitors, users, and others who access or use the service",
        "We reserve the right to update these terms at any time with notice to users",
      ],
    },
    {
      title: "Description of Service",
      icon: Building2,
      content: [
        "RuralHealth Hub is a healthcare management platform for rural clinics and patients",
        "The service includes patient management, medical records, visit documentation, and reporting",
        "We provide both clinic portal and patient portal access with role-based permissions",
        "The service is provided on a subscription basis with various pricing tiers",
        "We strive for 99.9% uptime but do not guarantee uninterrupted service",
      ],
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "Each user account is for individual use and may not be shared",
        "Healthcare providers must ensure compliance with applicable medical regulations",
        "Patients are responsible for the accuracy of their personal information",
      ],
    },
    {
      title: "Acceptable Use Policy",
      icon: Shield,
      content: [
        "You may only use the service for lawful purposes and in accordance with these terms",
        "You may not use the service to transmit harmful, offensive, or illegal content",
        "Attempting to gain unauthorized access to the system is strictly prohibited",
        "You may not interfere with or disrupt the service or servers",
        "Reverse engineering, decompiling, or attempting to extract source code is forbidden",
        "You may not use the service to compete with or replicate our offerings",
      ],
    },
    {
      title: "Data and Privacy",
      icon: FileText,
      content: [
        "Your use of the service is subject to our Privacy Policy",
        "You retain ownership of your data and medical information",
        "We implement industry-standard security measures to protect your data",
        "You grant us permission to process your data to provide the service",
        "We comply with HIPAA and other applicable healthcare privacy regulations",
        "You may request data export or deletion in accordance with applicable laws",
      ],
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "The service is provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability shall not exceed the amount paid for the service",
        "We are not responsible for decisions made based on information in the system",
        "Healthcare providers remain solely responsible for patient care decisions",
        "We recommend maintaining backup records and following professional standards",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            These terms govern your use of RuralHealth Hub and outline the rights and responsibilities of all parties
            using our healthcare management platform.
          </p>
          <p className="text-sm text-gray-500">Last updated: December 2024 • Effective date: January 1, 2024</p>
        </div>

        {/* Important Notice */}
        <Card className="mb-12 border-l-4 border-l-orange-500 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-900">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Important Healthcare Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 mb-4">
              RuralHealth Hub is a healthcare management tool designed to assist healthcare providers in managing
              patient information and clinical workflows. It is not intended to replace professional medical judgment or
              clinical decision-making.
            </p>
            <ul className="space-y-2 text-orange-800">
              <li>• Healthcare providers remain fully responsible for all patient care decisions</li>
              <li>
                • The system should be used in conjunction with, not as a replacement for, professional medical training
              </li>
              <li>• Always follow applicable medical standards and regulations in your jurisdiction</li>
              <li>• Maintain appropriate backup systems and documentation practices</li>
            </ul>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <section.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Subscription and Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Subscription fees are billed monthly or annually in advance</li>
                <li>• All fees are non-refundable except as required by law</li>
                <li>• We may change pricing with 30 days notice</li>
                <li>• Accounts may be suspended for non-payment</li>
                <li>• You may cancel your subscription at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• RuralHealth Hub and its content are protected by copyright</li>
                <li>• You may not copy, modify, or distribute our software</li>
                <li>• Your data remains your property</li>
                <li>• We grant you a limited license to use the service</li>
                <li>• Trademarks and logos are owned by their respective owners</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Termination */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">By You</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Cancel your subscription at any time</li>
                  <li>• Request data export before termination</li>
                  <li>• Account access ends at subscription period end</li>
                  <li>• Data may be retained per legal requirements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">By Us</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• We may terminate for terms violations</li>
                  <li>• 30 days notice for non-payment</li>
                  <li>• Immediate termination for illegal use</li>
                  <li>• Data export assistance when possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Questions About These Terms</CardTitle>
            <CardDescription>
              If you have any questions about these Terms of Service, please contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Legal Department</h3>
                <p className="text-gray-600 mb-1">Email: legal@ruralhealthhub.com</p>
                <p className="text-gray-600 mb-1">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600">Available Monday-Friday, 9AM-5PM EST</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
                <p className="text-gray-600">
                  RuralHealth Hub Legal Team
                  <br />
                  123 Healthcare Avenue
                  <br />
                  Rural City, RC 12345
                  <br />
                  United States
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
