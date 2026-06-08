# 니고네고 2.0 안정화 테스트 체크리스트

## 테스트 목적

Zustand 및 TanStack Query 마이그레이션 전, 현재 앱을 "측정 가능한 기준 상태"로 만드는 것이 목적이다.

이 문서는 단순 기능 체크리스트가 아니라 다음을 구분한다.

- 현재 자동/코드 기준으로 확인된 상태
- 브라우저에서 직접 확인해야 하는 상태
- 마이그레이션 전에 먼저 고쳐야 하는 안정화 이슈

## 테스트 메타

- 테스트 기준일: 2026-06-08
- 브랜치: `fix/stabilization`
- 로컬 서버: `http://localhost:3000`
- 테스트 환경: 로컬 개발 환경
- 자동 브라우저 테스트 상태: 보류

## 상태 표기

- `[PASS]`: 확인 완료
- `[FAIL]`: 실패 또는 코드상 실패가 확정된 항목
- `[HOLD]`: 실제 브라우저 조작, API 계정, 이미지 업로드 등 추가 확인 필요
- `[TODO]`: 아직 테스트하지 않음
- `[N/A]`: 현재 구현 범위 밖

---

## 1. 자동 확인 결과

| 항목 | 상태 | 메모 |
|---|---|---|
| TypeScript 타입 체크 | `[PASS]` | `npx tsc --noEmit` 통과 |
| 로컬 서버 응답 | `[PASS]` | `curl -I http://localhost:3000`에서 `200 OK` 확인 |
| 개발 서버 컴파일 | `[PASS]` | `npm start` 실행 및 컴파일 완료 |
| 개발 서버 ESLint 상태 | `[FAIL]` | unused 변수, hook dependency, `==` 사용 등 warning 다수 |
| 프로덕션 빌드 | `[PASS]` | 이전 확인 기준 `npm run build` 성공, warning 존재 |
| 브라우저 자동 클릭 테스트 | `[HOLD]` | 인앱 브라우저 연결 불가, Playwright 미설치 |

---

## 2. 현재 브랜치에서 진행 중이던 작업

| 파일 | 상태 | 내용 |
|---|---|---|
| `.vscode/settings.json` | `[HOLD]` | MCP 설정 변경. 앱 안정화와 직접 관련 낮음 |
| `src/features/auth/components/JoinContainer.tsx` | `[TODO]` | 회원가입 1단계 이메일 중복/검증 에러 처리 보강 중 |
| `TEST_CHECKLIST.md` | `[PASS]` | 안정화 기준 체크리스트로 재정리 |

---

## 3. 마이그레이션 전 우선 수정 이슈

### Critical

| ID | 상태 | 위치 | 문제 | 권장 작업 |
|---|---|---|---|---|
| C-01 | `[FAIL]` | `src/pages/ProductPage/ProductPage.tsx` | 상품 등록 헤더 버튼이 항상 비활성화됨. `isFormValid`가 `false`로 고정됨 | `ProductUploadContainer`의 폼 유효성 및 submit 핸들러를 `ProductPage` 헤더 버튼과 연결 |
| C-02 | `[FAIL]` | `src/features/product/components/ProductUploadContainer.tsx` | 상품 등록 form 내부 submit과 헤더의 "업로드" 버튼이 연결되지 않음 | `onSubmitRef` 또는 `onUploadClick` 패턴 적용 |
| C-03 | `[FAIL]` | `src/app/store/*`, `src/features/auth/store.tsx` | Recoil atom이 중복으로 존재하고 `authToken` key도 중복됨 | 마이그레이션 전에는 최소한 import 경로와 단일 source of truth 정리 |

### Major

| ID | 상태 | 위치 | 문제 | 권장 작업 |
|---|---|---|---|---|
| M-01 | `[FAIL]` | 여러 컴포넌트 | `console.log`, unused import/state가 다수 남아 있음 | 빌드 warning 제거 |
| M-02 | `[FAIL]` | 여러 `useEffect` | hook dependency warning 다수 | `useCallback`, 의존성 정리, 불필요한 effect 제거 |
| M-03 | `[FAIL]` | `src/shared/components/Header/Header.tsx` | `==` 사용 및 unused `handleBack` 존재 | `===` 변경 및 unused 코드 제거 |
| M-04 | `[FAIL]` | `src/features/product/components/ProductUploadContainer.tsx` | 이미지 업로드만 `fetch` 직접 호출, API 레이어와 불일치 | 일단 기능 복구 후 `useImageUpload`로 통합 |
| M-05 | `[HOLD]` | 인증 플로우 | 실제 로그인/회원가입 API 동작 확인 필요 | 테스트 계정으로 브라우저 수동 확인 |

### Minor

| ID | 상태 | 위치 | 문제 | 권장 작업 |
|---|---|---|---|---|
| m-01 | `[FAIL]` | `README.md` | 1.0 문서 내용이 많이 남아 있음 | 안정화 후 포트폴리오 README로 재작성 |
| m-02 | `[FAIL]` | `src/declarations.d.ts` 등 | `any` 일부 잔존 | 공통 타입 사용으로 점진 정리 |
| m-03 | `[FAIL]` | CRA 의존성 | CRA 미관리 경고 및 Babel dependency warning | 당장 기능 안정화 후 Vite 전환 여부 검토 |

