---
title: "MCP 등록 길찾기 — 4가지 옵션, 한 가지 추천"
episode: 3
date: "2026-05-01"
series: case-studies
category: "Claude CLI 도입기"
publishedAt: "2026-05-01"
accentColor: "#8B5CF6"
description: "OpenClaw + Claude CLI 환경에서 MCP를 어디에 박을지 헷갈린다. Claude 글로벌·프로젝트·OpenClaw·mcporter 4가지 옵션을 공식문서 근거로 풀고, 한 가지를 권장한다."
tags: ["MCP", "Claude CLI", "OpenClaw", "mcporter", "bundleMcp"]
token: "밋업"
---

# 3 · MCP 등록 길찾기 — 4가지 옵션, 한 가지 추천

> 🛣️ **이 편의 핵심** — OpenClaw + Claude CLI 환경에서 MCP 서버 등록할 길이 4가지나 된다. 처음엔 *어디 박아야 봇이 쓸까?* 헷갈리는데, 공식문서 근거로 보면 **하나만 골라도 충분**하다. 결론부터 — `~/.claude.json`이 우리 권장.
>
> 📜 *왜 PI 대신 Claude CLI를 골랐나* 궁금하면 → [ep.2 PI vs Claude CLI](./ep-02a-pi-vs-cli)부터 읽고 오자. 본 편은 그 결정 *이후* 마주치는 운영 디테일이다.
>
> 📝 **2026-05-08 정정** — 초기 발행 시 권장 위치를 `~/.claude/settings.json`로 표기했었는데, **Claude Code CLI가 `claude mcp add`로 박는 실제 위치는 `~/.claude.json`**. 본문 전체 표기 정정 완료. (공식문서 `bundles.md`는 *Claude `settings.json`*이라 적혀있지만, 사용자가 직접 만지는 실제 파일 경로는 `~/.claude.json`이라는 게 직접 검증 결과)

---

## 🤔 도입 — MCP 어디에 박지?

뽀피터스 운영하면서 가장 헷갈렸던 순간 중 하나 — *MCP 등록 위치가 4군데*가 나왔다.

```
1. ~/.claude.json  ← Claude Code 글로벌
2. <프로젝트>/.mcp.json      ← 프로젝트별
3. openclaw mcp set ...      ← OpenClaw 자체
4. ~/.mcporter/mcporter.json ← mcporter (Bash 호출용)
```

처음엔 *PI 시절* OpenClaw에 박아 쓰다가, *Claude CLI 백엔드*로 갈아타면서 *adapter 실패* 겪고 *mcporter*로 우회했다가, 지금은 *bundleMcp 정식화* 덕에 다시 정리할 수 있게 됐다.

이 글은 그 4가지 길을 공식문서 근거로 풀고, **하나로 모으는** 가이드다.

---

## 🛣️ 4가지 옵션 — 어디에 박는가, 누가 읽는가

### A. `~/.claude.json` — Claude Code 글로벌

```jsonc
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "NOTION_API_KEY": "..." }
    }
  }
}
```

**등록 명령** (CLI 권장 — JSON 직접 편집보다 안전):
```bash
# stdio MCP (env 포함)
claude mcp add -s user -e API_KEY=xxx <name> -- npx -y <package>

# HTTP MCP
claude mcp add -s user --transport http <name> <url>

# 등록된 MCP 확인
claude mcp list
```

⚠️ `-s user` 플래그가 핵심 — **빼면 local scope**(현재 디렉토리에서만 인식)로 박혀서 *봇이 못 봄*. user scope여야 `~/.claude.json`의 글로벌 `mcpServers`에 들어가서 모든 봇이 사용. (env 인자 variadic 흡수 버그가 있을 땐 `~/.claude.json` python으로 직접 편집)

#### 🔐 환경변수에 토큰 박기

대부분 MCP 서버는 *환경변수로 토큰을 받음* (Slack `SLACK_MCP_XOXB_TOKEN`, Notion `NOTION_TOKEN`, Linear `LINEAR_API_KEY` 등). `-e` 플래그로 *여러 개 동시*에 박을 수 있음:

```bash
# 예시: Slack MCP — Bot Token + Team ID + 옵션 한 번에
claude mcp add -s user \
  -e SLACK_MCP_XOXB_TOKEN=xoxb-... \
  -e SLACK_MCP_TEAM_ID=T0XXXXXXX \
  -e SLACK_MCP_ADD_MESSAGE_TOOL=true \
  slack -- npx -y slack-mcp-server@latest
```

