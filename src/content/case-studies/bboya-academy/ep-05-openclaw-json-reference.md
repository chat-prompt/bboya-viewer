---
title: "openclaw.json 설정 사전 — 전체 섹션 훑어보기"
episode: 5
date: "2026-05-18"
series: case-studies
category: "뽀야사관학교 셋업"
publishedAt: "2026-05-18"
accentColor: "#6366F1"
description: "~/.openclaw/openclaw.json의 모든 섹션 사전. agents·gateway·messages·session·tools·plugins·auth·channels·commands·bindings까지 — 구조 자체를 알고 싶을 때 펴보는 레퍼런스."
tags: ["OpenClaw", "레퍼런스", "openclaw.json", "설정", "뽀야사관학교"]
token: "복자키우기"
---

# openclaw.json 설정 사전

> `~/.openclaw/openclaw.json`의 모든 섹션 사전. *셋업 점검*이 아니라 *구조 자체를 알고 싶을 때* 펴보는 자료. 슬랙 채널만 깊이 보고 싶으면 → [슬랙 채널 설정 가이드](/case-studies/bboya-academy/ep-04-slack-channel-reference).

---

## 0. 파일 위치와 우선순위

```
~/.openclaw/openclaw.json
```

OpenClaw 게이트웨이 시작 시 자동 로드. 수동 편집 후엔 게이트웨이 재시작 필요.

설정 우선순위 (일반 패턴):

```
channels.<channel>.accounts.<accountId>.<setting>
  → channels.<channel>.<setting>
  → channels.defaults.<setting>
  → global defaults
```

---

## 1. agents — 에이전트 정의 및 기본값

```json
"agents": {
  "list": [...],
  "defaults": {...}
}
```

### 1.1 `list` — 에이전트 목록

| 필드 | 설명 |
|------|------|
| `id` | 에이전트 고유 식별자 |
| `default` | 라우팅 규칙에 매칭되지 않는 메시지의 기본 수신 에이전트 |
| `groupChat.mentionPatterns` | 그룹채팅에서 이 패턴이 포함된 메시지만 에이전트가 반응 |
| `workspace` | 이 에이전트의 작업 디렉토리 (defaults 오버라이드) |
| `model.primary` | 이 에이전트 전용 모델 (defaults 오버라이드) |

### 1.2 `defaults` — 모든 에이전트의 공통 기본값

| 필드 | 권장값 | 설명 |
|------|---------|------|
| `workspace` | `~/.openclaw/workspace-<봇이름>` | 에이전트 작업 디렉토리 |
| `agentRuntime.id` | `"claude-cli"` | 에이전트 실행 백엔드 |
| `model.primary` | `"anthropic/claude-opus-4-7"` | 기본 사용 모델 |
| `models` | 사용 가능한 모델 카탈로그 |

### 1.3 `defaults.cliBackends.claude-cli` — CLI 실행 옵션

| 플래그 | 설명 |
|--------|------|
| `-p` | pipe 모드 (비대화형) |
| `--output-format stream-json` | JSON 스트림 출력 |
| `--include-partial-messages` | 부분 응답도 스트림에 포함 |
| `--verbose` | 상세 로그 |
| `--setting-sources user` | 사용자 설정만 로드 (프로젝트 설정 무시) |
| `--allowedTools mcp__openclaw__*` | OpenClaw MCP 도구만 허용 |
| `--mcp-config ~/.mcp.json` | MCP 서버 설정 파일 경로 |
| `resumeArgs` | 기존 세션 재개 시 사용. `--resume {sessionId}` 추가됨 |

---

## 2. gateway — 게이트웨이 서버 설정

```json
"gateway": {
  "mode": "local",
  "auth": { "mode": "token", "token": "..." },
  "port": 18789,
  "bind": "loopback"
}
```

| 필드 | 권장값 | 설명 |
|------|---------|------|
| `mode` | `"local"` | 로컬 모드로 실행 |
| `auth.mode` | `"token"` | Bearer 토큰 인증. 가능: `none`, `token`, `password`, `trusted-proxy` |
| `auth.token` | 자동 생성 | API 접근용 Bearer 토큰 |
| `port` | `18789` | HTTP 리슨 포트 |
| `bind` | `"loopback"` | 접근 범위. 가능: `loopback`, `lan`, `tailnet`, `auto`, `custom` |

### 2.1 `gateway.tailscale` — Tailscale 메시 네트워킹

| 필드 | 기본값 | 설명 |
|------|--------|------|
| `mode` | `"off"` | Tailscale 메시 활성화 |
| `resetOnExit` | `false` | 종료 시 Tailscale 상태 리셋 여부 |

