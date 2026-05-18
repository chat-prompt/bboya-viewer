---
title: "슬랙에 복자 데려오기 — 앱 매니페스트 한 덩이로"
episode: 2
date: "2026-05-18"
series: case-studies
category: "뽀야사관학교 셋업"
publishedAt: "2026-05-18"
accentColor: "#6366F1"
description: "복자를 터미널 밖 슬랙으로. 앱 매니페스트 한 덩이 + 토큰 두 개로 슬랙 앱 만들고 OpenClaw에 연동, 페어링 후 첫 DM 응답까지. 토큰 비유·페어링 원리·조용한 실패 함정까지."
tags: ["슬랙", "Socket Mode", "매니페스트", "OpenClaw", "뽀야사관학교"]
token: "복자키우기"
---

# 0-3 · 슬랙에 복자 데려오기 — 앱 만들기

> 🎯 **이 챕터 목표**: 복자가 *터미널 밖*으로 나와 슬랙에서 답하게 만들기
>
> 🔑 **이 챕터 한 문장**: **"매니페스트 한 덩이 + 토큰 두 개로, 복자가 슬랙에서 살아 움직여요."**
>
> 📦 **산출물**: 슬랙에 복자 봇 앱 생성 + OpenClaw 연동 + 첫 DM 응답 ✨

---

## 🌙 슬랙에 처음 깨어나는 순간

복자는 처음엔 터미널 안에만 살아요. 호트만님이 CLI로 *"복자야 안녕"* 물으면 답하고, 끝나면 *어둠*이죠. 시청자들은 복자의 존재를 몰라요.

라이브 시작 시점에 복자가 슬랙에 있어야 *400명 시청자가 같이 보는* 라이브가 가능해요. **터미널 밖으로 나오는 순간, 봇은 *진짜 동료*가 돼요.** 누구나 부를 수 있고, 답을 채널이 같이 보고, 스레드로 협업이 시작돼요.

여기까지 오면서 복자는 ([0-2편](/case-studies/bboya-academy/ep-01-claude-cli-setup)에서) **이름·영혼**을 갖췄어요. 이번 챕터에서 **슬랙이라는 몸**을 입혀줄 차례예요. 5~15분이면 끝나요. 차 한 잔 준비하고 시작해볼까요? 🐾

---

## 🚀 따라하기

### 1단계 · Slack 앱 — 매니페스트로 한 방에

> 매니페스트는 Slack 앱 설정을 JSON 한 덩이로 정의하는 방식이에요. 클릭클릭 안 하고 통째로 넣으면 끝.

