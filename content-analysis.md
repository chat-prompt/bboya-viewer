# 서재 콘텐츠 분석

> 생성일: 2026-03-31
> 목적: 각 글의 핵심 주제, 레벨, 선수 지식, 키워드, 독자 가치, 내용 겹침 분석

---

## 봇키우기교실 (notes/)

### bot-school-01-security.md
- **핵심 주제**: 멀티봇 환경에서 에이전트 보안 설정 3단계 — AGENTS.md 소프트 보안, dmPolicy, exec 보안
- **레벨**: 입문
- **선수 지식**: OpenClaw 기본 설치 완료, AGENTS.md 파일의 존재를 아는 정도
- **키워드**: AGENTS.md 보안, 발신자 ID, dmPolicy, allowlist, exec security, Stable ID
- **독자에게 주는 것**: 에이전트에 최소 보안을 설정하고, "누구의 말을 들어야 하는지"를 명시하는 방법을 알게 됨
- **내용 겹침**: guide-02-armor.md (보안 3단계)와 핵심 내용 상당 부분 겹침 — 교실편은 에피소드 중심, 가이드편은 체계적 설정 중심

### bot-school-02-memory.md
- **핵심 주제**: LLM 에이전트의 메모리 관리 체계 — 파일 기반 기억 구조 (MEMORY.md/memory/날짜.md/learnings/), 세션 관리, 자동 주입
- **레벨**: 입문~중급
- **선수 지식**: 워크스페이스 폴더 개념, 세션이 뭔지 기본 이해
- **키워드**: MEMORY.md, memory/YYYY-MM-DD.md, learnings/, memory_search, compaction, 세션 자동 정리, h2 제목 구체화, 문서 레이어
- **독자에게 주는 것**: 메모리 폴더 구조를 만들고, 일일 기록/장기 기억/교훈을 분리 관리하는 체계를 구축할 수 있음. "한 가지 정보는 한 곳에만" 원칙 체득
- **내용 겹침**: guide-01-workspace.md (메모리 기본 개념), guide-04-teamwork.md (메모리 3단 구조 실습)과 겹침 — 교실편이 가장 상세하고 공식 가이드까지 포함

### bot-school-03-skills.md
- **핵심 주제**: 클로드 코드 스킬을 OpenClaw 에이전트가 공유하는 방법 — extraDirs 설정, 글로벌 vs 개인 폴더, 스킬 매칭 원리
- **레벨**: 입문~중급
- **선수 지식**: OpenClaw 에이전트 실행 중, 스킬(SKILL.md)의 존재를 아는 정도
- **키워드**: extraDirs, skills.load, watch, 글로벌 폴더, 워크스페이스 폴더, 스킬 매칭, description 매칭, SKILL.md
- **독자에게 주는 것**: 여러 에이전트가 하나의 스킬 생태계를 공유하는 설정을 할 수 있음. 스킬 매칭이 description만 스캔한다는 원리 이해
- **내용 겹침**: guide-04-teamwork.md (스킬 만들기, 글로벌 폴더)와 부분 겹침 — 교실편이 extraDirs 설정에 더 상세

### bot-school-04-identity.md
- **핵심 주제**: SOUL.md/IDENTITY.md/USER.md 3개 파일로 에이전트 정체성 설계 — 관계 정의, 금지 규칙, 3일 법칙, AGENTS.md 역할
- **레벨**: 입문~중급
- **선수 지식**: 워크스페이스 파일 구조 기본 이해
- **키워드**: SOUL.md, IDENTITY.md, USER.md, AGENTS.md, 관계 정의, 미션, 추상적 형용사 vs 행동 지침, 3일 법칙, 자동 주입, 파일 크기 제한, 워크스페이스 파일 레이어
- **독자에게 주는 것**: SOUL.md를 "빨리 시작해서 고쳐쓰기" 전략으로 작성할 수 있음. AGENTS.md와 SOUL.md의 역할 차이를 이해하고, 워크스페이스 전체 파일 구조를 설계할 수 있음
- **내용 겹침**: guide-01-workspace.md (핵심 파일 5개), guide-03-soul.md (SOUL.md 만들기)와 상당 부분 겹침. guide-02-armor.md (AGENTS.md 보안/호명)와도 겹침. 이 글이 가장 포괄적 — 가이드 1~3편의 내용을 대부분 포함

