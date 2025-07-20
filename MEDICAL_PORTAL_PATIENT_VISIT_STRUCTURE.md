# Medical Portal - Patient & Visit Focused Structure

## Overview
Updated the medical portal to focus on patient-centric and visit-specific medical record management, removing standalone diagnosis and prescription pages.

## New Structure

### **Medical Portal Navigation**
- **Dashboard** (`/portal/medical`) - Overview and statistics
- **Patients** (`/portal/medical/patients`) - Patient management
- **Visits** (`/portal/medical/visits`) - Visit management

### **Key Pages**

#### 1. **Patient Detail Page** (`/portal/medical/patients/[id]`)
**Features:**
- ✅ Complete patient information
- ✅ **Patient's all diagnoses** (across all visits)
- ✅ **Patient's all prescriptions** (across all visits)
- ✅ Visit history with links to visit details
- ✅ Read-only view focused on patient medical history

#### 2. **Visit Detail Page** (`/portal/medical/visits/[id]`) - **NEW!**
**Features:**
- ✅ Visit information and patient details
- ✅ **Visit-specific diagnoses** with Add Diagnosis button
- ✅ **Visit-specific prescriptions** with Add Prescription button
- ✅ Role-based permissions (doctors only for diagnoses/prescriptions)
- ✅ Real-time updates after adding new records

**Add Diagnosis Dialog:**
- Diagnosis code field (e.g., ICD-10)
- Description textarea
- Automatic association with current visit
- Only available to doctors

**Add Prescription Dialog:**
- Medication name
- Dosage instructions
- Duration in days
- Instructions/notes
- Only available to doctors

## Role-Based Access

### **Doctors**
- ✅ Full access to all medical portal features
- ✅ Can add diagnoses to visits
- ✅ Can add prescriptions to visits
- ✅ Can view patient medical history
- ✅ Can manage visits

### **Nurses**
- ✅ Access to medical portal
- ✅ Can view patient medical history
- ✅ Can view visit details
- ✅ **Cannot** add diagnoses (doctor-only)
- ✅ **Cannot** add prescriptions (doctor-only)
- ✅ Can manage visits

## User Workflow

### **Adding Medical Records to a Visit**
1. **Navigate to visit**: Medical Portal → Visits → Click "View" on visit
2. **Add diagnosis** (doctors only):
   - Click "Add Diagnosis" button
   - Enter diagnosis code and description
   - Submit to associate with visit
3. **Add prescription** (doctors only):
   - Click "Add Prescription" button
   - Enter medication details
   - Submit to associate with visit

### **Viewing Patient Medical History**
1. **Navigate to patient**: Medical Portal → Patients → Click "View Details"
2. **Review history**: See all diagnoses and prescriptions across all visits
3. **Access visits**: Click visit links to see visit-specific details

## API Integration

### **New Endpoints Used**
- `GET /portal/medical/visits/{id}` - Get visit with diagnoses and prescriptions
- `POST /portal/medical/diagnoses` - Create diagnosis for visit
- `POST /portal/medical/prescriptions` - Create prescription for visit

### **Request Payloads**

**Create Diagnosis:**
```json
{
  "visit_id": 123,
  "diagnosis_code": "J44.1",
  "description": "Chronic obstructive pulmonary disease with acute exacerbation"
}
```

**Create Prescription:**
```json
{
  "visit_id": 123,
  "medication_name": "Amoxicillin",
  "dosage": "500mg twice daily",
  "duration_days": 7,
  "instructions": "Take with food, complete full course"
}
```

## Benefits of New Structure

1. **Visit-Centric**: Medical records are naturally organized by visits
2. **Context-Aware**: Diagnoses and prescriptions are tied to specific medical encounters
3. **Simplified Navigation**: Fewer top-level pages, more focused workflows
4. **Better UX**: Adding medical records happens in context of the visit
5. **Role Compliance**: Clear separation between doctor and nurse capabilities

## Removed Pages
- ❌ `/portal/medical/diagnoses` (standalone diagnoses page)
- ❌ `/portal/medical/prescriptions` (standalone prescriptions page)

These are now managed within visit detail pages for better clinical workflow.
