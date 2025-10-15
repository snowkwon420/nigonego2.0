# 리팩토링 작업 요약

## 1. API 설정 및 네트워크 문제 해결

### 문제점
- HTTPS/HTTP 혼합 콘텐츠 오류 발생
- 중복된 axios 인스턴스 존재
- 여러 API 파일에 중복 코드 산재

### 해결 방법
- 개발 환경에서 API URL을 HTTPS에서 HTTP로 변경
- `src/shared/lib/axios.tsx`에 단일 axios 인스턴스로 통합
- 중복된 API 파일 제거 및 통합

### 영향받은 파일
- `src/shared/lib/axios.tsx`
- 각 feature별 API 파일들 (authApi, feedApi, postApi, productApi 등)

---

## 2. 인증 시스템 디버깅

### 문제점
- 여러 atom store에 토큰이 분산 저장되어 동기화 문제 발생
- 로그인/회원가입 플로우에서 토큰 저장 실패
- 페이지 새로고침 시 인증 상태 유실

### 해결 방법
- `authTokenAtom`을 단일 토큰 저장소로 통합
- recoil-persist를 사용하여 localStorage에 토큰 영구 저장
- 모든 인증 관련 컴포넌트에서 동일한 atom 사용

### 영향받은 파일
- `src/features/auth/store.tsx`
- `src/features/auth/components/LoginContainer.tsx`
- `src/features/auth/components/JoinContainer.tsx`
- `src/features/auth/components/JoinMemberContainer.tsx`

---

## 3. HomeFeed 아키텍처 리팩토링

### 문제점
- 단일 컴포넌트에서 모든 피드 로직 처리
- 팔로우 상태에 따른 조건부 렌더링 복잡도 증가

### 해결 방법
- `HomeFeedEmpty`: 팔로우가 없을 때 표시되는 컴포넌트
- `HomeFeedWithPosts`: 팔로우가 있을 때 게시물을 표시하는 컴포넌트
- 팔로우 상태에 따라 조건부로 컴포넌트 렌더링

### 영향받은 파일
- `src/features/feed/components/HomeFeedEmpty.tsx` (신규)
- `src/features/feed/components/HomeFeedWithPosts.tsx` (신규)
- `src/pages/HomeFeed/HomeFeed.tsx`
- `src/features/feed/useFeedApi.tsx`
- `src/features/feed/feedApi.tsx`

---

## 4. PostMain 페이지 구조 개선

### 문제점
- 페이지 컴포넌트에 비즈니스 로직과 UI가 혼재
- 재사용성 낮음

### 해결 방법
- `PostMain`: 페이지 레이아웃만 담당
- `PostDetailContainer`: 게시물 상세 데이터 로딩 및 비즈니스 로직 처리
- Feature-based 아키텍처로 관심사 분리

### 영향받은 파일
- `src/pages/PostPage/PostMain/PostMain.tsx`
- `src/features/post/components/PostDetailContainer.tsx` (신규)
- `src/features/post/usePostApi.tsx`

---

## 5. PostUpload 버튼 활성화

### 문제점
- Header의 업로드 버튼이 PostUploadContainer의 폼 제출과 연결되지 않음
- 버튼 클릭 시 아무 동작도 하지 않음

### 해결 방법
- ref 콜백을 사용하여 Header 버튼과 폼 제출 연결
- `PostUploadContainer`에서 `onUploadClick` prop을 통해 제출 함수 전달
- Header에서 해당 함수를 버튼에 연결

### 영향받은 파일
- `src/features/post/components/PostUploadContainer.tsx`
- `src/shared/components/Header/Header.tsx`

---

## 6. Profile 및 Navigation 수정

### 문제점
- Navbar의 프로필 클릭 시 잘못된 경로로 이동
- MyProfile 페이지에서 데이터 로딩 실패
- 그리드 뷰 기능 동작하지 않음

### 해결 방법
- Navbar 프로필 링크를 올바른 경로로 수정
- ProfileEditContainer에서 데이터 페칭 로직 수정
- 그리드 뷰 상태 관리 및 렌더링 로직 개선

### 영향받은 파일
- `src/features/profile/components/ProfileEditContainer.tsx`
- Navigation 관련 컴포넌트들

---

## 7. 이미지 업로드 API 통합

### 문제점
- 여러 곳에서 이미지 업로드 로직 중복

### 해결 방법
- 중앙화된 이미지 업로드 API 함수 생성
- 에러 핸들링 통합
- 모든 업로드 기능에서 동일한 API 사용

### 영향받은 파일
- `src/features/product/productApi.tsx`
- `src/features/post/components/PostUploadContainer.tsx`

---

## 주요 개선 사항

### 아키텍처
- Feature-based 폴더 구조로 관심사 분리
- Page 컴포넌트와 Container 컴포넌트 명확히 구분
- 재사용 가능한 컴포넌트 구조

### 코드 품질
- 중복 코드 제거
- 단일 책임 원칙 적용
- 일관된 API 호출 패턴

### 사용자 경험
- 인증 상태 영구 저장으로 재로그인 불필요
- 네트워크 오류 해결로 안정적인 API 통신
- 직관적인 네비게이션 및 버튼 동작

---

## 다음 단계 제안

1. 에러 바운더리 추가로 전역 에러 처리 개선
2. 로딩 상태 UI 일관성 개선
3. TypeScript 타입 정의 강화
4. 테스트 코드 작성
5. 성능 최적화 (메모이제이션, 코드 스플리팅)
