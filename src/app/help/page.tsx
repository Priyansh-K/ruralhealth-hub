import { MainNav } from "@/components/layout/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Book,
  Video,
  MessageCircle,
  Phone,
  Mail,
  Users,
  Building2,
  Heart,
  Shield,
  HelpCircle,
  FileText,
  Calendar,
} from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: Heart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      articles: [
        "Setting up your clinic account",
        "Adding your first staff members",
        "Registering patients",
        "Understanding the dashboard",
        "Mobile app setup",
      ],
    },
    {
      title: "Patient Management",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      articles: [
        "Registering new patients",
        "Managing patient profiles",
        "Patient portal access",
        "Searching patient records",
        "Patient data privacy",
      ],
    },
    {
      title: "Visit Documentation",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      articles: [
        "Creating new visits",
        "Adding diagnoses with ICD codes",
        "Prescribing medications",
        "Visit notes and documentation",
        "Editing visit information",
      ],
    },
    {
      title: "Medical Records",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      articles: [
        "Understanding medical records",
        "ICD-10 diagnosis coding",
        "Prescription management",
        "Medical history tracking",
        "Exporting patient data",
      ],
    },
    {
      title: "Staff Management",
      icon: Building2,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      articles: [
        "Adding healthcare providers",
        "Managing staff roles",
        "Staff permissions",
        "Staff scheduling",
        "Performance tracking",
      ],
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      articles: [
        "HIPAA compliance features",
        "Data encryption",
        "User access controls",
        "Audit logs",
        "Password security",
      ],
    },
  ]

  const supportOptions = [
    {
      title: "Knowledge Base",
      description: "Comprehensive guides and tutorials",
      icon: Book,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Phone Support",
      description: "Call us for immediate help",
      icon: Phone,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const quickLinks = [
    {
      title: "System Status",
      description: "Check current system status",
      href: "#",
    },
    {
      title: "Feature Requests",
      description: "Suggest new features",
      href: "#",
    },
    {
      title: "Bug Reports",
      description: "Report technical issues",
      href: "#",
    },
    {
      title: "Training Resources",
      description: "Staff training materials",
      href: "#",
    },
  ]

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password from the login page by clicking 'Forgot Password' or contact your clinic administrator.",
    },
    {
      question: "Can patients access their own records?",
      answer:
        "Yes, patients have secure access to their medical records, visit history, and prescriptions through the patient portal.",
    },
    {
      question: "Is the system HIPAA compliant?",
      answer: "Yes, RuralHealth Hub is fully HIPAA compliant with enterprise-grade security and encryption.",
    },
    {
      question: "How do I add a new staff member?",
      answer:
        "Go to Staff Management in your clinic portal and click 'Add Staff Member' to create new healthcare provider accounts.",
    },
    {
      question: "Can I export patient data?",
      answer: "Yes, you can export patient data in various formats. Contact support for assistance with data exports.",
    },
    {
      question: "What browsers are supported?",
      answer: "RuralHealth Hub works on all modern browsers including Chrome, Firefox, Safari, and Edge.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers, get support, and learn how to make the most of RuralHealth Hub for your healthcare practice.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, or features..."
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {supportOptions.map((option, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div
                  className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <option.icon className={`h-8 w-8 ${option.color}`} />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find help articles organized by topic</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg ${category.bgColor} mr-3`}>
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline block py-1">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our support team is here to help you get the most out of RuralHealth Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </div>
            <div className="mt-6 text-sm text-blue-200">
              <p>Average response time: 2 hours • Available 24/7 for critical issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
