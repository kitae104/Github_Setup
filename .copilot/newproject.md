# 새 프로젝트 이관 체크리스트 (현재 저장소 기반)

이 문서는 `Github_Setup`을 템플릿처럼 복제해 **새 프로젝트를 시작할 때 반드시 수정해야 할 항목**을 정리한 가이드입니다.

---

## 0) 먼저 결정할 값 (복붙용)

아래 값을 먼저 정하면 이후 치환/수정이 빨라집니다.

- `NEW_PROJECT_NAME` : 예) `Acme Workspace`
- `NEW_BRAND_TEXT` : 예) `Acme PM`
- `NEW_BACKEND_GROUP_ID` : 예) `com.acme`
- `NEW_BACKEND_ARTIFACT_ID` : 예) `acme-backend`
- `NEW_BASE_PACKAGE` : 예) `com.acme.workspace`
- `NEW_DB_NAME` : 예) `acme_db`
- `NEW_DB_USER` / `NEW_DB_PASSWORD`
- `NEW_FRONTEND_ORIGIN` : 예) `http://localhost:5173` 또는 실제 도메인
- `NEW_BACKEND_URL` : 예) `http://localhost:8080` 또는 실제 API 도메인
- `NEW_JWT_SECRET` : 충분히 긴 랜덤 문자열
- `NEW_JWT_EXP_SECONDS` : 예) `3600`

---

## 1) 필수 수정 항목 (체크리스트)

### A. 백엔드 식별자/패키지

- [ ] `backend/pom.xml`
    - [ ] `groupId` 변경 (`com.example` → 신규 값)
    - [ ] `artifactId`, `name`, `description` 변경
- [ ] Java 패키지명 변경
    - [ ] `backend/src/main/java/com/example/backend/**`
    - [ ] `backend/src/test/java/com/example/backend/**`
    - [ ] 모든 `package`, `import` 구문 일괄 수정

### B. DB/JWT/비밀값

- [ ] `backend/src/main/resources/secret.properties`
    - [ ] `spring.datasource.url` 의 DB명(`setup`) 변경
    - [ ] DB 사용자/비밀번호 변경
    - [ ] `app.jwt.secret` 기본값 의존 제거, 환경변수로 운영
    - [ ] `app.jwt.expiration-seconds` 정책값으로 변경
- [ ] 운영 시 `secret.properties` 직접 커밋 금지 유지 (`.gitignore` 이미 등록됨)

### C. API/CORS/포트

- [ ] `backend/src/main/resources/application.properties`
    - [ ] `server.port` 필요 시 변경
    - [ ] `spring.jpa.hibernate.ddl-auto=update` 운영 정책에 맞게 조정(`validate` 또는 `none` 권장)
- [ ] `backend/src/main/java/.../security/SecurityConfig.java`
    - [ ] `allowedOriginPatterns`를 새 프론트 주소로 변경

### D. 프론트 연동값/브랜딩

- [ ] `frontend/vite.config.js`
    - [ ] `/api` 프록시 `target`을 새 백엔드 주소로 변경
- [ ] `frontend/src/components/Navbar.jsx`
    - [ ] 로고 텍스트 `Setup PM`을 신규 서비스명으로 변경
- [ ] `frontend/src/pages/LandingPage.jsx`
    - [ ] 랜딩 카피(제품명/연도/문구) 신규 서비스 기준으로 변경
- [ ] (선택) `frontend/package.json`
    - [ ] `name`, `version` 규칙 맞게 조정

### E. 문서/실행 안내

- [ ] `README.md`
    - [ ] 절대 경로(`d:\Githubs\...`)를 새 경로로 수정
    - [ ] curl URL/포트/도메인 변경
    - [ ] CORS/JWT/배포 전 체크리스트 문구를 새 프로젝트 정책으로 정리

### F. 테스트 데이터/고정 문자열

- [ ] `backend/src/test/.../AuthControllerIntegrationTest.java`
    - [ ] 테스트 이메일/사용자명/패스워드 정책에 맞게 변경

---

## 2) 권장 추가 작업

- [ ] `backend/src/main/resources/application-dev.properties`, `application-prod.properties` 분리
- [ ] 프론트 API 베이스 URL을 환경변수(`.env`) 기반으로 전환
- [ ] 비밀값은 로컬 `.env`/시크릿 매니저로 이동 (Git 추적 제외)
- [ ] `frontend/dist` 산출물은 버전관리 제외 여부 점검

---

## 3) 빠른 자동 설정 (PowerShell 예시)

아래는 **반자동 치환** 예시입니다. 실행 전에 반드시 새 값으로 변경하세요.

```powershell
# 프로젝트 루트에서 실행

# 1) 문자열 치환 대상 값
$OLD_PACKAGE = 'com.example.backend'
$NEW_PACKAGE = 'com.acme.workspace'
$OLD_BRAND = 'Setup PM'
$NEW_BRAND = 'Acme PM'
$OLD_DB_NAME = 'setup'
$NEW_DB_NAME = 'acme_db'
$OLD_BACKEND_URL = 'http://localhost:8080'
$NEW_BACKEND_URL = 'http://localhost:8080'
$OLD_FRONT_ORIGIN = 'http://localhost:5173'
$NEW_FRONT_ORIGIN = 'http://localhost:5173'

# 2) 텍스트 일괄 치환 (소스 파일)
$files = Get-ChildItem -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\node_modules\\|\\target\\|\\dist\\'
}

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $updated = $c.Replace($OLD_PACKAGE, $NEW_PACKAGE)
    $updated = $updated.Replace($OLD_BRAND, $NEW_BRAND)
    $updated = $updated.Replace($OLD_BACKEND_URL, $NEW_BACKEND_URL)
    $updated = $updated.Replace($OLD_FRONT_ORIGIN, $NEW_FRONT_ORIGIN)
    $updated = $updated.Replace('jdbc:mysql://localhost:3306/' + $OLD_DB_NAME, 'jdbc:mysql://localhost:3306/' + $NEW_DB_NAME)

    if ($updated -ne $c) {
        Set-Content -Path $f.FullName -Value $updated -Encoding UTF8
    }
}

# 3) 패키지 폴더 이동 (예시)
# backend/src/main/java/com/example/backend -> backend/src/main/java/com/acme/workspace
# backend/src/test/java/com/example/backend -> backend/src/test/java/com/acme/workspace
# (폴더 이동 후 package/import가 맞는지 컴파일로 검증 필수)
```

> 주의: 패키지 폴더 이동은 자동 치환만으로 100% 안전하지 않습니다. 이동 후 `mvn test`로 반드시 검증하세요.

---

## 4) 최종 검증 명령

```powershell
# backend
cd backend
mvn -q test

# frontend
cd ..\frontend
npm install
npm run build
```

검증 포인트:

- 로그인/회원가입/`/api/v1/auth/me` 정상 동작
- CORS 오류 없음
- JWT 만료 시 프론트 리다이렉트 동작 정상
- DB 연결/DDL 정책 의도대로 적용

---

## 5) 이 문서로 바로 진행하는 순서 (권장)

1. `0) 먼저 결정할 값`을 먼저 채움
2. `1) 필수 수정 항목` 체크하면서 파일 수정
3. `3) 빠른 자동 설정`의 치환 스크립트는 필요한 범위만 사용
4. `4) 최종 검증 명령`으로 동작 확인
5. README를 새 프로젝트 기준으로 정리 후 마무리
