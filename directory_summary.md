# 프로젝트 디렉토리 구조 및 역할 설명

## 📁 프로젝트 개요

니고네고(NigoNego) - React + TypeScript 기반의 소셜 커머스 플랫폼
사용자들이 게시물을 공유하고, 상품을 판매하며, 소통할 수 있는 SNS 애플리케이션

---

## 🏗️ 전체 디렉토리 구조

```
src/
├── app/              # 애플리케이션 설정 및 전역 관리
├── features/         # 기능별 모듈 (Feature-based Architecture)
├── pages/            # 페이지 컴포넌트 (라우팅 단위)
├── shared/           # 공통 리소스 및 유틸리티
└── store/            # 레거시 store (사용 중단 예정)
```

---

## 📂 1. app/ - 애플리케이션 코어

애플리케이션의 전역 설정, 라우팅, 스타일을 관리하는 디렉토리

### 1.1 app/layout/
**역할:** 애플리케이션의 최상위 레이아웃 컴포넌트

**파일:**
- `RootLayout.tsx` - 앱의 루트 컴포넌트
  - RecoilRoot로 전역 상태 관리 제공
  - GlobalStyle 적용
  - 최대 너비 430px의 모바일 중심 레이아웃
  - 반응형 디자인을 위한 컨테이너

### 1.2 app/router/
**역할:** 애플리케이션의 라우팅 설정

**파일:**
- `Routing.tsx` - React Router 기반 라우팅 설정
  - 모든 페이지 경로 정의
  - 인증, 피드, 프로필, 게시물, 상품, 채팅 등 라우트 관리

**주요 라우트:**
```
/ - 스플래시 화면
/login - 로그인
/join - 회원가입 (이메일/비밀번호)
/joinmember - 회원가입 (프로필 설정)
/homefeed - 홈 피드
/myprofile - 내 프로필
/profileedit - 프로필 수정
/yourprofile - 다른 사용자 프로필
/postupload - 게시물 작성
/postmain - 게시물 상세
/product - 상품 페이지
/chat - 채팅 목록
/search - 검색
```

### 1.3 app/store/
**역할:** 레거시 Recoil atom 저장소 (현재는 features/auth/store.tsx로 통합됨)

**파일:**
- `authToken.ts` - 인증 토큰 atom (레거시)
- `accountName.ts` - 계정명 atom (레거시)
- `isLogin.ts/tsx` - 로그인 상태 atom (레거시)
- `atomYourAccount.ts` - 다른 사용자 계정 atom
- `atoms.ts` - 기타 atom 정의

**참고:** 새로운 코드는 `features/auth/store.tsx` 사용 권장

### 1.4 app/styles/
**역할:** 전역 스타일 및 테마 관리

**파일:**
- `globalstyle.ts` - 전역 CSS 리셋 및 기본 스타일
- `maincolor.ts` - 컬러 팔레트 정의
- `BodyGlobal.tsx` - 페이지 본문 공통 스타일 컴포넌트
- `MainGlobal.tsx` - 메인 컨테이너 스타일 컴포넌트
- `Layout.tsx` - 레이아웃 관련 스타일

---

## 📂 2. features/ - 기능별 모듈

Feature-based Architecture를 따르는 핵심 비즈니스 로직 디렉토리
각 기능은 독립적인 모듈로 구성되어 있으며, API, Hook, 컴포넌트를 포함

### 2.1 features/auth/ - 인증 기능
**역할:** 로그인, 회원가입, 사용자 인증 관리

**구조:**
```
auth/
├── components/          # 인증 관련 UI 컴포넌트
│   ├── LoginContainer.tsx
│   ├── JoinContainer.tsx
│   └── JoinMemberContainer.tsx
├── authApi.tsx         # 인증 API 함수
├── useAuthApi.tsx      # 인증 API Hook
└── store.tsx           # 인증 상태 관리 (Recoil)
```

**주요 기능:**
- **authApi.tsx**
  - `postLogin()` - 로그인 요청
  - `postJoin()` - 이메일 유효성 검사
  - `postJoinMember()` - 회원가입 요청
  - `getUserInfo()` - 사용자 정보 조회

- **useAuthApi.tsx**
  - authApi를 Hook으로 래핑
  - 토큰 자동 주입

