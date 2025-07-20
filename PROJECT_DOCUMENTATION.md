# RuralHealth Hub - Project Documentation

## Overview

RuralHealth Hub is a comprehensive healthcare management system designed specifically for rural clinics and patients. It provides a digital platform to streamline clinic operations, manage patient records, and facilitate healthcare delivery in rural communities.

## Technology Stack

- **Frontend Framework**: Next.js 15.3.4 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0 with custom theme
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner

## Project Structure

```
ruralhealth-hub/
├── public/                          # Static assets
│   ├── file.svg, globe.svg, etc.   # UI icons and images
│   ├── placeholder-*.jpg/svg       # Placeholder images
│   └── *.svg                       # Vector graphics
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── globals.css             # Global styles with Tailwind
│   │   ├── layout.tsx              # Root layout with AuthProvider
│   │   ├── page.tsx                # Homepage with hero section
│   │   ├── api.ts                  # API client configuration
│   │   │
│   │   ├── admin/                  # Admin portal
│   │   │   ├── layout.tsx          # Admin-specific layout
│   │   │   ├── page.tsx            # Admin dashboard
│   │   │   ├── analytics/          # System analytics
│   │   │   ├── clinics/            # Clinic management
│   │   │   ├── health/             # System health monitoring
│   │   │   ├── settings/           # System configuration
│   │   │   ├── staff/              # Staff management
│   │   │   └── users/              # User management
│   │   │
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── login/              # Login form
│   │   │   └── register/           # Registration (patient/clinic)
│   │   │
│   │   ├── clinic/                 # Clinic portal
│   │   │   ├── layout.tsx          # Clinic-specific layout
│   │   │   ├── page.tsx            # Clinic dashboard
│   │   │   ├── diagnoses/          # Diagnosis management
│   │   │   ├── patients/           # Patient management
│   │   │   ├── prescriptions/      # Prescription management
│   │   │   ├── profile/            # Clinic profile
│   │   │   ├── settings/           # Clinic settings
│   │   │   ├── staff/              # Staff management
│   │   │   └── visits/             # Visit management
│   │   │
│   │   ├── patient/                # Patient portal
│   │   │   ├── layout.tsx          # Patient-specific layout
│   │   │   ├── page.tsx            # Patient dashboard
│   │   │   ├── diagnoses/          # View diagnoses
│   │   │   ├── prescriptions/      # View prescriptions
│   │   │   ├── profile/            # Patient profile
│   │   │   ├── settings/           # Patient settings
│   │   │   └── visits/             # View visit history
│   │   │
│   │   ├── about/                  # About page
│   │   ├── contact/                # Contact page
│   │   ├── features/               # Features page
│   │   └── privacy/                # Privacy policy
│   │
│   ├── components/                 # Reusable React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── admin-sidebar.tsx   # Admin navigation
│   │   │   ├── clinic-sidebar.tsx  # Clinic navigation
│   │   │   ├── patient-sidebar.tsx # Patient navigation
│   │   │   ├── main-nav.tsx        # Main navigation bar
│   │   │   └── breadcrumb-nav.tsx  # Breadcrumb navigation
│   │   │
│   │   ├── modals/                 # Modal dialogs
│   │   │   └── register-patient-modal.tsx
│   │   │
│   │   ├── ui/                     # UI primitives (Shadcn/ui)
│   │   │   ├── alert.tsx           # Alert components
│   │   │   ├── avatar.tsx          # Avatar component
│   │   │   ├── badge.tsx           # Badge component
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── dialog.tsx          # Dialog component
│   │   │   ├── form.tsx            # Form components
│   │   │   ├── input.tsx           # Input component
│   │   │   ├── loading-spinner.tsx # Loading indicator
│   │   │   ├── select.tsx          # Select component
│   │   │   ├── sidebar.tsx         # Sidebar component
│   │   │   ├── table.tsx           # Table component
│   │   │   ├── tabs.tsx            # Tabs component
│   │   │   └── ... (other UI components)
│   │   │
│   │   └── theme-provider.tsx      # Theme context provider
│   │
│   ├── contexts/                   # React Context providers
│   │   └── auth-context.tsx        # Authentication state management
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.ts           # Mobile detection hook
│   │   └── use-toast.ts            # Toast notification hook
│   │
│   ├── lib/                        # Utility libraries
│   │   ├── api.ts                  # API client class
│   │   └── utils.ts                # Utility functions
│   │
│   ├── styles/                     # Additional styles
│   │   └── globals.css             # Global CSS
│   │
│   └── types/                      # TypeScript type definitions
│       └── index.ts                # All type definitions
│
├── Configuration Files
├── components.json                 # Shadcn/ui configuration
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js configuration
├── next-env.d.ts                  # Next.js type definitions
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project readme
```