**박힌 후 검증** (3단계로):

```bash
# 1. 등록됐는지 + Connected 됐는지
claude mcp list
# slack: npx -y slack-mcp-server@latest - ✓ Connected

# 2. 환경변수가 정확히 들어갔는지 (~/.claude.json 직접 확인)
python3 -c "import json,os; \
  d=json.load(open(os.path.expanduser('~/.claude.json'))); \
  print(json.dumps(d['mcpServers']['slack'], indent=2, ensure_ascii=False))"

# 3. OpenClaw 봇한테 적용하려면 게이트웨이 재시작
oclaw <봇이름>
```

**토큰 어디서 가져오나** (서비스별 진입점):

| MCP | 토큰 종류 | 어디서 |
|---|---|---|
| Slack (`slack-mcp-server`) | `xoxb-...` Bot Token | Slack 앱 페이지 → OAuth & Permissions |
| Notion | Internal Integration Token | notion.so/my-integrations → New integration |
| Linear (`@daht-mad/linear-mcp-plus`) | Personal API Key | Linear → Settings → Account → API → Personal API Key |
| GitHub | Personal Access Token | github.com/settings/tokens (Fine-grained 권장) |
| YouTube Transcript | *토큰 없음* — `-e` 플래그 자체 생략 |

**토큰 갱신/교체** — 같은 이름으로 다시 `claude mcp add` 하면 *덮어쓰기*. 또는 `~/.claude.json` 직접 열어서 `env` 블록 수정.

> 🚨 **토큰 끝 줄바꿈 함정** — *복사-붙여넣기* 과정에서 토큰 끝에 `\n`이나 공백이 붙으면 401. 의심되면 `~/.claude.json` 직접 열어 정확한 길이 확인. macOS 키체인이나 1Password CLI에서 *바로 꺼내쓰는* 패턴이 더 안전.

- **누가 씀?** Claude CLI (단독 터미널) + OpenClaw 봇(Claude CLI 백엔드 사용 시) — *둘 다 자동*
- **장점**: 한 번 박으면 여기저기 쓰임. Anthropic 표준이라 자료 풍부
- **단점**: JSON 직접 편집 / OAuth flow가 필요한 HTTP MCP는 `claude mcp list`에 *Needs authentication*으로 뜸

### B. `<project>/.mcp.json` — 프로젝트별

```jsonc
{
  "mcpServers": {
    "supabase": { "command": "...", "env": { ... } }
  }
}
```

- **누가 씀?** 그 프로젝트 디렉토리에서 `claude` 띄울 때만
- **장점**: 프로젝트마다 도구 격리. 팀에서 공유하면 모두 같은 MCP 사용
- **단점**: 봇은 워크스페이스 단위라 *프로젝트별 .mcp.json* 잘 안 쓰게 됨

### C. `openclaw mcp set ...` — OpenClaw 자체 레지스트리

```bash
openclaw mcp set notion --command "npx -y @notionhq/notion-mcp-server"
openclaw mcp list
openclaw mcp show notion
```

- **누가 씀?** OpenClaw 봇 전부 (PI 모드 + Claude CLI 모드 양쪽)
- **장점**: OpenClaw 네이티브. 봇 여러 마리 공유 깔끔
- **단점**: Anthropic 자료 못 씀. OpenClaw 명령어 외워야 함

### D. `~/.mcporter/mcporter.json` — mcporter (Bash 호출)

```jsonc
{
  "mcpServers": {
    "linear": { "command": "...", "env": { "LINEAR_API_TOKEN": "..." } }
  }
}
```

- **누가 씀?** 모델이 *Bash로* 호출 — `npx -y mcporter call linear.linear_searchIssues ...`
- **장점**: 시스템 프롬프트 토큰 안 먹음 → 토큰 효율. Bash·크론·스크립트 어디서든 호출
- **단점**: 모델이 *도구가 있는지조차 모름* — 명령어를 가르쳐야 활용. 비개발자 부적합

---

## 📜 공식문서 근거 — *Claude에 박으면 OpenClaw가 알아서 갖다 쓴다*

### 1. Bundle 자동 매핑

`docs/plugins/bundles.md`:

> *"Bundle MCP config merged into embedded Pi settings; supported stdio and HTTP servers loaded — **All formats**"*

