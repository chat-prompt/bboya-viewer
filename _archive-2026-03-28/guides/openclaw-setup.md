---
title: "맥에서 OpenClaw 설치하기"
episode: 1
series: guides
description: "공식 문서 기반 — 비개발자도 따라할 수 있는 macOS OpenClaw 첫 셋업 가이드"
publishedAt: "2026-03-27"
accentColor: "#5B8DBE"
tags: ["셋업", "초보자", "macOS"]
token: "gpters"
---

# 맥에서 OpenClaw 설치하기

> 나만의 AI 비서를 만들어보세요 🐱

OpenClaw는 당신의 일상과 업무를 돕는 AI 에이전트 프레임워크입니다. 이 가이드는 처음 시작하는 분들도 **설치부터 첫 대화까지** 따라할 수 있도록 안내합니다.

---

## 사전 준비

### 필수

- **macOS** (또는 Linux, Windows WSL2)
- **Node.js 24** (권장) 또는 **Node.js 22 LTS** (22.16 이상)
  - 확인: 터미널에서 `node --version` 입력
  - 없다면 [nodejs.org](https://nodejs.org)에서 설치
- **AI 모델 API 키** (하나 이상)
  - **Claude API 키** ([console.anthropic.com](https://console.anthropic.com)) — Opus 또는 Sonnet 추천
  - 또는 **OpenAI API 키** ([platform.openai.com](https://platform.openai.com))
  - API 크레딧 $5 정도면 충분히 테스트 가능

### 선택 (권장)

- **Gemini API 키** ([ai.google.dev](https://ai.google.dev/gemini-api/docs/api-key))
  - 웹 검색 기능 활성화용
  - 무료 티어로도 충분히 사용 가능

---

## 1단계: OpenClaw 설치

### 추천: 설치 스크립트 (가장 쉬움)

터미널을 열고 아래 명령어를 복사해서 붙여넣기:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

이 스크립트는 다음을 자동으로 처리해줍니다:
- Node.js가 없으면 Node 24 설치
- OpenClaw CLI를 전역으로 설치
- 초기 설정 마법사 자동 실행

### 대안: npm으로 직접 설치

Node.js가 이미 설치돼 있고, 직접 설치를 선호한다면:

```bash
npm install -g openclaw@latest
```

> **💡 팁:** pnpm을 쓰는 분들은 `pnpm add -g openclaw@latest` 후 `pnpm approve-builds -g` 실행 필요

---

## 2단계: 초기 설정 (온보딩 마법사)

설치가 끝났으면 초기 설정을 시작합니다:

```bash
openclaw onboard --install-daemon
```

마법사가 단계별로 질문합니다. **QuickStart**(빠른 설정)와 **Advanced**(세부 설정) 중 선택할 수 있는데, 처음이라면 **QuickStart**를 추천해요!

### QuickStart vs Advanced

- **QuickStart**: 최소한의 질문만 — 기본값으로 빠르게 시작
- **Advanced**: 모든 옵션을 하나씩 선택 — 처음엔 복잡할 수 있음

### 단계별 안내 (QuickStart 기준)

#### 1) Model/Auth — AI 모델 선택 & API 키 입력

- **Claude** 선택 → API 키 입력 → **Sonnet 4.5** 추천 (빠르고 저렴하면서 충분히 강력)
- 또는 **OpenAI**, **Gemini**, **Custom Provider** 등 선택 가능

> **어떤 모델을 선택해야 하나요?**  
> - Claude Sonnet 4.5: 비용 효율적이면서 강력 (추천)
> - Claude Opus 4.6: 가장 강력하지만 비쌈
> - OpenAI GPT-4o: 빠르고 범용적
> - Gemini Flash: 무료 티어 있음 (웹 검색용으로 좋음)

#### 2) Web Search Provider — 웹 검색 기능 설정 (선택)

에이전트가 웹 검색을 할 수 있게 하려면 **Yes** 선택:

- **Gemini** 추천 (무료 티어 사용 가능)
- **Perplexity**, **Brave**, **Grok**, **Kimi** 등도 지원

나중에 설정하려면 **Skip** 가능.

#### 3) Workspace — 에이전트 작업 폴더

기본값 (`~/.openclaw/workspace`)을 그대로 사용하면 됩니다.

> **Workspace란?** 에이전트의 파일들(메모리, 스킬, 설정)이 저장되는 폴더예요.

#### 4) Gateway — 게이트웨이 설정

- **포트**: 기본값 `18789`
- **인증 모드**: 기본값 `Token` (자동 생성됨)

이 부분은 기본값 그대로 진행하면 됩니다.

#### 5) Channels — 채널 연결 (선택)

텔레그램, Slack, Discord 등을 연결할 수 있는데, **일단 Skip**하고 나중에 추가해도 괜찮아요!

#### 6) Daemon — 서비스로 등록

**Yes** 선택 — OpenClaw가 백그라운드에서 항상 실행되도록 등록합니다.

#### 7) Health Check — 정상 작동 확인

마법사가 자동으로 게이트웨이가 잘 실행되는지 확인합니다.

#### 8) Skills — 스킬 설치 (선택)

처음엔 **Skip**하고, 나중에 필요할 때 설치하는 걸 추천해요!

---

## 3단계: 첫 대화 — 대시보드에서 바로 채팅

설정이 완료되면 **대시보드(Control UI)**를 열어서 바로 채팅할 수 있어요:

```bash
openclaw dashboard
```

브라우저가 자동으로 열리고 `http://127.0.0.1:18789/` 페이지가 표시됩니다.

여기서 에이전트와 대화할 수 있어요! 🎉

### 첫 대화 예시

```
안녕? 자기소개해줘
```

에이전트가 답장하면 성공! 🐱

> **💡 팁:** 대시보드는 채널(텔레그램, Slack 등) 연결 없이도 바로 사용 가능해요. 가장 빠른 첫 대화 방법입니다!

---

## 게이트웨이 상태 확인

설치가 잘 됐는지 확인하려면:

```bash
openclaw gateway status
```

게이트웨이가 실행 중이면 성공!

게이트웨이를 직접 재시작하려면:

```bash
# macOS
launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway

# 또는 직접 실행
openclaw gateway
```

---

## 트러블슈팅

### `openclaw` 명령어를 찾을 수 없어요

터미널을 새로 열어보거나, 아래 명령어로 PATH 확인:

```bash
echo $PATH
npm prefix -g
```

`$(npm prefix -g)/bin`이 PATH에 없다면 `.zshrc` (또는 `.bashrc`)에 추가:

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

### API 비용이 걱정돼요

- Claude Sonnet 4.5 사용 (Opus보다 10배 저렴)
- Gemini Flash를 웹 검색용으로 활용 (무료 티어)

### 에이전트가 기억을 못 해요

- 대화 맥락은 세션별로 자동 관리됨
- 장기 기억은 에이전트에게 "이거 기억해줘" 또는 "MEMORY.md에 저장해줘" 요청

---

## 다음 단계

### 워크스페이스 꾸미기

> 📖 [#4 정체성 설계](/notes/bot-school-04-identity) · [#2 메모리 관리](/notes/bot-school-02-memory) 참고

에이전트의 성격과 역할을 정의할 수 있습니다:

- **SOUL.md** — 에이전트의 성격, 역할, 말투
- **USER.md** — 사용자(나) 정보
- **MEMORY.md** — 에이전트의 장기 기억

워크스페이스는 기본적으로 `~/.openclaw/workspace`에 있어요.

### 멀티에이전트로 확장

> 📖 [#5 멀티에이전트 설계](/notes/bot-school-05-multi-agent) 참고

에이전트 1개로 시작했다면, 역할을 나눠서 **AI 비서 팀**을 만들 수 있어요!

```bash
openclaw agents add <에이전트_이름>
```

👉 **[봇키우기 교실 #5 — CEO 밑에 CFO가 필요해](/notes/bot-school-05-multi-agent)**에서 자세히 다룹니다.

### macOS 앱 사용하기

CLI 외에도 **OpenClaw.app** (메뉴바 앱)을 사용할 수 있어요:

- 메뉴바에서 상태 확인
- 알림 수신
- Canvas, Camera, Screen Recording 등 macOS 전용 기능

자세한 내용은 [공식 문서 - macOS App](https://docs.openclaw.ai/platforms/macos)

### 채널 연결하기

에이전트와 메신저로 대화하고 싶다면:

- **Slack** → [ep.2 슬랙봇 데려오기](/guides/slack-setup)
- **텔레그램** → [ep.3 텔레그램 봇 연결하기](/guides/telegram-setup)

### 더 나아가기

- **스킬 설치**: 에이전트에게 "GitHub 관리 스킬 설치해줘" 요청
- **자동화**: 크론잡으로 주기적 보고 받기
- **MCP 연동**: Google Sheets, Notion, Linear 같은 도구 연결

---

## 참고 자료

- [공식 문서 - Getting Started](https://docs.openclaw.ai/start/getting-started)
- [공식 문서 - Onboarding Wizard](https://docs.openclaw.ai/start/wizard)
- [Discord 커뮤니티](https://discord.gg/openclaw) (영어)
- [뽀야의 서재 - OpenClaw 가이드 시리즈](/guides)

---

*설치하다가 막히거나 궁금한 점이 있다면 [봇키우기 교실 #4 — 정체성 설계](/notes/bot-school-04-identity) 또는 커뮤니티에 질문해보세요!* 🐾
