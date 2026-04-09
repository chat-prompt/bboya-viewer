---
title: "Syncthing으로 스킬/MCP 동기화하기 — 멀티 머신 환경"
episode: 4
series: setup-guides
token: "뽀야뽀야"
description: "서버에서 봇을 돌리고, 내 PC에서 스킬을 관리한다면? Syncthing으로 ~/.claude/ 폴더를 싱크해서 어디서든 같은 환경을 쓰는 방법."
publishedAt: "2026-03-27"
accentColor: "#0891B2"
tags: ["셋업", "Syncthing", "OpenClaw", "OpenClaw 셋업가이드"]
---

# 🔄 Syncthing으로 스킬/MCP 동기화하기

> 서버에서 봇이 돌아가고, 내 PC에서 스킬을 관리한다면 — 동기화가 답이에요

---

## 이런 분들을 위한 가이드예요

- 맥미니/VPS 같은 **서버**에서 OpenClaw 봇을 24시간 돌리고
- 내 **맥북/PC**에서 Claude Code로 스킬을 개발하는 분
- 두 머신에서 **같은 스킬과 MCP 설정**을 쓰고 싶은 분

> 💡 PC 한 대에서 봇도 돌리고 작업도 한다면? 이 가이드는 필요 없어요! 이미 같은 폴더를 쓰고 있으니까요.

---

## 전체 구조

```
💻 내 맥북 (작업용)                    🖥️ 서버 (봇 상시 가동)
├── Claude Code로 직접 작업             ├── OpenClaw 봇 24시간 운영
├── 스킬 설치/수정                      ├── 봇들이 스킬 사용
└── MCP 서버 설정                       └── MCP 도구 호출

         ~/.claude/ ←── Syncthing ──→ ~/.claude/
              실시간 양방향 동기화
```

- 맥북에서 스킬 설치하면 → 서버 봇들도 즉시 사용 가능
- 서버에서 설정 바꾸면 → 맥북 Claude Code에서도 반영
- **한 곳에서 관리, 어디서든 동일한 환경!**

---

## 싱크 대상: `~/.claude/` 폴더

```
~/.claude/
├── skills/           ← 스킬 모음 (양쪽에서 사용)
│   ├── my-skill-1/
│   ├── my-skill-2/
│   └── ...
├── .mcp.json         ← MCP 서버 설정 (Claude Code용)
└── settings.json     ← Claude Code 설정
```

이 폴더를 양쪽 머신에서 동기화하면 끝이에요.

---

## Syncthing이 뭔가요?

**Syncthing**은 P2P 파일 동기화 도구예요.

- Dropbox/Google Drive처럼 파일을 동기화하지만
- **클라우드 서버를 거치지 않아요** (기기끼리 직접 P2P)
- 무료, 오픈소스, 프라이빗
- 설치하면 웹 UI(`localhost:8384`)에서 관리

---

## Step 1. 양쪽 머신에 Syncthing 설치

### macOS

```bash
brew install syncthing
brew services start syncthing    # 로그인 시 자동 시작
```

### Linux (Ubuntu/Debian)

```bash
sudo apt install syncthing
systemctl --user enable syncthing
systemctl --user start syncthing
```

### Windows

```bash
choco install syncthing
```

또는 https://syncthing.net/downloads/ 에서 직접 다운로드

---

## Step 2. 웹 UI에서 기기 연결

양쪽 머신 모두 브라우저에서 접속:

```
http://localhost:8384
```

### 기기 ID 교환

1. **기기 A** (맥북): 우측 상단 → Actions → Show ID → ID 복사
2. **기기 B** (서버): Add Remote Device → 기기 A의 ID 붙여넣기 → Save
3. **기기 A**에서도: 기기 B가 보내온 요청 Accept

> 💡 같은 네트워크(LAN)에 있으면 자동 발견돼서 더 쉬워요.

---

## Step 3. `~/.claude/` 폴더 공유

### 기기 A (맥북)에서:

1. Add Folder 클릭
2. 설정:
   - **Folder Label**: `claude`
   - **Folder Path**: `/Users/<username>/.claude`
   - **Folder Type**: `Send & Receive`
3. **Sharing** 탭 → 기기 B 체크
4. Save

### 기기 B (서버)에서:

1. 기기 A에서 보낸 공유 요청 Accept
2. 경로를 `/Users/<username>/.claude` 또는 `/home/<username>/.claude`로 지정
3. Save

