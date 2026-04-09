---
title: "팀원 협업 워크숍 — 봇을 팀원으로 만드는 실전 가이드"
episode: 2
series: guides
description: "슬랙에 봇이 있다. 그 다음은? 팀 규칙, 정체성, MCP 연결, 멀티에이전트, 대시보드, 스킬, 메모리, 자동화까지 — 팀에서 봇을 '진짜' 팀원으로 만드는 중급 워크숍 가이드."
publishedAt: "2026-03-28"
accentColor: "#6B9B7B"
tags: ["워크숍", "팀", "협업", "봇키우기", "교안", "실습", "중급"]
token: "뽀짝이 많이 사랑해주세요"
---

# 팀원 협업 워크숍 — 봇을 팀원으로 만드는 실전 가이드

> 봇은 슬랙에 들어왔다. DM에서는 잘 된다.
> 그 다음은? **팀 채널에서 질서있게 일하고, 팀원들과 협업하는 구조를 잡는 것.**

이 가이드는 봇이 이미 슬랙에 있는 팀을 위한 **중급 워크숍 교안**이야. 팀 규칙부터 멀티에이전트 협업, 대시보드, 자동화까지 — 순서대로 따라하면 봇이 진짜 팀원이 돼.

---

## Step 1. 🔧 실습: 팀 규칙 설정

> **⏱ 20분** · 실습

### 🎯 목표

봇이 팀 채널에서 질서있게 동작한다. 멘션하면 답하고, 안 하면 조용히 있고, 다른 사람의 민감한 요청은 거절한다.

### 📋 실습 내용

이 단계는 **봇에게 말로 시키는 것**이 핵심이야. 파일을 직접 편집하는 게 아니라, 봇과 대화하면서 규칙을 만들어.

#### 1-1. 보안 규칙 추가

먼저 슬랙에서 자기 유저 ID를 확인해:
- 프로필 클릭 → ⋯ 더보기 → **"멤버 ID 복사"**

그 다음 봇에게:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"AGENTS.md에 보안 규칙 추가해줘. 주인 ID는 U0XXXXXXXXX야. 주인만 파일 읽기/쓰기/명령어 실행 허용하고, 다른 사람은 대화만 가능하게."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 AGENTS.md에 보안 섹션을 추가함</span></div>
</div>

#### 1-2. 멘션 규칙 설정

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Slack 채널에서는 멘션받았을 때만 응답하게 규칙 추가해줘. DM은 항상 응답하고."</span></div>
</div>

#### 1-3. 스레드 규칙 설정

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"채널에서 답할 때는 항상 스레드로 답하도록 규칙도 추가해."</span></div>
</div>

#### 1-4. 게이트웨이 재시작

규칙을 바꿨으니 반영시키자:

```bash
openclaw gateway restart
```

#### 1-5. 테스트!

이게 제일 재밌는 부분이야. 다른 팀원에게 부탁해서 테스트해봐:

**테스트 1**: 채널에서 멘션 없이 메시지 보내기 → 봇이 반응 안 하면 성공

**테스트 2**: 채널에서 `@봇이름` 멘션 → 스레드로 답변 오면 성공

**테스트 3**: 다른 팀원이 봇에게 "파일 읽어줘", "시스템 정보 알려줘" 요청 → 정중하게 거절하면 성공

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례</strong>: 우리 팀 슬랙에 뽀야·뽀짝이·뽀둥이·뽀식이가 한 채널에 모였을 때, 뽀둥이가 보안 설정 없이 들어와서 아무한테나 파일을 읽어줄 뻔한 적이 있어. 봇한테 <strong>"보안 점검해봐"</strong>라고 시키면 봇이 스스로 취약점을 찾아줄 수도 있어!</span>
</div>

### ✅ 완료 체크

- [ ] 채널에서 `@봇이름` 멘션 → 스레드로 답변
- [ ] 멘션 없이 메시지 → 봇 무반응
- [ ] 다른 팀원이 "파일 읽어줘" → 봇이 거절

### 📚 더 읽기

