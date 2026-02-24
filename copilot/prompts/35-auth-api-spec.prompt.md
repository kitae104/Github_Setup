# Auth API Spec (Contract First)

## Register
POST /api/v1/auth/register
Request:
- email: string (required, email)
- password: string (required, min 8)
- fullName: string (optional)

Response 200:
{ data: { id, email, fullName? } }

Possible errors:
- AUTH_EMAIL_ALREADY_EXISTS
- VALIDATION_ERROR

## Login
POST /api/v1/auth/login
Request:
- email: string (required)
- password: string (required)

Response 200:
{ data: { accessToken, tokenType: "Bearer", expiresInSeconds } }

Possible errors:
- AUTH_INVALID_CREDENTIALS
- VALIDATION_ERROR

## Me
GET /api/v1/auth/me
Header: Authorization: Bearer <token>

Response 200:
{ data: { id, email, fullName?, roles? } }

Errors:
- AUTH_UNAUTHORIZED (401)
- AUTH_FORBIDDEN (403)