export interface User {
  id: number
  email: string
  user_type: "patient" | "clinic" | "admin"
  created_at: string
  updated_at: string
}

export interface Patient {
  id: number
  full_name: string
  gender: "Male" | "Female" | "Other"
  date_of_birth: string
  address: string
  phone: string
  clinic_id: number
  created_at: string
  updated_at: string
  clinic?: Clinic
}

export interface Clinic {
  id: number
  name: string
  address: string
  contact_number: string
  district: string
  created_at: string
  updated_at: string
}

export interface Staff {
  id: number
  full_name: string
  role: "Doctor" | "Nurse" | "Administrator" | "Pharmacist"
  phone: string
  email: string
  clinic_id: number
  created_at: string
  updated_at: string
  clinic?: Clinic
}

export interface Visit {
  id: number
  patient_id: number
  clinic_id: number
  staff_id: number
  visit_date: string
  reason: string
  notes?: string
  created_at: string
  updated_at: string
  patient?: Patient
  clinic?: Clinic
  staff?: Staff
  diagnoses?: Diagnosis[]
  prescriptions?: Prescription[]
}

export interface Diagnosis {
  id: number
  visit_id: number
  diagnosis_code: string
  description: string
  created_at: string
  updated_at: string
  visit?: Visit
}

export interface Prescription {
  id: number
  visit_id: number
  medication_name: string
  dosage: string
  instructions: string
  duration_days: number
  created_at: string
  updated_at: string
  visit?: Visit
}

export interface DashboardStats {
  total_patients: number
  total_staff: number
  total_visits: number
  visits_this_month: number
  total_diagnoses: number
  total_prescriptions: number
}

export interface AuthResponse {
  token: string
  user_type: "patient" | "clinic" | "admin"
  user: Patient | Clinic
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface ApiError {
  error: string
  details?: string | Record<string, string>
}

export interface RegisterPatientData {
  email: string
  password: string
  full_name: string
  gender: "Male" | "Female" | "Other"
  date_of_birth: string
  address: string
  phone: string
  clinic_id: number
}

export interface RegisterClinicData {
  email: string
  password: string
  name: string
  address: string
  contact_number: string
  district: string
}

export interface LoginData {
  email: string
  password: string
}

export interface ChangePasswordData {
  current_password: string
  new_password: string
}

export interface CreateStaffData {
  full_name: string
  role: "Doctor" | "Nurse" | "Administrator" | "Pharmacist"
  phone: string
  email: string
}

export interface CreateVisitData {
  patient_id: number
  staff_id: number
  visit_date?: string
  reason: string
  notes?: string
}

export interface CreateDiagnosisData {
  visit_id: number
  diagnosis_code: string
  description: string
}

export interface CreatePrescriptionData {
  visit_id: number
  medication_name: string
  dosage: string
  instructions: string
  duration_days: number
}
