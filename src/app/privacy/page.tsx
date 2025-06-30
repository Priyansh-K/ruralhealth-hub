import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Medical information entered by healthcare providers (diagnoses, prescriptions, visit notes)",
        "Usage data to improve our services (login times, feature usage, system performance)",
        "Technical information (IP address, browser type, device information) for security purposes",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        "Provide healthcare management services to clinics and patients",
        "Enable secure communication between healthcare providers and patients",
        "Maintain accurate medical records and facilitate continuity of care",
        "Improve our platform based on usage patterns and feedback",
        "Ensure system security and prevent unauthorized access",
        "Comply with healthcare regulations and legal requirements",
      ],
    },
    {
      title: "Information Sharing",
      icon: Eye,
      content: [
        "We do not sell, rent, or trade your personal or medical information",
        "Medical information is only shared with authorized healthcare providers within your clinic",
        "We may share anonymized, aggregated data for research purposes with your consent",
        "Information may be disclosed if required by law or to protect safety",
        "Third-party service providers may access data only as necessary to provide services",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "All data is encrypted in transit and at rest using industry-standard encryption",
        "Multi-factor authentication available for enhanced account security",
        "Regular security audits and penetration testing",
        "HIPAA-compliant infrastructure and data handling procedures",
        "Automatic data backups with secure, geographically distributed storage",
        "Employee access controls and regular security training",
      ],
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access your personal information and medical records",
        "Request corrections to inaccurate information",
        "Request deletion of your account and associated data",
        "Opt out of non-essential communications",
        "Request a copy of your data in a portable format",
        "File complaints with relevant privacy authorities",
      ],
    },
    {
      title: "Data Retention",
      icon: FileText,
      content: [
        "Medical records are retained according to applicable healthcare regulations",
        "Personal account information is kept while your account is active",
        "Deleted accounts are purged within 30 days, except where legally required to retain",
        "Backup data is automatically deleted according to our retention schedule",
        "You may request immediate deletion of non-medical personal information",
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
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Your privacy and the security of your medical information are our top priorities. This policy explains how
            we collect, use, and protect your data.
          </p>
          <p className="text-sm text-gray-500">Last updated: December 2024 • Effective date: January 1, 2024</p>
        </div>

        {/* HIPAA Compliance Notice */}
       

        {/* Privacy Sections */}
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

        {/* Contact Information */}
        {/* <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Our Privacy Team</CardTitle>
            <CardDescription>
              If you have questions about this privacy policy or your data rights, please contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Officer</h3>
                <p className="text-gray-600 mb-1">Email: privacy@ruralhealthhub.com</p>
                <p className="text-gray-600 mb-1">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600">Available Monday-Friday, 9AM-5PM EST</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
                <p className="text-gray-600">
                  RuralHealth Hub Privacy Team
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
        </Card> */}

        {/* Updates and Changes */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices, technology, legal
              requirements, or other factors. When we make changes:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• We will notify you via email and in-app notifications</li>
              <li>• The updated policy will be posted on our website</li>
              <li>• For material changes, we will provide 30 days advance notice</li>
              <li>• Your continued use constitutes acceptance of the updated policy</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
