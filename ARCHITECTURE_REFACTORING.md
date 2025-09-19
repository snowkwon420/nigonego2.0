# 🔄 Architecture Refactoring - Pages to Features Migration

## 📋 개요
현재 pages 폴더에 집중된 비즈니스 로직을 features 기반 아키텍처로 리팩터링하여 관심사 분리와 코드 재사용성을 향상시키는 작업

## 🎯 목표
- [x] API 주소 마이그레이션 완료
- [ ] Pages의 비즈니스 로직을 Features로 이동
- [ ] 각 폴더별 명확한 역할 분리
- [ ] 기존 UseFetchToken 훅을 새로운 features 훅으로 교체
- [ ] 코드 재사용성 및 테스트 용이성 향상

## 🏗️ 목표 아키텍처

### **Before (현재)**
```
pages/
├── HomeFeed/HomeFeed.tsx
│   ├── API 호출 ❌
│   ├── 상태 관리 ❌
│   ├── 비즈니스 로직 ❌
│   └── UI 렌더링 ✅
├── LoginPage/LoginPage.tsx
│   ├── 폼 검증 로직 ❌
│   ├── API 호출 ❌
│   └── 상태 관리 ❌
└── ...
```

### **After (목표)**
```
pages/
├── HomeFeed/HomeFeed.tsx (레이아웃만)
└── LoginPage/LoginPage.tsx (레이아웃만)

features/
├── feed/
│   ├── components/HomeFeedContainer.tsx ✅
│   ├── useFeedApi.tsx ✅
│   └── feedApi.tsx ✅
├── auth/
│   ├── components/LoginContainer.tsx ✅
│   ├── useAuthApi.tsx ✅
│   └── authApi.tsx ✅
└── ...
```

## 📝 작업 계획

### **Phase 1: HomeFeed 리팩터링** 
- [ ] `features/feed/components/HomeFeedContainer.tsx` 생성
- [ ] 기존 HomeFeed.tsx의 비즈니스 로직 이동
  - [ ] 데이터 fetching 로직
  - [ ] 무한 스크롤 로직
  - [ ] 상태 관리
  - [ ] 에러 처리
- [ ] `useFeedApi` 훅 실제 사용
- [ ] HomeFeed.tsx를 단순 레이아웃 컴포넌트로 변경
- [ ] 기능 테스트

### **Phase 2: Auth 관련 페이지 리팩터링**
- [ ] `features/auth/components/LoginContainer.tsx` 생성
- [ ] LoginPage.tsx 로직 이동
  - [ ] 폼 검증 로직
  - [ ] API 호출 로직
  - [ ] 상태 관리
- [ ] `features/auth/components/JoinContainer.tsx` 생성
- [ ] JoinPage.tsx, JoinMember.tsx 로직 이동
- [ ] `useAuthApi` 훅 실제 사용

### **Phase 3: Profile 관련 페이지 리팩터링**
- [ ] `features/profile/components/ProfileEditContainer.tsx` 생성
- [ ] ProfileEditPage.tsx 로직 이동
  - [ ] 폼 검증 로직
  - [ ] 이미지 업로드 로직
  - [ ] API 호출 로직
- [ ] `useProfileApi` 훅 실제 사용

### **Phase 4: 나머지 페이지들 리팩터링**
- [ ] PostUpload → features/post/components/
- [ ] ProductPage → features/product/components/
- [ ] 기타 페이지들

### **Phase 5: 정리 작업**
- [ ] 기존 `UseFetchToken` 훅 제거
- [ ] 사용하지 않는 import 정리
- [ ] TypeScript 컴파일 오류 해결
- [ ] ESLint 경고 해결

## 🔍 각 폴더별 역할 정의

### **📁 app/**
- 앱 전역 설정 (라우팅, 레이아웃, 스타일)
- 전역 상태 관리 (store)

### **📁 features/**
- 기능별 비즈니스 로직
- API 호출 및 상태 관리
- 재사용 가능한 컴포넌트들

### **📁 pages/**
- 단순 레이아웃 컴포넌트
- features 컴포넌트들의 조합
- 라우팅 연결점

### **📁 shared/**
- 공통 컴포넌트 (Button, Input 등)
- 유틸리티 함수
- 공통 훅

## ⚠️ 주의사항
1. **점진적 마이그레이션** - 한 번에 모든 페이지를 변경하지 않고 단계별로 진행
2. **기능 테스트** - 각 단계마다 기능이 정상 작동하는지 확인
3. **타입 안정성** - TypeScript 컴파일 오류 없이 진행
4. **기존 기능 유지** - 리팩터링 과정에서 기능 손실 없도록 주의

## ✅ 완료 기준
- [ ] 모든 pages가 단순 레이아웃 컴포넌트로 변경
- [ ] 비즈니스 로직이 적절한 features 폴더로 이동
- [ ] 기존 UseFetchToken 완전 제거
- [ ] TypeScript 컴파일 오류 없음
- [ ] 모든 기능 정상 작동 확인
- [ ] 코드 리뷰 완료

---

**시작 브랜치**: `develop`  
**작업 브랜치**: `feature/architecture-refactoring`  
**목표**: 깔끔하고 유지보수 가능한 아키텍처 구축