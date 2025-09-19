# 🔄 백엔드 API 마이그레이션 이슈

## 📋 개요
기존 만료된 API 주소(`https://api.mandarin.weniv.co.kr`)를 새로운 백엔드 API 주소로 변경하여 프로젝트를 정상 작동시키는 작업

## 🎯 목표
- [x] TypeScript 마이그레이션 완료
- [ ] 새로운 백엔드 API 연동
- [ ] 기존 axios + recoil 구조 유지하며 정상 작동 확인
- [ ] 추후 zustand 리팩터링 준비

## 🔍 현재 상태 분석

### API 주소가 하드코딩된 파일들
1. **설정 파일들**
   - `src/shared/lib/axios.tsx` - BASE_URL 설정
   - `src/shared/api/Api.ts` - baseUrl 설정  
   - `src/shared/api/URL.ts` - URL 상수

2. **컴포넌트/페이지에서 직접 사용**
   - `src/pages/ProfilePage/ProfileEditPage/ProfileEditPage.tsx` (3곳)
   - `src/features/feed/components/HomePost/HomePostGrid.tsx`
   - `src/shared/components/Comment/CommentInput/Comment.tsx` (2곳)
   - `src/pages/ProductPage/ProductPage.tsx`
   - `src/pages/JoinPage/JoinMember.tsx`
   - `src/pages/PostPage/PostMain/PostMain.tsx`
   - `src/pages/PostPage/PostUpload/PostUpload.tsx`

## 📝 작업 계획

### Phase 1: API 주소 통합 관리
- [ ] 환경변수 설정 (`.env` 파일)
- [ ] 중앙화된 API 설정 파일 정리
- [ ] 하드코딩된 API 주소들을 설정 파일 참조로 변경

### Phase 2: 새로운 API 연동
- [ ] 새로운 백엔드 API 주소 확인 및 설정
- [ ] API 엔드포인트 호환성 확인
- [ ] 인증 토큰 방식 확인

### Phase 3: 기능별 테스트
- [ ] 로그인/회원가입
- [ ] 프로필 관리
- [ ] 게시물 CRUD
- [ ] 댓글 시스템
- [ ] 이미지 업로드
- [ ] 팔로우 시스템

### Phase 4: 코드 정리
- [ ] 사용하지 않는 API 코드 제거
- [ ] 에러 핸들링 개선
- [ ] 타입 정의 보완

## 🛠 기술 스택
- **HTTP Client**: axios (유지)
- **상태관리**: recoil (유지 → 추후 zustand 마이그레이션)
- **언어**: TypeScript

## ⚠️ 주의사항
1. 기존 axios + recoil 구조는 그대로 유지
2. 새로운 API의 응답 구조가 기존과 다를 수 있음
3. 인증 방식 변경 가능성 확인 필요
4. 이미지 업로드 경로 변경 확인 필요

## 🔗 관련 파일들
```
src/
├── shared/
│   ├── lib/axios.tsx          # 메인 axios 설정
│   ├── api/Api.ts            # API 인스턴스
│   └── api/URL.ts            # URL 상수
├── pages/                    # 각 페이지별 API 호출
└── features/                 # 기능별 API 호출
```

## ✅ 완료 기준
- [ ] 모든 API 호출이 새로운 주소로 정상 작동
- [ ] 로그인부터 주요 기능까지 E2E 테스트 통과
- [ ] TypeScript 컴파일 오류 없음
- [ ] ESLint 주요 오류 해결
- [ ] 코드 리뷰 완료

---

**다음 단계**: 새로운 백엔드 API 주소 확인 후 Phase 1부터 시작