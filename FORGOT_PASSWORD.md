# Forgot Password System Documentation

## Overview

The Forgot Password system in FreshCart is a secure, three-stage password recovery mechanism that allows users to reset their passwords when they forget them. The system is built with React, using Formik for form management, Yup for validation, and Axios for API communication.

## System Architecture

### Components Structure

```
src/components/
├── ForgotPassword.jsx    # Stage 1: Email submission
├── VerifyCode.jsx        # Stage 2: Code verification
└── ResetPassword.jsx     # Stage 3: Password reset
```

### Flow Diagram

```
┌─────────────────┐
│  Login Page     │
│ [Forgot Link]   │
└────────┬────────┘
         │
         v
┌─────────────────────────────────────────────┐
│ Stage 1: ForgotPassword.jsx                 │
│ - User enters email                         │
│ - Email stored in localStorage              │
│ - API: POST /auth/forgotPasswords           │
└────────┬────────────────────────────────────┘
         │ (success)
         v
┌─────────────────────────────────────────────┐
│ Stage 2: VerifyCode.jsx                     │
│ - User enters 6-digit code                  │
│ - Can resend code if expired                │
│ - API: POST /auth/verifyResetCode           │
│ - Resend API: POST /auth/forgotPasswords    │
└────────┬────────────────────────────────────┘
         │ (success)
         v
┌─────────────────────────────────────────────┐
│ Stage 3: ResetPassword.jsx                  │
│ - Email pre-filled from localStorage        │
│ - User enters new password + confirmation   │
│ - API: PUT /auth/resetPassword              │
│ - localStorage cleared on success           │
└────────┬────────────────────────────────────┘
         │ (success)
         v
┌─────────────────┐
│  Login Page     │
└─────────────────┘
```

## Stage Details

### Stage 1: ForgotPassword Component

**Location**: `src/components/ForgotPassword.jsx`

**Purpose**: Initiate the password reset process by requesting a verification code.

**Key Features**:
- Email validation using Yup schema
- Error and success message display
- Loading state during API call
- Email persistence in localStorage
- Navigation back to login page

**API Endpoint**:
```javascript
POST https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
Body: { email: "user@example.com" }
Response: { statusMsg: "success", message: "Reset code sent..." }
```

**State Management**:
```javascript
const [errMsg, setErrMsg] = useState("");       // Error messages
const [successMsg, setSuccessMsg] = useState(""); // Success messages
const [loading, setLoading] = useState(false);   // Loading state
```

**Validation Rules**:
- Email is required
- Email must be valid format

**Navigation**:
- Success → `/verify-code` (after 1.5s delay)
- Back link → `/login`

---

### Stage 2: VerifyCode Component

**Location**: `src/components/VerifyCode.jsx`

**Purpose**: Verify the user's identity using the code sent to their email.

**Key Features**:
- 6-digit code input with maxLength validation
- Resend code functionality
- Error handling for invalid/expired codes
- Navigation back to forgot password
- Email retrieval from localStorage

**API Endpoints**:

1. Verify Code:
```javascript
POST https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode
Body: { resetCode: "123456" }
Response: { status: "Success" }
```

2. Resend Code:
```javascript
POST https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
Body: { email: "user@example.com" }
Response: { statusMsg: "success", message: "Reset code sent..." }
```

**State Management**:
```javascript
const [errMsg, setErrMsg] = useState("");           // Error messages
const [successMsg, setSuccessMsg] = useState("");   // Success messages
const [loading, setLoading] = useState(false);      // Verify button loading
const [resendLoading, setResendLoading] = useState(false); // Resend button loading
const [resendMsg, setResendMsg] = useState("");     // Resend confirmation message
```

**Validation Rules**:
- Reset code is required
- Must be exactly 6 digits
- Numeric characters only

**Retry Logic**:
- Users can retry entering the code unlimited times
- "Resend Code" button allows requesting a new code
- Email is retrieved from localStorage for resend
- Resend clears the input field for new code entry