다중 머신에서 봇 게이트웨이를 메시로 묶을 때 사용. 단일 머신 운영이면 신경 안 써도 됨.

### 2.2 `gateway.controlUi`

| 필드 | 설명 |
|------|------|
| `allowInsecureAuth` | HTTP(비HTTPS)에서도 웹 대시보드 인증 허용 |

### 2.3 `gateway.nodes.denyCommands` — 차단된 디바이스 명령어

보안상 위험한 명령어를 미리 차단하는 목록. 예시:

- `camera.snap`, `camera.clip` — 카메라 촬영/녹화
- `screen.record` — 화면 녹화
- `contacts.add`, `calendar.add`, `reminders.add` — 연락처/캘린더/리마인더 추가
- `sms.send`, `sms.search` — SMS 전송/검색

봇이 이 명령들을 호출하려 해도 게이트웨이가 거부한다.

### 2.4 채널 건강 모니터링

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `channelHealthCheckMinutes` | `5` | 채널 건강 체크 주기. 0이면 비활성화 |
| `channelStaleEventThresholdMinutes` | `30` | 이 시간 동안 이벤트 없으면 stale 판정 |
| `channelMaxRestartsPerHour` | `10` | 시간당 채널 재시작 제한 |

---

## 3. messages — 메시지 라우팅 ⚠️ 함정 자리

```json
"messages": {
  "groupChat": {
    "visibleReplies": "automatic"
  }
}
```

| 필드 | 권장값 | 설명 |
|------|---------|------|
| `groupChat.visibleReplies` | `"automatic"` | 그룹채팅 응답 전달 방식 |

가능한 값:
- `"automatic"` — 게이트웨이가 응답을 채널에 직접 전달
- `"message_tool"` (기본값) — message tool 호출을 통해서만 전달. **tools.profile = "coding"이면 응답이 사라짐**

> ⚠️ `tools.profile`이 `"coding"`인데 `visibleReplies`가 `"message_tool"`이면, 봇이 답을 만들어도 슬랙에 *안 뜸* — 에러 없이 조용히 사라지는 함정. 그래서 0-2 점검 8종 7번이 이 키를 확인한다.

---

## 4. session — 세션 관리

```json
"session": {
  "dmScope": "per-channel-peer",
  "reset": {
    "mode": "daily",
    "atHour": 4
  },
  "maintenance": {
    "mode": "enforce",
    "pruneAfter": "30d",
    "maxEntries": 500
  }
}
```

### 4.1 `dmScope`

| 값 | 동작 |
|----|------|
| `"main"` (기본값) | 모든 사용자가 하나의 세션 공유. 1인 환경 전용 |
| `"per-peer"` | 사용자별 세션 (채널 무관) |
| `"per-channel-peer"` | 사용자별+채널별 세션 (다중 사용자 권장) |
| `"per-account-channel-peer"` | 사용자별+계정별+채널별 세션 |

### 4.2 `reset` — 자동 리셋

| 필드 | 기본값 | 설명 |
|------|--------|------|
| `mode` | `"daily"` | 리셋 방식 |
| `atHour` | `4` | daily 모드에서 리셋 시각 (로컬 타임존, 0-23) |
| `idleMinutes` | - | 비활동 후 세션 완전 초기화 |

### 4.3 `maintenance` — 디스크 정리

| 필드 | 기본값 | 설명 |
|------|--------|------|
| `mode` | `"warn"` | `"warn"`: 로그만 / `"enforce"`: 실제 삭제 |
| `pruneAfter` | `"30d"` | 이 기간 지난 세션 정리 대상 |
| `maxEntries` | `500` | 세션 최대 개수 |
| `maxDiskBytes` | - | 디스크 사용량 상한 |
| `highWaterBytes` | maxDiskBytes의 80% | 정리 후 목표 사용량 |

---

## 5. tools — 도구 프로필

```json
"tools": {
  "profile": "coding"
}
```

| 필드 | 권장값 | 설명 |
|------|---------|------|
| `profile` | `"coding"` | 에이전트가 사용할 수 있는 도구 범위를 결정 |

> ⚠️ `"coding"` 프로필에는 message tool이 포함되어 있지 않음 → `messages.groupChat.visibleReplies`를 `"automatic"`으로 설정해야 함.

---

## 6. plugins — 플러그인 활성화

```json
"plugins": {
  "entries": {
    "anthropic": { "enabled": true },
    "telegram": { "enabled": true },
    "memory-core": { "config": { "dreaming": { "enabled": false } } }
  }
}
```