## Core Features & Functionality

### 1. Authentication System

**Location**: `src/contexts/auth-context.tsx`, `src/app/auth/`

- **Multi-role authentication**: Supports patients, clinics, and admin users
- **Token-based auth**: JWT tokens stored in localStorage
- **Protected routes**: Route guards based on user type
- **Registration**: Separate flows for patients and clinics

**User Types**:
- **Patients**: Individual users seeking healthcare
- **Clinics**: Healthcare providers and facilities
- **Admin**: System administrators

### 2. Patient Portal (`/patient`)

**Location**: `src/app/patient/`

**Features**:
- **Dashboard**: Overview of health information and recent activity
- **Profile Management**: Personal information and contact details
- **Visit History**: View past clinic visits with details
- **Diagnoses**: Access to medical diagnoses from visits
- **Prescriptions**: View current and past prescriptions
- **Settings**: Account and privacy settings

**Key Components**:
- Patient sidebar navigation
- Health record visualization
- Appointment history
- Medical document access

### 3. Clinic Portal (`/clinic`)

**Location**: `src/app/clinic/`

**Features**:
- **Dashboard**: Clinic operations overview with statistics
- **Patient Management**: Register, search, and manage patients
- **Staff Management**: Add and manage healthcare staff
- **Visit Management**: Create and track patient visits
- **Diagnosis Recording**: Document medical diagnoses
- **Prescription Management**: Create and manage prescriptions
- **Profile Management**: Clinic information and settings

**Dashboard Statistics**:
- Total patients registered
- Staff count by role (doctors, nurses, etc.)
- Recent visits and activity
- Monthly/weekly trends

### 4. Admin Portal (`/admin`)

**Location**: `src/app/admin/`

**Features**:
- **System Dashboard**: High-level system statistics and health
- **User Management**: Oversee all system users
- **Clinic Management**: Monitor and manage all clinics
- **Staff Management**: System-wide staff oversight
- **System Health**: Monitor system performance and status
- **Analytics**: Comprehensive system analytics and insights
- **Settings**: System-wide configuration and preferences

**Admin Capabilities**:
- System health monitoring (CPU, memory, network)
- Database management and backups
- User role management
- Audit logs and security
- System maintenance and alerts

### 5. API Client Architecture

**Location**: `src/lib/api.ts`, `src/app/api.ts`

**Structure**:
```typescript
class ApiClient {
  // Authentication endpoints
  login(), registerPatient(), registerClinic()
  
  // Patient portal endpoints
  getPatientProfile(), getPatientVisits(), getPatientDiagnoses()
  
  // Clinic portal endpoints
  getClinicProfile(), getClinicPatients(), createVisit()
  
  // Public endpoints
  getClinics(), healthCheck()
}
```

**Features**:
- Centralized HTTP client
- Automatic token injection
- Error handling and retries
- Type-safe responses
- Pagination support

### 6. UI Component System

**Location**: `src/components/ui/`

**Based on**: Shadcn/ui + Radix UI
**Styling**: Tailwind CSS with custom theme

