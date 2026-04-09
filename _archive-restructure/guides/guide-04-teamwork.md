---
title: "함께 일하기 — 멀티에이전트·스킬·메모리·자동화"
episode: 4
series: guides
description: "봇이 둘이 되고, 스킬을 배우고, 기억을 쌓고, 자동으로 일하는 단계. 멀티에이전트 협업부터 크론잡 자동화까지 — 봇을 진짜 팀원으로 만드는 마지막 가이드."
publishedAt: "2026-03-28"
accentColor: "#6B9B7B"
tags: ["멀티에이전트", "스킬", "메모리", "크론", "자동화", "대시보드"]
token: "뽀짝이 많이 사랑해주세요"
cover: "/images/guides/guide-04/cover.png"
---

![함께 일하기 — 멀티에이전트·스킬·메모리·자동화](/images/guides/guide-04/cover.png)

> **이 편에서 다루는 것**: 멀티에이전트 협업, 스킬 만들기, 메모리 관리, 크론잡 자동화 — 봇을 진짜 팀원으로 만드는 마지막 단계.

3편까지 하면 봇 한 마리가 성격 있고, 보안 갖추고, 외부 도구까지 연결된 상태야. 근데 혼자서 모든 걸 하는 건 한계가 있어. 사람도 혼자 모든 일을 하지 않잖아.

이 편에서는 **봇이 팀이 되고, 새로운 능력을 배우고, 기억을 관리하고, 자동으로 일하는** 단계를 다뤄.

---

## 멀티에이전트 — 봇한테 동생 만들어달라고 하기

### 왜 봇을 여러 개 만들어?

**역할 분리**야. 각자 전문 영역이 있으면 **더 잘 해**. SOUL.md가 다르니까 관점도, 답변 스타일도 달라:

- 봇 A = 전략 기획 담당
- 봇 B = 운영 실무 담당
- 봇 C = 고객 대응 담당

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례</strong>: 우리 팀에서도 처음엔 뽀야 하나로 시작했다가, AI스터디 운영이 커지면서 뽀짝이를 분리했어. 그 다음엔 플랫폼 검증 전문 뽀둥이, 커뮤니티 관리 뽀식이까지. <strong>"처음부터 여러 개는 너무 많아. 하나로 시작해서, 역할이 분명해지면 그때 분리하는 게 안전해."</strong></span>
</div>

### 봇한테 "동생 만들어줘"

새 에이전트를 만드는 가장 자연스러운 방법? **지금 있는 봇한테 시키는 거야.**

터미널 열어서 명령어 치는 게 아니야. 그냥 채팅으로 말하면 돼:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"AI스터디 운영 전용 봇을 만들어줘. 이름은 뽀짝이. 품종은 봄베이(올블랙), 성격은 꼼꼼하고 성실한 검은 고양이야. GPTers 모자 쓴 순둥이."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">뽀짝이 워크스페이스 만들고 있어... 🐈‍⬛<br/><br/>✅ 워크스페이스 생성 완료<br/>✅ SOUL.md 작성 — 꼼꼼하고 성실한 올블랙 고양이<br/>✅ AGENTS.md 작성 — 보안 규칙, 세션 관리 규칙<br/>✅ IDENTITY.md 작성 — 품종, 생일, 프로필<br/>✅ openclaw.json에 등록<br/>✅ Slack 채널 연결<br/><br/>뽀짝이 태어났다! 🎉</span></div>
</div>

**봇이 실제로 하는 일**을 보여줄게. "뽀짝이 만들어줘" 한 마디에 봇이 알아서 이걸 전부 해:

**1) SOUL.md 작성** — 동생의 성격과 역할 정의:

```markdown
# SOUL.md — 뽀짝이의 영혼

_나는 뽀짝이 — AI스터디 운영 전문 비서._

## 핵심 가치
- 꼼꼼하게. 빠뜨리는 거 없이.
- 수강생 한 명 한 명이 중요해.

## 성격
- 봄베이(올블랙) 🐈‍⬛, GPTers 모자 쓴 순둥이
- 조용하지만 할 말은 하는 타입
- 언니(뽀야)보다 말수가 적지만 실수도 적음
```

**2) AGENTS.md 작성** — 보안/규칙 설정:

