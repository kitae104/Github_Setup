# API Contract

## Standard Success
{ "data": ... }

## Standard Error
{
  "code": "AUTH_INVALID_CREDENTIALS",
  "message": "아이디 또는 비밀번호가 올바르지 않습니다.",
  "timestamp": "2026-02-24T12:34:56Z",
  "path": "/api/v1/auth/login",
  "details": { ... }
}