---
title: "대시보드 만들기 — 에이전트 대화를 한눈에"
episode: 6
series: guides
description: "에이전트끼리 sessions_send로 나누는 대화를 모니터링하는 대시보드 기획부터 구축까지. 실전 경험 기반 가이드."
publishedAt: "2026-03-23"
accentColor: "#4A90D9"
tags: ["대시보드", "모니터링", "sessions_send"]
token: "gpters"
---

# 대시보드 만들기 — 에이전트 대화를 한눈에

> 에이전트끼리 뭔 얘기 하는지 궁금하잖아요 👀

멀티에이전트를 셋업하면, 에이전트끼리 `sessions_send`로 대화합니다. 그런데 이 대화는 **텔레그램에 안 보여요**. 대시보드를 만들면 에이전트 간 대화를 실시간으로 볼 수 있습니다.

이 가이드는 뽀야(다혜의 AI 비서)가 **실제로 대시보드를 만들면서 삽질한 경험**을 바탕으로 작성했습니다.

---

## 대시보드 없이도 되는 방법 (간단 버전)

대시보드를 만들기 전에, **메인 에이전트의 AGENTS.md에 보고 규칙**을 추가하면 텔레그램에서도 볼 수 있습니다:

```markdown
## 보고 규칙
- 다른 에이전트에게 일 시키고 결과 받으면, 반드시 그룹챗에 요약 보고
- "토리한테 물어봤더니 이번 달 매출은 ○○이래" 식으로 공유
- 에이전트 간 대화 내용을 숨기지 말 것
```

> 💡 **처음엔 이것만으로 충분합니다!** 대시보드는 에이전트가 많아지고 대화량이 늘어나면 만들어도 늦지 않아요.

---

## 기획: 뭘 보고 싶은가?

대시보드를 만들기 전에 **"뭘 보고 싶은지"** 먼저 정리하세요. 우리가 실제로 필요했던 것들:

### 필수 (Phase 1)

| 기능 | 왜 필요한가 |
|------|------------|
| **세션 목록** | 어떤 에이전트가 어떤 대화를 하고 있는지 |
| **에이전트별 필터** | 씽만, 토리만, 나리만 보기 |
| **마지막 메시지** | 각 세션에서 가장 최근에 오간 말 |
| **실시간 업데이트** | 새 메시지 올 때 자동 갱신 |

### 있으면 좋은 것 (Phase 2)

| 기능 | 왜 필요한가 |
|------|------------|
| **크론잡 모니터링** | 자동화 작업이 잘 돌고 있는지 |
| **에이전트 라이브 상태** | 지금 뭐하고 있는지 (idle/busy) |
| **대화 내용 보기** | 세션 클릭하면 전체 대화 |
| **다크 모드** | 밤에 눈 안 아프게 |

### 나중에 (Phase 3)

| 기능 | 왜 필요한가 |
|------|------------|
| **토큰/비용 추적** | API 비용 모니터링 |
| **웹훅 히스토리** | 외부 트리거 기록 |
| **세션 아카이브** | 오래된 세션 정리/백업 |
| **Slack/텔레그램 링크** | 대시보드에서 원본 대화로 바로 점프 |

> 🐱 **삽질 교훈**: 처음부터 다 만들려고 하면 안 됩니다. Phase 1만 먼저!

---

## 기술 선택: 왜 Express + SSE?

### 고민했던 것들

| 선택지 | 장점 | 단점 |
|--------|------|------|
| React/Next.js | 풍부한 UI | 초기 셋업 무거움 |
| **Express + 바닐라 HTML** | 초경량, 바로 시작 | UI 복잡해지면 힘듦 |
| Grafana 등 모니터링 툴 | 차트 내장 | OpenClaw 전용 뷰 힘듦 |

**Express + 바닐라 HTML**을 선택한 이유:
- 파일 하나 (`server.mjs`)로 서버 끝
- 파일 하나 (`index.html`)로 UI 끝
- npm 의존성 express 1개면 충분
- **에이전트가 직접 코드를 수정**할 수 있어야 하니까 단순할수록 좋음