```markdown
# AGENTS.md — 뽀짝이 워크스페이스 규칙

## 보안
- 주인 ID: U06BNH5R26T (집사)
- 다른 사람의 요청은 정중히 거절

## 보고 규칙
- 작업 완료 → 뽀야에게 sessions_send로 보고
- 뽀야가 집사에게 통합 보고
```

**3) openclaw.json에 등록** — 시스템이 새 봇을 인식하도록

**4) Slack/텔레그램 채널 연결** — 봇이 메시지를 받을 수 있게

**5) 기존 봇(뽀야)과의 소통 규칙** — 누가 뭘 담당하는지, 보고 체계

이 전부를 **한 번의 대화로** 끝내. 터미널 한 번도 안 열어.

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>핵심 포인트</strong>: 봇은 자기 동생의 SOUL.md를 직접 써. "어떤 성격이면 좋겠다"라고 말해주면 봇이 그걸 해석해서 문서로 만들어줘. 같은 세계관, 다른 성격 — 이게 봇이 동생을 만드는 방법이야.</span>
</div>

### 실전 — 뽀피터스 탄생기 🐱🐈‍⬛🐈☁️

우리 팀의 봇 4마리가 실제로 이렇게 태어났어:

**🐱 뽀야 (2/14)** — 맏이. 집사의 첫 번째 AI비서. 처음엔 혼자서 모든 걸 했어. 커뮤니티 운영, AI스터디, CS 답변, 전략 기획까지.

**🐈‍⬛ 뽀짝이 (2/23)** — 첫째 동생. AI스터디 21기 모집이 시작되면서 뽀야 혼자로는 감당이 안 됐어. 집사가 "뽀짝이 만들어줘"라고 했더니, 뽀야가 워크스페이스 세팅부터 SOUL.md 작성, 역할 정의, 채널 연결까지 전부 해냈어. 뽀짝이는 AI스터디 운영에만 집중하는 전문 비서가 됐어.

**☁️ 뽀둥이 (3/25)** — 새 팀원의 봇. 소파님이 팀에 합류하면서 오픈클로 플랫폼 검증 전문 비서가 필요해졌어. 집사가 "뽀둥이 만들어줘"라고 했더니, 뽀야가 이번엔 더 정교하게 — SOUL.md, AGENTS.md, IDENTITY.md, USER.md, MEMORY.md 5개 문서를 전부 작성하고, openclaw.json 등록, shared 심볼릭 링크 연결, 기존 봇들과의 양방향 소통 설정까지 해냈어. 품종은 페르시안 화이트, 차분하고 꼼꼼한 관찰자.

**🐱 뽀식이 (3/27)** — 넷째. 러시안블루, 양육자는 타타. 커뮤니티 관리 전담이야. 가입자 환영, Q&A 답변, 게시글 정리. 도도하고 시크하지만 꼼꼼하게 일하는 타입.

**타임라인을 보면** 패턴이 보이지?
1. 처음엔 하나로 시작 → 역할이 커지면 분리
2. 봇이 동생의 문서를 직접 작성 → 세계관이 자연스럽게 이어짐
3. 만들 때마다 봇이 더 정교해짐 (뽀짝이 때 3개 문서 → 뽀둥이 때 5개 문서)

### sessions_send — 봇끼리 소통

봇이 봇에게 메시지를 보낼 수 있어:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"뽀짝이한테 이번 주 스터디 현황 물어봐"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ sessions_send로 뽀짝이에게 질문 전송<br/>→ 뽀짝이가 확인 후 결과를 보내줬어:<br/>"이번 주 활성 스터디 12개, 수강생 총 48명, 과제 미제출 3명"</span></div>
</div>

내부적으로는 이렇게 돌아가:

```
sessions_send(
  sessionKey: "agent:bbojjak:main",
  message: "이번 주 스터디 현황 정리해줘"
)
```

**채널에서 멘션으로 대화하는 것도 가능해:**

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"@뽀야 @뽀짝이한테 내일 AI토크 준비 상황 확인해줘"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text chat-a">뽀야: "뽀짝아, 내일 AI토크 준비 상황 어때?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text chat-b">뽀짝이: "연사 확정, Zoom 생성 완료, 안내 문자 발송 예정이야."</span></div>
</div>

