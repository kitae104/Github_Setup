현재 repo는 Spring Boot(backend) + React Vite(frontend) 통합 프로젝트다.
copilot/instructions.md 및 copilot/prompts/* 규칙을 최우선으로 적용해라.

목표: JWT 기반 회원가입/로그인/내정보(/me)까지 end-to-end로 구현한다.

요구사항:
1) Backend
- POST /api/v1/auth/register
- POST /api/v1/auth/login (JWT accessToken 발급)
- GET /api/v1/auth/me (인증 필요)
- 표준 성공/에러 응답 형식 유지
- BCrypt 해시 저장, 이메일 unique
- 최소 1개 테스트 추가

2) Frontend
- /register, /login 페이지 생성
- 로그인 성공 시 토큰 저장(localStorage) 및 axios interceptor로 Bearer 자동 첨부
- /me로 로그인 상태 확인 후 화면 표시
- 401이면 토큰 제거 후 /login 이동

작업 후:
- 변경 파일 목록
- backend 실행 방법, frontend 실행 방법
- 간단한 curl 테스트 예시