**Navigation**:
- Success → `/reset-password` (after 1.5s delay)
- Back link → `/forgot-password`

**Error Handling**:
- Invalid code: Display API error message
- Expired code: User can resend
- Missing email in localStorage: Prompt to restart process

---

### Stage 3: ResetPassword Component

**Location**: `src/components/ResetPassword.jsx`

**Purpose**: Allow users to set a new password for their account.

**Key Features**:
- Email pre-filled from localStorage
- Password and confirmation fields
- Password strength validation
- Match validation for confirmation
- localStorage cleanup on success
- Navigation back to verify code

**API Endpoint**:
```javascript
PUT https://ecommerce.routemisr.com/api/v1/auth/resetPassword
Body: { 
  email: "user@example.com",
  newPassword: "NewPass123"
}
Response: { token: "jwt-token" }
```

**State Management**:
```javascript
const [errMsg, setErrMsg] = useState("");       // Error messages
const [successMsg, setSuccessMsg] = useState(""); // Success messages
const [loading, setLoading] = useState(false);   // Loading state
```

**Validation Rules**:
- Email is required and must be valid format
- Password is required
- Password must start with uppercase letter
- Password must be 3-6 characters long (API requirement)
- Password must contain lowercase letters and numbers
- Password confirmation must match

**Email Pre-filling**:

The email is pre-filled using Formik's initialValues, which reads from localStorage at initialization:

```javascript
let formik = useFormik({
  initialValues: {
    email: localStorage.getItem('resetEmail') || "",
    newPassword: "",
    confirmPassword: "",
  },
  validationSchema,
  onSubmit: handleResetPassword,
});
```

**Navigation**:
- Success → `/login` (after 1.5s delay)
- Back link → `/verify-code`

**Cleanup**:
- `localStorage.removeItem('resetEmail')` on successful password reset

---

## Data Flow

### localStorage Usage

The system uses browser localStorage to maintain state across the three stages:

**Key**: `resetEmail`
**Purpose**: Store user's email for:
1. Pre-filling email in ResetPassword form
2. Enabling code resend in VerifyCode component

**Lifecycle**:
1. **Set**: In ForgotPassword component after successful code request
2. **Read**: In VerifyCode (for resend) and ResetPassword (for pre-fill)
3. **Remove**: In ResetPassword after successful password reset

**Code Example**:
```javascript
// Set (ForgotPassword.jsx)
localStorage.setItem('resetEmail', values.email);

// Get (VerifyCode.jsx, ResetPassword.jsx)
const email = localStorage.getItem('resetEmail');

// Remove (ResetPassword.jsx)
localStorage.removeItem('resetEmail');
```

---

## Error Handling

### Common Error Scenarios

1. **Network Errors**:
   ```javascript
   catch (error) {
     setErrMsg(error.response?.data?.message || "Default fallback message");
   }
   ```

2. **Invalid Email**: Handled by Yup validation before API call
3. **Invalid Code**: API returns error, displayed to user with retry option
4. **Expired Code**: User can use "Resend Code" button
5. **Weak Password**: Yup validation prevents submission
6. **Password Mismatch**: Yup validation catches before submission
7. **Missing localStorage Data**: Component displays helpful error message

### Error Message Display

All components use consistent error display:
```jsx
{errMsg ? (
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                  dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{errMsg}</span>
  </div>
) : ""}
```

---

## Form Validation

### Technology

- **Formik**: Form state management and submission handling
- **Yup**: Schema-based form validation

### Validation Schemas

**ForgotPassword**:
```javascript
Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid")
});
```

**VerifyCode**:
```javascript
Yup.object().shape({
  resetCode: Yup.string()
    .required("Verification code is required")
    .matches(/^[0-9]{6}$/, "Code must be 6 digits")
});
```