### bot-school-05-multi-agent.md
- **핵심 주제**: 에이전트 분리 시점, 멀티에이전트 셋업 방법, sessions_send 통신, 실전 주의사항 4가지 (크론 폭탄, 역할 경계, 문서 레이어, 장애 대행)
- **레벨**: 중급
- **선수 지식**: 단일 에이전트 운영 경험, 워크스페이스 구조, SOUL.md/AGENTS.md 이해
- **키워드**: 멀티에이전트, sessions_send, 역할 분리, delivery=none, 크론 통합 브리핑, 역할 경계 테스트, shared/team, 장애 대행, openclaw agents add, mentionPatterns
- **독자에게 주는 것**: 두 번째 에이전트를 만들고, 봇끼리 소통 규칙을 설계하고, 비용/역할/보고 체계를 갖출 수 있음
- **내용 겹침**: guide-04-teamwork.md (멀티에이전트 섹션), 01-internal-call.md (sessions_send), bot-school-08-slack-coexistence.md (호명규칙)와 부분 겹침

### bot-school-06-model-allocation.md
- **핵심 주제**: 에이전트별/작업별 LLM 모델 배분 전략 — Opus vs Sonnet 비용 최적화, 4가지 설정 방법, 문서-실제 불일치 교훈
- **레벨**: 중급
- **선수 지식**: 멀티에이전트 운영 중, Opus/Sonnet 모델 차이 인지, openclaw.json 설정 경험
- **키워드**: 모델 배분, Opus, Sonnet, 비용 최적화, openclaw.json model, 크론잡 모델, sessions_spawn model, /model 커맨드, 빈도×복잡도
- **독자에게 주는 것**: 역할/작업 유형에 따른 모델 배분 전략을 세우고, 4가지 방법으로 실제 설정할 수 있음. "문서가 실제와 다르면 봇도 틀린다"는 교훈
- **내용 겹침**: bot-school-05-multi-agent.md의 모델 배분 섹션과 부분 겹침 (이 글이 더 상세)

### bot-school-07-onboarding.md
- **핵심 주제**: 새 에이전트가 기존 네트워크에 합류할 때의 온보딩 프로세스 — 양방향 소개, memory 기록, 능력 매핑, 채널별 맥락
- **레벨**: 중급
- **선수 지식**: 멀티에이전트 개념, memory 파일 체계, Slack 채널 운영
- **키워드**: 온보딩, 양방향 소개, 능력 매핑, memory 기록, 채널별 맥락, 네트워크 맵, 신생아 불안정성, 3일 법칙
- **독자에게 주는 것**: 새 에이전트를 기존 팀에 합류시키는 5단계 온보딩 프로세스를 따라 할 수 있음. API 연동 vs 맥락 연동의 차이를 이해
- **내용 겹침**: guide-04-teamwork.md (멀티에이전트 탄생기)와 부분 겹침, 01-founding-day.md (창단일 온보딩)와 실제 사례가 겹침

### bot-school-08-slack-coexistence.md
- **핵심 주제**: Slack 채널에 봇 여러 마리가 공존하기 위한 설정 — requireMention, mentionPatterns, AGENTS.md 호명규칙, 봇 간 투명 대화
- **레벨**: 중급
- **선수 지식**: Slack 앱 설정 완료, 멀티에이전트 운영 중, openclaw.json 편집 경험
- **키워드**: requireMention, mentionPatterns, 호명규칙, NO_REPLY, allowBots, accountId, Slack 멀티봇, 무한루프 방지
- **독자에게 주는 것**: 같은 Slack 채널에서 여러 봇이 충돌 없이 공존하는 설정을 완성할 수 있음
- **내용 겹침**: guide-02-armor.md (호명규칙 3레이어)와 핵심 내용 겹침. bot-school-05-multi-agent.md (그룹챗 라우팅)과도 겹침. 교실편이 Slack 특화, 가이드편이 범용적

### bot-school-09-dashboard.md
- **핵심 주제**: sessions_send 대화가 사람에게 안 보이는 문제 해결 — 대시보드 제작 가이드, 데이터 소스, SSE 기반, Tailscale 원격 접속
- **레벨**: 중급
- **선수 지식**: 멀티에이전트 운영 중, sessions_send 사용 경험, Node.js 기본, (선택) Tailscale 개념
- **키워드**: 대시보드, sessions_send, SSE, Express, sessions.json, messages.jsonl, jobs.json, Tailscale, launchd, 크론잡 모니터링
- **독자에게 주는 것**: 봇에게 요청해서 로컬 대시보드를 만들 수 있음. 밖에서도 Tailscale로 접속하는 설정을 할 수 있음. 대시보드 없이 보고 규칙만으로 시작하는 방법도 제시
- **내용 겹침**: guide-04-teamwork.md (대시보드 섹션)와 부분 겹침 — 교실편이 훨씬 상세

