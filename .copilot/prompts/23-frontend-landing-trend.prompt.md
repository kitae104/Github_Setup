# Frontend Landing Page (2026 Trend + Material Design)

## Goal

- 최신 트렌드의 랜딩 페이지를 `/` 경로에 구현한다.
- Tailwind CSS 중심으로 스타일링하고, 반응형/접근성/재사용성을 고려한다.
- 카드형 UI와 강한 Hero 섹션으로 첫 화면 완성도를 높인다.

## Tech & Library

- React + Vite + Tailwind CSS 기준으로 구현한다.
- 레이아웃은 CSS Grid + Flexbox를 함께 사용한다.
- 아이콘은 Font Awesome 기반으로 사용한다.
    - 권장: `react-icons`의 Font Awesome 세트(`react-icons/fa6`) 사용

## Layout Requirements

- 전체 페이지는 `Navbar -> Main -> Footer` 구조를 유지한다.
- Main 내부 섹션 배치는 Grid 중심으로 구성한다.
- 각 카드 내부 정렬/버튼 정렬은 Flexbox를 사용한다.
- 반응형 기준(예시)
    - 모바일: 1열
    - 태블릿: 2열
    - 데스크톱: 3열 이상

## Hero Section Requirements

- Hero 섹션에 대형 배경 이미지를 사용한다.
    - 배경 오버레이를 적용해 텍스트 가독성을 확보한다.
- 포함 요소
    - 메인 헤드라인
    - 서브 카피
    - CTA 버튼 2개 이상
- CTA 버튼은 반드시 아이콘 + 텍스트 조합으로 구성한다.
    - 예: `FaArrowRight`, `FaCirclePlay`, `FaUserPlus`

## Section Composition

아래 섹션을 카드형 UI로 구성한다.

1. 핵심 기능(Features)

- 3~6개 카드
- 각 카드: 아이콘, 제목, 설명

2. 사용 흐름(How it Works)

- 단계형 카드(1~3단계)
- 각 단계에 어울리는 아이콘 배치

3. 신뢰 요소(Why Us / Metrics / Testimonials 중 택1)

- 카드형 정보 블록
- 숫자/지표 또는 짧은 추천 문구 포함

## Icon Rules

- 각 주요 섹션 제목 옆에 아이콘을 배치한다.
- 카드마다 맥락에 맞는 아이콘 1개 이상 사용한다.
- 버튼에는 항상 아이콘과 텍스트를 함께 넣는다.

## Material Design Rules (M3)

- 시각 원칙
    - 명확한 계층 구조(타이포/간격/색 대비)
    - 충분한 여백(8pt 그리드 기반)
    - 일관된 라운드 코너와 그림자(표면 깊이 표현)
- 컴포넌트 원칙
    - 버튼/카드/입력은 상태(hover/focus/disabled) 표현
    - 포커스 링을 제공해 키보드 접근성 보장
- 타이포 원칙
    - Headline / Title / Body 계층을 분리
    - 본문 가독성 우선(줄 길이/줄간격 최적화)

## Accessibility & UX

- 모든 인터랙션 요소에 명확한 `:focus-visible` 스타일을 제공한다.
- 이미지에는 의미 있는 대체 텍스트를 제공한다.
- 색상만으로 정보를 전달하지 않는다(아이콘/텍스트 병행).
- 모바일에서 터치 타깃 크기를 충분히 확보한다.

## Implementation Scope

- 우선 생성/수정 대상
    - `src/pages/LandingPage.jsx`
    - 필요 시 `src/components` 하위에 섹션 컴포넌트 분리
    - `src/App.jsx` 라우팅에서 `/`를 LandingPage로 연결
- 기존 인증 로직(`src/api/*`)은 수정하지 않는다.

## Done Criteria

- Tailwind CSS 기반으로 스타일이 적용된다.
- Grid/Flexbox를 목적에 맞게 함께 사용한다.
- Hero + 카드형 섹션 + 아이콘 + CTA가 모두 포함된다.
- Material Design 가이드에 맞는 시각/상호작용 품질을 충족한다.
- `/`, `/login`, `/register` 라우팅이 깨지지 않는다.
