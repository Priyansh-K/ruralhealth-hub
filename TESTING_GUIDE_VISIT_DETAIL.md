# Testing Guide - Medical Portal Visit Detail Page

## New Features to Test

### **1. Medical Portal Navigation**
**URL**: `http://localhost:3002/portal/medical`

**Verify:**
- ✅ Dashboard loads
- ✅ Sidebar shows only: Dashboard, Patients, Visits (no Diagnoses/Prescriptions)
- ✅ Navigation works properly

### **2. Visit Detail Page with Add Diagnosis/Prescription**
**URL**: `http://localhost:3002/portal/medical/visits/[id]`

**How to Access:**
1. Login as medical staff (doctor/nurse)
2. Go to Medical Portal → Visits
3. Click "View" button on any visit

**Features to Test:**

#### **For Doctors:**
- ✅ "Add Diagnosis" button visible
- ✅ "Add Prescription" button visible  
- ✅ Can create new diagnoses
- ✅ Can create new prescriptions
- ✅ Real-time updates after adding

#### **For Nurses:**
- ✅ Can view visit details
- ✅ Can see existing diagnoses/prescriptions
- ❌ No "Add Diagnosis" button (doctor-only)
- ❌ No "Add Prescription" button (doctor-only)

### **3. Patient Detail Page**
**URL**: `http://localhost:3002/portal/medical/patients/[id]`

**Verify:**
- ✅ Shows patient's **all diagnoses** (across visits)
- ✅ Shows patient's **all prescriptions** (across visits)
- ✅ Visit history with links to visit details

### **4. Add Diagnosis Dialog**
**Test Flow:**
1. Open visit detail page as doctor
2. Click "Add Diagnosis"
3. Fill form:
   - Diagnosis Code: "J44.1"
   - Description: "COPD with acute exacerbation"
4. Submit and verify it appears in visit

### **5. Add Prescription Dialog**
**Test Flow:**
1. Open visit detail page as doctor  
2. Click "Add Prescription"
3. Fill form:
   - Medication: "Amoxicillin"
   - Dosage: "500mg twice daily"
   - Duration: "7" days
   - Instructions: "Take with food"
4. Submit and verify it appears in visit

## Expected API Calls

### **Visit Detail Page Load**
```
GET /portal/medical/visits/{id}
```

### **Add Diagnosis**
```
POST /portal/medical/diagnoses
Content-Type: application/json

{
  "visit_id": 123,
  "diagnosis_code": "J44.1", 
  "description": "COPD with acute exacerbation"
}
```

### **Add Prescription**
```
POST /portal/medical/prescriptions  
Content-Type: application/json

{
  "visit_id": 123,
  "medication_name": "Amoxicillin",
  "dosage": "500mg twice daily", 
  "duration_days": 7,
  "instructions": "Take with food"
}
```

## User Access Testing

### **Login as Doctor**
- Login Type: "Medical Staff"
- Should have full access to add diagnoses and prescriptions

### **Login as Nurse**  
- Login Type: "Medical Staff"
- Should see read-only view of diagnoses and prescriptions

### **Error Cases to Test**
- ✅ Invalid visit ID returns proper error
- ✅ Network errors handled gracefully
- ✅ Form validation works
- ✅ Role restrictions enforced

The new structure provides a much more clinical workflow-focused experience!
