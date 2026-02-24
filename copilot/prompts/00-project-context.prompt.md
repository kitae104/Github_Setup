# Project Context (Spring + React + JWT)

## Goal
- Spring Boot(backend) + React(vite)(frontend) 통합 웹앱
- JWT 기반 인증(회원가입/로그인/인가) 포함
- Contract First로 API를 명세하고 BE/FE가 동일 스펙을 따른다.

## Folders
- backend/: Spring Boot 4.x (Java 21, Maven)
- frontend/: React + Vite + Tailwind

## Defaults
- API prefix: /api/v1
- Auth header: Authorization: Bearer <token>
- Error response format is standardized across all endpoints.