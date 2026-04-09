---
title: "슬랙봇 데려오기"
episode: 2
series: guides
description: "Slack 워크스페이스에 OpenClaw 에이전트를 연결하는 완벽 가이드"
publishedAt: "2026-03-27"
accentColor: "#4A154B"
tags: ["Slack", "채널", "셋업"]
token: "gpters"
---

Slack 워크스페이스에 OpenClaw 에이전트를 연결하면 채널이나 DM에서 바로 에이전트와 대화할 수 있어요. 이 가이드는 Slack 앱을 만들고, Socket Mode로 OpenClaw와 연결하는 전 과정을 다룹니다.

## 사전 준비

시작하기 전에 이것들이 준비되어 있어야 해요:

- ✅ **OpenClaw 설치 완료** — [ep.1 맥에서 OpenClaw 설치하기](/guides/openclaw-setup)를 먼저 확인하세요
- ✅ **Slack 워크스페이스 관리자 권한** — 앱을 설치하려면 워크스페이스 관리자여야 해요

## 빠른 체크리스트

전체 과정이 복잡해 보이지만, 핵심은 이거예요:

1. Slack 앱 만들기 (api.slack.com/apps)
2. Socket Mode 켜기 + App Token 생성
3. 봇 권한 설정 (Bot Token Scopes)
4. 이벤트 구독 (Event Subscriptions)
5. App Home 메시지 탭 활성화
6. 앱 설치 + Bot Token 복사
7. OpenClaw에 토큰 등록
8. 봇과 페어링 (DM으로 코드 교환)
9. 채널에 초대해서 사용

하나씩 따라가볼게요!

---

## 1. Slack 앱 만들기

### 앱 생성

