# Security & JWT Rules

## User Model
- User 엔티티는 최소: id, email(또는 username), passwordHash, fullName(optional), role(optional), createdAt/updatedAt(optional)
- 이메일/아이디는 unique 제약
- 비밀번호는 BCrypt 해시로 저장 (평문 금지)

## Auth Endpoints
- POST /api/v1/auth/register : 회원가입
- POST /api/v1/auth/login    : 로그인(토큰 발급)
- GET  /api/v1/auth/me       : 내 정보(인증 필요)
- POST /api/v1/auth/logout   : 프론트 토큰 삭제 방식(서버는 stateless; 필요 시 블랙리스트는 추후)

## JWT
- Access token 중심 (리프레시는 옵션)
- Claims: sub(email/username), roles(optional), iat, exp
- 만료 시간/시크릿은 application.yml에서 환경변수로 주입

## Response
- 성공: { data: ... }
- 실패: { code, message, timestamp, path, details? }

## Security Config
- /api/v1/auth/** 는 permitAll
- 그 외 /api/v1/** 는 기본 authenticated
- CORS는 프론트 주소(개발: http://localhost:5173) 허용