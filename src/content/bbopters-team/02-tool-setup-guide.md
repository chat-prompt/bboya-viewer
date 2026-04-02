---
title: "봇 도구(MCP) 세팅 가이드"
date: "2026-03-28"
description: "다른 머신 봇이 팀 공용 도구를 쓸 수 있게 하는 방법"
---

# 02. 봇 도구(MCP) 세팅 가이드

> 다른 머신에서 돌아가는 봇이 팀 공용 도구를 쓸 수 있게 하는 방법.

## 배경

뽀피터스 팀은 각 봇이 **다른 머신**에서 구동된다:

| 봇 | 머신 | 양육자 |
|----|------|--------|
| 뽀야 🐱 | 집사 맥미니 | 집사(닿) |
| 뽀짝이 🐈‍⬛ | 집사 맥미니 | 집사(닿) |
| 뽀둥이 ☁️ | 소파님 맥북에어 | 소파 |
| 뽀식이 🩶 | 타타님 맥미니 | 타타 |

**같은 머신**(뽀야·뽀짝이) → 설정 파일 심링크로 공유 가능.
**다른 머신**(뽀둥이·뽀식이) → **심링크 불가**. 각 머신에서 직접 세팅해야 함.

> ⚠️ **심링크로 해결하려고 하지 마세요.** 다른 머신이면 파일시스템이 다릅니다. (3회 반복된 실수)

---

## 1. 필수 도구: Linear MCP

Linear 이슈 생성·조회·관리에 사용. `create-issue` 스킬이 이 MCP에 의존함.

### Step 1: npm 패키지 설치

```bash
npm install -g @daht-mad/linear-mcp-plus
```

또는 `npx -y`로 실행 시 자동 설치되므로 미리 설치 안 해도 됨.

### Step 2: mcporter 설치 및 설정

뽀피터스 팀은 MCP를 `mcporter` CLI로 호출한다.

```bash
# mcporter 설치
npm install -g mcporter
```

`~/.mcporter/mcporter.json` 생성:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@daht-mad/linear-mcp-plus"],
      "env": {
        "LINEAR_API_TOKEN": "<여기에 토큰>"
      }
    }
  }
}
```

### Step 3: Linear API 토큰 발급

1. https://linear.app/settings/api 접속
2. "Personal API keys" → "Create key"
3. Label: `봇이름-mcp` (예: `bbodoong-mcp`)
4. 생성된 토큰을 Step 2의 `<여기에 토큰>`에 넣기

> ⚠️ 팀 공용 토큰이 아닌 **양육자 개인 토큰**을 사용. 봇의 Linear 활동이 양육자 이름으로 기록됨.
> 필요시 집사에게 별도 서비스 계정 요청.

### Step 4: 동작 확인

```bash
npx -y mcporter call 'linear.linear_getViewer'
```

자신의 Linear 사용자 정보가 출력되면 성공.

---

## 2. 스킬 사용을 위한 전제조건

### `create-issue` 스킬

| 필요한 것 | 설정 방법 |
|-----------|-----------|
| `@daht-mad/linear-mcp-plus` MCP | 위 Step 1~4 완료 |
| Education 팀 ID | 스킬에 하드코딩됨 (변경 불필요) |
| Todo stateId | 스킬에 하드코딩됨 (변경 불필요) |

스킬 자체는 `/Users/dahtmad/.claude/skills/create-issue/`에 있고, OpenClaw `skills.load.extraDirs` 설정으로 모든 에이전트가 자동 로드함. **다른 머신에서도 스킬 폴더가 동기화되어 있다면** 바로 사용 가능.

> 다른 머신의 스킬 폴더 동기화는 OpenClaw의 `skills.load.extraDirs` 또는 수동 복사로 처리.

---

## 3. 환경변수 관리 원칙

| 방식 | 언제 | 예시 |
|------|------|------|
| `mcporter.json`에 `env` | MCP 서버별 토큰 | `LINEAR_API_TOKEN` |
| `.envrc` (direnv) | 프로젝트별 환경변수 | `AIRTABLE_API_KEY` |
| 시스템 환경변수 | 전역 설정 | `GOG_ACCOUNT` |

**원칙**: 한 도구의 키는 한 곳에서만 관리. 중복 금지.

---

## 4. 추가 도구 (필요시)

### Airtable SDK

AI스터디 운영 등에서 Airtable 데이터 조회 시 필요.

```bash
# 스킬 폴더에서 의존성 설치
cd /path/to/skills/airtable-sdk
bun install  # 또는 npm install
```

`.envrc` 또는 환경변수에 `AIRTABLE_API_KEY` 설정.

### n8n MCP

워크플로우 관리 시 필요 (현재 일몰 진행 중이므로 신규 봇은 불필요).

---

## 5. 트러블슈팅

### "linear_getViewer 도구를 찾을 수 없습니다"
→ mcporter가 설치 안 됐거나, `mcporter.json`에 linear 서버가 없음.
→ Step 2 재확인.

### "401 Unauthorized"
→ `LINEAR_API_TOKEN`이 잘못됐거나 만료됨.
→ Step 3에서 새 토큰 발급.

### "npm 패키지를 찾을 수 없습니다"
→ `@daht-mad/linear-mcp-plus`는 npm 공개 패키지. 네트워크 확인.
→ `npm view @daht-mad/linear-mcp-plus`로 존재 확인.

### 스킬이 목록에 안 보임
→ OpenClaw 설정의 `skills.load.extraDirs`에 스킬 폴더 경로 확인.
→ 다른 머신이면 해당 머신에도 스킬 파일이 있어야 함.

---

## 6. 양육자 체크리스트

새 봇 세팅 시 양육자가 확인할 것:

```
[ ] Node.js 설치됨 (v20+)
[ ] npm/bun 사용 가능
[ ] mcporter 설치 완료
[ ] ~/.mcporter/mcporter.json 생성 + linear 서버 등록
[ ] LINEAR_API_TOKEN 발급 및 입력
[ ] npx -y mcporter call 'linear.linear_getViewer' 성공
[ ] (선택) 추가 MCP 서버 등록 (Airtable SDK 등)
```

---

## 삽질 로그

### 2026-03-30: 심링크 실수 3회 반복
- 뽀둥이에게 MCP 설정 공유할 때 심링크 제안 → 집사 지적
- **원인**: "같은 팀 = 같은 머신" 착각
- **교훈**: 다른 머신 봇에게는 무조건 "각자 머신에서 직접 세팅" 가이드
- `learnings/team-collab.md`에 영구 기록됨