**ResetPassword**:
```javascript
Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid"),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(/^[A-Z][a-z0-9]{2,5}$/, 
      "Password must start with uppercase letter and be 3-6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password")
});
```

---

## User Experience Features

### Loading States

All forms show loading spinners during API calls:
```jsx
{loading ? (
  <i className="fa-solid fa-spinner animate-spin text-white"></i>
) : (
  "Button Text"
)}
```

### Success Feedback

Success messages are displayed with auto-redirect:
```javascript
setSuccessMsg("Success message");
setTimeout(() => {
  navigate("/next-page");
}, 1500);
```

### Navigation Fallbacks

Each stage includes a back link:
- ForgotPassword → Login
- VerifyCode → ForgotPassword
- ResetPassword → VerifyCode

This allows users to:
- Go back if they remember their password
- Restart the process if needed
- Navigate freely between stages

### Retry Mechanisms

1. **ForgotPassword**: User can resubmit email anytime
2. **VerifyCode**: 
   - Can retry entering code unlimited times
   - "Resend Code" button for new code
3. **ResetPassword**: Can retry password reset if it fails

---

## Routing Configuration

**File**: `src/App.jsx`

```javascript
{
  path: "forgot-password",
  element: <ForgotPassword />,
},
{
  path: "verify-code",
  element: <VerifyCode />,
},
{
  path: "reset-password",
  element: <ResetPassword />,
}
```

**Note**: These routes are not protected and are accessible to non-authenticated users.

---

## Security Considerations

1. **No Token Storage**: Password reset doesn't require user to be logged in
2. **Email Verification**: Multi-step process ensures user owns the email
3. **Time-Limited Codes**: API-enforced expiration on verification codes
4. **Server-Side Validation**: All validation is also done server-side
5. **HTTPS**: All API calls use HTTPS protocol
6. **localStorage Cleanup**: Email removed after successful reset

---

## Styling

### Technology

- **TailwindCSS**: Utility-first CSS framework
- **Flowbite**: Component library built on Tailwind

### Design Patterns

1. **Consistent Color Scheme**:
   - Primary: Green (`green-700`, `green-600`)
   - Error: Red (`red-800`, `red-50`)
   - Success: Green (`green-800`, `green-50`)
   - Info: Blue (`blue-800`, `blue-50`)

2. **Responsive Design**:
   - Mobile-first approach
   - Flex layouts with responsive breakpoints
   - `sm:` prefix for larger screens

3. **Dark Mode Support**:
   - `dark:` prefix for dark mode styles
   - Consistent dark mode color scheme

4. **Accessibility**:
   - `role="alert"` on error/success messages
   - Proper label associations
   - Focus states on inputs and buttons

---

## Testing the Flow

### Manual Testing Steps

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Test Stage 1 - ForgotPassword**:
   - Navigate to `/login`
   - Click "Forgot Password?" link
   - Try submitting without email (should show validation error)
   - Try submitting invalid email format (should show validation error)
   - Submit valid email
   - Verify success message appears
   - Verify redirect to `/verify-code`

3. **Test Stage 2 - VerifyCode**:
   - Enter invalid code (should show error)
   - Try entering non-numeric characters (should be blocked by validation)
   - Try entering more than 6 digits (should be limited by maxLength)
   - Click "Resend Code" (should show success message)
   - Click "Back to Forgot Password" (should navigate back)
   - Enter valid 6-digit code from email
   - Verify success message appears
   - Verify redirect to `/reset-password`

4. **Test Stage 3 - ResetPassword**:
   - Verify email is pre-filled
   - Try submitting with weak password (should show validation error)
   - Try submitting with non-matching confirmation (should show error)
   - Submit valid new password
   - Verify success message appears
   - Verify redirect to `/login`
   - Test login with new password

### Edge Cases to Test

1. **Direct URL Access**:
   - Access `/verify-code` directly without going through forgot password
   - Access `/reset-password` directly
   - Ensure proper error messages when localStorage is empty