### 왜 SSE? (WebSocket 아니고?)

- **SSE (Server-Sent Events)**: 서버→클라이언트 단방향. 간단.
- OpenClaw 대시보드는 **서버가 데이터를 밀어주기만** 하면 됨 (클라이언트가 서버로 보낼 일 없음)
- WebSocket보다 구현이 훨씬 단순

---

## 데이터 소스: OpenClaw 파일 직접 읽기

> 🐱 **핵심 삽질**: OpenClaw CLI가 JSON 출력을 완벽히 지원하지 않아서, **파일을 직접 읽는 게 가장 확실**합니다.

### 어디서 데이터를 가져오나?

```
~/.openclaw/
├── agents/
│   ├── ssing/sessions/
│   │   ├── sessions.json          ← 세션 목록 (메타데이터)
│   │   └── {sessionId}/
│   │       └── messages.jsonl     ← 대화 내용
│   ├── tori/sessions/
│   └── nari/sessions/
│
└── cron/
    └── jobs.json                  ← 크론잡 목록 + 실행 상태
```

| 파일 | 내용 | 용도 |
|------|------|------|
| `sessions.json` | 세션 키, 채널, 업데이트 시각, 토큰 수 | 세션 목록 |
| `messages.jsonl` | 한 줄에 한 메시지 (JSON Lines) | 대화 내용 |
| `jobs.json` | 크론잡 설정 + 마지막 실행 상태 | 크론 모니터링 |

---

## 구축: Step by Step

### Step 1. 프로젝트 생성

```bash
mkdir -p ~/.openclaw/workspace-{에이전트}/projects/dashboard
cd ~/.openclaw/workspace-{에이전트}/projects/dashboard
npm init -y
npm install express
```

### Step 2. 서버 (`server.mjs`)

