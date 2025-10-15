import { useState, useRef } from 'react';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import PostUploadContainer from '../../../features/post/components/PostUploadContainer';

/**
 * 게시물 업로드 페이지
 */
export default function PostUpload() {
  const [isFormValid, setIsFormValid] = useState(false);
  const submitRef = useRef<() => void>();

  const handleUploadClick = () => {
    if (submitRef.current) {
      submitRef.current();
    }
  };

  return (
    <>
      <HeaderBasicNav disabled={!isFormValid} onClick={handleUploadClick}>
        업로드
      </HeaderBasicNav>
      <PostUploadContainer
        onValidityChange={setIsFormValid}
        onSubmitRef={(fn) => { submitRef.current = fn; }}
      />
    </>
  );
}