### bot-school-11-session.md
- **핵심 주제**: 세션 개념을 카톡 채팅방에 비유해 설명 — DM/채널/스레드별 세션 분리, 활성 세션 관리, 파일 기반 기억의 중요성
- **레벨**: 입문
- **선수 지식**: OpenClaw 기본 사용 경험 (DM으로 봇과 대화해본 정도)
- **키워드**: 세션, DM, 채널, 스레드, 세션 분리, 파일 기억, 활성 세션, 세션 리셋, 크론 세션
- **독자에게 주는 것**: 세션 개념을 직관적으로 이해하고, "왜 다른 채널에서 말한 걸 기억 못 하는지"를 설명할 수 있음. 활성 세션 정리의 필요성을 인지
- **내용 겹침**: guide-01-workspace.md (세션 = 카톡 채팅방)와 핵심 비유 동일. bot-school-02-memory.md (세션 관리 설정)와 부분 겹침

---

## 가이드 (guides/)

### guide-01-workspace.md
- **핵심 주제**: 워크스페이스 구조와 핵심 파일 5개 (SOUL/USER/AGENTS/MEMORY/IDENTITY), 세션 개념 소개
- **레벨**: 입문 (시리즈 1편 — 기초 개념)
- **선수 지식**: OpenClaw 설치 완료, 봇과 DM 대화 가능한 상태
- **키워드**: 워크스페이스, 핵심 파일 5개, SOUL.md, USER.md, AGENTS.md, MEMORY.md, IDENTITY.md, 세션, 파일 기반 기억
- **독자에게 주는 것**: 워크스페이스 폴더 구조를 이해하고, 5개 핵심 파일의 역할을 구분할 수 있음. "파일에 안 쓰면 기억 못 한다"는 핵심 원리를 체득
- **내용 겹침**: bot-school-04-identity.md (핵심 파일 설명), bot-school-11-session.md (세션 비유), bot-school-02-memory.md (메모리 개념)와 겹침. 가이드가 더 간결하고 체계적

### guide-02-armor.md
- **핵심 주제**: 봇을 팀 채널에 데려가기 전 필수 설정 — 보안 3단계, 호명규칙 3레이어, 스레드 규칙, 봇 간 대화 제한, 채널 허용
- **레벨**: 입문~중급 (시리즈 2편 — 설정 실습)
- **선수 지식**: guide-01 워크스페이스/파일 구조 이해, openclaw.json 편집 가능
- **키워드**: 소프트 보안, 하드 보안, dmPolicy, exec security, requireMention, mentionPatterns, 호명규칙 3레이어, 스레드 답변, 2턴 제한, groupPolicy, allowlist
- **독자에게 주는 것**: 11개 온보딩 체크리스트를 완료하면 봇이 팀 채널에 안전하게 나갈 준비가 됨. 최소 설정 템플릿(복붙 가능)도 제공
- **내용 겹침**: bot-school-01-security.md (보안 3단계), bot-school-08-slack-coexistence.md (호명규칙, requireMention)와 핵심 내용 겹침. 가이드가 더 구조화되어 있고 체크리스트 제공

### guide-03-soul.md
- **핵심 주제**: SOUL.md를 대화로 만드는 실습, MCP로 외부 도구 연결, USER.md 자동 생성
- **레벨**: 입문~중급 (시리즈 3편 — 정체성 부여)
- **선수 지식**: guide-01/02 완료 (워크스페이스+보안 설정), 봇과 DM 대화 경험
- **키워드**: SOUL.md 대화형 작성, IDENTITY.md, USER.md, MCP, Linear, 외부 도구 연결, Syncthing, 미션, 성격, 말투
- **독자에게 주는 것**: 봇과 대화하면서 SOUL.md를 만드는 5단계를 경험할 수 있음. MCP로 외부 도구를 1개 이상 연결하고, 데이터 기반 USER.md를 자동 생성할 수 있음
- **내용 겹침**: bot-school-04-identity.md (SOUL.md/USER.md/IDENTITY.md 설명)와 상당 부분 겹침. 교실편이 원리/팁 중심, 가이드편이 실습/따라하기 중심