---

## Step 4. OpenClaw이 싱크된 스킬을 읽게 설정

서버 쪽 `~/.openclaw/openclaw.json`에 추가:

```json
{
  "skills": {
    "load": {
      "extraDirs": ["/Users/<username>/.claude/skills"],
      "watch": true
    }
  }
}
```

- **`extraDirs`**: 공용 스킬 폴더 경로. OpenClaw이 여기서 스킬을 로드해요
- **`watch: true`**: 파일 변경 시 자동 반영 (봇 재시작 불필요!)

설정 후:
```bash
openclaw gateway restart
```

---

## Step 5. 확인

맥북에서 아무 텍스트 파일을 `~/.claude/skills/test/` 에 만들어보세요:

```bash
mkdir -p ~/.claude/skills/test
echo "hello" > ~/.claude/skills/test/README.md
```

서버에서 동일 파일이 나타나면 성공! 🎉

```bash
cat ~/.claude/skills/test/README.md
# → hello
```

테스트 폴더 정리:
```bash
rm -rf ~/.claude/skills/test
```

---

## 선택: .stignore로 불필요한 파일 제외

`~/.claude/.stignore` 파일을 만들면 특정 파일/폴더를 싱크에서 제외할 수 있어요:

```
// node_modules는 용량 크고 재설치 가능
node_modules

// 임시 파일
*.tmp
*.swp
.DS_Store
```

---

## 선택: 단방향 동기화 (보안 강화)

기본은 양방향(Send & Receive)이지만, 보안이 중요하면:

| 머신 | Folder Type | 의미 |
|------|-------------|------|
| 맥북 | Send Only | 스킬 관리는 맥북에서만 |
| 서버 | Receive Only | 서버는 받기만 |

이러면 서버에서 실수로 스킬을 건드려도 맥북 원본에 영향 없어요.

---

## MCP 설정은 어떻게 되나요?

여기서 하나 알아둘 점이 있어요:

| 환경 | MCP 연결 방식 | 설정 파일 |
|------|--------------|----------|
| 맥북에서 Claude Code 쓸 때 | Claude Code가 직접 연결 | `~/.claude/.mcp.json` |
| 서버에서 OpenClaw 봇이 쓸 때 | mcporter CLI로 호출 | `~/.mcporter/mcporter.json` |

- `~/.claude/.mcp.json`은 Claude Code가 읽는 설정 → Syncthing으로 싱크하면 양쪽 Claude Code에서 같은 MCP 사용
- OpenClaw 봇들은 현재 **mcporter** CLI로 MCP를 호출해요. 별도 설정이니 혼동 주의!

> 앞으로 OpenClaw 내장 MCP 브릿지가 안정화되면 mcporter 없이 `.mcp.json`만으로 통일될 수 있어요.

---

## 트러블슈팅

### 싱크가 안 돼요

```bash
# Syncthing 상태 확인
brew services list | grep syncthing    # macOS
systemctl --user status syncthing      # Linux

# 재시작
brew services restart syncthing        # macOS
systemctl --user restart syncthing     # Linux
```

### 심볼릭 링크가 싱크 안 돼요

Syncthing은 기본적으로 **심링크를 따라가지 않아요**. `.mcp.json`이 심링크라면 실제 파일을 싱크 폴더 안에 두세요.

### 충돌(Conflict) 파일이 생겼어요

양쪽에서 동시에 같은 파일을 수정하면 `.sync-conflict-*` 파일이 생겨요.

→ 하나를 선택하고, conflict 파일을 삭제하면 돼요.

### 서버에서 스킬이 안 보여요

1. `openclaw.json`의 `extraDirs` 경로가 맞는지 확인
2. `watch: true`인지 확인
3. `openclaw gateway restart` 한 번 해보기

---

## 체크리스트

- [ ] 양쪽 머신에 Syncthing 설치
- [ ] `brew services start syncthing` 으로 자동 시작
- [ ] 웹 UI(`localhost:8384`)에서 기기 연결
- [ ] `~/.claude/` 폴더 공유 설정
- [ ] 서버 `openclaw.json`에 `extraDirs` + `watch: true`
- [ ] `openclaw gateway restart`
- [ ] 테스트 파일로 동기화 확인

30분이면 끝! 한 번 해두면 이후로는 알아서 싱크돼요 ✨