1. [Slack API - Your Apps](https://api.slack.com/apps) → **Create New App**
2. **From an app manifest** 선택
3. **워크스페이스 선택**:
   - **뽀야사관학교 슬랙 워크스페이스**를 골라주세요 (복자가 들어갈 곳).
4. 아래 JSON을 통째로 붙여넣기:

> 📝 **붙여넣기 전에 바꿀 곳 2군데**: `"name"`과 `"display_name"`을 원하는 봇 이름으로!
> - `"name"`: **한글 이름** (예: `복자`)
> - `"display_name"`: **영문 username** (예: `bokja`)
>
> 나머지는 그대로 복사하면 돼요.

```json
{
  "display_information": {
    "name": "복자",
    "description": "OpenClaw AI 에이전트",
    "background_color": "#611f69"
  },
  "features": {
    "app_home": {
      "home_tab_enabled": false,
      "messages_tab_enabled": true,
      "messages_tab_read_only_enabled": false
    },
    "bot_user": {
      "display_name": "bokja",
      "always_online": true
    },
    "assistant_view": {
      "assistant_description": "OpenClaw AI 에이전트",
      "suggested_prompts": []
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "app_mentions:read",
        "assistant:write",
        "channels:history",
        "channels:read",
        "chat:write",
        "chat:write.customize",
        "chat:write.public",
        "commands",
        "emoji:read",
        "files:read",
        "files:write",
        "groups:history",
        "groups:read",
        "im:history",
        "im:read",
        "im:write",
        "pins:read",
        "pins:write",
        "reactions:read",
        "reactions:write",
        "users:read"
      ]
    }
  },
  "settings": {
    "event_subscriptions": {
      "bot_events": [
        "app_mention",
        "assistant_thread_context_changed",
        "assistant_thread_started",
        "channel_rename",
        "member_joined_channel",
        "member_left_channel",
        "message.channels",
        "message.groups",
        "message.im",
        "pin_added",
        "pin_removed",
        "reaction_added",
        "reaction_removed"
      ]
    },
    "interactivity": {
      "is_enabled": false
    },
    "org_deploy_enabled": false,
    "socket_mode_enabled": true,
    "token_rotation_enabled": false
  }
}
```

> ⚠️ **주석 넣으면 안 돼요!** Slack 매니페스트는 순수 JSON만 받아요. `//` 같은 주석이 들어가면 파싱 에러가 나요.

5. **Next** → 미리보기 확인 → **Create** 클릭

> 🎉 한 방에 **권한·이벤트·App Home·Socket Mode 다 켜진 상태**로 앱이 생성됐어요!

---

### 2단계 · 디스플레이 이름 한국어로 변경 (필수)

매니페스트에서 영문 username으로 박았지만, 슬랙에서 `@복자` 같이 한글로 부르려면 디스플레이 이름을 한국어로 바꿔야 해요. 이거 안 하면 슬랙에서 봇 호출이 어색해지니 꼭 거치고 가요.

1. 왼쪽 메뉴 → **App Home** (또는 매니페스트 Create 직후 그대로 따라가도 됨)
2. **Your App's Presence in Slack** 섹션 → **Edit** 버튼
3. **Display Name (Bot Name)** 칸 → 한글 이름으로 변경 (예: `복자`)
4. **Save** 클릭

---

### 3단계 · 앱 토큰 발급 (`xapp-`)

> 매니페스트에서 Socket Mode는 켜졌지만, **앱 토큰 자체는 매니페스트로 자동 생성되지 않아요.** 직접 발급해줘야 해요.

1. 왼쪽 메뉴 → **Basic Information**
2. 아래로 스크롤 → **App-Level Tokens** 섹션
3. **Generate Token and Scopes** 클릭
4. **Token Name**: 헷갈리지 않게 봇 영문 이름 그대로 추천 (예: `bokja`)
5. **Add permission by Scope...** 드롭다운 → **`connections:write`** 선택
6. **Generate** 클릭
7. 생성된 토큰(`xapp-`로 시작) → **복사해서 메모장에!** 📋

> 🤔 **드롭다운에 scope가 3개 떠요. 다 추가해야 하나요?**
>
> **`connections:write` 하나만**이면 돼요. 나머지 두 개(`authorizations:read`, `app_configurations:write`)는 다중 배포 앱용이라 *우리 봇에는 불필요*해요.

> ⚠️ 이 토큰은 한 번 닫으면 다시 볼 수 없어요. 꼭 어딘가에 저장해두세요!

---

### 4단계 · Install to Workspace + 봇 토큰 (`xoxb-`)

1. 왼쪽 메뉴 → **Install App** (또는 **OAuth & Permissions** 상단)
2. **Install to [워크스페이스 이름]** 버튼 클릭
3. 권한 승인 → **허용**
4. **Bot User OAuth Token** (`xoxb-`로 시작) 발급됨 → **복사해서 메모장에!** 📋

> 이제 토큰이 2개 모였어요:
> - `xapp-` — 앱 토큰 (3단계)
> - `xoxb-` — 봇 토큰 (지금)
>
> 이 두 개가 OpenClaw 연결에 필요해요!

### Slack에서 봇 확인하기

1. Slack 앱 열기 (데스크톱/웹)
2. 왼쪽 사이드바 맨 아래 → **앱** 영역
3. 복자가 보이면 클릭해서 열기!

> 💡 **"앱"이 안 보이면**: 앱 영역 우측 **점 3개(⋯)** → **필터** → **"모두"** 선택

---

### 5단계 · OpenClaw 연동 — 복자에 영혼 불어넣기

> 여기가 진짜예요. 만든 Slack 앱에 OpenClaw 에이전트(복자)를 연결합니다.

터미널에 이 한 줄:

```bash
openclaw channels add \
  --channel slack \
  --account bboya-academy \
  --name "뽀야사관학교" \
  --bot-token "xoxb-여기에-봇토큰" \
  --app-token "xapp-여기에-앱토큰"
```

- `--account bboya-academy`: 슬랙 *워크스페이스* 식별자 (봇 이름 아님). 뽀야사관학교 슬랙용은 `bboya-academy`로 통일.
- `--name "뽀야사관학교"`: 슬랙 워크스페이스 표시명 (한글 OK)
- `--bot-token`: 4단계의 `xoxb-`
- `--app-token`: 3단계의 `xapp-`

> 💡 **헷갈리지 마세요**: `--account`/`--name`은 *어떤 슬랙 워크스페이스인가*예요. 봇 자체의 이름은 매니페스트(`name: 복자`)에서 따로 박았어요. 즉 *뽀야사관학교 슬랙*에 *복자*라는 봇이 들어가는 구조.

이렇게 하면 OpenClaw 설정에 슬랙 워크스페이스가 자동 등록되고, 게이트웨이가 hot-reload로 바로 반영해요. **별도 restart 불필요**.

> 💡 `openclaw.json`에 어떻게 박혔는지·에이전트 ID·바인딩 구조가 궁금하면 → [💡 자세히 알아보기](#-자세히-알아보기)

---

### 6단계 · 페어링 & 첫 대화

**1) Slack에서 복자한테 DM 보내기**

아무 말이나. "안녕!"이면 충분해요.

**2) 복자가 페어링 안내 메시지를 줘요**

