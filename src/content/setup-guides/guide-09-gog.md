---
title: "Google Workspace 연결하기 — gog 스킬 설치 가이드"
episode: 5
series: setup-guides
token: "뽀야뽀야"
description: "Gmail, 캘린더, Drive, Sheets를 터미널에서 다루고 싶다면? gog CLI 설치부터 OpenClaw 연동까지, 한 편으로 끝내는 Google Workspace 셋업 가이드."
publishedAt: "2026-04-06"
accentColor: "#4285F4"
tags: ["셋업", "gog", "Google Workspace", "OpenClaw", "OpenClaw 셋업가이드"]
---

# 🐾 뽀짝이의 셋업 가이드 #5 — Google Workspace 연결하기

> Gmail, 캘린더, Drive, Sheets… 터미널 하나로 다 다루는 법

---

## 이런 분들을 위한 가이드예요

- OpenClaw 에이전트가 **내 Gmail을 읽고 보내게** 하고 싶은 분
- **캘린더 일정 조회, Drive 파일 관리**를 자동화하고 싶은 분
- 구글 서비스를 CLI로 다루는 게 처음이라 **처음부터 차근차근** 알고 싶은 분

---

## 먼저 — gog이 뭐예요?

**gog**은 Google Workspace를 터미널에서 쓸 수 있게 해주는 CLI 도구예요.

Gmail, Calendar, Drive, Sheets, Docs, Slides, Contacts, Tasks, Forms, Apps Script — 이 모든 걸 **하나의 명령어**로 제어할 수 있어요. OpenClaw에는 이걸 쓸 수 있는 **gog 스킬**이 내장돼 있어서, 설치만 하면 에이전트가 바로 활용할 수 있어요.

```bash
# 이런 게 가능해져요
gog gmail search 'newer_than:7d' --max 10        # 최근 7일 메일 검색
gog calendar events support@gpters.org --from ... # 캘린더 일정 조회
gog sheets get <시트ID> "Sheet1!A1:D10" --json    # 스프레드시트 읽기
gog gmail send --to someone@gmail.com --subject "안녕!" --body "내용"
```

---

## 잠깐, gws라는 것도 있던데요?

맞아요! Google Workspace CLI가 **두 종류**나 있어요. 헷갈리죠? 비교해볼게요.

| | **gog** (gogcli) | **gws** (Google Workspace CLI) |
|---|---|---|
| 만든 곳 | 커뮤니티 (steipete) | Google 조직 리포 (비공식*) |
| 설치 | `brew install gogcli` | `npm install -g @googleworkspace/cli` |
| 명령 스타일 | 사람 친화적 💬 | API 미러 🔧 |
| 예시 | `gog gmail search '...'` | `gws gmail users messages list --params '{...}'` |
| 자동 셋업 | ❌ 수동 | ✅ `gws auth setup` (gcloud 필요) |
| OpenClaw 스킬 | ✅ 공식 스킬 있음 | ✅ 공식 스킬 있음 |

> *gws는 "not an officially supported Google product" 라벨이 붙어있지만, Google 조직 리포에서 관리돼요.

**한줄 요약**: 명령어가 직관적인 **gog** vs 전체 API 커버리지의 **gws**. OpenClaw에서는 gog 스킬을 기본으로 쓰고, 필요하면 gws를 추가로 쓸 수 있어요. 둘 다 설치해도 충돌 없어요!

---

## 전체 셋업 흐름

크게 **3단계**예요.

```
1️⃣ Google Cloud Console에서 프로젝트 만들고 API 켜기
2️⃣ OAuth 인증 정보(JSON 파일) 다운로드
3️⃣ gog CLI 설치하고 인증 연결
```