2. **Browser Back Button**:
   - Use browser back button at each stage
   - Verify forms maintain proper state

3. **Multiple Attempts**:
   - Submit wrong code multiple times
   - Resend code multiple times
   - Verify no rate limiting issues

4. **Network Errors**:
   - Test with network disconnected
   - Verify error messages are user-friendly

---

## Troubleshooting

### Common Issues

1. **"Email not found" error in VerifyCode**:
   - **Cause**: localStorage cleared or accessed verify-code directly
   - **Solution**: Restart process from forgot-password page

2. **Email not pre-filled in ResetPassword**:
   - **Cause**: localStorage cleared between stages
   - **Solution**: User can manually enter email

3. **"Invalid code" persists after resend**:
   - **Cause**: Using old code after requesting new one
   - **Solution**: Check email for newest code

4. **Build warnings about chunk size**:
   - **Expected**: Large bundle due to comprehensive libraries
   - **Not blocking**: Application functions correctly

---

## Future Enhancements

Potential improvements for the system:

1. **Code Expiration Timer**: Display countdown showing when code expires
2. **Rate Limiting UI**: Show when user has requested too many codes
3. **Password Strength Meter**: Visual indicator of password strength
4. **Email Confirmation**: Confirm email before sending code
5. **SMS Option**: Alternative to email for code delivery
6. **Session Management**: Use session storage instead of localStorage
7. **Analytics**: Track completion rates for each stage
8. **Internationalization**: Multi-language support

---

## API Documentation

### Base URL
```
https://ecommerce.routemisr.com/api/v1/auth
```

### Endpoints

#### 1. Request Password Reset

```http
POST /forgotPasswords
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Success Response** (200 OK):
```json
{
  "statusMsg": "success",
  "message": "Reset code sent to your email"
}
```

**Error Response** (400 Bad Request):
```json
{
  "statusMsg": "fail",
  "message": "No user found with that email"
}
```

---

#### 2. Verify Reset Code

```http
POST /verifyResetCode
Content-Type: application/json

{
  "resetCode": "123456"
}
```

**Success Response** (200 OK):
```json
{
  "status": "Success"
}
```

**Error Response** (400 Bad Request):
```json
{
  "statusMsg": "fail",
  "message": "Invalid or expired reset code"
}
```

---

#### 3. Reset Password

```http
PUT /resetPassword
Content-Type: application/json

{
  "email": "user@example.com",
  "newPassword": "NewPass123"
}
```

**Success Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (400 Bad Request):
```json
{
  "statusMsg": "fail",
  "message": "Email or password invalid"
}
```

---

## Dependencies

### Core Dependencies

```json
{
  "axios": "^1.7.9",          // HTTP client
  "formik": "^2.4.6",         // Form management
  "yup": "^1.6.1",            // Validation schemas
  "react-router-dom": "^7.2.0" // Routing
}
```

### Installation

All dependencies are automatically installed with:
```bash
npm install
```

---

## Contributing

When contributing to the Forgot Password system:

1. **Maintain Consistency**: Follow existing patterns for forms and validation
2. **Test Thoroughly**: Test all three stages and edge cases
3. **Update Documentation**: Update this file with any changes
4. **Error Handling**: Ensure all errors are user-friendly
5. **Accessibility**: Maintain WCAG compliance
6. **Responsive Design**: Test on mobile and desktop

---

## Support

For issues or questions:
1. Check this documentation first
2. Review the component code comments
3. Test in browser DevTools with Network tab open
4. Check browser console for errors
5. Verify API endpoints are accessible

---

## Changelog

### Version 1.1 (Current)
- Added "Resend Code" functionality
- Added navigation back links between stages
- Implemented localStorage for email persistence
- Enhanced error handling with specific messages
- Added retry logic for all stages

### Version 1.0 (Initial)
- Basic three-stage forgot password flow
- Email submission
- Code verification
- Password reset