**한국어**: 번들 안의 MCP 설정이 임베디드 Pi 설정에 합쳐지고, stdio·HTTP 서버 둘 다 로드됨. *Codex/Claude/Cursor 모든 형식에 적용*.

→ Claude 번들 = `~/.claude/`. 그 안의 MCP가 자동으로 Pi에 매핑.

### 2. Claude CLI 백엔드도 합쳐줌

`docs/gateway/cli-backends.md` Bundle MCP overlays:

> *"`claude-cli`: generated strict MCP config file"*
> *"loads enabled bundle-MCP servers for the current workspace"*
> *"**merges them with any existing backend MCP config/settings shape**"*

**한국어**: claude-cli 백엔드 시작 시 OpenClaw가 *strict MCP config 파일을 생성*한다. 이때 워크스페이스에 활성화된 bundle-MCP 서버를 로드하고, **기존 backend MCP config(`~/.claude.json` 등)와 합친다**.

→ 즉 **Claude CLI 모드에서도** `~/.claude.json`에 박은 MCP를 그대로 가져다 씀. 따로 설정 없이.

### 3. bundleMcp는 자동 작동

5/1에 발견한 사실 — 우리 `~/.openclaw/openclaw.json`엔 `cliBackends` 섹션 자체가 없는데도 `bundleMcp: true`가 자동 작동한다. **번들 플러그인 기본값**이라 따로 켜줄 필요 없음.

```
[Claude CLI 백엔드 시작]
   ↓
[bundleMcp: true 자동 활성]
   ↓
[OpenClaw가 loopback HTTP MCP server 띄움 (per-session 토큰 격리)]
   ↓
[~/.claude.json의 MCP + OpenClaw 도구 → 합친 config 생성]
   ↓
[Claude CLI는 그 합쳐진 config로 시작 → 양쪽 도구 다 사용]
```

---

## 🎯 한눈에 비교

| 옵션 | 위치 | 누가 자동으로 씀 | 비개발자 진입 | 자료 풍부도 | 토큰 효율 |
|---|---|---|---|---|---|
| **A. Claude 글로벌** | `~/.claude.json` | Claude CLI 단독 + OpenClaw 봇 *둘 다* | ✅ JSON 한 번 | ✅ Anthropic 표준 | 보통 |
| B. 프로젝트별 | `<proj>/.mcp.json` | 그 디렉토리 `claude` | ✅ JSON 한 번 | ✅ Anthropic 표준 | 보통 |
| C. OpenClaw | `openclaw mcp set` | OpenClaw 봇 전체 | ❌ CLI 명령어 | ❌ OpenClaw만 | 보통 |
| D. mcporter | `~/.mcporter/mcporter.json` | 모델이 Bash 호출 | ❌ 도구 발견 X | ❌ 자체 도구 | ✅ 가장 절약 |

---

## 🐱 우리(뽀피터스) 권장 — A. Claude 글로벌 하나만

이유 4가지:

1. **Claude CLI 단독 + OpenClaw 봇 *둘 다 자동* 사용** — 터미널에서 `claude` 칠 때도, 봇이 슬랙에서 응답할 때도 같은 MCP가 뜬다. 일관성.
2. **Anthropic 표준** — 자료가 풍부해서 *워크샵 후 학생이 막히면* 검색해서 배운다. OpenClaw 명령어는 검색 자료 적음.
3. **JSON 한 번 편집** — 비개발자 진입 부담 최소.
4. **OpenClaw가 알아서 합침** — `bundleMcp` 덕분에 따로 OpenClaw에 박을 필요 없음.

다른 옵션은 *심화 단계*에 들어왔을 때 추가 — 평소엔 A 하나만 쓴다.

| 옵션 | 언제 추가하나 |
|---|---|
| **A. Claude 글로벌** ← 기본 | 봇 1~2마리, 평소 운영 |
| B. 프로젝트별 `.mcp.json` | 특정 프로젝트만 격리된 도구 필요할 때 (드물다) |
| C. `openclaw mcp set` | OpenClaw에서만 쓰는 도구를 봇 여러 마리 공유 (드물다) |
| D. mcporter | 토큰 절약 절실하거나 Bash·크론에서 호출 필요할 때 |

---

## 📜 mcporter는 왜 우리한테 들어왔나 — 짧은 역사

OpenClaw 자체엔 MCP가 처음부터 있었다. 그런데 우리한테 mcporter가 들어온 진짜 이유는 *Claude CLI 전환기 우회* 때문이다.