- **store.tsx**
  - `authTokenAtom` - 인증 토큰 (localStorage 영구 저장)
  - `accountNameAtom` - 계정명
  - `isLoginAtom` - 로그인 상태

- **LoginContainer.tsx**
  - 이메일/비밀번호 입력 및 검증
  - 로그인 처리
  - 토큰 저장 및 리다이렉션

- **JoinContainer.tsx**
  - 이메일/비밀번호 입력 및 검증
  - 이메일 중복 확인
  - 다음 단계로 이동

- **JoinMemberContainer.tsx**
  - 프로필 정보 입력 (사용자명, 계정ID, 소개, 이미지)
  - 계정 ID 중복 확인
  - 회원가입 완료

### 2.2 features/feed/ - 피드 기능
**역할:** 홈 피드, 게시물 목록 관리

**구조:**
```
feed/
├── components/
│   ├── HomeFeedEmpty.tsx       # 팔로우 없을 때
│   ├── HomeFeedWithPosts.tsx   # 게시물 목록
│   └── HomePost/               # 개별 게시물 컴포넌트
├── feedApi.tsx
└── useFeedApi.tsx
```

**주요 기능:**
- **feedApi.tsx**
  - `getHomeFeed(limit, skip)` - 페이지네이션 피드 조회
  - `getFullFeed()` - 전체 피드 조회

- **HomeFeedWithPosts.tsx**
  - 무한 스크롤 구현
  - 게시물 목록 렌더링
  - 로딩 상태 관리
  - 빈 상태 처리

### 2.3 features/post/ - 게시물 기능
**역할:** 게시물 작성, 조회, 좋아요 관리

**구조:**
```
post/
├── components/
│   ├── PostDetailContainer.tsx  # 게시물 상세
│   └── PostUploadContainer.tsx  # 게시물 작성
├── postApi.tsx
└── usePostApi.tsx
```

**주요 기능:**
- **postApi.tsx**
  - `postPostUpload()` - 게시물 작성
  - `getUserData()` - 게시물 상세 조회
  - `getPostListLimit()` - 사용자 게시물 목록
  - `postHeart()` - 좋아요
  - `deleteHeart()` - 좋아요 취소

- **PostDetailContainer.tsx**
  - 게시물 상세 정보 표시
  - 댓글 목록 표시
  - 댓글 작성 인터페이스

- **PostUploadContainer.tsx**
  - 게시물 내용 입력
  - 이미지 업로드
  - 유효성 검증
  - Header 버튼과 연동

### 2.4 features/comment/ - 댓글 기능
**역할:** 댓글 작성, 조회, 삭제

**구조:**
```
comment/
├── components/
├── commentApi.tsx
└── useCommentApi.tsx
```

**주요 기능:**
- **commentApi.tsx**
  - `getCommentList()` - 댓글 목록 조회
  - `postComment()` - 댓글 작성
  - `deleteComment()` - 댓글 삭제

### 2.5 features/profile/ - 프로필 기능
**역할:** 프로필 조회, 수정, 팔로우 관리

**구조:**
```
profile/
├── components/
│   └── ProfileEditContainer.tsx
├── profileApi.tsx
└── useProfileApi.tsx
```

**주요 기능:**
- **profileApi.tsx**
  - `getProfileData()` - 내 프로필 조회
  - `getUserFeed()` - 특정 사용자 프로필 조회
  - `updateProfile()` - 프로필 수정
  - `postJoinMemberValid()` - 계정명 중복 확인
  - `postJoinImage()` - 프로필 이미지 업로드
  - `getFollowData()` - 팔로워/팔로잉 목록

- **ProfileEditContainer.tsx**
  - 프로필 정보 수정
  - 이미지 업로드
  - 계정 ID 중복 확인
  - 유효성 검증

### 2.6 features/product/ - 상품 기능
**역할:** 상품 등록, 조회

**구조:**
```
product/
├── components/
│   └── ProductUploadContainer.tsx
├── productApi.tsx
└── useProductApi.tsx
```

**주요 기능:**
- **productApi.tsx**
  - `getProductListLimit()` - 상품 목록 조회 (페이지네이션)
  - `postProductUpload()` - 상품 등록

