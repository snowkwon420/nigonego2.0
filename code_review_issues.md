# 코드 리뷰 및 개선 사항

## 🔴 심각한 문제

### 1. **중복된 API 함수**
**위치:** `src/features/feed/feedApi.tsx`
```typescript
// getFullFeed와 yourAccount가 완전히 동일한 기능
export const getFullFeed = async (token: string) => { ... }
export const yourAccount = async (token: string) => { ... }
```
**해결:** `yourAccount` 함수 제거하고 `getFullFeed` 사용

---

### 2. **이미지 업로드 로직 중복**
**위치:** 
- `JoinMemberContainer.tsx` (fetch 사용)
- `PostUploadContainer.tsx` (fetch 사용)
- `ProfileEditContainer.tsx` (API 사용 - 수정됨)

**문제:** 3곳에서 각각 다른 방식으로 이미지 업로드 구현
**해결:** 공통 이미지 업로드 함수를 만들어 재사용

---

### 3. **계정 ID 검증 로직 중복**
**위치:**
- `JoinMemberContainer.tsx` (fetch 사용)
- `ProfileEditContainer.tsx` (API 사용 - 수정됨)

**문제:** JoinMemberContainer에서 여전히 fetch 직접 호출
**해결:** profileApi의 `postJoinMemberValid` 재사용

---

### 4. **팔로잉 상태 확인 로직 중복**
**위치:** `HomeFeed.tsx`
```typescript
// fetch로 직접 호출
const response = await fetch(`${API_BASE_URL}/user/myinfo`, ...)
```
**문제:** authApi에 이미 `getUserInfo` 함수가 있는데 fetch 직접 사용
**해결:** `useAuthAPI().getUserInfo()` 사용

---

## 🟡 중간 문제

### 5. **이메일/비밀번호 검증 로직 중복**
**위치:**
- `LoginContainer.tsx`
- `JoinContainer.tsx`

**문제:** 동일한 정규식 검증 로직이 두 곳에 중복
**해결:** 공통 validation 유틸리티 함수 생성
```typescript
// src/shared/utils/validation.ts
export const validateEmail = (email: string) => { ... }
export const validatePassword = (password: string) => { ... }
```

---

### 6. **사용하지 않는 State**
**위치:** `JoinMemberContainer.tsx`
```typescript
const [userInfo, setUserInfo] = useState({ ... });
const [isFormValid, setIsFormValid] = useState<boolean>(true);
```
**문제:** 
- `setUserInfo`는 선언만 되고 사용되지 않음
- `isFormValid`는 항상 true로 설정되어 의미 없음

**해결:** 불필요한 state 제거 및 로직 단순화

---

### 7. **API 응답 구조 불일치 처리**
**위치:** 여러 컴포넌트
```typescript
// 응답 구조가 일관되지 않아 여러 방식으로 접근
const user = response?.user || response?.data?.user;
const posts = response?.posts || response?.data?.posts;
```
**문제:** API 응답 구조가 일관되지 않아 방어 코드 필요
**해결:** API 응답 정규화 함수 생성 또는 백엔드 응답 구조 통일

---

### 8. **usePostApi에서 commentAPI 직접 import**
**위치:** `src/features/post/usePostApi.tsx`
```typescript
import * as commentAPI from '../comment/commentApi';
```
**문제:** post API hook에서 comment API를 직접 import하여 관심사 혼재
**해결:** comment 관련 기능은 `useCommentAPI` 사용하도록 분리

---

## 🟢 경미한 문제

### 9. **환경변수 기본값 중복**
**위치:** 여러 파일
```typescript
process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app'
```
**문제:** 기본 URL이 여러 곳에 하드코딩됨
**해결:** 상수 파일로 분리
```typescript
// src/shared/constants/api.ts
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
```

---

### 10. **에러 처리 부재**
**위치:** 대부분의 try-catch 블록
```typescript
catch (error) {
  // 에러 처리
}
```
**문제:** 에러를 잡기만 하고 사용자에게 피드백 없음
**해결:** 토스트 메시지나 에러 상태 표시

---

### 11. **불필요한 useEffect 의존성**
**위치:** `PostUploadContainer.tsx`, `ProfileEditContainer.tsx`
```typescript
useEffect(() => {
  onSubmitRef(handleSubmit);
}, [userName, userID, userIntro, userImage, isUserNameValid, isUserIDValid]);
```
**문제:** 모든 상태 변경마다 ref 재설정
**해결:** useCallback으로 함수 메모이제이션

---

### 12. **타입 정의 부족**
**위치:** 여러 컴포넌트
```typescript
const [postData, setPostData] = useState<any>(null);
const [recentCommentData, setRecentCommentData] = useState<any>('');
```
**문제:** `any` 타입 사용으로 타입 안정성 저하
**해결:** 인터페이스 정의 및 공통 타입 파일 생성

---

### 13. **매직 넘버**
**위치:** 여러 파일
```typescript
getHomeFeed(5, skip)  // 5는 무엇?
userName.length >= 2 && userName.length <= 10  // 2, 10은?
```
**해결:** 상수로 정의
```typescript
const POSTS_PER_PAGE = 5;
const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 10;
```

---

## 📋 구조적 개선 제안

### 14. **공통 이미지 업로드 Hook 생성**
```typescript
// src/shared/hooks/useImageUpload.ts
export const useImageUpload = () => {
  const { postJoinImage } = useProfileAPI();
  
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const result = await postJoinImage(formData);
    return result.filename ? `${API_BASE_URL}/${result.filename}` : null;
  };
  
  return { uploadImage };
};
```

---

### 15. **공통 Validation 유틸리티**
```typescript
// src/shared/utils/validation.ts
export const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const PASSWORD_REGEX = /^[A-Za-z0-9]{6,20}$/;
export const ACCOUNT_ID_REGEX = /^[a-zA-Z0-9._]+$/;

export const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);
export const validatePassword = (password: string): boolean => PASSWORD_REGEX.test(password);
export const validateAccountId = (accountId: string): boolean => ACCOUNT_ID_REGEX.test(accountId);
export const validateUsername = (username: string): boolean => 
  username.length >= 2 && username.length <= 10;
```

---

### 16. **API 응답 정규화**
```typescript
// src/shared/utils/apiNormalizer.ts
export const normalizeUserResponse = (response: any) => {
  return response?.user || response?.data?.user || null;
};

export const normalizePostsResponse = (response: any) => {
  return response?.posts || response?.data?.posts || [];
};
```

---

### 17. **공통 타입 정의**
```typescript
// src/shared/types/user.ts
export interface User {
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

// src/shared/types/post.ts
export interface Post {
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

// src/shared/types/comment.ts
export interface Comment {
  id: string;
  author: {
    accountname: string;
    image: string;
    username: string;
  };
  content: string;
  createdAt: string;
}
```

---

## 🎯 우선순위별 작업 순서

### 높음 (즉시 수정)
1. ✅ 중복 API 함수 제거 (yourAccount)
2. ✅ 이미지 업로드 로직 통합
3. ✅ 계정 ID 검증 로직 통합
4. ✅ 팔로잉 상태 확인 API 사용

### 중간 (다음 스프린트)
5. 공통 validation 유틸리티 생성
6. 사용하지 않는 state 제거
7. usePostApi에서 comment 분리
8. 환경변수 상수화

### 낮음 (점진적 개선)
9. 에러 처리 개선
10. useCallback 적용
11. 타입 정의 강화
12. 매직 넘버 상수화