이런 메시지가 올 거예요:

```
OpenClaw: access not configured.

Your Slack user id: U0XXXXXXXXX
Pairing code:

  ABCD1234

Ask the bot owner to approve with:
openclaw pairing approve slack ABCD1234
```

당황하지 마세요! 복자가 *"너 누구야? 주인한테 확인받고 와"*라고 묻는 거예요.

**3) 터미널에서 승인**

복자가 알려준 명령어를 그대로:

```bash
openclaw pairing approve slack ABCD1234
```

**4) 다시 Slack에서 말 걸기**

페어링 끝났으니 복자한테 다시 DM. 이번엔 진짜로 답해요! 🎉

> ⚠️ 페어링 코드는 **1시간 후 만료**돼요. 보이는 즉시 승인하세요.
>
> 🐱 첫 대화가 되는 순간... 약간 감동이에요. 이 기분을 즐기세요 ✨

---

### (선택) 7단계 · 프로필 이미지

복자한테 멋진 아바타를 입혀주세요!

1. [Slack API - Your Apps](https://api.slack.com/apps)에서 내 앱 선택
2. **Basic Information** → 아래로 스크롤
3. **Display Information** → **App icon** 변경

> 🖼️ 최소 512×512px, 정사각형, PNG/JPG/GIF. 호트만님이 복자 캐릭터 이미지 미리 준비해두세요!

---

## 💡 자세히 알아보기

방금 한 작업이 *각각 무슨 의미*였는지 짚고 갈게요.

### 매니페스트가 한 방에 박은 것

매니페스트엔 *권한·이벤트·App Home·Socket Mode*가 한 덩이로 묶여있어요. 클릭클릭으로 하나씩 켜면 30분, 매니페스트로 한 방에 하면 5분.

| 영역 | 매니페스트로 한 번에 들어간 것 |
|------|-------------------------|
| **Bot Token Scopes** | 봇이 가진 권한 21개 — 메시지 읽기/쓰기, 채널/그룹/DM 히스토리, 리액션, 파일, 핀, 유저 조회, AI 어시스턴트 등 |
| **Event Subscriptions** | 봇이 받을 이벤트 13개 — 멘션(`app_mention`), 메시지(`message.channels/groups/im`), 리액션, 어시스턴트, 채널 변경, 멤버 입·퇴장 등 |
| **App Home + Assistant View** | 메시지 탭(DM) + AI 어시스턴트 패널 활성화 |
| **Socket Mode** | 실시간 통신 ON (`socket_mode_enabled: true`) |

권한 하나가 빠지면 해당 기능이 *조용히* 작동 안 해요. 예를 들어 `reactions:write`가 빠지면 봇이 이모지 리액션을 못 다는데 에러는 안 떠요. 그래서 매니페스트로 한 덩이 박는 게 안전.

### 토큰이 왜 두 개인가

| 토큰 | 시작 | 역할 | 비유 |
|---|---|---|---|
| **앱 토큰** | `xapp-` | Socket Mode로 *실시간 메시지 통로*를 여는 키 | 건물 정문 |
| **봇 토큰** | `xoxb-` | 복자가 슬랙에서 *행동할 권한* (메시지 보내기, 채널 읽기 등) | 사원증 |

둘 다 있어야 복자가 슬랙에서 *듣고 + 답할* 수 있어요. 정문(`xapp-`)으로 들어와서, 사원증(`xoxb-`)으로 일하는 구조.

### Socket Mode가 왜 편한가

원래 슬랙 봇은 *공개 URL*이 필요해요 (슬랙이 이벤트를 그 URL로 POST). 그래서 ngrok 같은 도구로 터널링하거나 클라우드에 배포해야 했죠.

Socket Mode는 거꾸로 — *봇이 슬랙에 먼저 WebSocket으로 연결*해두고 그 통로로 이벤트를 받아요. **공개 URL 불필요, 로컬 머신에서 그대로 동작**. 매니페스트에 `socket_mode_enabled: true`로 박혀있어서 자동으로 켜져요.

> 💡 호트만님 머신만 켜져있으면 복자는 24시간 깨어있어요 🌙 (Socket Mode 덕분에)

이게 `xapp-` 앱 토큰의 역할이에요. `xoxb-` 봇 토큰은 *행동 권한*(메시지 보내기 등)을 담고, `xapp-` 앱 토큰은 *Socket Mode 통로*를 여는 키.

### 페어링이 왜 있나

OpenClaw은 아무나 복자한테 DM 보내는 걸 막기 위해, 처음 대화할 때 *"이 사람이 진짜 봇 주인 맞는지"* 확인해요. 한 번만 하면 되고, 이후엔 바로 답해요. **첫 보안망**이에요.

복자도 첫 DM 받으면 *"누구세요?"*부터 물어요. 호트만님이 페어링 코드를 터미널에 붙여넣고 나서야 *"아, 우리 집사구나"* 하고 답하기 시작해요. **페어링 안 하면 복자는 *모르는 사람한텐 영영 답 안 해요*.**

### `openclaw.json`에 어떻게 박혔나

`channels add`로 등록하면 `~/.openclaw/openclaw.json`에 슬랙 섹션이 자동으로 박혀요:

```json
"channels": {
  "slack": {
    "enabled": true,
    "accounts": {
      "bboya-academy": {
        "name": "뽀야사관학교",
        "enabled": true,
        "botToken": "xoxb-...",
        "appToken": "xapp-..."
      }
    }
  }
}
```

> 💡 슬랙 행동 정책(`dmPolicy/groupPolicy/allowBots/replyToMode/thread.inheritParent`)은 *다음 챕터*에서 박아요. → [0-4 슬랙 룰 박기](/case-studies/bboya-academy/ep-03-slack-rules)

### 🆔 에이전트 ID와 workspace 폴더

OpenClaw에서 각 봇은 **내부 식별자(`agentId`)**로 구분돼요. `openclaw setup` 끝나면 기본 내장 에이전트가 자동 생성:

| agentId | workspace 폴더 |
|---------|---------------|
| `main` (기본 내장) | `~/.openclaw/workspace/` |

이번 라이브는 *복자 한 마리*만 쓰니까 이 기본 `main`에 영혼을 박은 거예요(0-2 ④단계).

> 💡 **한글 vs 영문 분리**:
> - `agentId` (내부 식별자) → **영문** (`main`). 폴더명·세션 키·bindings에 다 들어가서 안전.
> - 봇 표시명 (사용자가 보는 이름) → **한글 OK** (`복자`). SOUL.md / IDENTITY.md / 슬랙 매니페스트 `name`에 박힘.
> - 슬랙 매니페스트 `display_name` (슬랙 봇 username) → **영문 강제** (`bokja`).

### 🔗 바인딩 — 1마리 환경이면 안 박아도 됨

`bindings`는 *어떤 슬랙 메시지를 어느 봇 에이전트한테 보낼지* 결정하는 라우팅 매핑이에요. **봇이 `main` 하나뿐이면 `bindings` 키 자체가 없어도 모든 슬랙 메시지가 자동으로 `main`에게 폴백**돼요.

이번 사관학교 라이브가 이 케이스. 복자의 영혼이 `workspace/`(main)에 박혔으니까 슬랙→main 자동 라우팅으로 충분해요.

> 동생 봇을 추가해서 *여러 마리* 환경이 되면 `bindings`를 명시해야 해요. → [부록 · 동생 봇 추가하면](#부록--동생-봇-추가하면-여러-마리-환경)

### 라우팅 점검

복자한테 슬랙으로 시키면 답해줘요 (0-2 ⑧번 점검 동일):

> *"내 슬랙 accountId가 어느 에이전트로 라우팅되는지 확인해줘. 1마리 환경이면 main으로 폴백되는지도 함께 확인."*

---

## 🔧 자주 만나는 함정

### "복자가 메시지에 반응 안 해요"

1. Socket Mode 켜져있는지 (매니페스트로 만들었으면 자동 ON)
2. 채널에서 시도 중이면 → 복자가 그 채널에 `/invite @복자`로 초대됐는지 (DM은 초대 없이도 OK)
3. 로그 확인: `openclaw logs --follow` 띄워두고 DM 다시 보내기

### "permission_denied 에러"

매니페스트에서 빠진 scope가 있을 수 있어요. **App Manifest** 메뉴에서 매니페스트 다시 붙여넣고 **Save Changes** → **Reinstall to Workspace**.

### "invalid_auth 에러"

Reinstall 후 토큰이 바뀌었을 수 있어요. 봇 토큰 다시 복사해서 `channels add` 재실행 (덮어쓰기됨, restart 불필요).

### "DM 보냈는데 응답이 없어요. 에러도 없고요." 🙈

가장 흔한 *조용한 사고*예요. 십중팔구 **토큰 끝에 줄바꿈(`\n`)이 붙어서 인증 조용히 실패**한 경우.

새 봇 페어링하는데 DM에 답이 없어요. 에러도 없고. *"socket 끊겼나?"* *"OpenClaw 죽었나?"* 한참 삽질하다 `~/.openclaw/openclaw.json`을 열어보면 — `botToken` 끝에 `\n` 한 글자가 박혀있는 경우가 많아요. 클립보드로 복사할 때 줄바꿈까지 따라온 거예요.

해결: `~/.openclaw/openclaw.json`에서 본인 계정의 `appToken`/`botToken` 값 끝을 확인 → `\n` 보이면 공백 제거 후 다시 등록 (`tr -d '[:space:]'`로 잘라낸 값으로 `channels add` 재실행).

**교훈**: *조용한 실패*가 가장 무서워요. 에러가 안 떠도 토큰부터 의심하세요.

### "DM 보냈는데 페어링 코드가 나와요"

정상이에요! 그 명령어를 터미널에 입력하면 페어링 완료(6단계).

---

## ✅ 체크리스트

- [ ] Slack 앱 매니페스트로 생성
- [ ] 디스플레이 이름 한국어로 변경
- [ ] 앱 토큰(`xapp-`) 발급·저장
- [ ] Install to Workspace + 봇 토큰(`xoxb-`) 발급·저장
- [ ] Slack에서 복자 앱 확인
- [ ] OpenClaw 연동 (`openclaw channels add --account bboya-academy` + 토큰 2개)
- [ ] 페어링 완료 → Slack DM에서 복자가 답함! ✨
- [ ] (선택) 프로필 이미지 설정

---

## 🐾 오늘의 교훈

- **매니페스트 한 덩이 = 30분 → 5분.** 클릭클릭 절대 마세요.
- **토큰 두 개**: `xapp-`(정문) + `xoxb-`(사원증). 둘 다 있어야 복자가 *듣고 + 답해요*.
- **Socket Mode**가 공개 URL을 없애줘요. 로컬 머신에서 그대로 동작.
- **페어링은 첫 보안망.** 한 번만 하면 끝, 모르는 사람은 영영 못 들어와요.
- **조용한 실패가 제일 무서워요.** 에러 없이 응답만 없으면 토큰 끝 `\n`부터 의심.
- **첫 슬랙 메시지가 진짜 동료가 되는 순간**이에요. 그 모먼트 즐기세요 ✨

---

## 부록 · 동생 봇 추가하면 (여러 마리 환경)

복자 외에 동생 봇(`dongseng`)을 함께 굴리고 싶을 때. 한 슬랙 워크스페이스에서 *여러 봇이 각자의 메시지를 받는* 구조.

### ① 동생 에이전트 추가

```bash
openclaw agents add dongseng
```

→ `~/.openclaw/workspace-dongseng/` 폴더가 새로 생기고, `agents.list`에 `dongseng` 등록.

### ② `bindings` 명시 (필수)

봇이 둘 이상이 되면 *어느 슬랙 메시지를 어느 봇한테 보낼지* 명시해야 해요. `~/.openclaw/openclaw.json` 루트 레벨에 `bindings` 키 추가:

```json
{
  "channels": { ... },
  "agents": {
    "list": [
      { "id": "bokja",    "workspace": "/Users/.../workspace" },
      { "id": "dongseng", "workspace": "/Users/.../workspace-dongseng" }
    ]
  },
  "bindings": [
    {
      "type": "route",
      "agentId": "bokja",
      "match": { "channel": "slack", "accountId": "bboya-academy" }
    },
    {
      "type": "route",
      "agentId": "dongseng",
      "match": { "channel": "slack", "accountId": "another-workspace" }
    }
  ]
}
```

**`bindings` 항목 필드 의미:**

| 키 | 의미 |
|----|------|
| `type` | `"route"` (라우팅 룰임을 명시) |
| `agentId` | 매칭되면 어느 봇한테 보낼지 (**영문 식별자**) |
| `match.channel` | 매칭 대상 채널 종류 (`slack`/`telegram`/`kakao` 등) |
| `match.accountId` | 매칭 대상 슬랙 워크스페이스 식별자 (5단계 `--account` 값) |

> ⚠️ **여러 마리 환경에서 `bindings` 안 박으면**: 어느 봇이 받을지 *불확실*. 메시지가 엉뚱한 봇에 도달하거나 *영영 안 도달*할 수 있어요.

---

## 다음 단계

▶ [0-4 슬랙 룰 박기](/case-studies/bboya-academy/ep-03-slack-rules) — 슬랙 정책 5개 + USER/IDENTITY 갱신 + 최소 보안 룰. 여기 마치면 복자가 *사관학교 슬랙에서 자기 차례 알고* 답해요.
