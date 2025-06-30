import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Key,
  Database,
  Server,
  Eye,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Activity,
  Globe,
} from "lucide-react"

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: "Data Encryption",
      icon: Lock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "End-to-end encryption for all data transmission and storage",
      details: [
        "AES-256 encryption for data at rest",
        "TLS 1.3 for data in transit",
        "Encrypted database backups",
        "Key rotation and management",
      ],
    },
    {
      title: "Access Controls",
      icon: Key,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Multi-layered authentication and authorization systems",
      details: [
        "Multi-factor authentication (MFA)",
        "Role-based access control (RBAC)",
        "Single sign-on (SSO) support",
        "Session management and timeout",
      ],
    },
    {
      title: "Infrastructure Security",
      icon: Server,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Secure cloud infrastructure with enterprise-grade protection",
      details: [
        "AWS/Azure enterprise security",
        "Network segmentation and firewalls",
        "DDoS protection and monitoring",
        "Secure API gateways",
      ],
    },
    {
      title: "Audit & Monitoring",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Comprehensive logging and real-time security monitoring",
      details: [
        "Complete audit trails",
        "Real-time threat detection",
        "Automated security alerts",
        "Compliance reporting",
      ],
    },
    {
      title: "Data Privacy",
      icon: Eye,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Privacy-first approach with minimal data collection",
      details: ["Data minimization principles", "Purpose limitation", "User consent management", "Right to deletion"],
    },
    {
      title: "Backup & Recovery",
      icon: Database,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Robust backup systems with disaster recovery planning",
      details: [
        "Automated daily backups",
        "Geographic redundancy",
        "Point-in-time recovery",
        "Disaster recovery testing",
      ],
    },
  ]

  const certifications = [
    {
      name: "HIPAA Compliance",
      description: "Full compliance with Health Insurance Portability and Accountability Act",
      status: "Certified",
    },
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls audit",
      status: "Certified",
    },
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      status: "In Progress",
    },
    {
      name: "GDPR Compliance",
      description: "General Data Protection Regulation compliance for EU users",
      status: "Certified",
    },
  ]

  const securityPractices = [
    {
      category: "Development Security",
      icon: FileText,
      practices: [
        "Secure coding standards and practices",
        "Regular security code reviews",
        "Automated vulnerability scanning",
        "Penetration testing by third parties",
        "Security-focused development lifecycle",
      ],
    },
    {
      category: "Operational Security",
      icon: Users,
      practices: [
        "Employee security training programs",
        "Background checks for all staff",
        "Principle of least privilege access",
        "Regular security awareness updates",
        "Incident response procedures",
      ],
    },
    {
      category: "Physical Security",
      icon: Shield,
      practices: [
        "Secure data center facilities",
        "24/7 physical monitoring",
        "Biometric access controls",
        "Environmental monitoring",
        "Secure hardware disposal",
      ],
    },
    {
      category: "Network Security",
      icon: Globe,
      practices: [
        "Network segmentation and isolation",
        "Intrusion detection systems",
        "Regular security assessments",
        "VPN access for remote work",
        "DNS filtering and protection",
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Security & Compliance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your healthcare data deserves the highest level of protection. We implement enterprise-grade security
            measures and maintain strict compliance with healthcare regulations.
          </p>
        </div>

        {/* Security Overview */}
        <Card className="mb-16 border-l-4 border-l-green-500 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-900">
              <CheckCircle className="mr-2 h-6 w-6" />
              Security at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">256-bit</div>
                <div className="text-sm text-green-600">AES Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">99.9%</div>
                <div className="text-sm text-green-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">24/7</div>
                <div className="text-sm text-green-600">Security Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">HIPAA</div>
                <div className="text-sm text-green-600">Compliant</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Features</h2>
            <p className="text-lg text-gray-600">Comprehensive protection for your healthcare data</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg ${feature.bgColor} mr-3`}>
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
            <p className="text-lg text-gray-600">Industry-recognized security and privacy certifications</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{cert.name}</span>
                    <Badge
                      variant={cert.status === "Certified" ? "default" : "secondary"}
                      className={cert.status === "Certified" ? "bg-green-100 text-green-800" : ""}
                    >
                      {cert.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-lg text-gray-600">Our comprehensive approach to information security</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {securityPractices.map((practice, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-3">
                      <practice.icon className="h-5 w-5 text-gray-700" />
                    </div>
                    {practice.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {practice.practices.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Incident Response */}
        <Card className="mb-16 border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-900">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Incident Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Response Process</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Immediate threat containment and assessment</li>
                  <li>• Notification to affected users within 24 hours</li>
                  <li>• Coordination with law enforcement if required</li>
                  <li>• Post-incident analysis and improvements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Report Security Issues</h3>
                <p className="text-gray-700 mb-2">If you discover a security vulnerability, please report it to:</p>
                <p className="text-blue-600 font-medium">security@ruralhealthhub.com</p>
                <p className="text-sm text-gray-600 mt-2">
                  We appreciate responsible disclosure and will respond within 24 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Security Team */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Questions About Security?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our security team is available to discuss your specific security requirements and concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:security@ruralhealthhub.com"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Security Team
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Schedule Security Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