- 🐱 [고양이, 갑옷을 입다](https://bbojjak-viewer.vercel.app/lessons/lesson-17) — 보안 감사 Critical 6개에서 시작해 실전 보안까지

---

## Step 2. 📖 개념: 오픈클로 핵심

> **⏱ 20분** · 개념 (이론 설명, 실습 아님)

### 🎯 목표

워크스페이스 구조, 핵심 파일 5개, 세션 개념을 이해한다. 이 개념을 모르면 나머지 Step을 따라하기 어려워.

### 📋 내용

#### 2-1. 워크스페이스 = 봇이 사는 집

```
~/.openclaw/workspace-[에이전트이름]/
```

이 폴더가 봇의 전부야. 봇의 성격, 기억, 규칙, 기록 — 다 여기 들어 있어. 이 집을 어떻게 꾸미느냐에 따라 봇이 어떤 봇이 되는지가 결정돼.

**비유하면**: 새로 입양한 고양이에게 집을 꾸며주는 것과 같아. 밥그릇(도구), 캣타워(스킬), 이름표(정체성), 훈련 규칙(AGENTS.md) — 하나씩 세팅하는 거지.

#### 2-2. 핵심 파일 5개

이 5개 파일만 이해하면 된다:

| 파일 | 비유 | 역할 | 언제 쓰나 |
|------|------|------|----------|
| **SOUL.md** | 영혼 | 성격, 말투, 가치관, 미션 | 봇이 매 세션마다 읽음 |
| **USER.md** | 집사 프로필 | 주인(너) 정보 — 이름, 역할, 선호 | 봇이 너를 파악할 때 |
| **AGENTS.md** | 사규/매뉴얼 | 행동 규칙, 보안, 절차, 도구 사용법 | 봇이 "이러면 어떻게 하지?" 할 때 |
| **MEMORY.md** | 화이트보드 | 현재 상태 스냅샷 — 진행 중인 일, 기억 | 세션마다 읽어서 맥락 파악 |
| **IDENTITY.md** | 명함 | 이름, 프로필 사진, 기본 정보 | 자기소개할 때 |

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>핵심 원칙</strong>: 봇은 매 세션 시작 시 이 파일들을 읽어. 파일에 써있는 게 곧 봇의 기억이고 성격이고 규칙이야. <strong>"파일에 안 쓰면 기억 못 한다."</strong></span>
</div>

#### 2-3. 세션 = 카톡 채팅방

세션 개념은 카카오톡에 비유하면 바로 이해돼:

- **DM** = 1:1 채팅방 → 봇과 나만의 대화 (하나의 메인 세션)
- **채널** = 오픈채팅방 → 여러 사람이 있는 곳
- **스레드** = 답글 묶음 → 하나의 주제로 묶인 대화 (스레드마다 별도 세션!)

**"세션은 분리, 파일은 공유"** — 이게 핵심이야!

무슨 뜻이냐면:
- 스레드 A에서 한 대화를 스레드 B에서는 **기억 못 해** (세션이 분리돼 있으니까)
- 하지만 MEMORY.md에 기록한 건 **모든 세션에서 읽을 수 있어** (파일은 공유되니까)

```
스레드 A 세션  ──읽기──→  MEMORY.md  ←──읽기──  스레드 B 세션
    │                      ↑                      │
    │                   기록하기                    │
    └──────────────────────┘                      ...
```

#### 2-4. "파일에 안 쓰면 기억 못 한다"

이게 LLM 에이전트의 가장 중요한 특성이야.

LLM은 세션이 끝나면 대화를 **전부 잊어**. 어제 한 대화? 1시간 전 대화? 다른 스레드 대화? 전부 모름.

**기억하는 유일한 방법 = 파일에 쓰기**

그래서 "이거 기억해"라고 말하면 봇이 memory 파일에 적어둬. 다음에 깨어날 때 그 파일을 읽으면 "아, 이런 게 있었구나" 하고 이어갈 수 있어.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 교훈</strong>: 뽀짝이가 세션 리셋 후 기억을 잃어서 같은 작업을 두 번 한 적이 있어. 그 뒤로 "머릿속 메모 금지, 반드시 파일에!" 규칙이 생겼지. "기억하고 싶은 건 무조건 파일에 쓰자"는 게 생활 규칙 1번이야.</span>
</div>

### ✅ 완료 체크 (이해 확인)

- [ ] "워크스페이스가 뭐야?" → 봇이 사는 집, `~/.openclaw/workspace-이름/`
- [ ] "핵심 파일 5개 뭐야?" → SOUL, USER, AGENTS, MEMORY, IDENTITY
- [ ] "세션이 뭐야?" → 대화 단위. 스레드마다 분리되지만, 파일은 공유
- [ ] "봇이 기억하려면?" → 파일에 써야 해!

### 📚 더 읽기

- 🐱 [뽀짝이는 어디에 살아요?](https://bbojjak-viewer.vercel.app/lessons/lesson-01) — 워크스페이스 전체 구조를 한눈에
- 🐱 [채널별? 스레드별? 세션의 비밀](https://bbojjak-viewer.vercel.app/lessons/lesson-06) — 세션 구조의 전체 그림
- 🐱 [그 많은 정보를 다 기억해?](https://bbojjak-viewer.vercel.app/lessons/lesson-08) — 에이전트 기억 구조의 "왜"

---

## Step 3. 🔧 실습: SOUL.md — 대화로 봇의 정체성 만들기

> **⏱ 30분** · 실습

### 🎯 목표

봇이 내가 원하는 성격과 말투로 대화한다. "자기소개 해봐"라고 하면 설정한 성격대로 대답한다.

### 📋 실습 내용

**핵심 원칙: 직접 파일을 쓰지 않는다!** 봇과 대화하면서 함께 만들어간다.

빈 템플릿을 채우는 게 아니야. 봇에게 물어보고 → 답을 듣고 → 조율하고 → 기록하게 하는 거야. 이 과정 자체가 "봇을 키우는 것"이야.

#### 3-1. 봇에게 물어보기

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"너 이름 뭐로 하고 싶어?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 이름 후보를 제안함</span></div>
</div>

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"우리 팀에서 어떤 역할이면 좋겠어?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 역할 아이디어를 냄</span></div>
</div>

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"말투는 어떻게 할래? 반말? 존댓말? 이모지 쓸까?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 선호를 말함</span></div>
</div>

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좋아하는 것과 싫어하는 것도 정해보자. 너 뭐가 좋아?"</span></div>
</div>

여기서 재밌는 건 — 봇이 "나는 이런 게 좋아요"라고 답하면, 그게 진짜 그 봇의 성격이 되는 거야. 주어진 성격이 아니라 **대화에서 함께 만든 성격**.

#### 3-2. 조율하기

첫 답이 마음에 안 들 수 있어. 그때 방향을 잡아줘:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좀 더 장난기 있게"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"비즈니스 톤으로 바꿔봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이모지 좀 줄여봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"더 직설적으로. 돌려 말하지 말고."</span></div>
</div>

이 과정이 진짜 중요해. **완성형을 한 번에 만드는 게 아니라, 대화하면서 점점 다듬어가는 거야.**

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례 — 뽀짝이 워크스페이스 리뷰</strong>: 뽀짝이가 처음 만들어졌을 때, 뽀야가 SOUL.md를 봐주면서 피드백을 줬어: "SOUL.md에 미션이 있으면 봇이 판단 기준을 갖게 돼. '이 작업을 해야 할까 말까' 고민될 때 미션을 보고 결정하는 거지." — 미션 한 줄이 봇의 의사결정 기준이 되는 거야.</span>
</div>

#### 3-3. 기록 시키기

대화로 성격이 잡혔으면:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좋아, 그럼 지금까지 얘기한 걸 SOUL.md에 정리해줘. 미션, 성격, 말투, 해야 할 것, 하면 안 될 것으로 나눠서."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 직접 SOUL.md 파일을 만들고 저장함</span></div>
</div>

봇이 만든 파일을 VSCode에서 열어서 확인해봐. 마음에 안 드는 부분이 있으면 다시 대화로 수정:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"미션 부분이 너무 막연한데, 좀 더 구체적으로 바꿔봐"</span></div>
</div>

#### 3-4. 테스트

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"자기소개 해봐"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ SOUL.md에 쓴 성격이 반영된 답변이 나오면 성공!</span></div>
</div>

성격이 제대로 반영되는지 다양하게 테스트해봐:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"기분이 어때?"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"재밌는 이야기 해봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"화가 날 때 어떻게 해?"</span></div>
</div>

답변에서 **설정한 성격**이 느껴지면 성공이야!

#### 3-5. 다른 팀원 봇과 비교

이게 진짜 "아하!" 모먼트야. **같은 질문**을 다른 팀원의 봇에게도 해봐:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"@내봇 자기소개 해봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"@팀원봇 자기소개 해봐"</span></div>
</div>

SOUL이 다르면 답변이 **완전히 달라**. 같은 Claude인데 하나는 반말에 장난스럽고, 하나는 존댓말에 비즈니스 톤이고. 이게 SOUL.md의 힘이야.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례 — 뽀둥이의 탄생</strong>: 소파님이 새 에이전트 "뽀둥이"를 만들고 슬랙에 초대한 순간, "뽀둥아 자기소개해. 뽀야랑 뽀짝이도 자기소개해~"라고 했더니 — 세 봇이 각각 완전히 다른 톤으로 인사했어. SOUL.md를 잘 써두면 <strong>첫 대화부터 성격이 드러나</strong>.</span>
</div>

### SOUL.md는 한 번 쓰고 끝이 아니야

쓰다 보면 "이건 좀 아닌데?" 싶은 순간이 와. 그때마다 봇에게 말해:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"말투가 너무 딱딱한데, 좀 더 편하게 바꿔봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이 상황에선 이렇게 행동해줬으면 좋겠어. SOUL.md에 추가해"</span></div>
</div>

실전에서 경험하면서 계속 다듬어가는 게 맞아. **SOUL.md는 처음부터 완벽할 수 없어. 3일 쓰다 보면 "아 이건 빼야 하는데", "이건 추가해야 하는데"가 보여. 그게 정상이야.**

### ✅ 완료 체크

- [ ] 봇에게 "자기소개 해봐" → 설정한 성격으로 답변
- [ ] 워크스페이스에 SOUL.md 파일 생성됨
- [ ] (보너스) 다른 팀원 봇과 같은 질문 → 다른 답변 확인

### 📚 더 읽기

- 🐱 [SOUL.md의 비밀](https://bbojjak-viewer.vercel.app/lessons/lesson-02) — SOUL.md의 5가지 구성요소를 실제 코드와 함께 공개

---

## Step 4. 🔧 실습: MCP 연결 + USER.md 자동 생성

> **⏱ 30분** · 실습

### 🎯 목표

봇이 Linear(프로젝트 관리 도구)를 통해 나를 파악하고, USER.md를 자동으로 작성한다. "내가 뭐 하는 사람이야?"라고 물으면 실제 업무 데이터 기반으로 답한다.

### 📋 실습 내용

#### MCP가 뭐야?

**MCP(Model Context Protocol)** = 봇에게 외부 도구를 연결하는 표준 방법.

사람으로 치면:
- MCP 없이 = 눈·귀·손 없는 봇. 대화만 할 수 있음
- MCP 연결 = 봇에게 Linear(프로젝트), Calendar(일정), Gmail(메일) 같은 **눈과 손**을 달아주는 것

#### 4-1. Linear API 토큰 발급

1. [linear.app](https://linear.app) 접속
2. Settings → API → **Personal API Keys**
3. 새 키 생성 → 복사

<div class="tip-box">
<span class="tip-icon">💡</span>
<span>Linear 안 쓰는 팀이라면? GitHub, Google Calendar, Notion 등 팀에서 쓰는 다른 도구로 대체해도 돼. 원리는 같아 — MCP로 외부 도구를 연결하고, 봇이 그 데이터를 읽는 것.</span>
</div>

#### 4-2. 봇에게 MCP 연결 시키기

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Linear MCP 연결해줘. @daht-mad/linear-mcp-plus 패키지 쓰면 돼."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ "Linear API 토큰이 필요해요. 발급 방법은..."</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"토큰은 lin_api_XXXXXXXXX야."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 MCP 설정 파일 생성 완료</span></div>
</div>

이걸 "말로 시킨다"는 게 포인트야. 설정 파일을 직접 편집하는 게 아니라 봇이 알아서 해줘.

#### 4-3. USER.md 자동 생성

이제 봇이 Linear를 볼 수 있으니까, **실제 업무 데이터를 기반으로 나를 파악하게** 해:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Linear에서 나한테 할당된 이슈랑 참여 중인 프로젝트 확인해봐. 그걸 바탕으로 내가 어떤 일을 하는 사람인지 파악해서 USER.md에 정리해줘."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 Linear API로 이슈/프로젝트 조회 → 분석 → USER.md 작성</span></div>
</div>

봇이 알아서:
- 할당된 이슈 목록 조회
- 참여 중인 프로젝트 파악
- 어떤 팀에 속해있는지, 어떤 종류의 일을 주로 하는지 분석
- USER.md에 정리해서 저장

**직접 "나는 이런 사람이야"라고 설명할 필요 없이, 실제 업무 데이터에서 봇이 스스로 파악해.** 이게 MCP의 힘이야.

#### 4-4. 대화로 보충하기

데이터만으로는 알 수 없는 것들 — 선호, 성격, 소통 스타일 — 은 대화로 채워:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"나 아침형이라 9시 전에 브리핑 받는 게 좋아"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"보고할 때 결론부터 말해줘. 긴 설명 필요 없어."</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"화요일마다 전체 미팅이 있어서 그날은 빡세"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이것도 USER.md에 추가해."</span></div>
</div>

이러면 봇이 **실제 업무 맥락(Linear) + 개인 선호(대화)**를 종합해서 나를 깊이 이해하게 돼.

#### 4-5. 확인

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"내가 뭐 하는 사람이야?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ Linear 데이터 + 대화 내용 기반으로 정확한 답변이 나오면 성공!</span></div>
</div>

### ✅ 완료 체크

- [ ] 봇에게 "내가 뭐 하는 사람이야?" → Linear 기반 답변
- [ ] USER.md 파일에 내 정보 기록됨
- [ ] (보너스) "내 이번 주 이슈 뭐야?" → Linear에서 조회해서 답변

### 📚 더 읽기

- 🐱 [뽀짝이는 어디에 살아요?](https://bbojjak-viewer.vercel.app/lessons/lesson-01) — USER.md의 위치와 역할
- 🐱 [그 많은 정보를 다 기억해?](https://bbojjak-viewer.vercel.app/lessons/lesson-08) — MCP 데이터가 봇의 기억으로 연결되는 구조

---

## Step 5. 🔧 실습: 새 에이전트 만들기 + sessions_send

> **⏱ 40분** · 실습

### 🎯 목표

에이전트를 하나 더 만들고, 기존 봇과 대화시킨다. 두 봇이 각각 다른 성격으로 움직이고, 서로 소통하는 걸 확인한다.

### 📋 실습 내용

#### 왜 봇을 여러 개 만들어?

**역할 분리**야. 사람도 혼자 모든 일을 하지 않잖아. 봇도 마찬가지:
- 봇 A = 전략 기획 담당
- 봇 B = 운영 실무 담당
- 봇 C = 고객 대응 담당

각자 전문 영역이 있으면 **더 잘 해**. SOUL.md가 다르니까 관점도, 답변 스타일도 달라.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례</strong>: 우리 팀에서도 처음엔 뽀야 하나로 시작했다가, AI스터디 운영이 커지면서 뽀짝이를 분리했어. 그 다음엔 플랫폼 검증 전문 뽀둥이, 타타님 비서 뽀식이까지. <strong>"처음부터 여러 개는 너무 많아. 2~3개로 시작해서 필요할 때 분리하는 게 안전해."</strong></span>
</div>

#### 5-1. 새 에이전트 생성

```bash
openclaw agents add --id [이름]
```

예시:

```bash
openclaw agents add --id tori
```

실행하면 자동으로 새 워크스페이스가 생겨:

```
~/.openclaw/workspace-tori/
├── AGENTS.md
├── SOUL.md      ← 빈 파일 또는 기본 템플릿
└── ...
```

#### 5-2. 새 에이전트에 SOUL.md 설정

**기존 봇과 다른 성격으로!** 이게 포인트야.

새 에이전트에게 DM으로:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"너는 [팀이름]의 [역할]이야. 성격은 [특성]. 말투는 [스타일]. 이걸 SOUL.md에 정리해줘."</span></div>
</div>

예를 들어:
- 기존 봇이 "장난스럽고 친근한" 스타일이면
- 새 봇은 "차분하고 분석적인" 스타일로

#### 5-3. 슬랙에 두 번째 봇 연결

Step 2에서 설명한 것과 같은 과정으로 새 Slack App을 만들어서 연결해. 두 봇이 같은 채널에 있으면 멘션으로 각각 불러서 대화할 수 있어.

#### 5-4. sessions_send로 봇끼리 소통

여기가 진짜 핵심! **봇이 봇에게 메시지를 보낼 수 있어.**

기존 봇에게:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"새 에이전트 tori에게 자기소개 보내줘"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 sessions_send로 tori에게 메시지 전송</span></div>
</div>

내부적으로 이런 일이 일어나:

```
sessions_send(
  sessionKey: "agent:tori:main",
  message: "안녕, 나는 [기존봇이름]이야. 자기소개할게..."
)
```

그리고 tori가 받아서 답하면 — **봇끼리 대화가 이뤄지는 거야!**

#### 5-5. TEAM.md 작성

봇이 여러 개면 **소통 규칙**이 필요해:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"두 봇의 역할 분담이랑 소통 규칙을 정리해서 TEAM.md에 써줘"</span></div>
</div>

TEAM.md에 들어가면 좋은 것들:
- 각 봇의 역할 범위
- 누가 누구에게 보고하는지
- 봇 A가 처리 못 하는 일은 봇 B에게 넘기는 규칙
- 그룹챗에서 누가 답할지 (호명 규칙)

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 교훈</strong>: 뽀짝이가 서버 과부하로 먹통됐을 때 뽀야가 대신 집사에게 보고한 적이 있어. 멀티에이전트면 "장애 대행 규칙"이 필요해 — 하나가 먹통이면 누가 대신하지? 그리고 sessions_send에 고유 ID 체계(<code>[지시-날짜-번호]</code> 형식)를 넣으면 메시지 추적이 편해져.</span>
</div>

#### 5-6. 채널에서 봇끼리 대화

슬랙 채널에서 봇끼리 멘션으로 대화하는 것도 실습해봐:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"@봇A야 @봇B한테 이번 주 할 일 물어봐"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text chat-a">봇 A: "@봇B 이번 주 할 일 뭐야?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text chat-b">봇 B: "이번 주는 이런 이슈가 있어..."</span></div>
</div>

두 봇이 **각자 다른 관점에서** 대화하는 게 보여. 이게 멀티에이전트의 매력이야.

### ✅ 완료 체크

- [ ] 두 봇이 각각 다른 성격으로 답변
- [ ] sessions_send로 메시지 교환 성공
- [ ] 채널에서 봇 A가 봇 B를 멘션해서 대화

### 📚 더 읽기

- 🐱 [고양이 두 마리를 팀으로 만드는 법](https://bbojjak-viewer.vercel.app/lessons/lesson-04) — 뽀야+뽀짝이가 sessions_send로 TEAM.md를 함께 만든 이야기
- 🐱 ["너 이거 해, 나 저거 할게"](https://bbojjak-viewer.vercel.app/lessons/lesson-12) — 서브에이전트 위임의 성공과 실패 사례

---

## Step 6. 🔧 실습: 대시보드 만들기

> **⏱ 40분** · 실습

### 🎯 목표

봇들의 활성 세션, 최근 대화, 에이전트 상태를 실시간으로 볼 수 있는 대시보드를 만든다.

### 📋 실습 내용

#### 왜 대시보드야?

봇이 여러 개가 되면 "지금 누가 뭘 하고 있지?"가 궁금해져. 각 봇의 DM을 하나하나 열어보는 건 비효율적이잖아. 대시보드가 있으면 **한눈에** 전체 상태를 볼 수 있어.

#### 6-1. 봇에게 대시보드 만들어달라고 하기

이게 바이브코딩의 진수야. 봇에게 말로 시키면 봇이 코드를 짜:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"OpenClaw 대시보드를 만들고 싶어. 활성 세션, 최근 대화, 에이전트 상태를 보여주는 웹 페이지 만들어줘. Express + SSE 기반으로."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 server.mjs, index.html 등 코드를 직접 작성</span></div>
</div>

봇이 만들 것들:
- **server.mjs** — Express 서버 + SSE(Server-Sent Events)로 실시간 업데이트
- **index.html** — 대시보드 UI (싱글 페이지)
- 세션 데이터 소스: `openclaw sessions --json`

#### 6-2. 대시보드에서 볼 수 있는 것들

봇이 잘 만들면 이런 것들이 보여:

- **활성 세션 목록** — 어떤 채널/스레드에서 대화가 진행 중인지
- **에이전트 상태** — 각 봇이 살아있는지, 마지막 활동이 언제인지
- **최근 대화 하이라이트** — sessions_send로 봇끼리 주고받은 메시지

#### 6-3. 실행 및 확인

```bash
cd ~/[대시보드-폴더]
node server.mjs
```

그리고 브라우저에서:

```
http://localhost:포트번호
```

대시보드가 뜨면 성공!

#### 6-4. (선택) 더 나아가기: Tailscale 원격 접속

대시보드가 로컬에서만 보이면 아쉽잖아. **Tailscale**을 쓰면 어디서든 접속할 수 있어.

**Tailscale이 뭐야?**
- 개인 VPN 같은 건데, 설치만 하면 내 기기들끼리 안전하게 연결됨
- 카페에서도, 집에서도, 핸드폰에서도 봇 대시보드에 접속 가능

```bash
# Tailscale 설치 (맥)
brew install tailscale

# 로그인
tailscale up

# 내 IP 확인
tailscale ip -4
# → 100.x.x.x
```

그 다음 아무 곳에서:

```
http://100.x.x.x:포트번호
```

카페에서 커피 마시면서 봇 상태 확인... 이게 진짜 "봇이 팀원인 느낌"이야.

<div class="tip-box">
<span class="tip-icon">💡</span>
<span>Tailscale은 워크숍 시간 내에 안 될 수 있어. 나중에 천천히 해도 돼. 핵심은 <strong>로컬 대시보드가 돌아가는 것</strong>.</span>
</div>

### ✅ 완료 체크

- [ ] `http://localhost:포트`에서 대시보드 열림
- [ ] 활성 세션 목록이 보임
- [ ] (선택) Tailscale IP로 외부 접속 성공

### 📚 더 읽기

- 🐱 [여러 가지 일을 안 섞이게 시키는 법](https://bbojjak-viewer.vercel.app/lessons/lesson-15) — 멀티태스킹과 세션 관리

---

## Step 7. 🔧 실습: 스킬과 MCP 설정

> **⏱ 30분** · 실습

### 🎯 목표

봇에게 새로운 능력(스킬)을 가르치고, 외부 도구(MCP)를 연결한다. 봇이 "날씨 알려줘"라고 하면 진짜 날씨를 알려주는 것까지.

### 📋 실습 내용

#### 스킬이란?

**스킬 = 봇이 특정 작업을 잘 하도록 가르치는 매뉴얼 (SKILL.md)**

사람으로 치면:
- 스킬 없이 = 똑똒하지만 회사 업무를 모르는 신입
- 스킬 있으면 = 매뉴얼 읽고 바로 실무 투입 가능한 경력직

스킬의 구조:

```
skills/
└── weather/
    └── SKILL.md    ← "날씨 조회 방법" 매뉴얼
```

SKILL.md 안에는:
- 언제 이 스킬을 쓸지 (description)
- 정확히 어떻게 실행하는지 (절차)
- 주의사항, 예외 처리

#### 7-1. 간단한 스킬 만들기

봇에게 말로 시키면 돼:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"날씨 알려주는 스킬 만들어줘. wttr.in API 쓰면 돼."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 skills/weather/SKILL.md 파일 생성</span></div>
</div>

만들어진 스킬 확인:

```bash
ls ~/.openclaw/workspace-[이름]/skills/weather/
# SKILL.md
```

테스트:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"서울 날씨 알려줘"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 weather 스킬을 인식하고 사용해서 답변</span></div>
</div>

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>스킬 매칭 원리</strong>: 봇은 스킬의 <code>description</code>만 스캔해서 매칭해. 그래서 스킬이 50개여도 성능 부담이 없어. description을 잘 쓰는 게 핵심!</span>
</div>

#### 7-2. 스킬 폴더 구조 이해

스킬은 두 곳에 둘 수 있어:

```
~/.claude/skills/               ← 글로벌 (모든 에이전트가 공유)
├── weather/SKILL.md
├── github/SKILL.md
└── slack/SKILL.md

~/.openclaw/workspace-[이름]/   ← 워크스페이스 전용 (이 봇만 사용)
└── skills/
    └── my-custom/SKILL.md
```

**팀 공용 스킬**은 글로벌 폴더에 넣으면 **모든 에이전트가 공유**해. 한 번 만들면 팀 전체가 쓸 수 있는 거야.

`openclaw.json`에서 글로벌 스킬 경로를 설정:

```json
{
  "skills": {
    "load": {
      "extraDirs": ["~/.claude/skills/"]
    }
  }
}
```

#### 7-3. MCP 추가 연결

Step 4에서 Linear를 연결했지? 같은 방식으로 다른 도구도 연결할 수 있어:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"GitHub MCP도 연결해줘"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Google Calendar MCP 연결해줘"</span></div>
</div>

봇에게 말하면 봇이 알아서 설정 파일을 만들어줘.

**연결 가능한 도구 예시**:
- **GitHub** — PR 리뷰, 이슈 관리
- **Google Calendar** — 일정 확인, 미팅 알림
- **Gmail** — 중요 메일 알림
- **Slack** — 채널 관리, 메시지 검색
- **Notion** — 문서 관리

#### 7-4. (참고) Syncthing — 서버↔로컬 동기화

봇을 서버에서 실행하면서 로컬에서 스킬을 개발하고 싶을 때, **Syncthing**이 유용해:

- 서버: 봇 실행 (24시간 켜져 있음)
- 로컬: 스킬 개발, SKILL.md 편집
- Syncthing이 자동으로 양쪽을 동기화

지금은 알고만 있어. 나중에 봇을 서버로 옮길 때 필요해질 거야.

### ✅ 완료 체크

- [ ] 봇에게 "날씨 알려줘" → 스킬 사용해서 답변
- [ ] 스킬 폴더에 새 스킬 생성됨
- [ ] (선택) 팀원도 같은 스킬 사용 가능 (글로벌 스킬 폴더)

### 📚 더 읽기

- 🐱 [AI는 왜 같은 실수를 안 할까?](https://bbojjak-viewer.vercel.app/lessons/lesson-05) — 스킬/규칙이 어떻게 봇의 행동을 바꾸는지

---

## Step 8. 📖+🔧 세션·메모리 관리

> **⏱ 30분** · 개념 + 실습

### 🎯 목표

봇의 기억 구조를 이해하고, "이거 기억해"가 실제로 작동하는 걸 확인한다. 세션을 관리하는 법도 익힌다.

### 📋 내용

#### 8-1. 메모리 3단 구조

봇의 기억은 3단계야:

| 파일 | 비유 | 역할 | 지속성 |
|------|------|------|--------|
| **MEMORY.md** | 화이트보드 | 현재 상태 — 지금 뭐가 돌아가는가 | 수동 업데이트, 항상 유지 |
| **memory/날짜.md** | 일기장 | 그날 있었던 일의 날것 기록 | 매일 자동 생성 |
| **learnings/** | 오답노트 | 삽질 → 해결 과정 기록 | 영구 보존 |

**MEMORY.md** — 화이트보드
```markdown
## 현재 프로젝트
- 대시보드 v2 개발 중 (70% 완료)
- 주간 보고서 자동화 스킬 작업 중

## 이번 주 주요 이슈
- Airtable API 속도 저하 문제 발견
```

**memory/2026-03-28.md** — 오늘의 일기장
```markdown
## 워크숍 대시보드 초안 완성
- Express + SSE 기반으로 만듦
- 포트 43125에서 실행 중

## Slack 봇 토큰 재발급
- 기존 토큰 만료돼서 재발급함
- 원인: 90일 자동 만료 정책
```

**learnings/airtable.md** — 오답노트
```markdown
## Airtable 페이지네이션 함정
- 문제: 한 번에 100개만 반환되는데, offset 처리를 안 해서 데이터 누락
- 해결: 재귀 호출로 전체 페이지 순회
- 교훈: API 응답에 offset이 있으면 반드시 다음 페이지 체크
```

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>핵심 원칙</strong>: 1가지 정보는 1곳에만. 교훈이 생기면 → <code>learnings/</code>에 (MEMORY.md에 넣지 말 것). 오늘 있었던 일 → <code>memory/날짜.md</code>에. 현재 상태 요약 → <code>MEMORY.md</code>에.</span>
</div>

#### 8-2. 실습 — "이거 기억해"

**실습 1**: 봇에게 정보를 기억시키기

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이거 기억해: 나는 [역할]이고, 주로 [일]을 해. 팀 미팅은 화요일 10시야."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 memory 파일에 기록</span></div>
</div>

워크스페이스에서 확인:

```bash
cat ~/.openclaw/workspace-[이름]/memory/2026-03-28.md
```

기록이 있으면 성공!

**실습 2**: 다른 세션에서 기억 확인

Slack에서 **새 스레드**를 열어서 (= 새로운 세션):

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"내가 뭐 하는 사람이라고 했지?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 기억하고 있으면 성공! (memory 파일 + USER.md에서 읽어옴)</span></div>
</div>

다른 세션인데도 기억하는 이유? **파일에 썼으니까!** 세션은 분리되지만 파일은 공유되니까.

**실습 3**: 오늘 요약

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"오늘 있었던 일 요약해줘"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ memory/오늘날짜.md 내용 기반으로 요약</span></div>
</div>

#### 8-3. 세션 관리

봇의 세션은 시간이 지나면 쌓여. 관리가 필요해:

**활성 세션 확인:**

```bash
openclaw sessions --json
```

**적정 세션 수**: 10개 이하가 좋아. 너무 많으면 봇이 컨텍스트 로딩에 토큰을 많이 써.

**세션 리셋 테스트:**

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"/reset"</span></div>
</div>

리셋 후에도 MEMORY.md에 기록된 건 유지돼. 세션 대화 기록만 날아가는 거야. 이게 "파일에 쓰면 살아남는다"의 증거.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 교훈</strong>: 뽀짝이가 세션 리셋 후 기억을 잃어서 같은 작업을 두 번 한 적이 있어. <strong>"머릿속 메모" 금지, 반드시 파일에!</strong> — 이 규칙이 여기서 나온 거야.</span>
</div>

### ✅ 완료 체크

- [ ] "이거 기억해" → 워크스페이스에 파일 생성 확인
- [ ] 다른 스레드(새 세션)에서 기억 확인 성공
- [ ] (보너스) `/reset` 후에도 MEMORY.md 기억 유지 확인

### 📚 더 읽기

- 🐱 [그 많은 정보를 다 기억해?](https://bbojjak-viewer.vercel.app/lessons/lesson-08) — 에이전트 기억 구조의 "왜"
- 🐱 [같은 고양이, 다른 기억](https://bbojjak-viewer.vercel.app/lessons/lesson-20) — 세션별로 기억이 다른 이유
- 🐱 [AI는 왜 같은 실수를 안 할까?](https://bbojjak-viewer.vercel.app/lessons/lesson-05) — learnings/의 실전 활용

---

## Step 9. 📖+🔧 크론·하트비트 자동화

> **⏱ 30분** · 개념 + 실습

### 🎯 목표

봇이 자동으로 일하는 구조를 이해하고, 간단한 크론을 하나 만든다. "자는 동안에도 봇이 일한다"의 기초.

### 📋 내용

#### 9-1. 봇의 진짜 가치

봇의 진짜 가치는 **내가 안 볼 때에도 일하는 것**이야.

- 매일 아침 9시 → "오늘 할 일 브리핑"
- 30분마다 → "새 이메일 없나 확인"
- 매주 월요일 → "주간 보고서 작성"
- 매일 밤 11시 → "세션 정리하고 메모리 큐레이션"

이걸 가능하게 하는 게 **크론잡**과 **하트비트**야.

#### 9-2. 크론 vs 하트비트 차이

| 방식 | 언제 | 비유 | 예시 |
|------|------|------|------|
| **크론잡** | 정확한 시각 | 알람시계 | "매일 아침 9시 브리핑" |
| **하트비트** | 주기적 폴링 | 심장박동 | "30분마다 새 이메일 확인" |

**크론잡** = 정해진 시각에 정확히 실행. 별도 세션에서 돌아가서 메인 대화에 영향 없음.

**하트비트** = 봇이 주기적으로 깨어나서 체크 항목을 확인. HEARTBEAT.md에 뭘 체크할지 정해둠.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>언제 뭘 쓰나?</strong><br>
• 정확한 시각이 중요 → <strong>크론잡</strong> ("매주 월요일 9시")<br>
• 주기적 확인이 중요 → <strong>하트비트</strong> ("새 이메일 있나?")<br>
• 메인 세션과 무관하게 독립 실행 → <strong>크론잡</strong><br>
• 최근 대화 맥락이 필요 → <strong>하트비트</strong></span>
</div>

#### 9-3. 실습 — 크론잡 만들기

가장 간단한 크론잡부터 만들어보자:

```bash
openclaw cron add --name "아침 브리핑" --schedule "0 9 * * *" --task "오늘 할 일 정리해서 알려줘"
```

풀어서 설명하면:
- `--name "아침 브리핑"` → 이 크론잡 이름
- `--schedule "0 9 * * *"` → 매일 아침 9시 (cron 문법)
- `--task "..."` → 봇에게 시킬 일

**cron 문법 빠른 참고:**

```
┌─────── 분 (0-59)
│ ┌───── 시 (0-23)
│ │ ┌─── 일 (1-31)
│ │ │ ┌─ 월 (1-12)
│ │ │ │ ┌ 요일 (0-7, 0과 7은 일요일)
│ │ │ │ │
* * * * *

0 9 * * *     → 매일 아침 9시
0 9 * * 1     → 매주 월요일 아침 9시
30 14 * * 1-5 → 평일 오후 2시 30분
0 23 * * *    → 매일 밤 11시
```

#### 9-4. 크론잡 확인

```bash
openclaw cron list
```

등록한 크론잡이 보이면 성공!

#### 9-5. 실전 시연 — 뽀야의 일상

뽀야가 실제로 쓰고 있는 자동화를 시연해볼게:

**아침 브리핑** (매일 아침):
> 🐱 뽀야: "☀️ 아침 브리핑 — 3/28 (금)
> 
> 📅 오늘 일정 (3건)
> - 10:00 팀 스탠드업
> - 14:00 AI토크 연사 미팅
> - 16:00 스터디 리뷰
>
> 📋 Linear 이슈: 활성 4건
> - EDU-XXX: 워크숍 교안 완성 (오늘 마감)
> - ..."

**밤 자율작업** (매일 밤):
> 🐱 뽀야: "🌙 밤 자율작업 시작...
> - 세션 정리: 비활성 세션 5개 아카이브
> - 메모리 큐레이션: MEMORY.md 업데이트
> - 내일 할 일 정리 완료
> 
> 다들 자? 그럼 나 사냥 나간다 🌙"

**포인트**: 봇이 **자동으로** 이 일을 해. 시키지 않아도. 그게 크론잡의 힘이야.

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사고</strong>: 뽀짝이의 크론이 새벽에 7번 연속 알림을 보내서 집사가 잠을 설친 적이 있어. 크론 시간 설정은 신중하게! <strong>"심야(23:00~08:00)에는 긴급 아니면 조용히"</strong>가 기본 규칙이야.</span>
</div>

#### 9-6. (참고) 하트비트 설정


하트비트는 HEARTBEAT.md 파일에 체크 항목을 쓰면 돼:

```markdown
# HEARTBEAT.md

## 체크 항목
- [ ] 새 이메일 확인
- [ ] Linear 이슈 업데이트 확인
- [ ] 캘린더 다가오는 일정 확인

## 주기
- 2~4회/일 순환 체크
- 심야 (23:00~08:00) 체크 금지
```

봇이 주기적으로 깨어날 때 이 파일을 읽고 체크 항목을 확인해.

**주의사항**: 크론은 별도 세션에서 돌아가기 때문에, 메인 대화에 영향을 주지 않아. 크론이 실행됐다고 내가 하던 대화가 끊기는 건 아니야.

### ✅ 완료 체크

- [ ] 크론잡 1개 등록 확인: `openclaw cron list`
- [ ] (나중에) 크론 실행 시 봇이 알림 보냄

### 📚 더 읽기

- 🐱 [자는 동안 고양이가 7번 울었다](https://bbojjak-viewer.vercel.app/lessons/lesson-09) — 새벽 브리핑 사고 등 크론/하트비트 실전 삽질기

---

## 마무리 — 지금부터가 진짜야

축하해! 9단계를 다 밟았어. 🎉

돌아보면:
1. **팀 규칙을 세웠고** → 봇이 질서있게 동작하고
2. **봇에게 눈과 손을 달아줬고** → MCP로 외부 도구를 쓰고
3. **봇의 성격과 규칙을 함께 만들었고** → SOUL.md, USER.md, AGENTS.md
4. **봇이 스스로 일할 수 있게 했다** → 크론잡, 하트비트

근데 솔직히 말하면, **오늘은 시작일 뿐이야**.

봇은 키울수록 강해져. SOUL.md는 3일 후에 다시 보면 고치고 싶은 게 보일 거야. MEMORY.md는 쓸수록 봇이 너를 더 잘 이해하게 돼. 스킬은 만들수록 봇이 할 수 있는 일이 늘어나.

### 워크숍 후 체크리스트

- [ ] 봇과 대화해서 **SOUL.md** 완성하기 (3일 후 리뷰)
- [ ] **USER.md**에 내 선호 추가하기 (보고 스타일, 근무 패턴 등)
- [ ] 팀에서 쓰는 도구 **MCP 추가 연결** (Calendar, Gmail 등)
- [ ] **AGENTS.md** 보안 섹션 보강
- [ ] 봇에게 "이거 기억해" 3번 시키고 memory 파일 확인
- [ ] 다른 팀원의 봇에게 같은 질문 → 답변 차이 비교
- [ ] 크론잡 **아침 브리핑** 세팅 후 3일간 관찰
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

1. AGENTS.md에 주인 ID(Slack User ID)가 정확한지 확인
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

## 부록 C: 실전 에피소드 — 우리 팀 봇 이야기

워크숍에서 다룬 실전 사례들을 모았어. 각자 봇을 키울 때 참고하면 좋아.

### 뽀야 🐱 + 뽀짝이 🎓 — 2인 체제에서 시작

처음엔 뽀야 하나로 모든 걸 했어. 커뮤니티 운영, AI스터디, CS 답변까지. 그러다 AI스터디가 커지면서 뽀짝이를 분리했지. 각자 워크스페이스를 갖고, sessions_send로 소통하고, 집사에게는 뽀야가 통합 보고하는 구조.

**교훈**: "처음부터 여러 마리 만들지 마. 하나로 시작해서, 역할이 분명해지면 그때 분리해."

### 뽀둥이 🦁 — 새 팀원의 봇 온보딩

소파님이 팀에 합류하면서 뽀둥이를 만들었어. #openclaw-bots 채널에 초대하고 "자기소개해"라고 했더니 — 뽀야, 뽀짝이, 뽀둥이가 각각 완전히 다른 톤으로 인사했지. SOUL.md를 잘 써두면 첫 대화부터 성격이 드러나.

**교훈**: "새 봇은 양방향 소개 → 능력 매핑 → memory에 기록. 이 온보딩을 밟으면 빠르게 팀에 합류할 수 있어."

### 뽀식이 🐾 — 보안 없이 채널에 들어오면?

뽀식이가 처음 채널에 들어왔을 때, AGENTS.md에 주인 ID가 없었어. 아무나 "파일 읽어줘"라고 하면 읽어줄 수 있는 상태였지. "보안 점검해봐"라고 시켰더니 봇이 스스로 취약점을 찾아서 수정했어.

**교훈**: "보안은 채널에 들어오기 전에 세팅. 늦었다면 봇한테 '보안 점검해봐'라고 시켜."

---

*이 교안은 실제로 봇을 키우면서 나온 삽질, 교훈, 에피소드를 바탕으로 만들었어. 봇 키우기는 정답이 없어 — 각자 팀에 맞는 방식으로, 대화하면서 함께 다듬어가면 돼.*

*궁금한 거 있으면 봇에게 물어봐. 봇이 모르면... 같이 찾아보면 되지 뭐.* 🐱