### 2.7 features/chat/ - 채팅 기능
**역할:** 채팅 관련 기능 (구현 중)

---

## 📂 3. pages/ - 페이지 컴포넌트

라우팅 단위의 페이지 컴포넌트들
주로 레이아웃과 Container 컴포넌트 조합으로 구성

### 3.1 pages/SplashPage/
- `StartSplash.tsx` - 앱 시작 스플래시 화면

### 3.2 pages/LoginMain/
- `LoginMain.tsx` - 로그인 메인 화면 (로그인/회원가입 선택)

### 3.3 pages/LoginPage/
- `LoginPage.tsx` - 로그인 페이지
  - LoginContainer 포함
  - Header 포함

### 3.4 pages/JoinPage/
- `JoinPage.tsx` - 회원가입 1단계 (이메일/비밀번호)
  - JoinContainer 포함
- `JoinMember.tsx` - 회원가입 2단계 (프로필 설정)
  - JoinMemberContainer 포함

### 3.5 pages/HomeFeed/
- `HomeFeed.tsx` - 홈 피드 페이지
  - 팔로잉 상태 확인
  - HomeFeedEmpty 또는 HomeFeedWithPosts 조건부 렌더링
  - Header, Navbar 포함

### 3.6 pages/ProfilePage/
```
ProfilePage/
├── MyProfilePage/          # 내 프로필
├── YourProfilePage/        # 다른 사용자 프로필
└── ProfileEditPage/        # 프로필 수정
```

- **MyProfilePage.tsx**
  - 내 프로필 정보 표시
  - 게시물 그리드/리스트 뷰
  - 상품 목록

- **YourProfilePage.tsx**
  - 다른 사용자 프로필 표시
  - 팔로우/언팔로우 기능

- **ProfileEditPage.tsx**
  - ProfileEditContainer 포함
  - Header 저장 버튼 연동

### 3.7 pages/PostPage/
```
PostPage/
├── PostMain/              # 게시물 상세
└── PostUpload/            # 게시물 작성
```

- **PostMain.tsx**
  - PostDetailContainer 포함
  - 게시물 상세 및 댓글

- **PostUpload.tsx**
  - PostUploadContainer 포함
  - Header 업로드 버튼 연동

### 3.8 pages/ProductPage/
- `ProductPage.tsx` - 상품 등록 페이지

### 3.9 pages/ChatPage/
- `ChatPage.tsx` - 채팅 목록
- `ChatRoom.tsx` - 채팅방

### 3.10 pages/SearchPage/
- `SearchPage.tsx` - 검색 페이지

### 3.11 pages/NotFound/
- `NotFound.tsx` - 404 페이지

---

## 📂 4. shared/ - 공통 리소스

애플리케이션 전체에서 공유되는 리소스, 유틸리티, 컴포넌트

### 4.1 shared/components/ - 공통 컴포넌트


**재사용 가능한 UI 컴포넌트들:**

