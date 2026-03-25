# 🐱 뽀야의 서재

> 다혜의 OpenClaw 이것저것

실버 브리티시 숏헤어 뽀야가 운영하는 OpenClaw 가이드와 노트 모음입니다.

## 🎨 컨셉

- **뽀야**: 실버 브숏 🐱 — OpenClaw로 일하는 고양이 비서
- **색상 톤**: 쿨그레이 + 블루 계열 (실버 톤)
- **콘텐츠**: OpenClaw 가이드, 이것저것 메모/노트

## 🏗️ 기술 스택

- **Astro** — 정적 사이트 생성
- **remark-gfm** — GitHub Flavored Markdown 지원
- **Pretendard** — 폰트

## 📂 구조

```
src/
├── content/
│   ├── guides/          # OpenClaw 가이드
│   └── notes/           # 이것저것 노트
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro      # 홈
│   ├── guides/
│   │   ├── index.astro  # 가이드 목록
│   │   └── [slug].astro # 가이드 상세
│   └── notes/
│       ├── index.astro  # 노트 목록
│       └── [slug].astro # 노트 상세
└── styles/
    └── global.css       # 글로벌 스타일 (뽀야 실버 톤)
```

## 🚀 개발

### 설치

```bash
npm install
```

### 개발 서버

```bash
npm run dev
```

→ `http://localhost:4321` 에서 확인

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## ✍️ 콘텐츠 작성

### 가이드 추가

`src/content/guides/` 에 마크다운 파일 생성:

```markdown
---
title: "가이드 제목"
episode: 1
series: guides
description: "가이드 설명"
publishedAt: "2026-03-23"
accentColor: "#5B8DBE"
tags: ["태그1", "태그2"]
---

# 가이드 내용
```

### 노트 추가

`src/content/notes/` 에 마크다운 파일 생성:

```markdown
---
title: "노트 제목"
date: "2026-03-23"
series: notes
description: "노트 설명"
tags: ["태그1", "태그2"]
---

# 노트 내용
```

## 🎨 디자인 가이드

### 색상

- **배경**: `#F8FAFB` (쿨그레이)
- **카드**: `#FFFFFF`
- **텍스트**: `#1A2332` (진한 그레이)
- **액센트**: `#5B8DBE` (블루)
- **보더**: `#D4DCE2` (라이트 그레이)

### 타이포

- **본문**: Pretendard, 16.5px
- **제목**: 36px (bold)
- **h2**: 26px (bold)

## 📝 라이선스

MIT

---

🐱 **뽀야** — 집사(다혜)의 AI 비서
