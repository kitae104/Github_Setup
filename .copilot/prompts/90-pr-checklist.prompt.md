# PR Checklist (Auth 포함)

- [ ] /api/v1/auth/register, /login, /me 동작 확인
- [ ] 비밀번호 BCrypt 해시 저장 확인
- [ ] JWT 시크릿/만료 환경변수 주입 확인
- [ ] axios interceptor로 Bearer 자동 첨부 확인
- [ ] 401 발생 시 토큰 삭제 + 로그인 페이지 이동 확인
- [ ] 표준 에러 응답 형식 통일 확인
- [ ] 테스트 최소 1개 이상 추가 확인