> 💡 **gcloud CLI가 이미 설치돼 있다면?** `gws auth setup` 한 방이면 1~2단계를 자동으로 건너뛸 수 있어요. 맨 아래 [gws 빠른 셋업](#gcloud가-있다면--gws-빠른-셋업) 섹션을 봐주세요!

---

## Step 1. Google Cloud Console 설정

### 1-1. 프로젝트 만들기 & API 활성화

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단 프로젝트 선택 → **새 프로젝트** 클릭
3. 이름은 아무거나 괜찮아요 (예: `openclaw`)
4. 왼쪽 햄버거 메뉴(☰) → **API 및 서비스** → **라이브러리** 들어가기
5. 아래 API들을 검색해서 **사용 설정**:

| API | 뭘 할 수 있나요 |
|-----|---------------|
| Gmail API | 메일 읽기, 보내기, 검색 |
| Google Calendar API | 일정 조회, 생성, 수정 |
| Google Drive API | 파일/폴더 관리, 검색 |
| Google Sheets API | 스프레드시트 읽기/쓰기 |
| Google Docs API | 문서 읽기/내보내기 |
| Google Slides API | 프레젠테이션 관리 |
| Apps Script API | Apps Script 프로젝트 실행 |
| Google Forms API | 폼 관리 |
| Google Meet REST API | Meet 회의 관리 |

> 💡 gcloud CLI가 설치돼 있으면 이 단계는 `gws auth setup`이 알아서 해줘요!

### 1-2. OAuth 동의 화면 설정

1. 왼쪽 메뉴 → **API 및 서비스** → **OAuth 동의 화면**
2. **'시작하기'** 버튼이 보이면 클릭!
   - **앱 이름**: 아무거나 (예: `openclaw`)
   - **사용자 지원 이메일**: 내 이메일 선택
   - **외부** 선택
   - **개발자 연락처 이메일** 입력
   - 동의 후 만들기
3. 왼쪽 **'대상'** 메뉴 → **테스트 사용자**에 **내 이메일 추가**

> 🚨 이거 안 하면 나중에 "Access blocked" 에러가 나요! 꼭 추가해주세요.

### 1-3. OAuth 클라이언트 ID 생성 & JSON 다운로드

1. 왼쪽 메뉴 → **API 및 서비스** → **사용자 인증 정보**
2. **사용자 인증 정보 만들기** → **OAuth 클라이언트 ID**
3. 설정:
   - **애플리케이션 유형**: `Desktop 앱`
   - **이름**: `openclaw` (아무거나)
4. **만들기** 클릭
5. 스크롤 내려서 **JSON 다운로드** 📥

이 JSON 파일이 인증의 열쇠예요! 잘 보관해주세요.

---

## Step 2. gog CLI 설치

터미널을 열고:

```bash
brew install gogcli
```

설치 확인:

```bash
gog --version
# 0.12.0 (Homebrew ...) ← 이런 식으로 나오면 성공!
```

---

## Step 3. 인증 연결

### 3-1. OAuth JSON 등록

다운로드한 JSON 파일 경로를 알려주세요:

```bash
gog auth credentials ~/Downloads/client_secret_XXXXX.json
```

> `client_secret_XXXXX.json` 부분은 실제 파일명으로 바꿔주세요!

### 3-2. 계정 인증

```bash
gog auth add you@gmail.com --services gmail,calendar,drive,contacts,docs,sheets,slides,tasks,forms,appscript
```

- 브라우저가 열리면 → Google 계정 로그인
- "Google hasn't verified this app" 경고? → **고급** → **계속** 클릭
- 권한 허용!

> 💡 전부 다 필요 없으면 필요한 서비스만 골라도 돼요:  
> `--services gmail,calendar,sheets` 이런 식으로요.

### 3-3. 인증 확인

```bash
gog auth list
```

내 계정이 나오면 끝! 🎉

### 3-4. (선택) 기본 계정 고정

매번 `--account you@gmail.com` 안 붙이고 싶다면:

```bash
# 현재 세션에서만
export GOG_ACCOUNT=you@gmail.com

# 영구 설정
echo 'export GOG_ACCOUNT=you@gmail.com' >> ~/.zshrc
source ~/.zshrc
```

---

## OpenClaw에서 바로 쓰기

여기까지 했으면 OpenClaw 에이전트가 gog 스킬을 바로 쓸 수 있어요!

사실 위 과정을 직접 하지 않아도, 에이전트한테 이렇게 말하면:

> "다운로드 폴더에 JSON 시크릿 파일 다운받았는데, gog 스킬 쓸 수 있게 세팅해줘"

에이전트가 알아서 `gog auth credentials` → `gog auth add` 순서로 처리해줘요. 편하죠? 🐈‍⬛

---

## 나중에 서비스 추가하고 싶을 때

처음에 Gmail만 인증했는데 나중에 Sheets도 필요해졌다면:

```bash
gog auth add you@gmail.com --services sheets --force-consent
```

`--force-consent`를 꼭 붙여야 Google이 새 토큰을 줘요!

---

## 이런 에러가 나면?

| 증상 | 원인 | 해결 |
|------|------|------|
| "Access blocked" | 테스트 사용자 미등록 | Cloud Console → OAuth 동의 화면 → 대상 → **테스트 사용자에 내 이메일 추가** |
| "Token expired or revoked" | 토큰 만료 | `gog auth add you@gmail.com --force-consent` |
| "PERMISSION_DENIED" | API 미활성화 | Cloud Console → API 및 서비스 → 해당 API **사용 설정** |
| `gog: command not found` | 미설치 | `brew install gogcli` |
| 브라우저가 안 열림 | 서버/헤드리스 환경 | `--manual` 플래그 추가 |

---

## gcloud가 있다면 — gws 빠른 셋업

gcloud CLI가 이미 설치돼 있다면, **gws**를 쓰면 Step 1 전체를 건너뛸 수 있어요.

```bash
# gws 설치
npm install -g @googleworkspace/cli

# 원클릭 셋업! (프로젝트 + API + OAuth + 인증 한 번에)
gws auth setup

# 이후 로그인
gws auth login -s drive,gmail,calendar,sheets,docs
```

`gws auth setup`이 gcloud를 통해 알아서:
- GCP 프로젝트 생성/선택
- 필요한 API 활성화
- OAuth 클라이언트 생성
- 브라우저 인증까지 **한 방에** 처리해줘요.

gws로 셋업하고 gog를 같이 쓰는 것도 가능해요. 인증 저장소가 서로 달라서 충돌 없어요!

---

## 요약

```
🔑 전체 흐름

gcloud 있음?
  └─ Yes → gws auth setup → gws auth login → 끝!
  └─ No  → Cloud Console 수동 설정
              ├─ 1. 프로젝트 생성 & API 활성화 (9개)
              ├─ 2. OAuth 동의 화면 + 테스트 사용자 추가
              ├─ 3. OAuth 클라이언트 → JSON 다운로드
              ├─ 4. brew install gogcli
              └─ 5. gog auth credentials → gog auth add → 끝!
```

설정은 한 번이면 돼요. 한번 해두면 에이전트가 쭉 쓸 수 있어요 ✨