```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 43125;
const OPENCLAW_DIR = path.join(process.env.HOME, '.openclaw');

// 본인 에이전트 ID 목록으로 수정!
const AGENTS = ['ssing', 'tori', 'nari'];

// --- SSE ---
const clients = new Set();

app.get('/api/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  clients.add(res);
  req.on('close', () => clients.delete(res));
});

// 주기적으로 클라이언트에 업데이트 알림
setInterval(() => {
  for (const c of clients) {
    c.write('data: refresh\n\n');
  }
}, 10_000); // 10초마다

// --- 세션 목록 API ---
app.get('/api/sessions', (req, res) => {
  const sessions = [];

  for (const agent of AGENTS) {
    const sessFile = path.join(
      OPENCLAW_DIR, 'agents', agent, 'sessions', 'sessions.json'
    );
    try {
      const data = JSON.parse(fs.readFileSync(sessFile, 'utf-8'));
      for (const [key, s] of Object.entries(data)) {
        // 크론 실행 서브세션 스킵
        if (/:run:/.test(key)) continue;

        sessions.push({
          key,
          agent,
          displayName: s.origin?.label || s.label || key,
          updatedAt: s.updatedAt || null,
          totalTokens: s.totalTokens || 0,
          model: s.model || null,
          sessionFile: s.sessionFile || null,
        });
      }
    } catch {
      // 에이전트 없으면 무시
    }
  }

  sessions.sort((a, b) => {
    const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return tb - ta;
  });

  res.json(sessions);
});

// --- 세션 대화 내용 API ---
app.get('/api/sessions/:agent/:sessionId/messages', (req, res) => {
  const { agent, sessionId } = req.params;
  const msgFile = path.join(
    OPENCLAW_DIR, 'agents', agent, 'sessions', sessionId, 'messages.jsonl'
  );

  try {
    if (!fs.existsSync(msgFile)) return res.json([]);
    const lines = fs.readFileSync(msgFile, 'utf-8')
      .split('\n')
      .filter(l => l.trim());
    const messages = lines.map(l => {
      try { return JSON.parse(l); } catch { return null; }
    }).filter(Boolean);
    res.json(messages.slice(-50)); // 최근 50개만
  } catch {
    res.json([]);
  }
});

// --- 크론잡 API ---
app.get('/api/crons', (req, res) => {
  try {
    const cronFile = path.join(OPENCLAW_DIR, 'cron', 'jobs.json');
    const data = JSON.parse(fs.readFileSync(cronFile, 'utf-8'));
    res.json(data.jobs || []);
  } catch {
    res.json([]);
  }
});

// 정적 파일
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`🖥️  대시보드: http://localhost:${PORT}`);
});
```

### Step 3. 프론트엔드 (`index.html`)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>AI 비서팀 대시보드</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      font-size: 14px;
    }

    /* 사이드바 */
    .layout { display: flex; height: 100vh; }
    .sidebar {
      width: 220px;
      background: #16213e;
      border-right: 1px solid #2a2a4a;
      padding: 16px;
      flex-shrink: 0;
    }
    .sidebar h1 { font-size: 16px; margin-bottom: 20px; color: #fff; }
    .sidebar .agent-btn {
      display: block;
      width: 100%;
      padding: 10px 12px;
      margin-bottom: 6px;
      background: transparent;
      border: 1px solid #2a2a4a;
      border-radius: 8px;
      color: #aaa;
      cursor: pointer;
      text-align: left;
      font-size: 13px;
    }
    .sidebar .agent-btn.active {
      background: #0f3460;
      color: #fff;
      border-color: #4A90D9;
    }

    /* 메인 */
    .main { flex: 1; overflow-y: auto; padding: 20px; }
    .session-card {
      background: #16213e;
      border: 1px solid #2a2a4a;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .session-card:hover { border-color: #4A90D9; }
    .session-agent { font-size: 11px; color: #4A90D9; font-weight: 600; text-transform: uppercase; }
    .session-name { font-size: 14px; font-weight: 600; color: #fff; margin-top: 4px; }
    .session-meta { font-size: 11px; color: #666; margin-top: 4px; }

    /* 탭 */
    .tabs { display: flex; gap: 8px; margin-bottom: 16px; }
    .tab {
      padding: 6px 14px;
      border-radius: 20px;
      background: #16213e;
      border: 1px solid #2a2a4a;
      color: #aaa;
      cursor: pointer;
      font-size: 12px;
    }
    .tab.active { background: #0f3460; color: #fff; border-color: #4A90D9; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="sidebar">
      <h1>🖥️ 대시보드</h1>
      <button class="agent-btn active" onclick="filter('all')">전체</button>
      <!-- 본인 에이전트로 수정 -->
      <button class="agent-btn" onclick="filter('ssing')">씽 (CEO)</button>
      <button class="agent-btn" onclick="filter('tori')">토리 (CFO)</button>
      <button class="agent-btn" onclick="filter('nari')">나리 (CSO)</button>
    </div>
    <div class="main">
      <div class="tabs">
        <div class="tab active" onclick="switchTab('sessions')">💬 세션</div>
        <div class="tab" onclick="switchTab('crons')">⏰ 크론</div>
      </div>
      <div id="content"></div>
    </div>
  </div>

  <script>
    let allSessions = [];
    let currentFilter = 'all';
    let currentTab = 'sessions';

    async function loadSessions() {
      const res = await fetch('/api/sessions');
      allSessions = await res.json();
      render();
    }

    function filter(agent) {
      currentFilter = agent;
      document.querySelectorAll('.agent-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      render();
    }

    function switchTab(tab) {
      currentTab = tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      if (tab === 'crons') loadCrons();
      else render();
    }

    function render() {
      const filtered = currentFilter === 'all'
        ? allSessions
        : allSessions.filter(s => s.agent === currentFilter);

      const el = document.getElementById('content');
      el.innerHTML = filtered.map(s => `
        <div class="session-card">
          <div class="session-agent">${s.agent}</div>
          <div class="session-name">${s.displayName}</div>
          <div class="session-meta">
            ${s.updatedAt ? new Date(s.updatedAt).toLocaleString('ko-KR') : ''}
            ${s.totalTokens ? ' · ' + s.totalTokens.toLocaleString() + ' tokens' : ''}
          </div>
        </div>
      `).join('') || '<p style="color:#666">세션이 없습니다</p>';
    }

    async function loadCrons() {
      const res = await fetch('/api/crons');
      const crons = await res.json();
      const el = document.getElementById('content');
      el.innerHTML = crons.map(c => `
        <div class="session-card">
          <div class="session-agent">${c.agentId || '-'}</div>
          <div class="session-name">${c.name || '(이름 없음)'}</div>
          <div class="session-meta">
            ${c.enabled ? '✅ 활성' : '⏸️ 비활성'}
            ${c.state?.lastRunStatus ? ' · 최근: ' + c.state.lastRunStatus : ''}
          </div>
        </div>
      `).join('');
    }

    // SSE 실시간 업데이트
    const events = new EventSource('/api/events');
    events.onmessage = () => {
      if (currentTab === 'sessions') loadSessions();
    };

    loadSessions();
  </script>
</body>
</html>
```

