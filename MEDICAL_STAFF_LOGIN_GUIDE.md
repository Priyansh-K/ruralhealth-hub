# Medical Staff Login Guide - Three Login Types

## Login Type Overview

The system now supports **three distinct login types** with specific `login_type` parameters sent to the backend:

| Login Type | User Types | Portal Access | Backend Parameter |
|------------|------------|---------------|-------------------|
| **Patient** | `patient` | `/patient` | Not sent (patient endpoint) |
| **Clinic Staff** | `clinic_staff` | `/clinic` | `login_type: "staff"` |
| **Medical Staff** | `doctor`, `nurse` | `/portal/medical` | `login_type: "medical"` |

## How to Create Doctor and Nurse Accounts

### Step 1: Login as Clinic Administrator
1. Go to the login page at `/auth/login`
2. Select **"Clinic Staff"** login type (sends `login_type: "staff"`)
3. Enter your clinic administrator credentials
4. You will be redirected to the clinic portal at `/clinic`

### Step 2: Add Medical Staff
1. In the clinic portal, navigate to **"Staff"** in the sidebar
2. Click the **"Add Staff Member"** button
3. Fill out the form:
   - **Full Name**: Enter the doctor/nurse's full name
   - **Role**: Select either "Doctor" or "Nurse"
   - **Email**: Enter their email address (this will be their login username)
   - **Phone**: Enter their phone number
   - **Password**: Set a password for them to login (this field appears only for doctors and nurses)

4. Click **"Add Staff Member"** to create the account

### Step 3: Medical Staff Login Process
1. The newly created doctor/nurse can now login at `/auth/login`
2. They should select **"Medical Staff"** login type (sends `login_type: "medical"`)
3. Enter their email and password
4. They will be redirected to the medical portal at `/portal/medical`

## Login Flow Details

### Patient Login
- **Selection**: "Patient" button
- **Backend Call**: `POST /auth/login` (no login_type parameter)
- **Expected Response**: `user_type: "patient"`
- **Redirect**: `/patient`

### Clinic Staff Login
- **Selection**: "Clinic Staff" button  
- **Backend Call**: `POST /auth/clinic-login` with `login_type: "staff"`
- **Expected Response**: `user_type: "clinic_staff"`
- **Redirect**: `/clinic`

### Medical Staff Login
- **Selection**: "Medical Staff" button
- **Backend Call**: `POST /auth/clinic-login` with `login_type: "medical"`
- **Expected Response**: `user_type: "doctor"` or `user_type: "nurse"`
- **Redirect**: `/portal/medical`

## Portal Access Overview

### Clinic Portal (`/clinic`) - For Clinic Administrators
- **Access**: Clinic staff with administrative role
- **Functions**:
  - Patient registration and management
  - Staff management (creating doctor/nurse accounts)
  - Administrative reporting
  - Visit scheduling
  - Read-only view of medical records

### Medical Portal (`/portal/medical`) - For Doctors and Nurses
- **Access**: Doctors and nurses with login credentials
- **Functions**:
  - Medical record creation and management
  - Diagnosis creation and tracking (doctors only)
  - Prescription management (doctors only)
  - Patient medical history review
  - Visit documentation with medical details

## Role-Based Access in Medical Portal

### Doctors
- Full access to all medical portal features
- Can create diagnoses
- Can create prescriptions
- Can manage all medical records

### Nurses
- Access to medical portal
- Can create and manage visits
- Can view diagnoses and prescriptions
- **Cannot** create diagnoses or prescriptions

## Important Notes

1. **Password Security**: When creating medical staff accounts, ensure strong passwords are used
2. **Email Uniqueness**: Each medical staff member must have a unique email address
3. **Role Permissions**: Doctor and nurse roles have different permissions in the medical portal
4. **Login Type**: Medical staff must always select "Medical Staff" when logging in (not "Patient")

## Troubleshooting

### "Dashboard goes to wrong page"
- Ensure you selected "Medical Staff" during login
- Doctors and nurses should be redirected to `/portal/medical`
- Clinic administrators should go to `/clinic`

### "Cannot create diagnoses/prescriptions"
- Only doctors can create diagnoses and prescriptions
- Nurses have read-only access to these features
- Check that the user role is set correctly when creating the account

### "Login not working"
- Verify the email and password are correct
- Ensure "Medical Staff" login type is selected
- Check that the account was created properly in the clinic portal

## Backend Requirements

For this system to work properly, your backend should:

1. **Support staff creation endpoint**: `POST /api/v1/staff`
2. **Handle clinic login**: `POST /api/v1/auth/clinic/login`
3. **Return proper user types**: `doctor`, `nurse`, `clinic_staff`
4. **Support role-based authentication**: Different permissions for different roles

## Example Staff Creation Payload

When creating a doctor or nurse, the frontend sends:

```json
{
  "full_name": "Dr. John Smith",
  "role": "Doctor",
  "email": "john.smith@clinic.com",
  "phone": "+1234567890",
  "password": "secure_password"
}
```

The backend should create a user account that can login with the email/password and return the appropriate user_type ("doctor" or "nurse") in the login response.