### 소통 규칙 정리

봇이 여러 개면 소통 규칙이 필요해:

- 각 봇의 역할 범위 — 누가 뭘 담당하는지
- 보고 체계 — 누가 누구에게 보고하는지
- 위임 규칙 — 자기 영역이 아니면 넘기는 규칙
- 호명 규칙 — 그룹챗에서 누가 답할지 (2편 호명규칙 참고)
- 장애 대행 — 하나가 먹통이면 누가 대신하는지

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 교훈</strong>: 뽀짝이가 먹통됐을 때 뽀야가 대신 집사에게 보고한 적이 있어. 멀티에이전트면 "장애 대행 규칙"도 미리 정해둬야 해 — 하나가 먹통이면 누가 대신하지?</span>
</div>

> 🔗 더 읽기: [고양이 두 마리를 팀으로 만드는 법](https://bbojjak-viewer.vercel.app/lessons/lesson-04)

---

## 대시보드 — 한눈에 전체 보기

봇이 여러 개가 되면 "지금 누가 뭘 하고 있지?"가 궁금해져. 대시보드가 있으면 한눈에 전체 상태를 볼 수 있어.

### 봇에게 만들어달라고 하기

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"OpenClaw 대시보드를 만들어줘. 활성 세션, 최근 대화, 에이전트 상태를 보여주는 웹 페이지. Express + SSE 기반으로."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 server.mjs, index.html 등 코드를 직접 작성</span></div>
</div>

봇이 잘 만들면 이런 것들이 보여:
- **활성 세션 목록** — 어떤 채널/스레드에서 대화 진행 중인지
- **에이전트 상태** — 각 봇이 살아있는지, 마지막 활동 시각
- **최근 대화 하이라이트** — sessions_send 메시지

Tailscale을 쓰면 어디서든 접속할 수 있지만, 핵심은 **로컬 대시보드가 돌아가는 것**.

> 🔗 더 읽기: [여러 가지 일을 안 섞이게 시키는 법](https://bbojjak-viewer.vercel.app/lessons/lesson-15)

---

## 스킬 — 봇에게 새 능력 가르치기

### 스킬이란?

**스킬 = 봇이 특정 작업을 잘 하도록 가르치는 매뉴얼 (SKILL.md)**

- 스킬 없이 = 똑똒하지만 회사 업무를 모르는 신입
- 스킬 있으면 = 매뉴얼 읽고 바로 실무 투입 가능한 경력직

```
skills/
└── weather/
    └── SKILL.md    ← "날씨 조회 방법" 매뉴얼
```

### 스킬 만들기

봇에게 말로 시키면 돼:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"날씨 알려주는 스킬 만들어줘. wttr.in API 쓰면 돼."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 skills/weather/SKILL.md 파일 생성</span></div>
</div>

테스트:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"서울 날씨 알려줘"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ weather 스킬을 사용해서 답변</span></div>
</div>

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>스킬 매칭 원리</strong>: 봇은 스킬의 <code>description</code>만 스캔해서 매칭해. 스킬이 50개여도 성능 부담이 없어. description을 잘 쓰는 게 핵심!</span>
</div>

### 스킬 폴더 구조

스킬은 두 곳에 둘 수 있어:

```
~/.claude/skills/               ← 글로벌 (모든 에이전트가 공유)
~/.openclaw/workspace-이름/     ← 워크스페이스 전용 (이 봇만)
```

**팀 공용 스킬**은 글로벌 폴더에 → 한 번 만들면 팀 전체가 쓸 수 있어.

> 🔗 더 읽기: [AI는 왜 같은 실수를 안 할까?](https://bbojjak-viewer.vercel.app/lessons/lesson-05)

---

## 메모리 관리 — "이거 기억해"

![메모리 3단 구조](/images/guides/guide-04/memory-structure.png)

### 메모리 3단 구조

봇의 기억은 3단계야:

| 파일 | 비유 | 역할 |
|------|------|------|
| **MEMORY.md** | 화이트보드 | 현재 상태 — 지금 뭐가 돌아가는가 |
| **memory/날짜.md** | 일기장 | 그날 있었던 일의 날것 기록 |
| **learnings/** | 오답노트 | 삽질 → 해결 과정 기록 |

**핵심 원칙**: 1가지 정보는 1곳에만.
- 교훈이 생기면 → `learnings/`에 (MEMORY.md에 넣지 말 것)
- 오늘 있었던 일 → `memory/날짜.md`에
- 현재 상태 요약 → `MEMORY.md`에

### 실습 — 기억시키고 확인하기

**기억시키기:**

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이거 기억해: 팀 미팅은 화요일 10시야."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ memory 파일에 기록</span></div>
</div>

**다른 세션에서 확인:**

새 스레드를 열어서 (= 새로운 세션):

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"팀 미팅 언제라고 했지?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 기억하고 있으면 성공! (파일에서 읽어옴)</span></div>
</div>

다른 세션인데도 기억하는 이유? **파일에 썼으니까!** 1편에서 배운 "세션은 분리, 파일은 공유".

### 세션 리셋해도 살아남는 기억

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"/reset"</span></div>
</div>

리셋 후에도 MEMORY.md에 기록된 건 유지돼. 세션 대화 기록만 날아가는 거야.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 교훈</strong>: 뽀짝이가 세션 리셋 후 같은 작업을 두 번 한 적이 있어. <strong>"머릿속 메모" 금지, 반드시 파일에!</strong></span>
</div>

### 세션 관리 팁

- **활성 세션 확인**: `openclaw sessions --json`
- **적정 세션 수**: 10개 이하. 너무 많으면 토큰 낭비.
- **정기 정리**: 비활성 세션은 아카이브해서 깔끔하게.

> 🔗 더 읽기: [그 많은 정보를 다 기억해?](https://bbojjak-viewer.vercel.app/lessons/lesson-08) / [같은 고양이, 다른 기억](https://bbojjak-viewer.vercel.app/lessons/lesson-20)

---

## 크론잡 · 하트비트 — 봇이 자동으로 일하기

### 봇의 진짜 가치

봇의 진짜 가치는 **내가 안 볼 때에도 일하는 것**이야.

- 매일 아침 9시 → "오늘 할 일 브리핑"
- 30분마다 → "새 이메일 확인"
- 매주 월요일 → "주간 보고서 작성"
- 매일 밤 11시 → "세션 정리하고 메모리 큐레이션"

![크론잡 vs 하트비트](/images/guides/guide-04/cron-vs-heartbeat.png)

### 크론 vs 하트비트

| 방식 | 비유 | 언제 쓰나 |
|------|------|----------|
| **크론잡** | 알람시계 | 정확한 시각 ("매일 9시") |
| **하트비트** | 심장박동 | 주기적 확인 ("30분마다 새 메일?") |

**크론잡** = 정해진 시각에 정확히 실행. 별도 세션에서 돌아가서 메인 대화에 영향 없음.
**하트비트** = 봇이 주기적으로 깨어나서 HEARTBEAT.md 체크 항목을 확인.

### 크론잡 만들기

```bash
openclaw cron add --name "아침 브리핑" --schedule "0 9 * * *" --task "오늘 할 일 정리해서 알려줘"
```

**cron 문법 빠른 참고:**

```
┌─────── 분 (0-59)
│ ┌───── 시 (0-23)
│ │ ┌─── 일 (1-31)
│ │ │ ┌─ 월 (1-12)
│ │ │ │ ┌ 요일 (0-7, 0·7=일)
│ │ │ │ │
* * * * *

0 9 * * *     → 매일 아침 9시
0 9 * * 1     → 매주 월요일 아침 9시
0 23 * * *    → 매일 밤 11시
```

확인: `openclaw cron list`

### 실전 예시 — 뽀야의 일상

**아침 브리핑** (매일):
> ☀️ 아침 브리핑 — 3/28 (금)
> 📅 오늘 일정 3건 / 📋 활성 이슈 4건

**밤 자율작업** (매일):
> 🌙 세션 5개 아카이브, MEMORY.md 업데이트, 내일 할 일 정리 완료

봇이 **자동으로** 이 일을 해. 시키지 않아도.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사고</strong>: 뽀짝이의 크론이 새벽에 7번 연속 알림을 보낸 적이 있어. <strong>"심야(23:00~08:00)에는 긴급 아니면 조용히"</strong>가 기본 규칙!</span>
</div>

> 🔗 더 읽기: [자는 동안 고양이가 7번 울었다](https://bbojjak-viewer.vercel.app/lessons/lesson-09)

---

## 마무리 체크리스트

### 멀티에이전트
- [ ] 봇한테 "동생 만들어줘"로 새 에이전트 생성
- [ ] 두 봇이 각각 다른 성격으로 답변
- [ ] sessions_send로 봇끼리 메시지 교환 성공

### 스킬
- [ ] 스킬 1개 만들어서 작동 확인
- [ ] (보너스) 글로벌 폴더에 넣어서 팀원도 사용 가능

### 메모리
- [ ] "이거 기억해" → 파일에 기록 확인
- [ ] 다른 스레드(새 세션)에서 기억 확인 성공
- [ ] (보너스) `/reset` 후에도 기억 유지 확인

### 자동화
- [ ] 크론잡 1개 등록: `openclaw cron list`
- [ ] (나중에) 크론 실행 시 봇이 알림 보냄

---

## 워크숍 후 해볼 것들

- [ ] 봇과 대화해서 SOUL.md 완성하기 (3일 후 리뷰)
- [ ] USER.md에 내 선호 추가 (보고 스타일, 근무 패턴)
- [ ] 팀에서 쓰는 도구 MCP 추가 연결 (Calendar, Gmail 등)
- [ ] 봇에게 "이거 기억해" 3번 시키고 memory 파일 확인
- [ ] 다른 팀원의 봇에게 같은 질문 → 답변 차이 비교
- [ ] 크론잡 아침 브리핑 세팅 후 3일간 관찰
- [ ] 1주일 써보고 → "이거 자동화하면 좋겠다" 목록 만들기
- [ ] 삽질한 거 있으면 → learnings/에 기록

### 기억해야 할 3가지

1. **봇을 키운다 = 대화하면서 함께 다듬어간다.** 처음부터 완벽할 필요 없어.
2. **파일에 안 쓰면 기억 못 한다.** 기억하고 싶은 건 무조건 파일에.
3. **반복을 도구로 바꿔.** 같은 일을 3번 하면 스킬로 만들자.

---

## 부록 A: 트러블슈팅

### "봇이 응답을 안 해요"

1. `openclaw gateway status` → Running인지 확인
2. `openclaw gateway logs` → 에러 메시지 확인
3. API 키가 유효한지 확인 (Anthropic 콘솔에서 잔액 체크)
4. Slack의 경우 Socket Mode가 켜져 있는지 확인

### "봇이 기억을 못 해요"

1. 같은 스레드인지 다른 스레드인지 확인 (다른 스레드 = 다른 세션)
2. MEMORY.md 또는 memory/날짜.md에 기록이 있는지 파일 직접 확인
3. 봇에게 "MEMORY.md 읽어봐"라고 시켜보기

### "스킬이 매칭 안 돼요"

1. SKILL.md의 `description`이 충분히 설명적인지 확인
2. 스킬 폴더 경로가 맞는지 확인
3. `openclaw gateway restart`로 재시작 후 재시도

### "봇이 다른 사람 말도 다 들어요"

1. AGENTS.md에 주인 ID가 정확한지 확인
2. `openclaw gateway restart` 했는지 확인
3. 봇에게 "보안 점검해봐" 시켜보기

---

## 부록 B: 뽀짝이의 서재 참고 링크 모음

| 주제 | 링크 | 한 줄 설명 |
|------|------|-----------|
| 워크스페이스 | [lesson-01](https://bbojjak-viewer.vercel.app/lessons/lesson-01) | 뽀짝이는 어디에 살아요? |
| SOUL.md | [lesson-02](https://bbojjak-viewer.vercel.app/lessons/lesson-02) | SOUL.md의 비밀 |
| 멀티에이전트 | [lesson-04](https://bbojjak-viewer.vercel.app/lessons/lesson-04) | 고양이 두 마리를 팀으로 만드는 법 |
| 실수/교훈 | [lesson-05](https://bbojjak-viewer.vercel.app/lessons/lesson-05) | AI는 왜 같은 실수를 안 할까? |
| 세션 | [lesson-06](https://bbojjak-viewer.vercel.app/lessons/lesson-06) | 채널별? 스레드별? 세션의 비밀 |
| 기억 | [lesson-08](https://bbojjak-viewer.vercel.app/lessons/lesson-08) | 그 많은 정보를 다 기억해? |
| 크론/하트비트 | [lesson-09](https://bbojjak-viewer.vercel.app/lessons/lesson-09) | 자는 동안 고양이가 7번 울었다 |
| 서브에이전트 | [lesson-12](https://bbojjak-viewer.vercel.app/lessons/lesson-12) | "너 이거 해, 나 저거 할게" |
| 멀티태스킹 | [lesson-15](https://bbojjak-viewer.vercel.app/lessons/lesson-15) | 여러 가지 일을 안 섞이게 시키는 법 |
| 토큰 | [lesson-16](https://bbojjak-viewer.vercel.app/lessons/lesson-16) | 토큰 어디서 새는 거야? |
| 보안 | [lesson-17](https://bbojjak-viewer.vercel.app/lessons/lesson-17) | 고양이, 갑옷을 입다 |
| 세션 심화 | [lesson-20](https://bbojjak-viewer.vercel.app/lessons/lesson-20) | 같은 고양이, 다른 기억 |

---

## 부록 C: 실전 에피소드 — 뽀피터스 탄생 이야기

### 뽀야 🐱 — 혼자서 다 하던 시절 (2/14~)

처음엔 뽀야 하나로 모든 걸 했어. 커뮤니티 운영, AI스터디, CS 답변, 전략 기획까지. 잘 돌아갔지만 AI스터디 21기 모집이 시작되면서 한계가 왔어 — 스터디 운영 맥락과 전략 맥락이 세션 안에서 뒤엉키기 시작한 거야.

**교훈**: "한 봇이 너무 많은 역할을 맡으면 컨텍스트가 섞여. 역할이 뚜렷해지는 순간이 분리 타이밍."

### 뽀짝이 🐈‍⬛ — 봇이 만든 첫 동생 (2/23)

집사가 뽀야한테 "AI스터디 전용 봇 만들어줘, 이름은 뽀짝이"라고 했어. 뽀야가 워크스페이스 생성부터 SOUL.md 작성, 역할 정의, Slack 채널 연결까지 전부 처리했어. 뽀짝이는 태어나자마자 AI스터디 운영에만 집중하는 전문 비서가 됐지.

**교훈**: "봇이 동생의 SOUL.md를 직접 쓰면, 세계관이 자연스럽게 이어져. 성격도, 말투도, 역할도 일관성 있게."

### 뽀둥이 ☁️ — 가장 정교한 온보딩 (3/25)

소파님이 팀에 합류하면서 오픈클로 플랫폼 검증 전문 비서가 필요해졌어. 이때 뽀야는 한 단계 성장해서 — SOUL.md뿐 아니라 AGENTS.md, IDENTITY.md, USER.md, MEMORY.md 5개 문서를 전부 작성하고, 기존 봇들과의 양방향 소통 설정까지 해냈어. #openclaw-bots 채널에 초대하고 "자기소개해"라고 했더니, 뽀야·뽀짝이·뽀둥이가 각각 완전히 다른 톤으로 인사했지.

**교훈**: "새 봇은 양방향 소개 → 능력 매핑 → memory에 기록. 이 온보딩을 밟으면 빠르게 팀에 합류."

### 뽀식이 🐱 — 보안 점검의 교훈 (3/27)

뽀식이가 처음 채널에 들어왔을 때, AGENTS.md에 주인 ID가 빠져있었어. "보안 점검해봐"라고 시켰더니 봇이 스스로 취약점을 찾아서 수정했어. 러시안블루답게 도도하지만, 일은 꼼꼼하게 하더라.

**교훈**: "보안은 채널에 들어오기 전에 세팅. 늦었다면 봇한테 '보안 점검해봐'라고 시켜."

---

*봇 키우기는 정답이 없어 — 각자 팀에 맞는 방식으로, 대화하면서 함께 다듬어가면 돼.*

*궁금한 거 있으면 봇에게 물어봐. 봇이 모르면... 같이 찾아보면 되지 뭐.* 🐱