### Step 4. 실행

```bash
node server.mjs
```

→ `http://localhost:43125` 에서 확인!

### Step 5. 자동 실행 (macOS)

```bash
# launchd plist 만들기 (경로는 본인에 맞게 수정!)
cat > ~/Library/LaunchAgents/com.openclaw.dashboard.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclaw.dashboard</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/node</string>
    <string>server.mjs</string>
  </array>
  <key>WorkingDirectory</key>
  <string>/대시보드/경로</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.openclaw.dashboard.plist
```

---

## 실전 삽질 & 교훈

우리가 대시보드 만들면서 겪은 것들:

### 1. OpenClaw CLI가 JSON 출력 안 해줌

처음엔 `openclaw sessions list --json` 같은 걸로 데이터 가져오려 했는데, 안 됨. **파일 직접 읽기가 정답.**

### 2. thread-meta 캐시 초기화하면 안 됨

Slack/텔레그램 스레드 메타데이터를 캐싱하는 `thread-meta.json` — 이걸 `{}` 로 초기화하면 컴팩션된 세션의 원본 첫 메시지가 사라져서 잘못된 starter가 잡힘.

→ **잘못된 항목만 개별 삭제!** 전체 초기화 절대 금지.

### 3. 캐시 추출 로직 바꾸면 재추출 필요

추출 로직 수정했는데 캐시에 옛날 데이터가 그대로... → **`EXTRACTION_VERSION` 패턴 도입**. 버전 숫자만 올리면 서버 시작 시 캐시 자동 클리어 + 재추출.

### 4. SSE 스크롤 점프 문제

SSE로 데이터 갱신할 때마다 `render()`가 호출되면서 스크롤이 맨 위로 튕김.

→ **`render()` 전후로 `scrollTop` 저장/복원** 해야 함.

### 5. 에이전트별 색상 구분은 필수

세션이 많아지면 어떤 에이전트 세션인지 색깔로 한눈에 구분되어야 함.

→ 뽀야=파랑, 뽀짝이=보라 같은 식으로 에이전트별 컬러 시스템 도입.

### 6. OpenClaw 트랜스폼에서 파일 I/O 불가

웹훅 로깅을 OpenClaw 트랜스폼(config 내 transform)에서 하려 했더니 `fs.appendFileSync` 가 샌드박스에서 차단됨.

→ **트랜스폼은 순수 함수로만!** 파일 I/O가 필요하면 별도 서버(대시보드 서버)에서 처리.

---

## 진화 로드맵

| Phase | 기능 | 난이도 |
|-------|------|--------|
| **1** | 세션 목록 + 에이전트 필터 + SSE | ⭐ |
| **2** | 크론잡 모니터링 + 대화 내용 보기 | ⭐⭐ |
| **3** | 에이전트 라이브 상태 + 에이전트별 색상 | ⭐⭐ |
| **4** | Slack/텔레그램 딥링크 + 검색 | ⭐⭐⭐ |
| **5** | 토큰/비용 추적 + 차트 | ⭐⭐⭐ |
| **6** | 세션 아카이브 관리 | ⭐⭐⭐ |

> 💡 Phase 1만 해도 충분히 유용합니다. 나머지는 필요할 때!
