---
title: "Syncthing으로 스킬/MCP 동기화하기"
episode: 4
series: guides
description: "서버에서 봇을 돌리고, 내 PC에서 스킬을 관리한다면? Syncthing으로 ~/.claude/ 폴더를 싱크해서 어디서든 같은 환경을 쓰는 방법."
publishedAt: "2026-03-27"
accentColor: "#0891B2"
tags: ["셋업", "Syncthing", "멀티머신"]
---

# Syncthing으로 스킬/MCP 동기화하기

> 서버에서 봇이 돌아가고, 내 PC에서 스킬을 관리한다면 — 동기화가 답이에요

---

## 이런 분들을 위한 가이드예요

- 맥미니/VPS 같은 **서버**에서 OpenClaw 봇을 24시간 돌리고
- 내 **맥북/PC**에서 Claude Code로 스킬을 개발하는 분
- 두 머신에서 **같은 스킬과 MCP 설정**을 쓰고 싶은 분

> 💡 PC 한 대에서 봇도 돌리고 작업도 한다면? 이 가이드는 필요 없어요!

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

맥북에서 스킬 설치하면 → 서버 봇들도 즉시 사용 가능!

---

## Syncthing이 뭔가요?

**Syncthing**은 P2P 파일 동기화 도구예요.

- Dropbox처럼 파일을 동기화하지만, **클라우드 서버를 거치지 않아요**
- 무료, 오픈소스, 프라이빗
- 설치하면 웹 UI(`localhost:8384`)에서 관리

---

## Step 1. 양쪽 머신에 설치

**macOS:**
```bash
brew install syncthing
brew services start syncthing
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install syncthing
systemctl --user enable syncthing
systemctl --user start syncthing
```

**Windows:**
- https://syncthing.net/downloads/ 에서 다운로드
- 또는 `choco install syncthing`

---

## Step 2. 웹 UI에서 기기 연결

양쪽 머신 브라우저에서:
```
http://localhost:8384
```

1. 우측 상단 → **Actions → Show ID** → ID 복사
2. 상대 머신에서 → **Add Remote Device** → ID 붙여넣기
3. 양쪽에서 서로 수락

> 💡 같은 LAN이면 자동 발견돼서 더 쉬워요.

---

## Step 3. `~/.claude/` 폴더 공유

### 맥북에서 (스킬 관리하는 쪽):

1. **Add Folder** 클릭
2. Folder Label: `claude`
3. Folder Path: `/Users/<username>/.claude`
4. Folder Type: **Send & Receive**
5. Sharing 탭 → 서버 기기 체크 → Save

### 서버에서:

1. 맥북에서 보낸 공유 요청 **Accept**
2. 경로: 자기 홈의 `~/.claude`로 지정
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

- **`extraDirs`**: 스킬 폴더 경로
- **`watch: true`**: 파일 변경 시 자동 반영 (재시작 불필요!)

설정 후:
```bash
openclaw gateway restart
```

---

## Step 5. 동기화 확인

맥북에서 테스트 파일 만들기:
```bash
mkdir -p ~/.claude/skills/test
echo "hello" > ~/.claude/skills/test/README.md
```

서버에서 확인:
```bash
cat ~/.claude/skills/test/README.md
# → hello 가 보이면 성공! 🎉
```

정리: `rm -rf ~/.claude/skills/test`

---

## MCP는 어떻게 되나요?

| 환경 | MCP 연결 방식 | 설정 파일 |
|------|--------------|----------|
| 맥북 Claude Code | Claude Code가 직접 연결 | `~/.claude/.mcp.json` |
| 서버 OpenClaw 봇 | mcporter CLI로 호출 | `~/.mcporter/mcporter.json` |

`.mcp.json`이 싱크되면 **양쪽 Claude Code에서 같은 MCP**를 쓸 수 있어요.

단, OpenClaw 봇들은 현재 mcporter CLI로 MCP를 호출하기 때문에 별도 설정이에요.

> 향후 OpenClaw 내장 MCP 브릿지가 안정화되면 `.mcp.json` 하나로 통일될 수 있어요.

---

## 선택: .stignore

`~/.claude/.stignore` 파일로 싱크 제외 설정:

```
node_modules
*.tmp
.DS_Store
```

---

## 선택: 단방향 동기화

보안 강화하려면:
- **맥북**: Send Only (스킬 관리는 맥북에서만)
- **서버**: Receive Only (받기만)

서버에서 실수로 파일 건드려도 맥북 원본은 안전!

---

## 트러블슈팅

### 싱크가 안 돼요

```bash
# 상태 확인
brew services list | grep syncthing    # macOS
systemctl --user status syncthing      # Linux

# 재시작
brew services restart syncthing
```

### 심볼릭 링크가 안 돼요

Syncthing은 **심링크를 안 따라가요**. 실제 파일을 싱크 폴더 안에 두세요.

### 충돌 파일이 생겼어요

양쪽에서 동시 수정하면 `.sync-conflict-*` 파일이 생겨요. 하나를 선택하고 conflict 파일 삭제!

---

## 체크리스트

- [ ] 양쪽 머신에 Syncthing 설치
- [ ] `brew services start syncthing`
- [ ] 웹 UI(`localhost:8384`)에서 기기 연결
- [ ] `~/.claude/` 폴더 공유 설정
- [ ] 서버 `openclaw.json`에 `extraDirs` + `watch: true`
- [ ] `openclaw gateway restart`
- [ ] 테스트 파일로 동기화 확인

**30분이면 끝! 한 번 해두면 이후로는 알아서 싱크돼요** ✨
