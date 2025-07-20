export interface SystemAnalytics {
  overall_stats: OverallStats
  top_diagnoses: DiagnosisAnalytics[]
  top_prescriptions: PrescriptionAnalytics[]
  demographics: Demographics
  illness_trends: IllnessTrend[]
  district_analytics: DistrictAnalytics[]
  seasonal_trends: SeasonalTrend[]
}

export interface ClinicAnalytics {
  clinic_stats: ClinicStats
  top_diagnoses: DiagnosisAnalytics[]
  top_prescriptions: PrescriptionAnalytics[]
  demographics: Demographics
  illness_trends: IllnessTrend[]
  seasonal_trends: SeasonalTrend[]
}

export interface OverallStats {
  total_clinics: number
  total_patients: number
  total_staff: number
  total_visits: number
  total_diagnoses: number
  total_prescriptions: number
  visits_this_month: number
  visits_today: number
}

export interface ClinicStats {
  total_patients: number
  total_staff: number
  total_visits: number
  total_diagnoses: number
  total_prescriptions: number
  visits_this_month: number
  visits_today: number
}

export interface DiagnosisAnalytics {
  diagnosis_code: string
  description: string
  count: number
  percentage: number
}

export interface PrescriptionAnalytics {
  medication_name: string
  count: number
  percentage: number
  avg_duration_days: number
  common_dosages: DosageInfo[]
}

export interface DosageInfo {
  dosage: string
  count: number
}

export interface Demographics {
  age_groups: AgeGroup[]
  gender_distribution: GenderDistribution[]
}

export interface AgeGroup {
  age_group: string
  count: number
  percentage: number
}

export interface GenderDistribution {
  gender: string
  count: number
  percentage: number
}

export interface IllnessTrend {
  month: string
  count: number
  top_diagnosis: string
}

export interface DistrictAnalytics {
  district: string
  clinic_count: number
  patient_count: number
  visit_count: number
  top_diagnosis: string
}

export interface SeasonalTrend {
  season: string
  months: string[]
  total_visits: number
  top_diagnoses: string[]
  common_illnesses: string[]
}
