# Backend Integration Guide - Three Login Types

## API Endpoints Expected

### 1. Patient Login
**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "patient@example.com",
  "password": "password123"
}
```

**Expected Response**:
```json
{
  "token": "jwt_token_here",
  "user_type": "patient",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "patient@example.com",
    // ... other patient fields
  }
}
```

### 2. Clinic Staff Login
**Endpoint**: `POST /auth/clinic-login`

**Request Body**:
```json
{
  "email": "admin@clinic.com",
  "password": "password123",
  "login_type": "staff"
}
```

**Expected Response**:
```json
{
  "token": "jwt_token_here",
  "user_type": "clinic_staff",
  "login_type": "staff",
  "user": {
    "id": 1,
    "name": "Local Clinic",
    "address": "Village 1",
    // ... other clinic fields
  }
}
```

### 3. Medical Staff Login
**Endpoint**: `POST /auth/clinic-login`

**Request Body**:
```json
{
  "email": "doctor@clinic.com",
  "password": "password123",
  "login_type": "medical"
}
```

**Expected Response for Doctor**:
```json
{
  "token": "jwt_token_here",
  "user_type": "doctor",
  "login_type": "medical", 
  "user": {
    "id": 1,
    "full_name": "Dr. John Smith",
    "email": "doctor@clinic.com",
    "role": "Doctor",
    // ... other staff fields
  }
}
```

**Expected Response for Nurse**:
```json
{
  "token": "jwt_token_here",
  "user_type": "nurse",
  "login_type": "medical",
  "user": {
    "id": 2,
    "full_name": "Jane Nurse",
    "email": "nurse@clinic.com", 
    "role": "Nurse",
    // ... other staff fields
  }
}
```

## Backend Validation Logic

Your backend should validate the `login_type` parameter as follows:

```go
const (
    ClinicLoginStaff   ClinicLoginType = "staff"
    ClinicLoginMedical ClinicLoginType = "medical"
)

func ValidateLoginType(loginType string) error {
    switch loginType {
    case string(ClinicLoginStaff):
        // Validate user is clinic_staff
        return validateClinicStaff(user)
    case string(ClinicLoginMedical):
        // Validate user is doctor or nurse
        return validateMedicalStaff(user) 
    default:
        return errors.New("invalid login type")
    }
}
```

## User Type Mapping

| Frontend Login Selection | login_type Parameter | Expected user_type | Portal Redirect |
|-------------------------|---------------------|-------------------|----------------|
| "Patient" | None (different endpoint) | "patient" | `/patient` |
| "Clinic Staff" | "staff" | "clinic_staff" | `/clinic` |
| "Medical Staff" | "medical" | "doctor" or "nurse" | `/portal/medical` |

## Staff Creation API

**Endpoint**: `POST /api/v1/staff`

**Request Body**:
```json
{
  "full_name": "Dr. John Smith",
  "role": "Doctor",
  "email": "doctor@clinic.com",
  "phone": "+1234567890",
  "password": "secure_password"
}
```

**Expected Response**:
```json
{
  "id": 1,
  "full_name": "Dr. John Smith", 
  "role": "Doctor",
  "email": "doctor@clinic.com",
  "phone": "+1234567890",
  "created_at": "2025-07-12T12:00:00Z"
}
```

## Important Backend Requirements

1. **Role Validation**: Ensure `login_type: "staff"` only allows `clinic_staff` users
2. **Medical Validation**: Ensure `login_type: "medical"` only allows `doctor` and `nurse` users
3. **Password Creation**: When creating staff via the API, ensure they can login with email/password
4. **JWT Claims**: Include `user_type` and `login_type` in JWT tokens for authorization
5. **Error Handling**: Return clear error messages for invalid login_type combinations

## Security Considerations

- Validate login_type matches user's actual role in database
- Implement rate limiting on login endpoints
- Use secure password hashing for staff creation
- Validate email uniqueness across the system
- Implement proper CORS headers for frontend domain

This implementation ensures complete separation between administrative staff and medical practitioners while maintaining a unified login experience.
