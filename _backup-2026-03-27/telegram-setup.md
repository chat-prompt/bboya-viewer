---
title: "텔레그램 봇 연결하기"
episode: 3
series: guides
description: "모바일에서 AI 에이전트와 대화하기 — 텔레그램 봇 생성부터 페어링까지"
publishedAt: "2026-03-27"
accentColor: "#0088CC"
tags: ["텔레그램", "채널", "셋업"]
token: "gpters"
---

텔레그램 봇을 연결하면 언제 어디서든 내 AI 에이전트와 대화할 수 있어요. 슬랙보다 훨씬 간단하고, 개인 봇이라 알림도 더 직접적이에요. 📱

## 사전 준비

- **OpenClaw 설치 완료** — [ep.1 OpenClaw 설치하기](/guides/openclaw-setup)를 먼저 완료하세요
- **텔레그램 계정** — 모바일 또는 데스크톱 앱

## 1. 텔레그램 봇 만들기

텔레그램에서 공식 **@BotFather**를 찾아 봇을 만들어요.

### 봇 생성 절차

1. **텔레그램 앱 실행**
2. **@BotFather** 검색 → 대화 시작
3. `/newbot` 명령어 입력
4. **봇 이름 입력** (예: `My AI Assistant`)
5. **봇 유저네임 입력** (예: `my_ai_bot`) — 반드시 `bot`으로 끝나야 해요
6. **토큰 저장** — `123:abc` 형태의 긴 문자열이 나와요. 이걸 복사해두세요 🔑

> ⚠️ **토큰 보안**: 이 토큰이 있으면 누구나 내 봇으로 메시지를 보낼 수 있어요. 절대 공개하지 마세요!

## 2. OpenClaw에 연결하기

텔레그램은 Slack과 다르게 **설정 파일에 직접 토큰을 작성**하는 방식이에요.

### 방법 1: 설정 파일 직접 편집 (추천)

`~/.openclaw/openclaw.json` 파일을 열어서 다음 내용을 추가하세요:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123:abc",
      "dmPolicy": "pairing",
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

**설정 설명:**
- `enabled: true` — 텔레그램 채널 활성화
- `botToken` — @BotFather에서 받은 토큰
- `dmPolicy: "pairing"` — DM은 페어링 승인 필요 (기본값)
- `groups.*` — 그룹에서는 멘션 필요

### 방법 2: 환경변수로 설정

`.zshrc` 또는 `.bashrc`에 추가:

```bash
export TELEGRAM_BOT_TOKEN="123:abc"
```

> ⚠️ **`openclaw channels login telegram` 명령어는 사용하지 않아요!** 텔레그램은 OAuth가 아니라 토큰 방식이라 config/env로 직접 설정합니다.

## 3. 게이트웨이 시작 & 페어링

### 게이트웨이 실행

```bash
openclaw gateway
```

또는 이미 실행 중이면 재시작:

```bash
openclaw gateway restart
```

### 봇에게 DM 보내기

1. **텔레그램에서 내 봇 찾기** (유저네임으로 검색)
2. **아무 메시지나 보내기** (예: "안녕")
3. 봇이 **6자리 페어링 코드**를 보내줘요

### 페어링 승인

터미널에서 코드를 확인하고 승인:

```bash
# 대기 중인 페어링 확인
openclaw pairing list telegram

# 승인
openclaw pairing approve telegram <CODE>
```

> ⏰ **페어링 코드는 1시간 후 만료**돼요. 만료되면 봇에게 다시 메시지를 보내면 새 코드를 받을 수 있어요.

승인하면 이제 봇과 자유롭게 대화할 수 있어요! 🎉

### 내 Telegram User ID 찾기

나중에 설정에서 allowlist로 관리하려면 내 user ID를 알아야 해요.

**방법 1: 로그 확인 (안전)**

```bash
openclaw logs --follow
```

봇에게 메시지를 보내면 로그에 `from.id: 123456789` 형태로 나와요.

**방법 2: Bot API 조회**

```bash
curl "https://api.telegram.org/bot<토큰>/getUpdates"
```

**방법 3: 서드파티 봇 (덜 안전)**

`@userinfobot` 또는 `@getidsbot`에게 메시지 보내기

## 4. 그룹에서 사용하기

### Privacy Mode 설정

텔레그램 봇은 기본적으로 **Privacy Mode**가 켜져 있어서, 그룹에서 멘션(@봇이름)을 받거나 명령어를 입력할 때만 메시지를 볼 수 있어요.

**모든 그룹 메시지를 보게 하려면:**

1. **@BotFather**에서 `/setprivacy` 실행
2. 내 봇 선택
3. **Disable** 선택
4. **중요**: 그룹에서 봇을 **제거 → 다시 추가**해야 설정이 적용돼요