---

## 4. 핵심 기능 체크리스트

### 4.1 앱 시작 및 로그인 메인

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/` 접근 시 앱이 렌더링됨 | `[HOLD]` | 브라우저 화면 확인 필요 |
| 스플래시 화면 표시 | `[HOLD]` | 브라우저 화면 확인 필요 |
| 스플래시 후 다음 화면 이동 | `[HOLD]` | 브라우저 화면 확인 필요 |
| 로그인 버튼 표시 및 `/login` 이동 | `[HOLD]` | 브라우저 클릭 확인 필요 |
| 회원가입 버튼 표시 및 `/join` 이동 | `[HOLD]` | 브라우저 클릭 확인 필요 |

### 4.2 회원가입 1단계

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| 빈 이메일/비밀번호에서 다음 버튼 비활성화 | `[HOLD]` | `/join`에서 UI 확인 |
| 잘못된 이메일 입력 시 에러 메시지 | `[HOLD]` | `test` 입력 |
| 올바른 이메일 입력 시 에러 메시지 제거 | `[HOLD]` | `test@example.com` 입력 |
| 6자 미만 비밀번호 입력 시 에러 메시지 | `[HOLD]` | `12345` 입력 |
| 유효한 이메일/비밀번호에서 다음 버튼 활성화 | `[HOLD]` | `test@example.com`, `password123` 입력 |
| 이미 가입된 이메일 에러 처리 | `[TODO]` | 실제 API 응답 확인 필요 |
| 다음 클릭 시 `/joinmember` 이동 | `[TODO]` | 실제 API 응답 확인 필요 |

### 4.3 회원가입 2단계

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| 기본 프로필 이미지 표시 | `[HOLD]` | `/joinmember` 직접 접근 또는 1단계 통과 |
| 사용자 이름 2-10자 검증 | `[HOLD]` | 브라우저 입력 확인 |
| 계정 ID 형식 검증 | `[HOLD]` | `test@user` 입력 |
| 계정 ID 중복 확인 | `[TODO]` | 실제 API 응답 확인 필요 |
| 이미지 업로드 및 미리보기 | `[TODO]` | 파일 업로드 필요 |
| 회원가입 완료 후 로그인 페이지 이동 | `[TODO]` | 실제 계정 생성 여부 확인 필요 |

### 4.4 로그인

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/login` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| 빈 입력에서 로그인 버튼 비활성화 | `[HOLD]` | 브라우저 화면 확인 |
| 이메일/비밀번호 형식 검증 | `[HOLD]` | 브라우저 입력 확인 |
| 테스트 계정 로그인 성공 | `[TODO]` | `nigonego@test.com / 123123` 확인 |
| 로그인 성공 후 `/homefeed` 이동 | `[TODO]` | 실제 로그인 필요 |
| 토큰 localStorage 저장 | `[TODO]` | 실제 로그인 후 DevTools 또는 자동화 확인 |
| 새로고침 후 로그인 상태 유지 | `[TODO]` | 실제 로그인 후 확인 |

### 4.5 홈 피드

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/homefeed` 접근 가능 | `[TODO]` | 로그인 후 확인 권장 |
| 팔로잉 없을 때 빈 상태 표시 | `[TODO]` | 테스트 계정 상태 필요 |
| 피드 게시물 목록 표시 | `[TODO]` | 테스트 계정 상태 필요 |
| 무한 스크롤 추가 로드 | `[TODO]` | 브라우저 스크롤 확인 |
| 좋아요 클릭 반영 | `[TODO]` | 실제 API mutation 확인 |
| 댓글 아이콘에서 상세 페이지 이동 | `[TODO]` | 브라우저 클릭 확인 |
| 검색 버튼 이동 | `[HOLD]` | 브라우저 클릭 확인 |
| 하단 네비게이션 이동 | `[HOLD]` | 브라우저 클릭 확인 |

### 4.6 게시물 작성

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/postupload` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| 내용/이미지 없을 때 업로드 버튼 비활성화 | `[HOLD]` | 브라우저 화면 확인 |
| 텍스트 입력 반영 | `[HOLD]` | 브라우저 입력 확인 |
| 이미지 업로드 및 미리보기 | `[TODO]` | 파일 업로드 필요 |
| 업로드 버튼과 submit 연결 | `[HOLD]` | 코드/브라우저 확인 필요 |
| 업로드 성공 후 홈 피드 이동 | `[TODO]` | 실제 API 요청 필요 |

