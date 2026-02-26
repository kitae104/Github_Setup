# Frontend Auth (JWT)

## Token Storage
- accessToken은 localStorage에 저장 (key 예: "accessToken")
- axios interceptor로 Authorization 헤더 자동 첨부

## Auth Flow
- Login 성공 -> 토큰 저장 -> / (또는 dashboard) 이동
- 401 응답 -> 토큰 제거 -> /login 이동
- /me 호출로 로그인 상태 확인 가능

## API Modules
- authApi.register(payload)
- authApi.login(payload) -> returns token
- authApi.me() -> returns profile