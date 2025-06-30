"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbNavProps {
  userType: "patient" | "clinic"
}

export function BreadcrumbNav({ userType }: BreadcrumbNavProps) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: userType === "patient" ? "Patient Portal" : "Clinic Portal",
        href: `/${userType}`,
        isHome: true,
      },
    ]

    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        const href = `/${segments.slice(0, i + 1).join("/")}`
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)

        breadcrumbs.push({
          label,
          href,
          isHome: false,
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center">
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="flex items-center">
                  {breadcrumb.isHome && <Home className="mr-2 h-4 w-4" />}
                  {breadcrumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href} className="flex items-center">
                    {breadcrumb.isHome && <Home className="mr-2 h-4 w-4" />}
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
