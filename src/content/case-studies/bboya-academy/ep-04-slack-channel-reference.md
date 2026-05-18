---
title: "슬랙 채널 설정 가이드 — 모든 옵션 사전식 정리"
episode: 4
date: "2026-05-18"
series: case-studies
category: "뽀야사관학교 셋업"
publishedAt: "2026-05-18"
accentColor: "#6366F1"
description: "슬랙으로 봇을 운영할 때 알아둬야 할 모든 설정 레퍼런스. 전송 모드·DM/채널 접근 제어·멘션 게이팅·스레드 세션 키·히스토리·채널별 커스텀·스트리밍·슬래시 커맨드·설정 우선순위까지."
tags: ["슬랙", "레퍼런스", "OpenClaw", "설정", "뽀야사관학교"]
token: "복자키우기"
---

# 슬랙 채널 설정 가이드

> 슬랙으로 봇을 운영할 때 알아둬야 할 모든 설정. 멘션 게이팅, 스레드 세션, 채널별 커스터마이즈까지. [0-3](/case-studies/bboya-academy/ep-02-slack-app)·[0-4](/case-studies/bboya-academy/ep-03-slack-rules)에서 셋업을 마쳤다면, 이 편은 *옵션 단위로 깊이 파고 싶을 때* 펴보는 사전이에요.

## 0. 기본 셋업 형태

```json
"slack": {
  "enabled": true,
  "accounts": {
    "<accountId>": {
      "name": "내 워크스페이스",
      "enabled": true,
      "botToken": "xoxb-...",
      "appToken": "xapp-...",
      "dmPolicy": "pairing",
      "groupPolicy": "open",
      "allowBots": true,
      "replyToMode": "all"
    }
  }
}
```

`<accountId>`는 본인이 정하는 식별자. 라우팅 규칙(`bindings`)에서 이 값으로 매칭한다.

---

## 1. 전송 모드 (Transport)

| 모드 | 필요 토큰 | 설명 |
|------|-----------|------|
| `"socket"` (기본값) | `botToken` + `appToken` | WSS 아웃바운드 연결. **권장** |
| `"http"` | `botToken` + `signingSecret` | 퍼블릭 URL 필요, 리버스 프록시/터널 필수 |

대부분의 경우 Socket Mode면 충분. 학습/라이브 환경에서도 Socket Mode가 기본.

### 소켓 튜닝

```json
"socketMode": {
  "clientPingTimeout": 15000,
  "serverPingTimeout": null,
  "pingPongLoggingEnabled": false
}
```

기본 pong 타임아웃 15초. 소켓이 자주 끊기면 조정.

---

## 2. 접근 제어 — DM

### dmPolicy

| 값 | 동작 |
|----|------|
| `"pairing"` (기본값) | 처음 DM 보내는 사용자에게 페어링 코드 요구. `openclaw pairing approve slack <코드>`로 승인 |
| `"allowlist"` | `allowFrom` 목록에 있는 사용자만 DM 가능 |
| `"open"` | 모든 DM 허용. `allowFrom: ["*"]` 필수 |
| `"disabled"` | DM 완전 비활성화 |

### DM 관련 추가 설정

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `dm.enabled` | `true` | DM 자체 활성화 여부 |
| `dm.groupEnabled` | `false` | MPIM (다자 DM) 허용 여부 |
| `dm.groupChannels` | - | MPIM 허용 목록 |
| `allowFrom` | - | DM 허용 사용자 목록 |

---

## 3. 접근 제어 — 채널/그룹

### groupPolicy

| 값 | 동작 |
|----|------|
| `"open"` | 모든 채널에서 반응 |
| `"allowlist"` | 지정된 채널만. **채널 ID** 필수 (`C12345678` 형식, `#이름` 안 됨) |
| `"disabled"` | 채널 메시지 완전 차단 |

### 멘션 게이팅 (Mention Gating)

`groupPolicy: "open"`이어도 채널 메시지는 **기본적으로 멘션이 있어야 반응**한다.

멘션으로 인식되는 것:
- `@<봇이름>` 등 앱 멘션 (`<@botId>`)
- 슬랙 유저그룹 멘션 (`<!subteam^S...>`)
- `agents.list[].groupChat.mentionPatterns`에 정의된 패턴
- 봇이 답변한 스레드 안에서의 후속 메시지 (implicit thread mention)

> 즉, 채널에서 "<봇이름>아 안녕" → 반응함 / "안녕" → 반응 안 함

### allowBots

| 값 | 동작 |
|----|------|
| `true` | 다른 봇의 메시지에도 반응 |
| `false` (기본값) | 봇 메시지 무시 |

봇끼리 협업하는 워크플로우에선 `true`로 켠다 (단, 무한 핑퐁 주의).

