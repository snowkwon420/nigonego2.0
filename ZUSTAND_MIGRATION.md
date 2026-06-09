# Zustand 마이그레이션 문서

## 작업 개요

니고네고 2.0의 클라이언트 상태 관리를 Recoil 기반 구조에서 Zustand 기반 구조로 마이그레이션했다.

TanStack Query가 서버 상태를 담당하게 된 이후, Recoil에 남아 있던 인증 토큰, 계정명, 로그인 여부, 팔로잉 관련 클라이언트 상태를 Zustand store로 통합하는 것이 이번 작업의 목표다.

## 작업 기준

- 작업 브랜치: `feat/27-zustand`
- 작업 기준일: 2026-06-09
- 대상 라이브러리: `zustand`
- 제거 대상:
  - `recoil`
  - `recoil-persist`
- 검증 기준:
  - `npx tsc --noEmit`
  - `CI=true npm run build`

## 마이그레이션 대상

기존 Recoil atom으로 분산되어 있던 클라이언트 상태를 하나의 Zustand persist store로 통합했다.

| 상태 | 기존 위치 | 변경 후 |
|---|---|---|
| auth token | `authTokenAtom`, `authAtom` | `useAuthStore.token` |
| accountName | `accountNameAtom` | `useAuthStore.accountName` |
| isLogin | `isLoginAtom`, `isLogin` | `useAuthStore.isLogin` |
| following | `followingAtom` | `useAuthStore.following` |
| yourAccount | `atomYourAccount` | `useAuthStore.yourAccount` |

관련 파일:

- `src/app/store/useAuthStore.ts`

## Before

마이그레이션 전에는 비슷한 상태가 여러 atom 파일에 중복으로 존재했다.

예시:

```tsx
const authAtom = atom<string>({
  key: 'authToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
```

```tsx
export const authTokenAtom = atom<string>({
  key: 'authToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
```

문제점:

- `authToken` key가 여러 atom 파일에 중복으로 존재했다.
- `accountName`, `isLogin`도 비슷한 구조로 분산되어 있었다.
- 앱 최상단에 `RecoilRoot` Provider가 필요했다.
- 클라이언트 상태와 서버 상태의 역할이 명확히 나뉘지 않았다.
- API hook, 로그인, 로그아웃, 스플래시, 댓글 작성자 판별 등 여러 곳에서 Recoil에 직접 의존했다.
- `recoil-persist` 기반 localStorage 구조가 atom마다 흩어져 있었다.

## After

마이그레이션 후에는 클라이언트 상태를 Zustand store 하나로 통합했다.

대표 구조:

```ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      accountName: '',
      yourAccount: '',
      following: '',
      isLogin: false,
      setAuth: (token, accountName) =>
        set({
          token,
          accountName,
          isLogin: Boolean(token),
        }),
      logout: () => set(initialState),
    }),
    {
      name: 'nigonego-auth',
    },
  ),
);
```

사용 예시:

```tsx
const token = useAuthStore((state) => state.token);
const setAuth = useAuthStore((state) => state.setAuth);
```

개선점:

- 클라이언트 상태의 single source of truth를 만들었다.
- `RecoilRoot` Provider 의존성을 제거했다.
- Recoil atom 중복 문제를 제거했다.
- 인증 관련 상태를 하나의 persist store로 관리한다.
- API hook에서 token 접근 방식이 단순해졌다.
- 로그아웃 시 관련 클라이언트 상태를 한 번에 초기화할 수 있게 되었다.

## 적용 범위

| 영역 | 변경 내용 |
|---|---|
| 앱 레이아웃 | `RecoilRoot` 제거 |
| 로그인 | 로그인 성공 시 `setAuth(token, accountName)` 호출 |
| 스플래시 | Zustand의 `token`, `accountName` 기준으로 로그인 상태 판단 |
| API hook | Recoil token 대신 Zustand token 사용 |
| 이미지 업로드 | Zustand token 사용 |
| 로그아웃 모달 | `logout()`으로 auth/account/following 상태 초기화 |
| 홈 게시글 | 게시글 작성자 accountName으로 전역 accountName을 덮어쓰던 로직 제거 |
| 댓글 | Zustand accountName으로 내 댓글 여부 판단 |
| 팔로워 목록 | Zustand accountName/yourAccount 사용 |

## 제거한 파일

Recoil atom 및 중복 store 파일을 제거했다.

- `src/app/store/authToken.ts`
- `src/app/store/accountName.ts`
- `src/app/store/atoms.ts`
- `src/app/store/atomYourAccount.ts`
- `src/app/store/isLogin.ts`
- `src/app/store/isLogin.tsx`
- `src/features/auth/store.tsx`

## 제거한 의존성

`package.json`에서 Recoil 관련 의존성을 제거했다.

- `recoil`
- `recoil-persist`

추가한 의존성:

- `zustand`

## localStorage 호환 처리

기존 사용자의 로그인 상태가 갑자기 사라지는 문제를 줄이기 위해, Zustand store 초기화 시 기존 `recoil-persist` 값을 한 번 읽도록 처리했다.

처리 대상:

- `authToken`
- `accountname`
- `following`

관련 코드:

```ts
const legacyState = window.localStorage.getItem('recoil-persist');
```

로그아웃 시에는 기존 `recoil-persist` 값도 제거한다.

```ts
window.localStorage.removeItem('recoil-persist');
```

이 문자열은 호환 처리를 위한 localStorage key일 뿐이며, Recoil 의존성은 제거된 상태다.

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

### 번들 크기 변화

Zustand 마이그레이션 후 build 결과 기준:

```txt
main bundle: 123.71 kB
```

이전 build에서 약 `158 kB`대였던 main bundle이 Recoil 제거 후 약 `123 kB`대로 감소했다.

## 포트폴리오 정리 문장

Recoil로 분산되어 있던 인증/계정 관련 클라이언트 상태를 Zustand persist store로 통합했습니다. 기존에는 `authToken`, `accountName`, `isLogin` 등이 여러 atom 파일에 중복 정의되어 있었고, 앱 최상단에 `RecoilRoot` Provider가 필요했습니다.

마이그레이션 후에는 `useAuthStore`를 통해 인증 토큰, 계정명, 로그인 여부, 팔로잉 관련 상태를 하나의 클라이언트 상태 저장소에서 관리하도록 개선했습니다. 이를 통해 중복 atom 구조를 제거하고, Provider 의존성을 줄였으며, Recoil 제거로 번들 크기도 감소했습니다.

## 다음 작업

### 남은 점검

- 실제 로그인 후 새로고침 시 Zustand persist 유지 확인
- 로그아웃 시 `nigonego-auth` 및 legacy `recoil-persist` 정리 확인
- 팔로워/팔로잉 화면에서 accountName 경로가 의도대로 동작하는지 브라우저 확인

### 추가 개선 후보

- auth 관련 API도 `useMutation` 기반으로 통일
- Zustand store를 auth store와 UI store로 분리
- modal open 상태를 Zustand UI store로 이동
- localStorage migration 처리는 충분히 배포된 후 제거