### guide-04-teamwork.md
- **핵심 주제**: 멀티에이전트 협업, 스킬 만들기, 메모리 관리 실습, 크론잡 자동화 — 봇을 팀원으로 만드는 마지막 단계
- **레벨**: 중급 (시리즈 4편 — 확장)
- **선수 지식**: guide-01~03 완료 (워크스페이스+보안+정체성), 단일 에이전트 운영 경험
- **키워드**: 멀티에이전트, sessions_send, 봇 동생 만들기, 대시보드, 스킬, extraDirs, 메모리 3단 구조, 크론잡, 하트비트, 모닝 브리핑
- **독자에게 주는 것**: 봇에게 "동생 만들어줘"로 새 에이전트를 만들고, 스킬/메모리/크론 자동화까지 설정할 수 있음. 트러블슈팅 가이드와 실전 에피소드(뽀피터스 탄생기) 포함
- **내용 겹침**: bot-school-05-multi-agent.md (멀티에이전트 설계), bot-school-03-skills.md (스킬 공유), bot-school-02-memory.md (메모리 관리), bot-school-09-dashboard.md (대시보드)와 광범위하게 겹침. 가이드가 워크숍 실습용으로 간결하게 정리

---

## 팀 아카데미 (academy/)

### 01-internal-call.md
- **핵심 주제**: 뽀피터스 팀 인프라 구축기 — sessions_send 발견, allowBots+requireMention 설정, 3대 머신 문서 동기화(심링크→Git)
- **레벨**: 중급~심화
- **선수 지식**: 멀티에이전트 운영 경험, sessions_send 개념, Slack 봇 설정, Git 기본
- **키워드**: sessions_send, allowBots, requireMention, 심볼릭 링크, Git 동기화, shared/team, 3대 머신, 타임아웃
- **독자에게 주는 것**: 분산 멀티에이전트 환경(여러 머신)에서 통신/문서 동기화를 구축하는 실전 과정을 이해할 수 있음
- **내용 겹침**: bot-school-05-multi-agent.md (sessions_send, 멀티에이전트), bot-school-08-slack-coexistence.md (allowBots)와 겹치지만, 아카데미편은 "뽀피터스 팀의 실제 삽질 기록"에 초점

### 02-team-rules-born.md
- **핵심 주제**: 팀 운영 규칙이 실전에서 만들어지는 과정 — 사관학교 채널, allowBots 전원 적용, 공용 스킬 Git 공유, 통신 규칙 전환, 오케스트레이션 프로토콜
- **레벨**: 중급~심화
- **선수 지식**: 01-internal-call.md 내용, allowBots/requireMention 이해, Git 기본
- **키워드**: 사관학교, allowBots 4마리, 공용 스킬, Git 레포, sessions_send→Slack 전환, 오케스트레이션 프로토콜, 상태 태그, TASK-BOARD.md, anti-drop guard
- **독자에게 주는 것**: 멀티에이전트 팀의 운영 규칙을 0에서 세우는 과정을 관찰하고, 7개 규칙의 설계 근거를 이해할 수 있음. "못 한다 전에 방법 먼저 찾기" 교훈
- **내용 겹침**: 01-internal-call.md의 직접 후속편. bot-school-03-skills.md (스킬 공유)와 부분 겹침

### 03-rules-forged-in-fire.md
- **핵심 주제**: 만들어둔 규칙이 실전에서 깨지고 고쳐지는 과정 — 새 팀원 온보딩, 양육자-봇 관계, sessions_send 반복 실수, 459건 문자 발송 사고
- **레벨**: 중급~심화
- **선수 지식**: 02-team-rules-born.md 내용, 멀티에이전트 팀 운영 경험
- **키워드**: 온보딩 문서화, 양육자 구조, sessions_send 습관 실수, 459건 발송 사고, {{name}} 미치환, 도구 자체 수정, learnings
- **독자에게 주는 것**: "규칙은 만들 때 완성되는 게 아니라 실전에서 깨질 때 완성된다"는 교훈을 실제 사고 사례로 체감. "다시는 안 나게 도구 자체를 고친다"는 사고 대응 패턴
- **내용 겹침**: 02-team-rules-born.md의 직접 후속편. bot-school-07-onboarding.md (온보딩)와 부분 겹침

---

## 훈련일지 (training/)