또는:

- 봇을 **그룹 관리자**로 설정

### 그룹 추가하기

1. **텔레그램 그룹에 봇 초대**
2. 그룹 메시지를 하나 보내기
3. `openclaw logs --follow`에서 `chat.id` 확인 (음수 형태: `-1001234567890`)

### 그룹 설정 추가

`openclaw.json`에 그룹 설정을 추가하세요:

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "requireMention": false,
          "groupPolicy": "open"
        }
      }
    }
  }
}
```

**설정 옵션:**
- `requireMention: false` — 멘션 없이도 반응
- `groupPolicy: "open"` — 그룹 멤버 누구나 봇 사용 가능
- `groupPolicy: "allowlist"` + `allowFrom` — 특정 사용자만 허용

**특정 사용자만 허용하는 예시:**

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "requireMention": true,
          "allowFrom": ["123456789", "987654321"]
        }
      }
    }
  }
}
```

### 그룹 ID 쉽게 찾는 법

- 그룹 메시지를 `@userinfobot`이나 `@getidsbot`에게 포워딩
- 또는 `openclaw logs --follow` 실행 후 그룹에서 메시지 보내기

## 5. 스트리밍 (선택)

OpenClaw는 텔레그램에서 **실시간 편집 스트리밍**을 지원해요. AI가 답변을 생성하는 동안 메시지가 실시간으로 업데이트돼요. 📝✨

**기본 설정:**

```json
{
  "channels": {
    "telegram": {
      "streaming": "partial"
    }
  }
}
```

**옵션:**
- `off` — 스트리밍 비활성화
- `partial` (기본) — 미리보기 + 최종 편집
- `block` — 블록 단위 스트리밍

DM과 그룹 모두에서 **하나의 메시지가 실시간으로 편집**되는 방식이라 깔끔해요!

## 6. 커스텀 커맨드 (선택)

텔레그램 명령어 메뉴에 내가 자주 쓰는 커맨드를 추가할 수 있어요.

```json
{
  "channels": {
    "telegram": {
      "customCommands": [
        { "command": "backup", "description": "Git 백업" },
        { "command": "generate", "description": "이미지 생성" }
      ]
    }
  }
}
```

**규칙:**
- 명령어는 소문자 `a-z`, 숫자 `0-9`, `_`만 사용 가능
- 1~32자 길이
- 네이티브 명령어(`/status`, `/help` 등)와 충돌하면 무시돼요

> 💡 **커스텀 커맨드는 메뉴에만 표시돼요.** 실제 동작은 스킬이나 플러그인으로 구현해야 해요.

## 7. 트러블슈팅

### 봇이 그룹 메시지에 반응하지 않아요

**원인 1: Privacy Mode**

- @BotFather → `/setprivacy` → Disable
- 그룹에서 봇 제거 → 다시 추가

**원인 2: requireMention 설정**

- `openclaw.json`에서 `requireMention: false` 확인
- 또는 세션에서 `/activation always` 입력 (임시)

**원인 3: 그룹 allowlist**

- `channels.telegram.groups`에 그룹 ID가 있는지 확인
- 또는 `"*"` (모든 그룹) 사용

### 봇이 전혀 메시지를 안 받아요

1. **봇 멤버십 확인** — 그룹에 봇이 초대됐는지
2. **설정 확인** — `groups` 설정에 해당 그룹이 있는지
3. **로그 확인** — `openclaw logs --follow`로 거부 사유 확인

### 명령어가 일부만 작동해요

- **인증 확인** — 페어링 승인 또는 `allowFrom`에 user ID 추가
- **groupPolicy** — `open`으로 설정했는지 확인
- 명령어는 `groupPolicy`가 `open`이어도 인증이 필요해요

### 네트워크가 불안정해요

일부 서버에서는 `api.telegram.org` 접속이 불안정할 수 있어요.

**프록시 설정:**

```json
{
  "channels": {
    "telegram": {
      "proxy": "socks5://<user>:<password>@proxy-host:1080"
    }
  }
}
```

**IPv4 우선 설정:**

```json
{
  "channels": {
    "telegram": {
      "network": {
        "autoSelectFamily": false
      }
    }
  }
}
```

## 다음 단계

- [ep.4 워크스페이스 꾸미기](/guides/workspace-docs) — 에이전트에게 맥락 주기
- [ep.5 멀티에이전트 구성](/guides/multi-agent-setup) — 여러 에이전트 운영하기
- [공식 문서](https://docs.openclaw.com/channels/telegram) — 고급 설정 전체 참고

---

**축하해요!** 🎉 이제 어디서든 텔레그램으로 AI 에이전트와 대화할 수 있어요. Slack보다 간단하고, 모바일에서 쓰기도 편해요!
