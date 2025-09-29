import { useState, useEffect } from 'react';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import PostUploadContainer from '../../../features/post/components/PostUploadContainer';

export default function PostUpload() {
  const [isFormValid, setIsFormValid] = useState(false);

  // TODO: Container에서 폼 유효성 상태를 받아오도록 개선 필요
  useEffect(() => {
    // 임시로 항상 false로 설정
    setIsFormValid(false);
  }, []);

  return (
    <>
      <HeaderBasicNav disabled={!isFormValid}>업로드</HeaderBasicNav>
      <PostUploadContainer />
    </>
  );
}


