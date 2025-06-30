import Link from "next/link"
import { MainNav } from "@/components/layout/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Heart, Building2, Users, Star } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small rural clinics",
      price: "$99",
      period: "per month",
      badge: null,
      features: [
        "Up to 500 patients",
        "5 staff members",
        "Basic reporting",
        "Email support",
        "Mobile access",
        "Data backup",
        "HIPAA compliance",
        "Patient portal access",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing healthcare practices",
      price: "$199",
      period: "per month",
      badge: "Most Popular",
      features: [
        "Up to 2,000 patients",
        "15 staff members",
        "Advanced analytics",
        "Priority support",
        "Mobile & tablet apps",
        "Automated backups",
        "HIPAA compliance",
        "Patient portal access",
        "Custom reporting",
        "API access",
        "Multi-location support",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large healthcare networks",
      price: "Custom",
      period: "contact us",
      badge: null,
      features: [
        "Unlimited patients",
        "Unlimited staff",
        "Custom integrations",
        "24/7 phone support",
        "White-label options",
        "Advanced security",
        "HIPAA compliance",
        "Patient portal access",
        "Custom workflows",
        "Dedicated account manager",
        "On-premise deployment",
        "Custom training",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 30-day free trial for all plans. No credit card required to get started.",
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security with end-to-end encryption and are fully HIPAA compliant.",
    },
    {
      question: "Do you offer training?",
      answer:
        "We provide comprehensive onboarding and training materials. Enterprise customers get dedicated training sessions.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and can arrange invoicing for enterprise customers.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <MainNav />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your healthcare practice. All plans include core features with no hidden fees or
            setup costs.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>30-day free trial</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>No setup fees</span>
            <span className="mx-2">•</span>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"} transition-all duration-300 hover:shadow-lg`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.buttonVariant}
                  size="lg"
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/register?type=clinic"}>
                    {plan.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
            <p className="text-lg text-gray-600">All plans include these essential healthcare management features</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-l-4 border-l-blue-500">
              <CardHeader>
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Clinic Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Staff management</li>
                  <li>• Patient registration</li>
                  <li>• Visit scheduling</li>
                  <li>• Dashboard analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-green-500">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Patient Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Medical records access</li>
                  <li>• Visit history</li>
                  <li>• Prescription tracking</li>
                  <li>• Profile management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-purple-500">
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ICD-10 diagnosis coding</li>
                  <li>• Prescription management</li>
                  <li>• Visit documentation</li>
                  <li>• Medical history</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-l-4 border-l-red-500">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Security & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• HIPAA compliance</li>
                  <li>• Data encryption</li>
                  <li>• Regular backups</li>
                  <li>• Technical support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Get answers to common questions about our pricing and plans</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of healthcare providers already using RuralHealth Hub to improve patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register?type=clinic">Start Your Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
