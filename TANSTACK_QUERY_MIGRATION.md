# TanStack Query 마이그레이션 문서

## 작업 개요

니고네고 2.0의 주요 서버 상태 관리를 기존 `useEffect + useState` 기반 구조에서 TanStack Query 기반 구조로 마이그레이션했다.

이번 작업의 목표는 컴포넌트 내부에 흩어져 있던 API 호출, 로딩 상태, pagination, mutation 이후 재조회 로직을 feature 단위 query/mutation hook으로 분리하는 것이다.

## 작업 기준

- 작업 브랜치: `fix/stabilization`
- 작업 기준일: 2026-06-09
- 대상 라이브러리: `@tanstack/react-query`
- 검증 기준:
  - `npx tsc --noEmit`
  - `CI=true npm run build`
  - 주요 화면 이미지 렌더링 수동 확인

## 도입 범위

### 전역 설정

- `@tanstack/react-query` 설치
- `QueryClient` 생성
- `QueryClientProvider` 전역 적용
- 기본 query option 설정

관련 파일:

- `src/shared/lib/queryClient.ts`
- `src/app/layout/RootLayout.tsx`

### Query Hook 분리

서버 상태를 feature별 query hook으로 분리했다.

| 영역 | 파일 | 적용 내용 |
|---|---|---|
| 피드 | `src/features/feed/feedQueries.ts` | 홈 피드 무한스크롤 조회 |
| 게시글 | `src/features/post/postQueries.ts` | 유저 게시글 목록, 게시글 상세, 좋아요, 게시글 업로드 |
| 댓글 | `src/features/comment/commentQueries.ts` | 댓글 목록, 댓글 작성 |
| 상품 | `src/features/product/productQueries.ts` | 상품 목록 무한스크롤, 상품 업로드 |
| 프로필 | `src/features/profile/profileQueries.ts` | 내 프로필, 프로필 수정, 팔로워/팔로잉 목록 |

### 응답 정규화

기존 API 응답 형태가 화면마다 조금씩 다르게 처리되고 있었기 때문에, query hook에서 공통으로 사용할 응답 정규화 유틸을 추가했다.

관련 파일:

- `src/shared/utils/apiResponse.ts`

처리 대상:

- `response.posts`
- `response.post`
- `response.product`
- `response.comments`
- `response.user`
- `response.data`
- `response.data.posts`
- `response.data.post`
- `response.data.product`
- `response.data.comments`
- `response.data.user`
- `response.data`가 배열인 경우

## Before

마이그레이션 전에는 서버 상태 관리가 각 컴포넌트에 직접 들어가 있었다.

대표적인 패턴:

```tsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    const response = await api();
    setData(response.data);
    setIsLoading(false);
  };

  fetchData();
}, []);
```

문제점:

- 컴포넌트마다 API 호출 방식이 달랐다.
- 로딩 상태를 수동으로 관리했다.
- 무한스크롤 append 로직이 컴포넌트 내부에 있었다.
- mutation 이후 관련 데이터를 직접 다시 불러오거나 상태를 직접 수정해야 했다.
- 같은 서버 데이터를 여러 화면에서 중복 요청하거나 중복 관리할 가능성이 있었다.
- hook dependency warning이 발생하기 쉬운 구조였다.

## After

마이그레이션 후에는 서버 상태 관리가 query/mutation hook으로 분리되었다.

대표적인 패턴:

```tsx
const { data, isLoading } = useMyProfileQuery();
```

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useHomeFeedQuery();
```

```tsx
const createCommentMutation = useCreateCommentMutation(postId);

