import type { SystemAnalytics, ClinicAnalytics } from "@/types/analytics"

// Mock data for system-wide analytics
export const mockSystemAnalytics: SystemAnalytics = {
  overall_stats: {
    total_clinics: 25,
    total_patients: 1500,
    total_staff: 75,
    total_visits: 3200,
    total_diagnoses: 2800,
    total_prescriptions: 4100,
    visits_this_month: 180,
    visits_today: 12
  },
  top_diagnoses: [
    {
      diagnosis_code: "Z00.00",
      description: "General health examination",
      count: 450,
      percentage: 16.1
    },
    {
      diagnosis_code: "J06.9",
      description: "Acute upper respiratory infection",
      count: 320,
      percentage: 11.4
    },
    {
      diagnosis_code: "R50.9",
      description: "Fever",
      count: 280,
      percentage: 10.0
    },
    {
      diagnosis_code: "K59.0",
      description: "Constipation",
      count: 240,
      percentage: 8.6
    },
    {
      diagnosis_code: "M79.3",
      description: "Panniculitis",
      count: 200,
      percentage: 7.1
    },
    {
      diagnosis_code: "J00",
      description: "Acute nasopharyngitis",
      count: 180,
      percentage: 6.4
    },
    {
      diagnosis_code: "N39.0",
      description: "Urinary tract infection",
      count: 160,
      percentage: 5.7
    },
    {
      diagnosis_code: "I10",
      description: "Essential hypertension",
      count: 140,
      percentage: 5.0
    },
    {
      diagnosis_code: "E11.9",
      description: "Type 2 diabetes mellitus",
      count: 120,
      percentage: 4.3
    },
    {
      diagnosis_code: "A09",
      description: "Diarrhea and gastroenteritis",
      count: 100,
      percentage: 3.6
    }
  ],
  top_prescriptions: [
    {
      medication_name: "Paracetamol",
      count: 320,
      percentage: 7.8,
      avg_duration_days: 5.2,
      common_dosages: [
        { dosage: "500mg", count: 200 },
        { dosage: "1000mg", count: 120 }
      ]
    },
    {
      medication_name: "Amoxicillin",
      count: 280,
      percentage: 6.8,
      avg_duration_days: 7.0,
      common_dosages: [
        { dosage: "500mg", count: 180 },
        { dosage: "250mg", count: 100 }
      ]
    },
    {
      medication_name: "Ibuprofen",
      count: 250,
      percentage: 6.1,
      avg_duration_days: 3.8,
      common_dosages: [
        { dosage: "400mg", count: 150 },
        { dosage: "200mg", count: 100 }
      ]
    },
    {
      medication_name: "Lisinopril",
      count: 200,
      percentage: 4.9,
      avg_duration_days: 30.0,
      common_dosages: [
        { dosage: "10mg", count: 120 },
        { dosage: "5mg", count: 80 }
      ]
    },
    {
      medication_name: "Metformin",
      count: 180,
      percentage: 4.4,
      avg_duration_days: 30.0,
      common_dosages: [
        { dosage: "500mg", count: 100 },
        { dosage: "1000mg", count: 80 }
      ]
    },
    {
      medication_name: "Omeprazole",
      count: 160,
      percentage: 3.9,
      avg_duration_days: 14.0,
      common_dosages: [
        { dosage: "20mg", count: 100 },
        { dosage: "40mg", count: 60 }
      ]
    },
    {
      medication_name: "Azithromycin",
      count: 140,
      percentage: 3.4,
      avg_duration_days: 5.0,
      common_dosages: [
        { dosage: "250mg", count: 90 },
        { dosage: "500mg", count: 50 }
      ]
    },
    {
      medication_name: "Ciprofloxacin",
      count: 120,
      percentage: 2.9,
      avg_duration_days: 7.0,
      common_dosages: [
        { dosage: "500mg", count: 80 },
        { dosage: "250mg", count: 40 }
      ]
    }
  ],
  demographics: {
    age_groups: [
      { age_group: "Under 18", count: 300, percentage: 20.0 },
      { age_group: "18-30", count: 450, percentage: 30.0 },
      { age_group: "31-50", count: 420, percentage: 28.0 },
      { age_group: "51-70", count: 240, percentage: 16.0 },
      { age_group: "Over 70", count: 90, percentage: 6.0 }
    ],
    gender_distribution: [
      { gender: "Female", count: 780, percentage: 52.0 },
      { gender: "Male", count: 690, percentage: 46.0 },
      { gender: "Other", count: 30, percentage: 2.0 }
    ]
  },
  illness_trends: [
    { month: "Jan 2024", count: 280, top_diagnosis: "Upper respiratory infections" },
    { month: "Feb 2024", count: 320, top_diagnosis: "Flu symptoms" },
    { month: "Mar 2024", count: 290, top_diagnosis: "Allergies" },
    { month: "Apr 2024", count: 250, top_diagnosis: "General checkups" },
    { month: "May 2024", count: 230, top_diagnosis: "Hypertension" },
    { month: "Jun 2024", count: 240, top_diagnosis: "Diabetes management" },
    { month: "Jul 2024", count: 260, top_diagnosis: "Heat-related illness" },
    { month: "Aug 2024", count: 270, top_diagnosis: "Digestive issues" },
    { month: "Sep 2024", count: 290, top_diagnosis: "Back to school checkups" },
    { month: "Oct 2024", count: 310, top_diagnosis: "Flu season prep" },
    { month: "Nov 2024", count: 340, top_diagnosis: "Respiratory infections" },
    { month: "Dec 2024", count: 380, top_diagnosis: "Cold and flu" }
  ],
  district_analytics: [
    {
      district: "North District",
      clinic_count: 8,
      patient_count: 480,
      visit_count: 1020,
      top_diagnosis: "Respiratory infections"
    },
    {
      district: "Central District",
      clinic_count: 12,
      patient_count: 720,
      visit_count: 1530,
      top_diagnosis: "Hypertension"
    },
    {
      district: "South District",
      clinic_count: 6,
      patient_count: 360,
      visit_count: 770,
      top_diagnosis: "Diabetes"
    },
    {
      district: "East District",
      clinic_count: 7,
      patient_count: 420,
      visit_count: 890,
      top_diagnosis: "General checkups"
    }
  ],
  seasonal_trends: [
    {
      season: "Winter",
      months: ["Dec", "Jan", "Feb"],
      total_visits: 980,
      top_diagnoses: ["Respiratory infections", "Flu", "Cold"],
      common_illnesses: ["Upper respiratory infections", "Bronchitis", "Pneumonia", "Seasonal depression"]
    },
    {
      season: "Spring",
      months: ["Mar", "Apr", "May"],
      total_visits: 770,
      top_diagnoses: ["Allergies", "General checkups", "Hypertension"],
      common_illnesses: ["Allergic rhinitis", "Asthma", "Skin allergies", "Routine care"]
    },
    {
      season: "Summer",
      months: ["Jun", "Jul", "Aug"],
      total_visits: 770,
      top_diagnoses: ["Heat illness", "Digestive issues", "Skin conditions"],
      common_illnesses: ["Heat exhaustion", "Dehydration", "Sunburn", "Food poisoning"]
    },
    {
      season: "Fall",
      months: ["Sep", "Oct", "Nov"],
      total_visits: 940,
      top_diagnoses: ["Back to school checkups", "Flu prep", "Respiratory prep"],
      common_illnesses: ["School physicals", "Vaccinations", "Early respiratory infections", "Chronic care"]
    }
  ]
}

