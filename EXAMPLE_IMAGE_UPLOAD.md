# 이미지 업로드 사용 가이드

## 📸 기본 사용법

### 1. 회원가입/프로필 수정 (토큰 없음)

```typescript
import { uploadImage } from '../../../shared/api/imageApi';

const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    // 이미지 업로드 (토큰 없음)
    const imageUrl = await uploadImage(file);
    setUserImage(imageUrl);
  } catch (error) {
    alert('이미지 업로드에 실패했습니다.');
  }
};
```

### 2. 게시물/상품 등록 (토큰 필요)

```typescript
import { uploadImage } from '../../../shared/api/imageApi';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../../auth/store';

const MyComponent = () => {
  const token = useRecoilValue(authTokenAtom);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 이미지 업로드 (토큰 포함)
      const imageUrl = await uploadImage(file, token);
      setPostImage(imageUrl);
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <input type="file" onChange={handleImageUpload} accept="image/*" />
  );
};
```

### 3. 여러 이미지 업로드

```typescript
import { uploadMultipleImages } from '../../../shared/api/imageApi';

const handleMultipleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  try {
    const imageUrls = await uploadMultipleImages(files, token);
    setImages(imageUrls);
  } catch (error) {
    alert('이미지 업로드에 실패했습니다.');
  }
};
```

## 🔄 현재 코드 vs 개선된 코드

### ❌ 현재 (중복 코드)
```typescript
// JoinMemberContainer.tsx
const formData = new FormData();
formData.append('image', file);
const response = await fetch(`${API_URL}/image/uploadfile`, {
  method: 'POST',
  body: formData,
});
const data = await response.json();
const imageUrl = `${API_URL}/${data.filename}`;

// ProfileEditContainer.tsx - 동일한 코드 반복
// PostUploadContainer.tsx - 동일한 코드 반복
// ProductUploadContainer.tsx - 동일한 코드 반복
```

### ✅ 개선 (공통 함수)
```typescript
// 모든 컴포넌트에서
import { uploadImage } from '../../../shared/api/imageApi';

const imageUrl = await uploadImage(file, token);
```

## 📊 이미지 업로드 플로우

```
사용자 파일 선택
    ↓
File 객체 생성
    ↓
FormData 생성 (image: File)
    ↓
POST /image/uploadfile
    ↓
서버 처리 (파일 저장)
    ↓
응답: { filename: "uploads/abc123.jpg" }
    ↓
전체 URL 생성
    ↓
상태 업데이트 (setUserImage)
```

## 🎯 장점

1. **코드 재사용** - 한 곳에서 관리
2. **일관성** - 모든 곳에서 동일한 방식
3. **에러 처리** - 통합된 에러 핸들링
4. **유지보수** - 수정 시 한 곳만 변경
5. **타입 안정성** - TypeScript 타입 지원
6. **토큰 관리** - 자동으로 인증 헤더 추가

## 🔧 API 서버 응답 형식

```json
// 성공
{
  "filename": "uploads/1234567890-image.jpg"
}

// 실패
{
  "message": "파일 형식이 올바르지 않습니다."
}
```
