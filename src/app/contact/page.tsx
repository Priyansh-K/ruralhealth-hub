"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Heart,
  MessageSquare,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@ruralhealthhub.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 8AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Healthcare Ave, Rural City, RC 12345",
      description: "By appointment only",
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 Emergency Support",
      description: "For critical healthcare systems",
    },
  ]

  const inquiryTypes = [
    { value: "sales", label: "Sales Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "demo", label: "Request Demo" },
    { value: "partnership", label: "Partnership" },
    { value: "billing", label: "Billing Question" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about RuralHealth Hub? We&apos;re here to help you transform your healthcare practice with our
            comprehensive management solution.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Thank you for your message! We&apos;ll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Clinic or organization name"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief subject line"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Multiple ways to reach our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <info.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{info.title}</h3>
                      <p className="text-sm font-medium text-blue-600">{info.content}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Heart className="mr-2 h-5 w-5" />
                  Quick Start Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-900">Free Demo</h4>
                  <p className="text-sm text-green-800">
                    Schedule a personalized demo to see RuralHealth Hub in action.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Free Trial</h4>
                  <p className="text-sm text-green-800">
                    Start your 30-day free trial immediately with no credit card required.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Implementation Support</h4>
                  <p className="text-sm text-green-800">Get dedicated support during setup and staff training.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Building2 className="mr-2 h-5 w-5" />
                  For Healthcare Organizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 mb-4">
                  We understand the unique challenges of rural healthcare. Our team includes healthcare professionals
                  who can help you optimize your workflows.
                </p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• HIPAA compliance consultation</li>
                  <li>• Custom workflow design</li>
                  <li>• Staff training programs</li>
                  <li>• Data migration assistance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
