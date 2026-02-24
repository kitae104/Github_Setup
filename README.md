# Spring Boot + React(Vite) JWT Auth E2E

이 저장소는 `Spring Boot(backend)` + `React Vite(frontend)` 통합 프로젝트이며,
JWT 기반 회원가입/로그인/내정보 조회(`/api/v1/auth/me`)를 end-to-end로 구현합니다.

## 구현 범위

### Backend API

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login` (JWT accessToken 발급)
- `GET /api/v1/auth/me` (인증 필요)

### Frontend 화면

- `/register` 회원가입 페이지
- `/login` 로그인 페이지
- `/` 내정보 페이지 (`/api/v1/auth/me` 조회)

## 사전 준비

- Java 21+
- Maven 3.9+
- Node.js 18+
- npm 9+

## 실행 방법
백엔드: cd /d d:\Githubs\Vibe_WS\Github_Setup\backend && mvn spring-boot:run

프론트: cd /d d:\Githubs\Vibe_WS\Github_Setup\frontend && npm run dev

테스트: cd /d d:\Githubs\Vibe_WS\Github_Setup\backend && mvn test -q

### 1) Backend 실행

```bash
cd /d d:\Githubs\Vibe_WS\Github_Setup\backend
mvn spring-boot:run
```

- 기본 포트: `8080`
- DB: H2 in-memory (`application.yml`)

### 2) Frontend 실행

```bash
cd /d d:\Githubs\Vibe_WS\Github_Setup\frontend
npm install
npm run dev
```

- 기본 포트: `5173`
- Vite proxy로 `/api` 요청은 `http://localhost:8080`으로 전달됨

## 테스트

### Backend 테스트

```bash
cd /d d:\Githubs\Vibe_WS\Github_Setup\backend
mvn test -q
```

`AuthControllerIntegrationTest`에서 회원가입 → 로그인 → `/me` 흐름을 검증합니다.

## curl 빠른 점검

### 1) 회원가입

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user1@example.com\",\"password\":\"password123\",\"fullName\":\"테스트 유저\"}"
```

### 2) 로그인 (토큰 발급)

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user1@example.com\",\"password\":\"password123\"}"
```

응답의 `data.accessToken` 값을 복사합니다.

### 3) 내정보 조회 (인증 필요)

```bash
curl http://localhost:8080/api/v1/auth/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## 인증 동작 요약

- 로그인 성공 시 프론트는 `localStorage(accessToken)`에 토큰 저장
- Axios request interceptor가 자동으로 `Authorization: Bearer <token>` 헤더 추가
- 응답이 `401`이면 토큰 삭제 후 `/login`으로 이동

## 응답 형식

### 성공

```json
{
  "data": { ... }
}
```

### 에러

```json
{
    "code": "ERROR_CODE",
    "message": "오류 메시지",
    "timestamp": "2026-02-25T00:00:00Z",
    "path": "/api/v1/auth/me",
    "details": null
}
```

## 트러블슈팅

### 1) 포트 충돌

- Backend `8080` 충돌 시: 실행 중인 프로세스를 종료하거나 `server.port`를 변경하세요.
- Frontend `5173` 충돌 시: `npm run dev -- --port 5174`로 다른 포트에서 실행할 수 있습니다.

### 2) CORS 오류

- 증상: 브라우저 콘솔에 CORS 차단 메시지가 보이고 API 호출이 실패함.
- 확인: Backend `SecurityConfig`의 CORS 허용 origin에 프론트 주소(`http://localhost:5173`)가 포함되어야 합니다.
- 확인: Vite 개발 서버를 프록시 설정(`vite.config.js`)과 동일한 포트로 실행해야 합니다.

### 3) JWT 만료/401

- 증상: `/api/v1/auth/me` 호출 시 `401 Unauthorized`.
- 동작: 프론트 interceptor가 토큰을 삭제하고 `/login`으로 이동합니다.
- 조치: 다시 로그인해서 새 `accessToken`을 발급받으세요.
- 개발 중 만료 시간을 바꾸려면 Backend `application.yml`의 `app.jwt.expiration-seconds`를 조정하세요.

## 배포 전 체크리스트

- `JWT_SECRET`을 기본값이 아닌 충분히 긴 랜덤 문자열로 환경변수 설정
- `JWT_EXPIRATION_SECONDS`를 서비스 정책에 맞게 조정 (너무 길거나 짧지 않게)
- Backend CORS origin을 실제 프론트 도메인만 허용하도록 제한
- 프로덕션 DB 사용 시 `spring.jpa.hibernate.ddl-auto=validate` 또는 `none` 검토
- 에러 응답에 민감 정보(스택트레이스/내부 경로)가 노출되지 않는지 점검
