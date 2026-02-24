# Global Copilot Instructions (Spring Boot + React + JWT)

## Language & Output
- 답변/설명은 한국어로 작성한다.
- 코드 주석은 한국어로 작성한다.
- 불필요한 장문 설명 대신 “바로 실행 가능한 단계/코드”를 우선 제공한다.

## Repository Awareness
- 변경 전 반드시 기존 코드베이스(패키지/폴더/네이밍/컨벤션)를 우선 탐색하고 그 스타일을 따른다.
- 유사한 구현이 이미 있으면 새로 만들지 말고 재사용/확장한다.

## Backend (Spring Boot 4.x, Java 21)
- 아키텍처: Controller → Service → Repository → Entity/DTO 구조 유지
- API는 REST 원칙을 따르고 ResponseEntity 기반으로 응답
- Validation: jakarta.validation 사용, @Valid 적용
- 예외 처리: @RestControllerAdvice 기반 글로벌 예외 처리로 통합
- DTO 분리: Request/Response DTO 분리, Entity를 Controller에 직접 노출 금지
- JPA: Lazy 기본, N+1 주의, 필요 시 fetch join/EntityGraph 고려
- 로깅: SLF4J 사용, System.out 금지

## Security (JWT)
- 인증 방식: Authorization: Bearer <token>
- 인증/인가 로직은 security 패키지로 분리
- 로그인/회원가입/토큰 발급은 /api/v1/auth/* 하위
- 비밀번호는 BCrypt로 해시 저장 (평문 저장 금지)
- 토큰/시크릿 등 민감정보는 환경변수로 주입

## Frontend (React, Vite, Tailwind)
- 컴포넌트: PascalCase, 함수/변수: camelCase
- API 호출: axios 인스턴스 사용, 토큰/에러 처리를 인터셉터로 통합
- 토큰 저장: localStorage 기본 (추후 httpOnly 쿠키 옵션 고려 가능)
- 인증 흐름: 로그인 성공 시 토큰 저장 → 이후 요청에 Bearer 자동 첨부 → 401 시 로그아웃/리다이렉트

## Integration (Contract First)
- API 스펙을 먼저 정의하고, BE/FE는 스펙을 반드시 준수한다.
- 에러 응답은 표준 형식(code, message, timestamp, path, details)을 유지한다.

## Quality
- 신규 기능은 최소 1개 이상의 테스트(단위/통합) 추가를 원칙으로 한다.
- 변경 파일 목록과 실행 방법을 마지막에 요약한다.