---

## 4. 스레딩 (Reply Threading)

### replyToMode

| 값 | 동작 |
|----|------|
| `"off"` (기본값) | 스레드 답변 안 함. 채널에 직접 응답. `[[reply_to_*]]` 태그도 비활성화 |
| `"first"` | 첫 응답만 스레드로, 이후 채널에 직접 |
| `"all"` | **모든 응답을 스레드로** |
| `"batched"` | 여러 응답을 묶어서 스레드로 |

### 채팅 타입별 오버라이드

```json
"replyToModeByChatType": {
  "direct": "off",
  "group": "all",
  "channel": "all"
}
```

DM/그룹/채널 별로 다르게 설정 가능.

---

## 5. 세션 관리

### 세션 키 구조

| 슬랙 상황 | 세션 키 |
|-----------|---------|
| **DM (기본 — `session.dmScope: "main"`)** | `agent:{agentId}:main` — *모든 DM이 main 세션 공유* |
| DM (`session.dmScope: "per-peer"`) | `agent:{agentId}:direct:{peerId}` |
| DM (`session.dmScope: "per-channel-peer"` — 권장) | `agent:{agentId}:slack:direct:{peerId}` |
| DM (`session.dmScope: "per-account-channel-peer"`) | `agent:{agentId}:slack:{accountId}:direct:{peerId}` |
| 채널 | `agent:{agentId}:slack:channel:{channelId}` |
| MPIM (다자 DM) | `agent:{agentId}:slack:group:{channelId}` |
| 스레드 | `{위_baseKey}:thread:{threadTs}` (base 키 끝에 suffix) |

> ⚠️ **DM 기본 동작 주의**: `session.dmScope`를 명시 안 하면 `"main"` — 서로 다른 사람의 DM이 *같은 main 세션*을 공유함. 봇이 여러 사람과 1:1 대화하는 환경이라면 보안/맥락 분리를 위해 `"per-channel-peer"`로 박는 걸 권장 (`openclaw security audit`도 같은 경고를 띄움).

> 💡 위 키 형태는 OpenClaw 라우팅 코어가 결정하므로 LLM backend(Anthropic API / Claude CLI)와 무관.

**핵심**: `replyToMode`가 `"off"`가 아니면 → 각 루트 메시지마다 스레드 세션이 생성됨 → **슬랙 스레드 1개 = OpenClaw 세션 1개**

### 스레드 설정

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `thread.historyScope` | `"thread"` | 스레드 내 메시지만 히스토리로 사용 |
| `thread.inheritParent` | `false` | 부모 메시지(루트글) 컨텍스트 포함 여부 |
| `thread.initialHistoryLimit` | `20` | 스레드 시작 시 기존 메시지 최대 N개를 컨텍스트로 가져옴. 0이면 비활성화 |
| `thread.requireExplicitMention` | `false` | `true`면 스레드 안에서도 멘션 필수 |

> 💡 **추천**: 스레드 시작 시 *루트글 의도 파악*이 자주 필요하면 `thread.inheritParent: true`로 박아두면 봇이 스레드 첫 답변에서 "어 이거 무슨 얘기지" 하는 경우가 줄어든다.

---

## 6. 히스토리 (컨텍스트 주입)

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `historyLimit` | `50` | 채널 메시지 히스토리 (최근 N개 메시지를 컨텍스트로 주입) |
| `dmHistoryLimit` | `50` | DM 히스토리 기본값 |
| `dms.<userId>.historyLimit` | - | 특정 사용자 DM 히스토리 오버라이드 |

스레드의 경우 `thread.initialHistoryLimit` (기본 20)이 적용.

---

## 7. 채널별 커스텀 설정

채널 ID 기준으로 개별 설정 가능:

```json
"channels": {
  "C12345678": {
    "allow": true,
    "requireMention": true,
    "users": ["U111", "U222"],
    "allowBots": false,
    "systemPrompt": "이 채널 전용 시스템 프롬프트",
    "tools": ["tool1", "tool2"],
    "toolsBySender": {
      "id:U111": ["admin-tool"],
      "*": ["basic-tool"]
    },
    "skills": ["skill1"]
  }
}
```

| 설정 | 설명 |
|------|------|
| `allow` | 이 채널 허용 여부 |
| `requireMention` | 멘션 필수 여부 |
| `users` | 이 채널에서 허용할 사용자 목록 |
| `allowBots` | 봇 메시지 허용 여부 |
| `systemPrompt` | **채널 전용 시스템 프롬프트** |
| `tools` | 사용 가능 도구 목록 |
| `toolsBySender` | 발신자별 도구 허용. 키 형식: `id:`, `username:`, `name:`, `"*"` |
| `skills` | 활성화할 스킬 목록 |