```
1. PI 시절: OpenClaw가 자체 MCP 클라이언트로 도구 직접 주입 ✅
   ↓
2. Claude CLI 백엔드로 갈아탐
   → Claude CLI는 OpenClaw 도구를 직접 못 받음
   → openclaw-mcp-adapter v0.1.1로 브릿지 시도 → 실패 ❌
   ↓
3. mcporter 도입: Bash로 직접 CLI 호출 → 안정적 우회 ✅
   ↓
4. OpenClaw가 bundleMcp + loopback MCP bridge 정식화
   → Claude CLI도 OpenClaw 도구 자동으로 받음
   → ~/.claude.json도 같이 합침 ✅
```

CHANGELOG `#71724` 등에 *bundle-MCP transport 정규화*가 *최근에* 들어왔다. 정식화는 비교적 최근. 그 사이의 우회 도구가 mcporter.

→ **지금도 mcporter는 유효한 선택지**다. 하지만 *기본 표준은 아니고*, 토큰 절약·Bash 호출·자동화 스크립트용 *보조 도구*.

> 📝 **2026-05-08 후속 — mcporter 완전 폐기**: 위 글에선 *"mcporter는 보조로 유효"*라고 적었지만, 그 뒤로 우리는 *mcporter 자체를 완전 아카이브*했다. 이유 두 가지: (1) *모델이 도구가 있는지조차 모름* 단점이 결정적이라 사실상 안 쓰게 됐고, (2) 한 번 우회 경로 두면 자꾸 거기로 빠지는 부작용(같은 도구를 mcporter+`~/.claude.json` 둘 다 박아놓고 헷갈리는 사고)이 더 컸음. `~/.mcporter/` 디렉토리는 archive로 이동하고 *모든 MCP를 `~/.claude.json` 한 곳으로 통일*. 결론: *mcporter 단계는 건너뛰고 처음부터 Claude 글로벌 하나로 시작하는 게 정답*.

---

## 🔧 삽질 포인트

1. **세 곳에 같은 MCP 박지 마** — Claude 글로벌 + OpenClaw + mcporter에 같은 노션 MCP 등록하면 어디 게 작동하는지 헷갈린다. 하나만.
2. **`~/.claude.json` 박은 직후엔 세션 재시작** — 봇한테 새 MCP가 적용되려면 OpenClaw 게이트웨이 재시작 또는 새 세션 필요.
3. **MCP 인증 토큰을 채팅에 그대로 붙여넣지 마** — `env` 항목에 박을 때도 secret manager(예: macOS 키체인 / 1Password CLI)에서 꺼내쓰는 게 안전.
4. **자주 안 쓰는 MCP는 빼라** — 시스템 프롬프트 토큰을 도구 스키마가 먹는다. 매일 안 쓰는 건 mcporter로 옮기거나 비활성화.

---

## 🎨 비유 — 콘센트 멀티탭과 책상

- **`~/.claude.json`** = 책상 위 *통합 콘센트 멀티탭*. Claude도 OpenClaw 봇도 같은 멀티탭에서 콘센트 빌려 씀.
- **OpenClaw `mcp set`** = 사무실 *별도 콘센트 박스*. OpenClaw 봇 전용. Claude 단독은 못 씀.
- **mcporter** = *서랍에 넣어둔 도구 가방*. 자주 안 쓰는 도구는 여기에 — 책상 위 자리 안 차지.

→ 우리는 **책상 멀티탭 하나로 시작, 필요할 때 서랍에서 꺼내쓰는** 구조.

---

## 🐱 한 줄 요약

> **MCP는 `~/.claude.json` 한 곳에만 박아라.** OpenClaw가 *bundleMcp*로 자동 합쳐서 봇한테 그대로 전달한다. 4가지 옵션 다 가능하지만, 비개발자 친화 + 자료 풍부 + 일관성 면에서 Claude 글로벌이 정답이다. mcporter는 토큰 절약 절실해질 때 *보조*로.

> 📜 *왜 PI 대신 Claude CLI를 골랐나* — [ep.2 PI vs Claude CLI](./ep-02a-pi-vs-cli)
> 📜 *어쩌다 지금 셋업이 됐나* — [ep.1 OpenClaw 변천사](./ep-01-journey)

## 다음 단계

다음 편에서는 — Claude CLI 환경에서 *스킬과 MCP가 어떻게 우선순위가 결정되는지* 6단계 워크스페이스/프로젝트/personal/managed 풀이.