| 플러그인 | 설명 |
|----------|------|
| `anthropic` | Anthropic 모델 프로바이더 |
| `telegram` | 텔레그램 채널 플러그인 |
| `slack` | 슬랙 채널 플러그인 |
| `memory-core` | 메모리 시스템 (dreaming 옵션 포함) |

---

## 7. auth — 인증 프로필

```json
"auth": {
  "profiles": {
    "anthropic:claude-cli": {
      "provider": "claude-cli",
      "mode": "oauth"
    }
  },
  "order": {
    "anthropic": ["anthropic:claude-cli"]
  }
}
```

| 섹션 | 설명 |
|------|------|
| `profiles` | 인증 프로필 정의 (provider + mode) |
| `order` | 프로바이더별 우선순위. `[0]`이 1순위 |

---

## 8. channels — 메시징 채널 설정

채널별 자세한 설정은 별도 가이드:
- 슬랙 → [슬랙 채널 설정 가이드](/case-studies/bboya-academy/ep-04-slack-channel-reference)

### 8.1 공통 구조

```json
"channels": {
  "slack": {
    "enabled": true,
    "accounts": { "<accountId>": { ... } }
  },
  "telegram": {
    "enabled": true,
    "accounts": { "<accountId>": { ... } }
  }
}
```

각 채널은 `accounts` 아래에 여러 계정을 둘 수 있고, 계정별로 토큰·정책을 분리한다.

---

## 9. commands — 관리자 명령어 권한

```json
"commands": {
  "ownerAllowFrom": ["telegram:1234567890"]
}
```

| 필드 | 설명 |
|------|------|
| `ownerAllowFrom` | 오너 권한 명령어(`/owner` 등)를 실행할 수 있는 발신자 ID 목록 |

ID 형식: `<channel>:<userId>` (예: `telegram:1234567890`, `slack:U01ABC2DEF`). 위 ID는 *형식 예시일 뿐* — 본인 환경의 실제 값으로 바꿔 넣어요.

---

## 10. bindings — 메시지 라우팅 규칙 ⚠️ 라우팅 자리

```json
"bindings": [{
  "type": "route",
  "agentId": "main",
  "match": { "channel": "slack", "accountId": "<내 워크스페이스>" }
}]
```

| 필드 | 설명 |
|------|------|
| `type` | 바인딩 종류. 일반 라우팅은 `"route"` |
| `agentId` | 매칭된 메시지를 받을 에이전트 ID |
| `match.channel` | 채널 종류 (`slack`, `telegram` 등) |
| `match.accountId` | 채널 계정 ID |

매칭 누락 시 메시지가 *어느 에이전트로도 안 가고 미아*가 된다. 봇이 1마리(`main`)뿐이면 `bindings` 키 자체가 없어도 자동 폴백되니 생략 가능 — 자세히는 [0-3 부록](/case-studies/bboya-academy/ep-02-slack-app).

---

## 11. wizard / meta — 시스템 메타데이터

| 필드 | 설명 |
|------|------|
| `wizard.lastRunAt` | 마지막 설정 마법사 실행 시각 |
| `wizard.lastRunVersion` | 마법사 실행 시 OpenClaw 버전 |
| `wizard.lastRunCommand` | 마지막 실행된 마법사 명령 (`onboard`) |
| `meta.lastTouchedVersion` | 설정 파일 마지막 수정 시 OpenClaw 버전 |
| `meta.lastTouchedAt` | 설정 파일 마지막 수정 시각 |

이 필드들은 OpenClaw가 자동 관리. **수동 편집 불필요.**

---

## 12. reliability — 출력 제한 (선택)

```json
"reliability": {
  "outputLimits": {
    "maxTurnRawChars": 8388608,
    "maxTurnLines": 20000
  }
}
```

| 필드 | 기본값 | 최대 |
|------|--------|------|
| `maxTurnRawChars` | 8 MiB | 64 MiB |
| `maxTurnLines` | 20,000 | 100,000 |

봇이 한 턴에 출력할 수 있는 최대치. 일반적으로 손댈 일 없음.

### 12.1 `mcp.sessionIdleTtlMs`

MCP 세션 idle TTL 기본값: 10분 (0이면 비활성화).

### 12.2 `diagnostics.stuckSessionWarnMs`

processing 상태가 이 시간 이상 지속되면 stuck 판정 (기본 120,000 = 2분).

---

## 참고 링크

- [Configuration (공식)](https://docs.openclaw.ai/gateway/configuration)
- [Default config reference (공식)](https://docs.openclaw.ai/reference/config-default)