> ⚠️ 채널 키는 반드시 **슬랙 채널 ID** (`C12345678`). `#채널이름` 안 됨.

---

## 8. 스트리밍

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `streaming.mode` | `"partial"` | `"off"`, `"partial"`, `"block"`, `"progress"` |
| `streaming.nativeTransport` | `true` | 슬랙 네이티브 스트리밍 사용 |
| `streaming.preview.toolProgress` | `true` | 도구 실행 진행 상황 표시 |

---

## 9. 리액션 (이모지 반응)

| 설정 | 설명 |
|------|------|
| `ackReaction` | 메시지 수신 확인 이모지. 예: `"eyes"`. `""`으로 비활성화 |
| `typingReaction` | 응답 생성 중 이모지. 예: `"hourglass_flowing_sand"`. 응답 완료 시 자동 제거 |

우선순위: 계정별 → 글로벌 `channels.slack` → `messages.ackReaction` → 에이전트 이모지

---

## 10. 메시지 전달

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `textChunkLimit` | `4000` | 메시지 최대 길이 (초과 시 분할) |
| `chunkMode` | `"newline"` | 분할 방식 (문단 기준) |
| `mediaMaxMb` | `20` | 첨부 파일 최대 크기 (MB) |

---

## 11. 슬래시 커맨드

```json
"slashCommand": {
  "enabled": true,
  "name": "openclaw",
  "sessionPrefix": "slack:slash",
  "ephemeral": true
}
```

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `enabled` | - | 슬래시 커맨드 활성화 |
| `name` | `"openclaw"` | `/openclaw` 커맨드 이름 |
| `ephemeral` | `true` | 응답을 본인만 볼 수 있게 |

---

## 12. 설정 우선순위

```
channels.slack.accounts.<accountId>.<setting>
  → channels.slack.<setting>
  → channels.defaults.<setting>
  → global defaults
```

계정별 설정 > 슬랙 글로벌 > 채널 기본값 > 전역 기본값 순.

---

## 13. 명시 안 하면 적용되는 기본값

| 설정 | 기본값 | 의미 |
|------|--------|------|
| `mode` | `"socket"` | Socket Mode |
| `thread.initialHistoryLimit` | `20` | 스레드 시작 시 최근 20개 메시지 주입 |
| `thread.historyScope` | `"thread"` | 스레드 내 메시지만 |
| `thread.inheritParent` | `false` | 부모 메시지 컨텍스트 미포함 |
| `thread.requireExplicitMention` | `false` | 스레드 안에서 멘션 없이도 반응 |
| `dm.enabled` | `true` | DM 활성화 |
| `dm.groupEnabled` | `false` | 다자 DM 비활성화 |
| `streaming.nativeTransport` | `true` | 네이티브 스트리밍 |
| `textChunkLimit` | `4000` | 메시지 4000자 분할 |
| `mediaMaxMb` | `20` | 첨부 20MB 제한 |

---

## 14. 셋업 점검 체크리스트

| 항목 | 확인 방법 |
|------|-----------|
| `botToken`이 `xoxb-`로 시작 | `openclaw.json` 직접 확인 |
| `appToken`이 `xapp-`로 시작 (Socket Mode 시) | 동일 |
| Slack 앱에 OAuth Scope 부여됨 | Slack 앱 설정 → OAuth & Permissions |
| `bindings`에서 이 accountId가 매칭됨 | [0-3 부록 — 동생 봇 추가하면](/case-studies/bboya-academy/ep-02-slack-app) 참조 |
| `messages.groupChat.visibleReplies = "automatic"` | [0-2 점검 8종](/case-studies/bboya-academy/ep-01-claude-cli-setup) 7번 항목 |

---

## 더 깊이 알고 싶다면

- `openclaw.json` 전체 섹션 사전 → [openclaw.json 설정 사전](/case-studies/bboya-academy/ep-05-openclaw-json-reference)
- 본가 공식 docs는 OpenClaw npm 패키지 안에 같이 깔려요. 터미널에서 직접 열어볼 수 있어요:

```bash
# 패키지 위치 확인
npm root -g
# → /opt/homebrew/lib/node_modules (예시, 환경마다 다름)

# Slack 채널 본가 문서
open "$(npm root -g)/openclaw/docs/channels/slack.md"

# 세션 관리 본가 문서 (dmScope 옵션 4종 / 데일리·아이들 리셋)
open "$(npm root -g)/openclaw/docs/concepts/session.md"
```

> 위 표의 DM 분기·라이프사이클 등 *세션 관련 권위 있는 정의*는 위 두 파일이 정본. 이 페이지는 그 위에서 슬랙 운영 관점으로 정리한 것.