### 4.7 상품 등록

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/product` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| 상품 이미지 업로드 버튼 표시 | `[HOLD]` | 브라우저 화면 확인 |
| 상품명/가격/판매 링크 입력란 표시 | `[HOLD]` | 브라우저 화면 확인 |
| 모든 필수 입력 후 헤더 버튼 활성화 | `[FAIL]` | 현재 `ProductPage`에서 `isFormValid`가 항상 `false` |
| 헤더 "업로드" 버튼 클릭 시 상품 등록 | `[FAIL]` | 현재 헤더 버튼과 form submit 미연결 |
| 등록 성공 후 `/myprofile` 이동 | `[TODO]` | C-01, C-02 수정 후 확인 |
| 등록 실패 시 사용자 피드백 표시 | `[FAIL]` | 현재 `console.error`만 존재 |

### 4.8 게시물 상세 및 댓글

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/postmain` 접근 가능 | `[TODO]` | 실제 게시물 id/상태 필요 |
| 게시물 정보 표시 | `[TODO]` | 실제 데이터 필요 |
| 좋아요 추가/취소 | `[TODO]` | 실제 API 요청 필요 |
| 댓글 목록 표시 | `[TODO]` | 실제 데이터 필요 |
| 댓글 작성 및 목록 갱신 | `[TODO]` | 실제 API 요청 필요 |

### 4.9 프로필

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/myprofile` 접근 가능 | `[TODO]` | 로그인 후 확인 |
| 내 프로필 정보 표시 | `[TODO]` | 실제 API 데이터 필요 |
| 프로필 수정 페이지 이동 | `[TODO]` | 브라우저 클릭 확인 |
| 프로필 수정 저장 | `[TODO]` | 실제 API 요청 필요 |
| 다른 사용자 프로필 표시 | `[TODO]` | 검색/계정 상태 필요 |
| 팔로우/언팔로우 | `[TODO]` | 실제 API 요청 필요 |

### 4.10 검색

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/search` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| 검색 입력창 표시 | `[HOLD]` | 브라우저 화면 확인 |
| 검색 결과 사용자 목록 표시 | `[TODO]` | 실제 API 요청 필요 |
| 사용자 클릭 시 프로필 이동 | `[TODO]` | 브라우저 클릭 확인 |

### 4.11 채팅

| 항목 | 상태 | 확인 방법 |
|---|---|---|
| `/chat` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| `/chat/chatroom` 접근 가능 | `[HOLD]` | 브라우저 화면 확인 |
| 실제 메시지 송수신 | `[N/A]` | 현재 구현 중으로 분류 |

---

## 5. 성능 측정 전 준비 체크

| 항목 | 상태 | 메모 |
|---|---|---|
| 빌드 성공 상태 확보 | `[PASS]` | warning은 남아 있음 |
| 타입 체크 통과 | `[PASS]` | `npx tsc --noEmit` 통과 |
| 핵심 기능 수동 테스트 완료 | `[TODO]` | 브라우저 테스트 필요 |
| Critical 이슈 제거 | `[FAIL]` | 상품 등록, store 중복 정리 필요 |
| ESLint warning 감소 | `[FAIL]` | 현재 warning 다수 |
| 테스트 계정 로그인 가능 확인 | `[TODO]` | 실제 브라우저/API 확인 필요 |
| Lighthouse baseline 측정 | `[TODO]` | 기능 안정화 후 측정 |
| React Profiler baseline 측정 | `[TODO]` | 기능 안정화 후 측정 |
| bundle size 기록 | `[TODO]` | `npm run build` 결과 기록 |

---

## 6. 다음 작업 순서

1. `ProductPage`와 `ProductUploadContainer`의 업로드 버튼 연결 문제 수정
2. 상품 등록 validation과 사용자 피드백 정리
3. `JoinContainer`의 이메일 중복 검증 에러 처리 마무리
4. `console.log`, unused import/state, `==` warning 제거
5. 중복 Recoil atom 정리
6. 브라우저에서 로그인, 회원가입, 상품 등록, 게시물 작성 핵심 플로우 확인
7. Lighthouse, React Profiler, bundle size baseline 기록
8. 이후 Zustand 및 TanStack Query 마이그레이션 진행

---

## 7. 브라우저 테스트 보류 사유

- 로컬 개발 서버는 정상 응답했다.
- 현재 세션에서 인앱 브라우저가 연결되지 않았다.
- 프로젝트에 Playwright 또는 `@playwright/test`가 설치되어 있지 않았다.

브라우저 자동화를 진행하려면 다음 중 하나가 필요하다.

- 인앱 브라우저 연결이 가능한 세션에서 재시도
- `@playwright/test` 설치 후 E2E 테스트 작성
- 사용자가 직접 브라우저를 열고, 이 문서 기준으로 수동 체크

---

## 8. 테스트 완료 기준

마이그레이션 전 baseline으로 인정하려면 최소한 아래 항목을 만족해야 한다.

- `[PASS]` `npx tsc --noEmit`
- `[PASS]` `npm run build`
- `[PASS]` 로그인
- `[PASS]` 회원가입 validation
- `[PASS]` 홈 피드 접근
- `[PASS]` 게시물 작성
- `[PASS]` 상품 등록
- `[PASS]` 프로필 조회
- `[PASS]` 주요 navigation
- `[PASS]` Critical 이슈 0개

현재 상태는 baseline 측정 전 안정화 단계다.
