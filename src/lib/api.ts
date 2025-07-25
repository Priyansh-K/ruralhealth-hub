import type {
  AuthResponse,
  LoginData,
  RegisterPatientData,
  RegisterClinicData,
  ChangePasswordData,
  Patient,
  Clinic,
  Staff,
  Visit,
  Diagnosis,
  Prescription,
  DashboardStats,
  PaginatedResponse,
  CreateStaffData,
  CreateVisitData,
  CreateDiagnosisData,
  CreatePrescriptionData,
} from "@/types"
import type { SystemAnalytics, ClinicAnalytics } from "@/types/analytics"
import { mockSystemAnalytics, mockClinicAnalytics } from "@/lib/mock-analytics"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Network error" }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request("/health")
  }

  // Authentication
  async login(data: LoginData): Promise<AuthResponse> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async clinicLogin(data: LoginData): Promise<AuthResponse> {
    return this.request("/auth/clinic-login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async registerPatient(data: RegisterPatientData): Promise<AuthResponse> {
    return this.request("/auth/register/patient", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async registerClinic(data: RegisterClinicData): Promise<AuthResponse> {
    return this.request("/auth/register/clinic", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getProfile(): Promise<Patient | Clinic> {
    return this.request("/auth/profile")
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    return this.request("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Patient Portal
  async getPatientProfile(): Promise<Patient> {
    return this.request("/portal/patient/profile")
  }

  async updatePatientProfile(data: Partial<Patient>): Promise<Patient> {
    return this.request("/portal/patient/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async getPatientVisits(page = 1, perPage = 10): Promise<PaginatedResponse<Visit>> {
    return this.request(`/portal/patient/visits?page=${page}&per_page=${perPage}`)
  }

  async getPatientVisit(id: number): Promise<Visit> {
    return this.request(`/portal/patient/visits/${id}`)
  }

  async getPatientDiagnoses(page = 1, perPage = 10): Promise<PaginatedResponse<Diagnosis>> {
    return this.request(`/portal/patient/diagnoses?page=${page}&per_page=${perPage}`)
  }

  async getPatientPrescriptions(page = 1, perPage = 10): Promise<PaginatedResponse<Prescription>> {
    return this.request(`/portal/patient/prescriptions?page=${page}&per_page=${perPage}`)
  }

  // Clinic Portal (Staff only)
  async getClinicProfile(): Promise<Clinic> {
    return this.request("/portal/staff/profile")
  }

  async updateClinicProfile(data: Partial<Clinic>): Promise<Clinic> {
    return this.request("/portal/staff/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async getClinicDashboard(): Promise<DashboardStats> {
    return this.request("/portal/staff/dashboard")
  }

  async getClinicPatients(page = 1, perPage = 10, search?: string): Promise<PaginatedResponse<Patient>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (search) params.append("search", search)
    return this.request(`/portal/staff/patients?${params}`)
  }

  async getClinicPatient(id: number): Promise<Patient> {
    return this.request(`/portal/staff/patients/${id}`)
  }

  async createPatient(data: Omit<RegisterPatientData, 'email' | 'password' | 'clinic_id'>): Promise<Patient> {
    return this.request("/portal/staff/patients", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getClinicStaff(page = 1, perPage = 10, role?: string): Promise<PaginatedResponse<Staff>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (role) params.append("role", role)
    return this.request(`/portal/staff/staff?${params}`)
  }

  async createStaff(data: CreateStaffData): Promise<Staff> {
    return this.request("/portal/staff/staff", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getClinicVisits(page = 1, perPage = 10, patientId?: number): Promise<PaginatedResponse<Visit>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (patientId) params.append("patient_id", patientId.toString())
    return this.request(`/portal/staff/visits?${params}`)
  }

  async getClinicVisit(id: number): Promise<Visit> {
    return this.request(`/portal/staff/visits/${id}`)
  }

  async createVisit(data: CreateVisitData): Promise<Visit> {
    return this.request("/portal/staff/visits", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Medical Portal (Doctors and Nurses)
  async getMedicalDashboard(): Promise<DashboardStats> {
    return this.request("/portal/medical/dashboard")
  }

  async getMedicalPatients(page = 1, perPage = 10, search?: string): Promise<PaginatedResponse<Patient>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (search) params.append("search", search)
    return this.request(`/portal/medical/patients?${params}`)
  }

  async getMedicalPatient(id: number): Promise<Patient> {
    return this.request(`/portal/medical/patients/${id}`)
  }

  async getMedicalStaff(page = 1, perPage = 10, role?: string): Promise<PaginatedResponse<Staff>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (role) params.append("role", role)
    return this.request(`/portal/medical/staff?${params}`)
  }

  async getMedicalVisits(page = 1, perPage = 10, patientId?: number): Promise<PaginatedResponse<Visit>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (patientId) params.append("patient_id", patientId.toString())
    return this.request(`/portal/medical/visits?${params}`)
  }

  async getMedicalVisit(id: number): Promise<Visit> {
    return this.request(`/portal/medical/visits/${id}`)
  }

  async createMedicalVisit(data: CreateVisitData): Promise<Visit> {
    return this.request("/portal/medical/visits", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMedicalDiagnoses(page = 1, perPage = 10): Promise<PaginatedResponse<Diagnosis>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    return this.request(`/portal/medical/diagnoses?${params}`)
  }

  async createMedicalDiagnosis(data: CreateDiagnosisData): Promise<Diagnosis> {
    return this.request("/portal/medical/diagnoses", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMedicalPrescriptions(page = 1, perPage = 10): Promise<PaginatedResponse<Prescription>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    return this.request(`/portal/medical/prescriptions?${params}`)
  }

  async createMedicalPrescription(data: CreatePrescriptionData): Promise<Prescription> {
    return this.request("/portal/medical/prescriptions", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Public endpoints
  async getClinics(page = 1, perPage = 10, search?: string, district?: string): Promise<PaginatedResponse<Clinic>> {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() })
    if (search) params.append("search", search)
    if (district) params.append("district", district)
    return this.request(`/auth/clinics?${params}`)
  }

  // Dashboard Analytics - Public
  async getSystemAnalytics(): Promise<SystemAnalytics> {
    // For now, return mock data. In production, this would be:
    // return this.request("/dashboard/analytics")
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSystemAnalytics), 500)
    })
  }

  async getDashboardContent(): Promise<SystemAnalytics> {
    // For now, return mock data. In production, this would be:
    // return this.request("/dashboard/content")
    return new Promise(resolve => {
      setTimeout(() => resolve(mockSystemAnalytics), 500)
    })
  }

  // Dashboard Analytics - Protected (Clinic specific)
  async getClinicDashboardContent(): Promise<ClinicAnalytics> {
    // For now, return mock data. In production, this would be:
    // return this.request("/portal/clinic/dashboard/content")
    return new Promise(resolve => {
      setTimeout(() => resolve(mockClinicAnalytics), 500)
    })
  }

  async getStaffDashboardContent(): Promise<ClinicAnalytics> {
    // For now, return mock data. In production, this would be:
    // return this.request("/portal/staff/dashboard/content")
    return new Promise(resolve => {
      setTimeout(() => resolve(mockClinicAnalytics), 500)
    })
  }

  async getMedicalDashboardContent(): Promise<ClinicAnalytics> {
    // For now, return mock data. In production, this would be:
    // return this.request("/portal/medical/dashboard/content")
    return new Promise(resolve => {
      setTimeout(() => resolve(mockClinicAnalytics), 500)
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
