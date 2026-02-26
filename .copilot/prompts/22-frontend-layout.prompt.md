# Frontend Layout (Landing + Navbar + Footer)

## Goal

- 메인 랜딩 페이지(`/`)를 추가/정리한다.
- 공통 `Navbar`, `Footer`를 만들고 모든 페이지 레이아웃에 적용한다.
- 기존 인증 페이지(`/login`, `/register`)와 자연스럽게 연결한다.

## Tech/Style

- React + Vite + react-router-dom 기준으로 구현한다.
- 스타일은 `src/styles.css` 중심으로 작성하고 클래스 네이밍은 단순/일관되게 유지한다.
- 과한 UI 프레임워크 도입 없이 현재 프로젝트 톤과 비슷한 기본 UI로 구성한다.

## Structure

- `src/components/Navbar.jsx` 생성
- `src/components/Footer.jsx` 생성
- `src/pages/LandingPage.jsx` 생성
- `src/App.jsx`에서 공통 레이아웃(`Navbar` -> `main` -> `Footer`)을 사용한다.

## Navbar Requirements

- 좌측: 서비스명(예: `JWT Auth Demo`) 클릭 시 `/` 이동
- 우측: `홈`, `로그인`, `회원가입` 링크 표시
- 현재 라우트와 충돌 없이 기존 라우팅을 유지한다.

## Landing Page Requirements

- 간단한 Hero 섹션(제목/설명/CTA 버튼 1~2개)
- CTA 예시: `로그인`, `회원가입`
- 아래에 프로젝트 요약 섹션 1개(예: 기능 3가지 bullet)
- 텍스트는 한국어 기본 문구로 작성한다.

## Footer Requirements

- 저작권 한 줄 + 간단한 설명 한 줄
- 모든 페이지 하단에 고정이 아닌 일반 문서 흐름으로 배치한다.

## Routing Rules

- `/` -> `LandingPage`
- `/login` -> `LoginPage`
- `/register` -> `RegisterPage`
- 기존 `*` fallback 라우트 정책은 유지한다.

## Compatibility

- 기존 `MePage`가 필요하다면 `/me` 경로로 유지해도 된다.
- 기존 API/auth 로직(`src/api/*`, 토큰 저장/인터셉터)은 수정하지 않는다.

## Done Criteria

- 앱 실행 시 상단 `Navbar`, 중앙 페이지 콘텐츠, 하단 `Footer`가 보인다.
- `/`, `/login`, `/register` 이동이 정상 동작한다.
- 스타일/코드는 현재 프로젝트 구조와 충돌 없이 동작한다.
