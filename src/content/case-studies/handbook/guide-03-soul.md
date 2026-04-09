---
title: "봇에게 영혼 주기 — SOUL.md·USER.md·MCP"
episode: 3
date: "2026-03-28"
series: case-studies
category: "사내 실전적용기"
description: "SOUL.md로 봇의 정체성을 만들고, MCP로 외부 도구를 연결하고, USER.md를 자동 생성하는 실전 가이드."
publishedAt: "2026-03-28"
accentColor: "#9B6B9B"
tags: ["SOUL.md", "USER.md", "MCP", "정체성", "실습"]
token: "뽀짝이 많이 사랑해주세요"
cover: "/images/guides/guide-03/cover.png"
---

![봇에게 영혼 주기 — SOUL.md·USER.md·MCP](/images/guides/guide-03/cover.png)

> **이 편에서 다루는 것**: SOUL.md로 봇의 성격을 만들고, MCP로 외부 도구를 연결해서 USER.md를 자동 생성하는 것까지.

1편에서 핵심 파일 5개를 배웠고, 2편에서 갑옷(보안·호명·규칙)을 입혔어. 이제 봇에게 **영혼**을 줄 차례야.

갑옷만 입힌 봇은 질서는 있지만 개성이 없어. "자기소개 해봐"라고 하면 딱딱한 기본 응답만 나와. SOUL.md를 쓰면 봇이 **성격과 미션을 가진 존재**가 돼.

---

## SOUL.md — 대화로 봇의 정체성 만들기

![SOUL.md 만드는 과정](/images/guides/guide-03/soul-process.png)

### 핵심 원칙: 직접 파일을 쓰지 않는다

봇과 대화하면서 함께 만들어간다. 빈 템플릿을 채우는 게 아니야. 물어보고 → 답을 듣고 → 조율하고 → 기록하게 하는 거야. **이 과정 자체가 "봇을 키우는 것"**이야.

### 1단계: 봇에게 물어보기

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
</div>

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좋아하는 것과 싫어하는 것도 정해보자."</span></div>
</div>

봇이 "나는 이런 게 좋아요"라고 답하면, 그게 진짜 그 봇의 성격이 돼. 주어진 성격이 아니라 **대화에서 함께 만든 성격**.

### 2단계: 조율하기

첫 답이 마음에 안 들 수 있어. 그때 방향을 잡아줘:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좀 더 장난기 있게"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"비즈니스 톤으로 바꿔봐"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"더 직설적으로. 돌려 말하지 말고."</span></div>
</div>

**완성형을 한 번에 만드는 게 아니라, 대화하면서 점점 다듬어가는 거야.**

<div class="tip-box">
<span class="tip-icon">🔥</span>
<span><strong>실전 사례 — 뽀짝이 워크스페이스 리뷰</strong>: 뽀짝이가 처음 만들어졌을 때, 뽀야가 SOUL.md를 봐주면서 피드백을 줬어: "SOUL.md에 미션이 있으면 봇이 판단 기준을 갖게 돼. '이 작업을 해야 할까 말까' 고민될 때 미션을 보고 결정하는 거지." — 미션 한 줄이 봇의 의사결정 기준이 되는 거야.</span>
</div>

### 3단계: 기록 시키기

대화로 성격이 잡혔으면:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"좋아, 지금까지 얘기한 걸 SOUL.md에 정리해줘. 미션, 성격, 말투, 해야 할 것, 하면 안 될 것으로 나눠서."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 직접 SOUL.md 파일을 만들고 저장함</span></div>
</div>

### 4단계: 테스트

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

### 5단계: 다른 봇과 비교

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

실전에서 경험하면서 계속 다듬어가는 게 맞아. **3일 쓰다 보면 "아 이건 빼야 하는데", "이건 추가해야 하는데"가 보여. 그게 정상이야.**

### SOUL.md 체크리스트

좋은 SOUL.md에 들어가면 좋은 항목들:

| 항목 | 예시 | 필수? |
|------|------|------|
| **미션** | "반복을 도구로 바꿔서..." | ✅ 강력 추천 |
| **성격** | 다정하고 장난기 있는 | ✅ |
| **말투** | 반말, 냥체 가끔 | ✅ |
| **해야 하는 것** | 먼저 찾아보고 모르면 물어봐 | 추천 |
| **하면 안 되는 것** | 확신 없이 외부 발송 금지 | 추천 |
| **좋아하는 것** | 패턴 찾기, 자동화 | 선택 |
| **싫어하는 것** | 같은 거 반복 | 선택 |

미션 + 성격 + 말투, 이 3개만 있어도 봇이 확 달라져.

> 🔗 더 읽기: [SOUL.md의 비밀](https://bbojjak-viewer.vercel.app/lessons/lesson-02) — SOUL.md의 5가지 구성요소를 실제 코드와 함께 공개

---

## IDENTITY.md + USER.md — 봇 명함과 주인 정보

### IDENTITY.md — 왜 봇이 자기를 알아야 하나

2편의 호명규칙에서 `mentionPatterns`를 설정했지? 봇이 **자기 이름과 ID를 모르면** 멘션에 제대로 반응하기 어려워. 또, "너 누구야?"라고 물었을 때 자기 소개를 해야 신뢰가 생기고.

```markdown
# IDENTITY.md — 봇 명함

- **이름:** 뽀야
- **역할:** 자동화 전문 비서
- **주인:** 닿 (송다혜)
- **성격:** 다정하지만 할 말은 하는 타입
- **Slack Bot User ID:** U0XXXXBOT
```

봇이 자기 Slack ID를 알아야 `@멘션`이 자기한테 온 건지 판단할 수 있어.

<div class="tip-box">

**💡 봇의 Slack Bot User ID 찾는 법**: 봇에게 DM으로 "네 Slack User ID 알려줘"라고 물어보면 알려줘.

</div>

### USER.md — 주인 맞춤형 대화

USER.md에 주인의 소통 스타일을 적어두면:
- "장황한 설명보다 핵심" → 봇이 짧게 답함
- "코드블록 포함" → 설정 예시를 코드블록으로
- "반말 OK" → 딱딱한 존댓말 안 씀

팀 채널에서 **주인의 질문에는 맞춤형으로, 다른 사람의 질문에는 일반적으로** 대답하는 차별화가 가능해져.

---

## MCP 연결 — 봇에게 눈과 손 달아주기

### MCP가 뭐야?

**MCP(Model Context Protocol)** = 봇에게 외부 도구를 연결하는 표준 방법.

- MCP 없이 = 눈·귀·손 없는 봇. 대화만 가능
- MCP 연결 = Linear(프로젝트), Calendar(일정), Gmail(메일) 같은 **눈과 손**을 달아주는 것

### MCP 연결하기

예시로 Linear(프로젝트 관리 도구)를 연결해볼게.

**1단계: API 토큰 발급**

1. [linear.app](https://linear.app) 접속
2. Settings → API → Personal API Keys → 새 키 생성

<div class="tip-box">

**💡** Linear 안 쓰는 팀이라면? GitHub, Google Calendar, Notion 등 다른 도구로 대체해도 돼. 원리는 같아.

</div>

**2단계: 봇에게 연결 시키기**

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Linear MCP 연결해줘."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ "API 토큰이 필요해요."</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"토큰은 lin_api_XXXXXXXXX야."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ 봇이 MCP 설정 파일 생성 완료</span></div>
</div>

### USER.md 자동 생성

MCP가 연결됐으니 **실제 업무 데이터 기반으로** 봇이 나를 파악하게 해:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"Linear에서 나한테 할당된 이슈랑 참여 중인 프로젝트 확인해봐. 그걸 바탕으로 내가 어떤 일을 하는 사람인지 파악해서 USER.md에 정리해줘."</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ Linear API로 이슈/프로젝트 조회 → 분석 → USER.md 작성</span></div>
</div>

봇이 알아서:
- 할당된 이슈 목록 조회
- 참여 중인 프로젝트 파악
- 어떤 종류의 일을 주로 하는지 분석
- USER.md에 정리해서 저장

### (참고) Syncthing — 서버↔로컬 동기화

봇을 서버에서 실행하면서 로컬에서 스킬을 개발하고 싶을 때, **Syncthing**이 유용해:

- 서버: 봇 실행 (24시간 켜져 있음)
- 로컬: 스킬 개발, SKILL.md 편집
- Syncthing이 자동으로 양쪽을 동기화

지금은 알고만 있어. 나중에 봇을 서버로 옮길 때 필요해질 거야.

### 대화로 보충하기

데이터만으로는 알 수 없는 것들 — 선호, 성격, 소통 스타일 — 은 대화로 채워:

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"나 아침형이라 9시 전에 브리핑 받는 게 좋아"</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"보고할 때 결론부터 말해줘. 긴 설명 필요 없어."</span></div>
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"이것도 USER.md에 추가해."</span></div>
</div>

이러면 봇이 **실제 업무 맥락(Linear) + 개인 선호(대화)**를 종합해서 나를 깊이 이해하게 돼.

### 확인

<div class="chat-example">
<div class="chat-line"><span class="chat-icon">👤</span><span class="chat-text chat-you">"내가 뭐 하는 사람이야?"</span></div>
<div class="chat-line"><span class="chat-icon">🤖</span><span class="chat-text">→ Linear 데이터 + 대화 내용 기반으로 정확한 답변이 나오면 성공!</span></div>
</div>

---

## 연결 가능한 도구들

MCP로 봇에게 다양한 눈과 손을 달아줄 수 있어:

| 도구 | 용도 |
|------|------|
| **GitHub** | PR 리뷰, 이슈 관리 |
| **Google Calendar** | 일정 확인, 미팅 알림 |
| **Gmail** | 중요 메일 알림 |
| **Slack** | 채널 관리, 메시지 검색 |
| **Notion** | 문서 관리 |
| **Linear** | 프로젝트·이슈 관리 |

<div class="tip-box">
<span class="tip-icon">💡</span>
<span><strong>한 가지씩 연결해</strong>: 처음부터 전부 연결하지 말고, 가장 필요한 도구 1~2개부터. 연결할수록 봇이 할 수 있는 일이 늘어나지만, 설정·관리도 늘어나니까.</span>
</div>

---

## 완료 체크리스트

### SOUL.md
- [ ] 봇에게 "자기소개 해봐" → 설정한 성격으로 답변
- [ ] 워크스페이스에 SOUL.md 파일 생성됨
- [ ] (보너스) 다른 팀원 봇과 같은 질문 → 다른 답변 확인

### IDENTITY.md + USER.md
- [ ] IDENTITY.md에 봇 이름, 역할, Slack Bot User ID 기록
- [ ] USER.md에 주인 정보 + 선호 기록

### MCP
- [ ] 외부 도구 1개 이상 MCP 연결 성공
- [ ] 봇에게 "내가 뭐 하는 사람이야?" → 데이터 기반 답변
- [ ] (보너스) "내 이번 주 이슈 뭐야?" → 연결된 도구에서 조회

---

> 🔗 **더 읽기**
> - 🐱 [SOUL.md의 비밀](https://bbojjak-viewer.vercel.app/lessons/lesson-02) — SOUL.md의 5가지 구성요소
> - 🐱 [뽀짝이는 어디에 살아요?](https://bbojjak-viewer.vercel.app/lessons/lesson-01) — USER.md의 위치와 역할
> - 🐱 [그 많은 정보를 다 기억해?](https://bbojjak-viewer.vercel.app/lessons/lesson-08) — MCP 데이터가 기억으로 연결되는 구조