await createCommentMutation.mutateAsync(comment);
```

개선점:

- 조회성 서버 상태는 `useQuery`로 관리한다.
- 피드/상품 pagination은 `useInfiniteQuery`로 관리한다.
- 생성/수정/좋아요 같은 변경 작업은 `useMutation`으로 관리한다.
- mutation 성공 후 `invalidateQueries`로 관련 데이터를 갱신한다.
- 컴포넌트는 렌더링과 이벤트 처리 중심으로 단순해졌다.
- API 응답 정규화 로직을 공통 유틸로 분리했다.

## 화면별 마이그레이션 결과

| 화면/기능 | 상태 | 변경 내용 |
|---|---|---|
| HomeFeed | 완료 | 팔로잉 여부는 프로필 query 재사용, 피드는 `useInfiniteQuery` 적용 |
| MyProfile | 완료 | 내 프로필 조회를 `useQuery`로 변경 |
| 상품 목록 | 완료 | `useInfiniteQuery` 기반 pagination 적용 |
| 상품 업로드 | 완료 | `useMutation` 적용, 성공 후 상품 query invalidate |
| 게시글 목록 | 완료 | 계정별 게시글 목록을 `useQuery`로 변경 |
| 게시글 상세 | 완료 | 상세 조회를 `useQuery`로 변경 |
| 게시글 업로드 | 완료 | `useMutation` 적용, 성공 후 게시글/피드 query invalidate |
| 댓글 목록 | 완료 | `useQuery`로 변경 |
| 댓글 작성 | 완료 | `useMutation` 적용, 성공 후 댓글 query invalidate |
| 좋아요/좋아요 취소 | 완료 | `useMutation` 적용, 성공 후 게시글/피드 query invalidate |
| 팔로워/팔로잉 목록 | 완료 | `useQuery`로 변경 |
| 프로필 수정 | 완료 | `useMutation` 적용, 성공 후 프로필 query invalidate |

## 제거한 기존 Hook

TanStack Query로 대체되면서 기존 조회/변경용 API hook 일부를 제거했다.

- `src/features/feed/useFeedApi.tsx`
- `src/features/post/usePostApi.tsx`
- `src/features/product/useProductApi.tsx`
- `src/features/comment/useCommentApi.tsx`

## 남겨둔 예외

다음 요청은 서버 상태 캐싱 대상이라기보다 인증, 폼 제출, 즉시 검증 성격이 강해서 이번 마이그레이션 범위에서는 유지했다.

- 로그인
- 회원가입
- 이메일 중복/유효성 검증
- 계정명 중복 검증
- 이미지 업로드

필요하다면 이후 작업에서 이 요청들도 `useMutation` 기반으로 통일할 수 있다.

## 검증 결과

### TypeScript

```bash
npx tsc --noEmit
```

결과:

- 통과
- TypeScript compile error 없음

### Production Build

```bash
CI=true npm run build
```

결과:

- 통과
- Vercel과 동일하게 warning을 error로 처리하는 조건에서도 build 성공

### 화면 확인

- 이미지 렌더링 확인 완료
- 주요 이미지 URL 처리 로직 보강 완료
- 응답 형태 차이를 흡수하기 위해 `apiResponse` 정규화 유틸 추가

## 변경 규모

마이그레이션 중간 기준 diff:

```txt
22 files changed
156 insertions
533 deletions
```

수동 서버 상태 관리 코드가 줄고, feature 단위 query/mutation hook 중심으로 구조가 정리되었다.

## 포트폴리오 정리 문장

TanStack Query를 앱 전역에 도입하고, 핵심 서버 상태인 피드, 프로필, 상품, 게시글, 댓글, 팔로워/팔로잉 데이터를 query/mutation 기반으로 마이그레이션했습니다. 기존에는 각 컴포넌트에서 `useEffect`와 `useState`로 API 호출, 로딩 상태, pagination, mutation 이후 재조회 로직을 직접 관리했지만, 리팩터링 후에는 feature 단위 query hook으로 서버 상태 책임을 분리했습니다.

특히 피드와 상품 목록은 `useInfiniteQuery`로 pagination을 관리하고, 댓글 작성, 좋아요, 게시글/상품 업로드, 프로필 수정은 `useMutation`과 `invalidateQueries`를 활용해 관련 데이터가 자동으로 갱신되도록 개선했습니다.

## 다음 작업

### Zustand 마이그레이션

TanStack Query가 서버 상태를 담당하게 되었으므로, 다음 단계에서는 Recoil에 남아 있는 클라이언트 상태를 Zustand로 이동한다.

우선 대상:

- auth token
- accountName
- login state
- following state
- modal/open state

### 성능 비교

마이그레이션 전후 비교 지표:

- build 결과 bundle size
- 주요 화면 API 호출 중복 감소
- React Profiler 렌더링 횟수
- Lighthouse 성능 점수
- 컴포넌트 내부 상태/로직 감소량