1. [Slack API 앱 페이지](https://api.slack.com/apps)로 이동
2. **"Create New App"** 버튼 클릭
3. **"From scratch"** 선택 (처음부터 만들기)
   - 또는 **"From an app manifest"** 선택 후 [아래 Manifest JSON](#manifest-json으로-한-방에-설정하기-선택)을 붙여넣으면 한 번에 설정 가능
4. 앱 이름과 설치할 워크스페이스 선택
5. **"Create App"** 클릭

### Manifest JSON으로 한 방에 설정하기 (선택)

처음부터 만드는 게 번거롭다면 이 Manifest JSON을 사용하면 대부분의 설정이 자동으로 완료돼요:

```json
{
  "display_information": {
    "name": "OpenClaw",
    "description": "Slack connector for OpenClaw"
  },
  "features": {
    "bot_user": {
      "display_name": "OpenClaw",
      "always_online": false
    },
    "app_home": {
      "messages_tab_enabled": true,
      "messages_tab_read_only_enabled": false
    },
    "slash_commands": [
      {
        "command": "/openclaw",
        "description": "Send a message to OpenClaw",
        "should_escape": false
      }
    ]
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "chat:write",
        "channels:history",
        "channels:read",
        "groups:history",
        "im:history",
        "im:read",
        "im:write",
        "mpim:history",
        "mpim:read",
        "mpim:write",
        "users:read",
        "app_mentions:read",
        "assistant:write",
        "reactions:read",
        "reactions:write",
        "pins:read",
        "pins:write",
        "emoji:read",
        "commands",
        "files:read",
        "files:write"
      ]
    }
  },
  "settings": {
    "socket_mode_enabled": true,
    "event_subscriptions": {
      "bot_events": [
        "app_mention",
        "message.channels",
        "message.groups",
        "message.im",
        "message.mpim",
        "reaction_added",
        "reaction_removed",
        "member_joined_channel",
        "member_left_channel",
        "channel_rename",
        "pin_added",
        "pin_removed"
      ]
    }
  }
}
```

**Manifest 사용법:**
1. "Create New App" → **"From an app manifest"** 선택
2. 워크스페이스 선택
3. 위 JSON을 붙여넣기
4. "Create" 클릭
5. → [Socket Mode 활성화](#2-socket-mode-활성화) 단계로 이동

Manifest를 사용하면 3~6단계를 건너뛸 수 있어요!

---

## 2. Socket Mode 활성화

Socket Mode는 OpenClaw가 Slack과 실시간으로 통신하는 방식이에요. 별도 서버 설정 없이 웹소켓으로 연결됩니다.

### Socket Mode 켜기

1. 좌측 메뉴에서 **"Socket Mode"** 클릭
2. **"Enable Socket Mode"** 토글을 **ON**으로 변경
3. 확인 팝업이 뜨면 **"Continue"** 클릭

### App Token 생성

Socket Mode를 켜면 App Token을 생성하라는 안내가 나와요:

1. **"Generate Token and Scopes"** 버튼 클릭
2. Token Name: `openclaw-connection` (아무 이름이나 OK)
3. Scope 추가: **`connections:write`** 선택 (필수!)
4. **"Generate"** 클릭
5. 생성된 토큰이 `xapp-...` 형식으로 표시돼요
6. **이 토큰을 복사해서 안전한 곳에 저장** (나중에 다시 볼 수 없어요!)

---

## 3. 봇 권한 설정 (Bot Token Scopes)

봇이 Slack에서 메시지를 읽고 보내려면 권한이 필요해요.

1. 좌측 메뉴에서 **"OAuth & Permissions"** 클릭
2. **"Scopes"** 섹션 → **"Bot Token Scopes"** 찾기
3. **"Add an OAuth Scope"** 버튼을 눌러 아래 권한들을 **모두** 추가:

### 필수 권한 목록

| Scope | 설명 |
|-------|------|
| `chat:write` | 메시지 전송 (기본) |
| `channels:history` | 공개 채널 메시지 읽기 |
| `channels:read` | 공개 채널 목록 조회 |
| `groups:history` | 비공개 채널 메시지 읽기 |
| `im:history` | DM 메시지 읽기 |
| `im:read` | DM 목록 조회 |
| `im:write` | DM 메시지 전송 |
| `mpim:history` | 그룹 DM 메시지 읽기 |
| `mpim:read` | 그룹 DM 목록 조회 |
| `mpim:write` | 그룹 DM 메시지 전송 |
| `users:read` | 유저 정보 조회 |
| `app_mentions:read` | 봇 멘션 감지 |
| `assistant:write` | "입력 중..." 표시 (스트리밍) |
| `reactions:read` | 이모지 반응 읽기 |
| `reactions:write` | 이모지 반응 달기 |
| `pins:read` | 핀 메시지 읽기 |
| `pins:write` | 핀 메시지 추가/제거 |
| `emoji:read` | 커스텀 이모지 목록 조회 |
| `commands` | Slash 커맨드 실행 |
| `files:read` | 파일 읽기 |
| `files:write` | 파일 업로드 |

**주의:** 위 권한을 빠짐없이 추가해야 OpenClaw가 제대로 작동해요!

---

## 4. 이벤트 구독 (Event Subscriptions)

봇이 메시지나 반응을 실시간으로 받으려면 이벤트를 구독해야 해요.

1. 좌측 메뉴에서 **"Event Subscriptions"** 클릭
2. **"Enable Events"** 토글을 **ON**으로 변경
3. **"Subscribe to bot events"** 섹션 찾기
4. **"Add Bot User Event"** 버튼을 눌러 아래 이벤트들을 **모두** 추가:

### 필수 이벤트 목록

| Event | 설명 |
|-------|------|
| `app_mention` | 봇이 멘션되었을 때 |
| `message.channels` | 공개 채널 메시지 |
| `message.groups` | 비공개 채널 메시지 |
| `message.im` | DM 메시지 |
| `message.mpim` | 그룹 DM 메시지 |
| `reaction_added` | 이모지 반응 추가됨 |
| `reaction_removed` | 이모지 반응 제거됨 |
| `member_joined_channel` | 멤버가 채널에 입장 |
| `member_left_channel` | 멤버가 채널에서 퇴장 |
| `channel_rename` | 채널 이름 변경 |
| `pin_added` | 메시지 핀 추가 |
| `pin_removed` | 메시지 핀 제거 |

5. 모두 추가했으면 **"Save Changes"** 클릭

---

## 5. App Home 설정

DM으로 봇과 대화하려면 App Home의 **Messages Tab**을 활성화해야 해요.

1. 좌측 메뉴에서 **"App Home"** 클릭
2. **"Show Tabs"** 섹션 찾기
3. **"Messages Tab"** 아래:
   - ✅ **"Allow users to send Slash commands and messages from the messages tab"** 체크
4. **"Your App's Presence in Slack"** 섹션:
   - **Display Name (Bot Name)**: 원하는 봇 이름 입력 (예: `OpenClaw`, `뽀야` 등)
   - **Default username**: Slack에 표시될 @username 입력
5. **"Save Changes"** 클릭 (우측 상단)

---

## 6. 앱 설치 & Bot Token 복사

이제 앱을 워크스페이스에 설치하고 Bot Token을 가져올 차례예요.

### 앱 설치

1. 좌측 메뉴에서 **"Install App"** 클릭
2. **"Install to Workspace"** 버튼 클릭
3. 권한 승인 화면이 나오면 **"Allow"** 클릭

### Bot Token 복사

설치가 완료되면 **Bot User OAuth Token**이 표시돼요:

1. `xoxb-...` 형식의 토큰이 보일 거예요
2. **"Copy"** 버튼을 눌러 복사
3. 안전한 곳에 저장 (App Token과 함께 보관)

이제 Slack 앱 설정은 끝! 🎉

---

## 7. OpenClaw에 연결

Slack 토큰 2개를 OpenClaw에 등록해야 해요:
- **Bot Token** (`xoxb-...`)
- **App Token** (`xapp-...`)

### 방법 1: CLI 명령어로 등록 (추천)

터미널에서 이 명령어를 실행:

```bash
openclaw channels add \
  --channel slack \
  --bot-token "xoxb-your-bot-token" \
  --app-token "xapp-your-app-token"
```

**주의:** 토큰은 반드시 따옴표(`"`)로 감싸주세요!

### 방법 2: `openclaw.json` 직접 편집

OpenClaw 설정 파일을 직접 수정할 수도 있어요:

1. OpenClaw 설정 파일 열기: `~/.openclaw/openclaw.json`
2. `channels` 섹션에 아래 내용 추가:

```json
{
  "channels": {
    "slack": {
      "enabled": true,
      "mode": "socket",
      "botToken": "xoxb-your-bot-token",
      "appToken": "xapp-your-app-token"
    }
  }
}
```

3. 파일 저장

### 방법 3: 환경변수로 등록

환경변수로도 설정 가능해요 (기본 계정만):

```bash
export SLACK_BOT_TOKEN="xoxb-your-bot-token"
export SLACK_APP_TOKEN="xapp-your-app-token"
```

**팁:** 환경변수는 재시작할 때마다 다시 설정해야 하므로 `~/.zshrc` 또는 `~/.bashrc`에 추가하는 게 좋아요.

---

## 8. OpenClaw Gateway 시작 & 페어링

### Gateway 시작

OpenClaw를 실행하세요:

```bash
openclaw gateway
```

또는 이미 실행 중이라면 재시작:

```bash
openclaw gateway restart
```

로그에 `Slack (socket mode) connected` 같은 메시지가 보이면 성공!

### 페어링 (봇과 나를 연결하기)

기본적으로 OpenClaw Slack 봇은 **페어링 모드**로 작동해요. DM을 보내면 봇이 먼저 페어링 코드를 물어봅니다.

**페어링 절차:**

1. Slack에서 설치한 봇에게 **DM** 보내기
   - 아무 메시지나 보내세요 (예: "안녕")
2. 봇이 **페어링 코드**를 답장으로 보내줘요 (예: `abc123`)
3. 터미널에서 페어링 승인:

```bash
openclaw pairing approve slack <코드>
```

예시:
```bash
openclaw pairing approve slack abc123
```

4. 승인되면 이제 DM에서 자유롭게 대화할 수 있어요!

**페어링 확인:**
```bash
openclaw pairing list slack
```

승인된 유저 목록이 나와요.

---

## 9. 채널에서 사용하기

### 봇을 채널에 초대

1. 봇과 대화하고 싶은 채널로 이동
2. 채널 입력창에 `/invite @봇이름` 입력 (예: `/invite @OpenClaw`)
3. 봇이 채널에 참여했다는 메시지가 나와요

### 봇 호출 방법

**기본적으로 채널에서는 봇을 멘션해야 응답해요:**

- `@OpenClaw 안녕!` — 봇이 응답
- `@OpenClaw /status` — 슬래시 커맨드 실행

멘션 없이 메시지를 보내면 봇은 무시해요. (채널 설정으로 변경 가능)

### 채널 접근 제어 (선택)

특정 채널만 허용하고 싶다면 `openclaw.json`에서 채널 allowlist를 설정할 수 있어요:

```json
{
  "channels": {
    "slack": {
      "groupPolicy": "allowlist",
      "channels": {
        "C12345678": {
          "requireMention": true
        }
      }
    }
  }
}
```

- **Channel ID** (`C12345678` 형식)는 채널 우클릭 → "Copy link" → URL의 마지막 부분에서 확인
- `requireMention: false`로 설정하면 멘션 없이도 모든 메시지에 응답 (주의!)

**DM 정책 변경:**

기본 `pairing` 외에도:
- `allowlist`: 특정 유저만 허용
- `open`: 모든 유저 허용 (워크스페이스 내)
- `disabled`: DM 완전 비활성화

```json
{
  "channels": {
    "slack": {
      "dmPolicy": "open",
      "allowFrom": ["*"]
    }
  }
}
```

---

## 10. 스트리밍 설정 (선택)

OpenClaw는 Slack의 **Agents and AI Apps API**를 통해 실시간 타이핑 스트리밍을 지원해요.

### Agents and AI Apps 활성화

1. [Slack API 앱 페이지](https://api.slack.com/apps)로 이동
2. 앱 선택
3. 좌측 메뉴에서 **"Agents and AI Apps"** 클릭
4. **"Enable Agents and AI Apps"** 토글 ON
5. 저장

### OpenClaw 스트리밍 설정

`openclaw.json`에 스트리밍 옵션 추가:

```json
{
  "channels": {
    "slack": {
      "streaming": "partial",
      "nativeStreaming": true
    }
  }
}
```

**스트리밍 모드:**
- `off`: 스트리밍 비활성화 (완성된 메시지만 전송)
- `partial` (기본): 최신 부분 출력으로 계속 업데이트
- `block`: 청크 단위로 추가
- `progress`: 진행 상태만 표시 후 최종 텍스트 전송

**주의:**
- 스트리밍을 사용하려면 반드시 `assistant:write` scope가 필요해요 ([3단계](#3-봇-권한-설정-bot-token-scopes) 참고)
- 스레드 응답이 가능한 환경에서만 작동 (`replyToMode` 설정 필요)

---

## 11. 트러블슈팅

### 봇이 채널에서 응답하지 않아요

**체크리스트:**

1. **멘션 확인** — 채널에서는 기본적으로 `@봇이름`으로 멘션해야 해요
2. **채널 allowlist** — `groupPolicy`가 `allowlist`인 경우 해당 채널이 등록되어 있는지 확인
3. **권한 확인** — Event Subscriptions에 `message.channels` 등이 제대로 추가되었는지 확인
4. **로그 확인**:
   ```bash
   openclaw logs --follow
   ```

**진단 명령어:**
```bash
openclaw channels status --probe
openclaw doctor
```

### DM이 무시돼요

**체크리스트:**

1. **DM 활성화 확인** — `channels.slack.dm.enabled: true`인지 확인
2. **DM Policy 확인** — 기본은 `pairing`. 페어링 승인했는지 확인:
   ```bash
   openclaw pairing list slack
   ```
3. **페어링 재시도**:
   ```bash
   openclaw pairing approve slack <새로운코드>
   ```

### Socket Mode가 연결되지 않아요

**체크리스트:**

1. **Socket Mode 활성화** — Slack 앱 설정에서 Socket Mode가 ON인지 확인
2. **App Token 확인** — `xapp-...` 토큰이 올바른지, `connections:write` scope가 있는지 확인
3. **Bot Token 확인** — `xoxb-...` 토큰이 올바른지 확인
4. **Gateway 재시작**:
   ```bash
   openclaw gateway restart
   ```

### Native 커맨드가 작동하지 않아요

**체크리스트:**

1. **Native 모드 활성화**:
   ```json
   {
     "channels": {
       "slack": {
         "commands": {
           "native": true
         }
       }
     }
   }
   ```
2. **Slack 앱에 Slash 커맨드 등록** — `/openclaw`, `/agentstatus` 등
3. **권한 확인** — `commands` scope 추가되었는지 확인

**참고:** 기본적으로 OpenClaw는 Slack native 커맨드를 자동으로 켜지 않아요. 사용하려면 수동 활성화가 필요해요.

---

## 12. 다음 단계

Slack 연동이 완료되었으니 이제 뭘 해볼까요?

- **워크스페이스 꾸미기** — [ep.4 워크스페이스 문서 관리](/guides/workspace-docs)
- **멀티에이전트로 확장** — [ep.5 멀티에이전트 셋업](/guides/multi-agent-setup)
- **대시보드로 모니터링** — [ep.6 대시보드 만들기](/guides/dashboard-setup)

---

## 참고 자료

- [OpenClaw 공식 Slack 문서](https://docs.openclaw.ai/channels/slack) (영문)
- [Slack API 문서](https://api.slack.com/docs)
- [Slack 앱 관리](https://api.slack.com/apps)

이제 Slack에서 에이전트와 자유롭게 대화할 수 있어요! 🎉