- **Header/** - 헤더 컴포넌트
  - `Header.tsx` - 다양한 헤더 변형
    - `HeaderBasicNav` - 기본 헤더
    - `HeaderEditdNav` - 저장 버튼 포함 헤더
    - `HeaderUploadNav` - 업로드 버튼 포함 헤더

- **Navbar/** - 하단 네비게이션 바
  - 홈, 채팅, 게시물 작성, 프로필 탭

- **Input/** - 입력 컴포넌트
  - `Input.tsx` - 텍스트 입력 필드
  - `FileUploadInput.tsx` - 파일 업로드 입력

- **button/** - 버튼 컴포넌트
  - `Button.tsx` - 다양한 버튼 스타일
    - `ButtonLong` - 긴 버튼
    - 기타 버튼 변형

- **Comment/** - 댓글 관련 컴포넌트
  - `CommentInput/` - 댓글 입력
  - `CommentPost/` - 댓글 표시

- **User/** - 사용자 관련 컴포넌트
  - `UserProfileCircle.tsx` - 프로필 원형 이미지
  - `UserFollow.tsx` - 팔로우 관련 컴포넌트

- **UserImage/** - 사용자 이미지 컴포넌트
  - `UserImage.tsx` - 다양한 크기의 사용자 이미지
    - `LImage` - 큰 이미지
    - `MImage` - 중간 이미지
    - `SImage` - 작은 이미지

- **Heart/** - 좋아요 컴포넌트
  - 좋아요 버튼 및 카운트

- **Modal/** - 모달 컴포넌트
  - 다양한 모달 다이얼로그

- **AddProduct/** - 상품 추가 컴포넌트

### 4.2 shared/constants/ - 상수 정의

**파일:**
- `api.ts` - API 관련 상수
  ```typescript
  export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
  ```

- `pagination.ts` - 페이지네이션 상수
  ```typescript
  export const POSTS_PER_PAGE = 5;
  export const PRODUCTS_PER_PAGE = 5;
  export const SCROLL_THRESHOLD = 100;
  ```

### 4.3 shared/types/ - TypeScript 타입 정의

**파일:**
- `user.ts` - 사용자 관련 타입
  ```typescript
  interface User {
    _id: string;
    username: string;
    accountname: string;
    email?: string;
    intro: string;
    image: string;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  }
  ```

- `post.ts` - 게시물 관련 타입
  ```typescript
  interface Post {
    id: string;
    author: User;
    content: string;
    image: string;
    heartCount: number;
    hearted: boolean;
    commentCount: number;
    createdAt: string;
    updatedAt?: string;
  }
  ```

- `comment.ts` - 댓글 관련 타입
  ```typescript
  interface Comment {
    id: string;
    author: CommentAuthor;
    content: string;
    createdAt: string;
  }
  ```

- `product.ts` - 상품 관련 타입
  ```typescript
  interface Product {
    id: string;
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
    author: {...};
    createdAt: string;
  }
  ```

- `index.ts` - 모든 타입 export

### 4.4 shared/utils/ - 유틸리티 함수

**파일:**
- `validation.ts` - 검증 유틸리티
  - **정규식 패턴:**
    - `EMAIL_REGEX` - 이메일 형식
    - `PASSWORD_REGEX` - 비밀번호 형식 (6-20자)
    - `ACCOUNT_ID_REGEX` - 계정 ID 형식 (영문, 숫자, 밑줄, 마침표)
  
  - **검증 함수:**
    - `validateEmail()` - 이메일 유효성 검증
    - `validatePassword()` - 비밀번호 유효성 검증
    - `validateUsername()` - 사용자 이름 검증 (2-10자)
    - `validateAccountId()` - 계정 ID 검증
  
  - **에러 메시지 함수:**
    - `getEmailErrorMessage()`
    - `getPasswordErrorMessage()`
    - `getUsernameErrorMessage()`
    - `getAccountIdErrorMessage()`

### 4.5 shared/hooks/ - 커스텀 Hook

**파일:**
- `useImageUpload.ts` - 이미지 업로드 Hook
  ```typescript
  const { uploadImage, isUploading, uploadError } = useImageUpload();
  ```
  - 이미지 파일을 서버에 업로드
  - 로딩 상태 관리
  - 에러 처리
  - 업로드된 이미지 URL 반환

### 4.6 shared/lib/ - 라이브러리 설정

**파일:**
- `axios.tsx` - Axios 인스턴스 설정
  ```typescript
  const { instance, imageInstance } = createAxiosInstance(token);
  ```
  - **instance** - 일반 API 요청용 (JSON)
  - **imageInstance** - 이미지 업로드용 (FormData)
  - 자동 토큰 주입
  - 타임아웃 설정 (30초/60초)
  - 에러 인터셉터

### 4.7 shared/api/ - 공통 API

**파일:**
- `imageApi.tsx` - 이미지 관련 API (레거시, useImageUpload로 대체됨)

### 4.8 shared/assets/ - 정적 리소스

**디렉토리:**
- `icons/` - 아이콘 파일
- `images/` - 이미지 파일
- `image/` - 추가 이미지 파일

---

## 🔄 데이터 플로우

### 1. 인증 플로우
```
사용자 입력 (LoginContainer)
  ↓
검증 (validation.ts)
  ↓
API 호출 (authApi.postLogin)
  ↓
토큰 저장 (authTokenAtom)
  ↓
리다이렉션 (/homefeed)
```

### 2. 게시물 작성 플로우
```
사용자 입력 (PostUploadContainer)
  ↓
이미지 업로드 (useImageUpload)
  ↓
유효성 검증
  ↓
API 호출 (postApi.postPostUpload)
  ↓
피드로 이동
```

### 3. 피드 조회 플로우
```
페이지 로드 (HomeFeed)
  ↓
팔로잉 상태 확인 (authApi.getUserInfo)
  ↓
조건부 렌더링
  ├─ 팔로잉 있음 → HomeFeedWithPosts
  │   ↓
  │   피드 조회 (feedApi.getHomeFeed)
  │   ↓
  │   무한 스크롤
  │
  └─ 팔로잉 없음 → HomeFeedEmpty
```

---

## 🏛️ 아키텍처 패턴

### Feature-based Architecture
각 기능(feature)은 독립적인 모듈로 구성:
```
feature/
├── components/     # UI 컴포넌트
├── api.tsx        # API 함수
├── useApi.tsx     # API Hook
└── store.tsx      # 상태 관리 (선택적)
```

### Container/Presentational Pattern
- **Container**: 비즈니스 로직, 데이터 페칭
- **Presentational**: UI 렌더링만 담당

### Custom Hook Pattern
- API 호출을 Hook으로 래핑
- 토큰 자동 주입
- 재사용성 향상

---

## 🔧 기술 스택

### 코어
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router v6** - 라우팅
- **Recoil** - 상태 관리

### 스타일링
- **styled-components** - CSS-in-JS

### HTTP 클라이언트
- **Axios** - API 통신

### 빌드 도구
- **Create React App** (추정)

---

## 📋 주요 개선 사항 (리팩토링 완료)

### Phase 1
- API 설정 통합
- 인증 시스템 통합
- 컴포넌트 아키텍처 개선

### Phase 2
- 중복 API 함수 제거
- 이미지 업로드 통합 (useImageUpload Hook)
- 계정 ID 검증 통합
- 팔로잉 상태 확인 API 사용

### Phase 3
- 공통 Validation 유틸리티 생성
- 환경변수 상수화
- usePostApi에서 comment 분리
- 코드 정리

### Phase 4
- 타입 정의 강화 (any 제거)
- 매직 넘버 상수화
- useCallback 적용

---

## 🚀 시작하기

### 개발 서버 실행
```bash
npm start
```

### 빌드
```bash
npm run build
```

### 환경변수 설정
```
REACT_APP_API_BASE_URL=http://your-api-url
```

---

## 📝 코딩 컨벤션

### 파일명
- 컴포넌트: PascalCase (예: `LoginContainer.tsx`)
- 유틸리티: camelCase (예: `validation.ts`)
- 타입: camelCase (예: `user.ts`)

### 디렉토리 구조
- features: 기능별 모듈화
- pages: 라우팅 단위
- shared: 공통 리소스

### Import 순서
1. React 관련
2. 외부 라이브러리
3. 내부 컴포넌트
4. 타입
5. 스타일

---

## 🔍 주요 파일 위치 참조

### 인증 관련
- 로그인: `features/auth/components/LoginContainer.tsx`
- 회원가입: `features/auth/components/JoinMemberContainer.tsx`
- 토큰 관리: `features/auth/store.tsx`

### API 관련
- Axios 설정: `shared/lib/axios.tsx`
- API 상수: `shared/constants/api.ts`

### 검증 관련
- 검증 함수: `shared/utils/validation.ts`

### 타입 관련
- 공통 타입: `shared/types/index.ts`

### 이미지 업로드
- Hook: `shared/hooks/useImageUpload.ts`

---

## 📚 추가 개선 제안

### 단기
- [ ] 에러 바운더리 추가
- [ ] 토스트 메시지 시스템
- [ ] 로딩 스피너 통일

### 중기
- [ ] 테스트 코드 작성
- [ ] Storybook 도입
- [ ] 성능 모니터링

### 장기
- [ ] PWA 지원
- [ ] 다국어 지원 (i18n)
- [ ] 접근성 개선 (a11y)

---

**문서 작성일:** 2025.10.15
**프로젝트:** 니고네고 (NigoNego)
**버전:** 리팩토링 Phase 4 완료