**Key Components**:
- **Cards**: For displaying grouped information
- **Tables**: For data listings with sorting/filtering
- **Forms**: Type-safe forms with validation
- **Sidebars**: Navigation for different user types
- **Modals**: For actions like user registration
- **Loading States**: Spinners and skeleton screens
- **Alerts/Toasts**: User feedback and notifications

### 7. Type System

**Location**: `src/types/index.ts`

**Core Types**:
```typescript
interface Patient {
  id: number
  full_name: string
  gender: "Male" | "Female" | "Other"
  date_of_birth: string
  address: string
  phone: string
  clinic_id: number
  // ... additional fields
}

interface Clinic {
  id: number
  name: string
  address: string
  contact_number: string
  district: string
  // ... additional fields
}

interface Visit {
  id: number
  patient_id: number
  clinic_id: number
  visit_date: string
  reason: string
  diagnoses?: Diagnosis[]
  prescriptions?: Prescription[]
  // ... additional fields
}
```

## Data Flow & State Management

### Authentication Flow
1. User logs in via `/auth/login`
2. API returns JWT token and user data
3. Token stored in localStorage
4. AuthContext provides global auth state
5. Protected routes check authentication status
6. Role-based routing to appropriate dashboard

### Clinic Workflow
1. **Patient Registration**: Clinic registers new patients
2. **Visit Creation**: Staff creates visit records
3. **Diagnosis Entry**: Medical staff adds diagnoses
4. **Prescription Management**: Doctors create prescriptions
5. **Follow-up**: Track patient progress over time

### Data Persistence
- **Client State**: React Context for authentication
- **Server State**: API calls with caching
- **Local Storage**: JWT tokens and user preferences
- **Form State**: React Hook Form for complex forms

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Protected API endpoints
- Session timeout handling
- Password complexity requirements

### Data Protection
- Input validation with Zod schemas
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure password storage (backend)

### Admin Security Features
- System health monitoring
- Audit logging
- Failed login attempt tracking
- IP address monitoring
- Database backup automation

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation
```bash
npm install
npm run dev
```

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

### Configuration
- **Tailwind**: Custom theme with healthcare color palette
- **ESLint**: Code quality enforcement
- **TypeScript**: Strict type checking
- **Next.js**: App Router with server-side rendering

## Key Design Patterns

### 1. Role-Based Layouts
Each user type has its own layout with appropriate navigation:
- Admin: System management sidebar
- Clinic: Healthcare operation sidebar  
- Patient: Personal health navigation

### 2. Component Composition
- Reusable UI components from Shadcn/ui
- Layout components for consistent structure
- Modal components for user actions
- Form components with validation

### 3. API Integration
- Centralized API client
- Type-safe endpoints
- Error boundary handling
- Loading state management

### 4. Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Progressive enhancement

## Future Enhancements

### Planned Features
- Real-time notifications
- Telemedicine capabilities
- Mobile applications
- Advanced analytics dashboard
- Integration with medical devices
- Multi-language support
- Offline functionality

### Scalability Considerations
- Microservices architecture
- Database sharding
- CDN integration
- Caching strategies
- Load balancing
- API rate limiting

## Development Best Practices

### Code Organization
- Feature-based folder structure
- Consistent naming conventions
- Type-first development
- Component composition over inheritance

### Performance
- Lazy loading for routes
- Image optimization
- Bundle splitting
- Caching strategies
- Minimal re-renders

### Testing Strategy
- Unit tests for utilities
- Integration tests for API
- E2E tests for critical paths
- Accessibility testing
- Performance testing

## Deployment Architecture

### Environment Configuration
- Development: Local development server
- Staging: Pre-production testing
- Production: Live system deployment

### Infrastructure
- Frontend: Vercel/Netlify deployment
- Backend: Node.js API server
- Database: PostgreSQL/MySQL
- Storage: Cloud storage for files
- Monitoring: Application performance monitoring

This documentation provides a comprehensive overview of the RuralHealth Hub project structure, functionality, and development approach. The system is designed to be scalable, maintainable, and user-friendly for rural healthcare management.