// Mock data for clinic-specific analytics (scaled down from system data)
export const mockClinicAnalytics: ClinicAnalytics = {
  clinic_stats: {
    total_patients: 150,
    total_staff: 8,
    total_visits: 320,
    total_diagnoses: 280,
    total_prescriptions: 410,
    visits_this_month: 18,
    visits_today: 2
  },
  top_diagnoses: mockSystemAnalytics.top_diagnoses.map(d => ({
    ...d,
    count: Math.floor(d.count / 10), // Scale down for single clinic
    percentage: d.percentage // Keep same relative percentages
  })),
  top_prescriptions: mockSystemAnalytics.top_prescriptions.map(p => ({
    ...p,
    count: Math.floor(p.count / 10), // Scale down for single clinic
    percentage: p.percentage, // Keep same relative percentages
    common_dosages: p.common_dosages.map(cd => ({
      ...cd,
      count: Math.floor(cd.count / 10)
    }))
  })),
  demographics: {
    age_groups: mockSystemAnalytics.demographics.age_groups.map(ag => ({
      ...ag,
      count: Math.floor(ag.count / 10) // Scale down for single clinic
    })),
    gender_distribution: mockSystemAnalytics.demographics.gender_distribution.map(gd => ({
      ...gd,
      count: Math.floor(gd.count / 10) // Scale down for single clinic
    }))
  },
  illness_trends: mockSystemAnalytics.illness_trends.map(it => ({
    ...it,
    count: Math.floor(it.count / 10) // Scale down for single clinic
  })),
  seasonal_trends: mockSystemAnalytics.seasonal_trends.map(st => ({
    ...st,
    total_visits: Math.floor(st.total_visits / 10) // Scale down for single clinic
  }))
}