### 01-founding-day.md
- **핵심 주제**: 뽀피터스 창단일 기록 — 4남매 첫 집합, 봇 간 대화 테스트, 사관학교 기획, 프로필 이미지 제작, 캐릭터 발견
- **레벨**: 입문 (읽기 쉬운 이야기)
- **선수 지식**: 봇이 뭔지 기본 이해 정도 (기술적 선수 지식 거의 불필요)
- **키워드**: 뽀피터스 창단, allowBots, requireMention, 릴레이 멘션 테스트, 사관학교, 양육자 ID vs 봇 ID, SOUL.md 셀프 수정, 프로필 이미지
- **독자에게 주는 것**: 멀티에이전트 팀이 실제로 어떻게 형성되는지를 생생한 에피소드로 경험. allowBots+requireMention의 실전 적용 사례
- **내용 겹침**: 01-internal-call.md (봇 간 대화 테스트), bot-school-08-slack-coexistence.md (allowBots 설정)와 사례 수준 겹침

### 02-awesome-openclaw-roadmap.md
- **핵심 주제**: 외부 커뮤니티 사례(awesome-openclaw-usecases) 42개 분석 → 팀에 적용할 4개 선별 → 4단계 로드맵 기획
- **레벨**: 심화
- **선수 지식**: 멀티에이전트 팀 운영 경험, 오케스트레이션 프로토콜 이해, 크론잡/메모리/스킬 체계 전반 이해
- **키워드**: awesome-openclaw-usecases, 모닝 브리핑, 데일리 다이제스트, TASK-BOARD 반자동화, 시맨틱 메모리 검색, Phase 로드맵, 선별 기준, 기대효과
- **독자에게 주는 것**: 외부 사례를 분석→필터링→로드맵화하는 기획 프로세스를 배울 수 있음. "안 하는 것과 그 이유"를 명시하는 의사결정 패턴
- **내용 겹침**: 독립적인 기획 문서로 다른 글과 직접적 겹침은 적음. bot-school-02-memory.md (시맨틱 검색), bot-school-09-dashboard.md (모니터링)의 확장 버전 개념

---

## 시리즈별 요약

### 봇키우기교실 (10편)
- **대상**: OpenClaw 초보~중급 사용자
- **특징**: 다지동산 에피소드 + 공식 가이드 + 따라하기 체크리스트. 각 편이 독립적으로 읽을 수 있지만 순서대로 읽으면 단계적 학습 가능
- **커버리지**: 보안 → 메모리 → 스킬 → 정체성 → 멀티에이전트 → 모델배분 → 온보딩 → Slack공존 → 대시보드 → 세션

### 가이드 (4편)
- **대상**: 워크숍 참가자 (실습 중심)
- **특징**: 1편→2편→3편→4편 순서 의존성 있음. 복붙 템플릿 + 체크리스트 + 뽀짝이 서재 링크 포함
- **커버리지**: 기초개념 → 보안/호명 → 정체성/MCP → 멀티에이전트/자동화

### 팀 아카데미 (3편)
- **대상**: 멀티에이전트 팀 운영에 관심 있는 중급~심화 독자
- **특징**: 뽀피터스 팀의 실제 운영 기록. 삽질→교훈 패턴. 시간순 연속 시리즈
- **커버리지**: 인프라 구축 → 규칙 수립 → 실전 검증/수정

### 훈련일지 (2편)
- **대상**: 뽀피터스 팀 활동에 관심 있는 독자 (레벨 무관)
- **특징**: 팀 활동의 날것 기록. 에피소드 중심
- **커버리지**: 창단일 이벤트 → 로드맵 기획

---

## 주요 내용 겹침 지도

| 주제 | 교실편 | 가이드편 | 아카데미편 | 훈련일지 |
|------|--------|---------|-----------|---------|
| **보안** | 01 | 02 | — | — |
| **메모리** | 02 | 01, 04 | — | — |
| **스킬 공유** | 03 | 04 | 02 | — |
| **정체성 (SOUL/USER)** | 04 | 01, 03 | — | — |
| **멀티에이전트** | 05 | 04 | 01, 02 | 01 |
| **모델 배분** | 06 | — | — | — |
| **온보딩** | 07 | — | 03 | 01 |
| **Slack 공존** | 08 | 02 | 01 | 01 |
| **대시보드** | 09 | 04 | — | — |
| **세션** | 11 | 01 | — | — |
| **팀 규칙 수립** | — | — | 02, 03 | — |
| **로드맵 기획** | — | — | — | 02 |

> **겹침 패턴**: 교실편은 "원리+에피소드", 가이드편은 "실습+체크리스트", 아카데미편은 "실전 삽질 기록". 같은 주제를 다른 깊이와 관점으로 다루므로, 시리즈 간 크로스 링크가 유효함.
