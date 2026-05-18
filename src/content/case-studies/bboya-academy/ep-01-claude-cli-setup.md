---
title: "Claude CLI + OpenClaw 셋팅 — 복자가 슬랙에서 답하기까지"
episode: 1
date: "2026-05-18"
series: case-studies
category: "뽀야사관학교 셋업"
publishedAt: "2026-05-18"
accentColor: "#6366F1"
description: "라이브 진입 전, 복자가 슬랙에서 진짜로 답하는 상태까지. Claude Max 구독부터 CLI·OpenClaw 설치, 최소 한국어 영혼, 침묵하지 않을 8가지 점검."
tags: ["OpenClaw", "Claude CLI", "셋업", "복자", "뽀야사관학교"]
token: "복자키우기"
---

# 0-2 · Claude CLI + OpenClaw 셋팅

라이브 진입 전에 복자가 슬랙에서 *진짜로 답하는* 상태까지.

---

## ① Claude Max 구독

[claude.ai](https://claude.ai) → 우상단 **Upgrade** → **Max ($100/월 이상)**.

Pro($20)는 라이브 부하에 한도 초과 가능. Max 전제.

---

## ② Claude Code CLI

OpenClaw와 **같은 머신**에 설치 (OpenClaw가 `claude` 바이너리 spawn).

```bash
npm i -g @anthropic-ai/claude-code
claude --version  # 2.1.x 이상
```

OAuth 로그인 (API 키 아님):

```bash
claude
> /login
> /status   # Account: <이메일> (Claude Max)
```

---

## ③ OpenClaw 설치

```bash
npm i -g openclaw@latest
openclaw --version  # 2026.5.7 이상
openclaw setup
openclaw models auth login --provider anthropic --method cli --set-default
```

마지막 줄 = 모든 봇 기본 모델을 Claude Opus로 박는 명령.

윈도우는 WSL2(우분투) 환경에서, 맥은 본인 PC에 그대로.

---

## ④ 복자 영혼 박기 (main 워크스페이스)

`openclaw setup` 끝나면 **`main` 기본 에이전트**가 자동 생성. workspace 폴더:

```
~/.openclaw/workspace/
```

안에 `AGENTS.md` / `SOUL.md` / `USER.md` / `IDENTITY.md` / `MEMORY.md` / `TOOLS.md`가 영문 템플릿으로 있음. **그대로 두면 라이브 첫 인사부터 *"네, 무엇을 도와드릴까요?"* GPT 톤**.

라이브 진입 전에 **한국어 최소 영혼** 박기. SOUL.md 예시:

```markdown
# SOUL.md — 복자의 영혼

_나는 챗봇이 아니야. 나는 복자 — 호트만님네 고양이._

## 미션
호트만님 옆에서 채널 운영을 거든다.

## 말투
- 호트만님 → "집사"
- 기본: 친근한 반말, 짧게
- 금지: "도와드리겠습니다", 발바닥 이모지 남발
```

같은 패턴으로 `USER.md`(집사 프로필 5줄), `AGENTS.md`(응답 트리거 + NO_REPLY 출력 룰), `IDENTITY.md`(이름·품종·생일·집사) 각 5~10줄씩.

> 동생 봇 분리하려면 [0-3편 — 에이전트 ID와 바인딩](/case-studies/bboya-academy/ep-02-slack-app) 참조.

---

## ⑤ 슬랙 채널 연결

→ [0-3 슬랙 앱 만들기](/case-studies/bboya-academy/ep-02-slack-app)에서 진행 (매니페스트 + 토큰 + 페어링).

---

## ⑥ 셋팅 점검 — 침묵하지 않을 8가지

라이브 첫날 가장 흔한 사고: *셋팅 다 한 것 같은데 슬랙에서 답이 안 와요. 에러도 없어요.*

원인은 보통 코드가 아니라 **셋팅의 사일런트 함정**. 복자한테 직접 점검 시키기 — 채팅창에 그대로 복사:

```
내 OpenClaw 셋팅에서 다음 8개 항목 점검해서 표로 보여줘:

1. Claude CLI 버전이 2.1.x 이상인지 (claude --version)
2. OpenClaw 버전이 2026.5.x 이상인지 (openclaw --version)
3. Claude OAuth 로그인됐고 Max/Pro 구독인지 (claude auth status)
4. agents.defaults.agentRuntime.id가 "claude-cli"인지
5. agents.defaults.model.primary가 "anthropic/claude-opus-4-7"인지
6. auth.profiles에 "anthropic:claude-cli"가 등록됐고 auth.order.anthropic[0]에 그게 있는지
7. messages.groupChat.visibleReplies가 "automatic"인지
8. 내 슬랙 accountId가 어느 에이전트로 라우팅되는지 (bindings에서)

각 항목별로 ✅/❌ + 실제 값을 표로 보여줘. 수정하지 말고 확인만.
```

8개 다 ✅ + 슬랙에서 `@복자 안녕` → 답 옴 → 라이브 진입 OK.

답 없으면 의심할 4가지:
- 토큰 끝에 `\n` 줄바꿈
- 페어링 미완
- Socket Mode 미연결
- accountId 라우팅 미스매치

→ 다음: [0-3 슬랙 앱 만들기](/case-studies/bboya-academy/ep-02-slack-app)
