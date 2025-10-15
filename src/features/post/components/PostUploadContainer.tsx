import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import UserProfileCircle from '../../../shared/components/User/UserProfileCircle';
import { usePostApi } from '../usePostApi';
import { useImageUpload } from '../../../shared/hooks/useImageUpload';

interface PostUploadContainerProps {
  onValidityChange: (isValid: boolean) => void;
  onSubmitRef: (fn: () => void) => void;
}

function PostUploadContainer({ onValidityChange, onSubmitRef }: PostUploadContainerProps) {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const { postPostUpload } = usePostApi();
  const { uploadImage } = useImageUpload();

  // 폼 유효성 검사 및 부모 컴포넌트에 전달
  useEffect(() => {
    const isValid = content.trim() !== '' && image !== '';
    onValidityChange(isValid);
  }, [content, image, onValidityChange]);

  // 실제 업로드 로직
  const handleSubmitClick = useCallback(async () => {
    if (content.trim() === '' || image === '') return;

    try {
      await postPostUpload(content, image);
      navigate('/homefeed');
    } catch (error) {
      console.error('게시물 업로드 실패:', error);
    }
  }, [content, image, postPostUpload, navigate]);

  // submit 함수를 부모에게 전달
  useEffect(() => {
    onSubmitRef(handleSubmitClick);
  }, [handleSubmitClick, onSubmitRef]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setImage(imageUrl);
    }
  };

  // 게시물 업로드 제출 (form submit)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitClick();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <BodyGlobal>
          <PostUploadWrapper>
            <UserProfileCircle isWidth="48px" />
            <textarea
              className="inputPost"
              placeholder="게시글 입력하기"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
          </PostUploadWrapper>
          {image.length > 0 && <UploadImg src={image} alt="업로드된 이미지" />}
        </BodyGlobal>
      </form>

      <FileUploadInput
        id="input"
        type="file"
        onChange={handleImageUpload}
        right="20px"
        bottom="20px"
      />
    </>
  );
}

const PostUploadWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  textarea {
    border: none;
    width: calc(100% - 60px);
    min-height: 140px;
    padding: 10px;
    box-sizing: border-box;
    line-height: 1.2em;
    white-space: pre-wrap;
    resize: vertical;
    font-family: inherit;
    
    &:focus {
      outline: none;
    }
    
    &::placeholder {
      color: var(--basic-grey);
    }
  }
`;

const UploadImg = styled.img`
  margin-top: 10px;
  display: block;
  overflow: hidden;
  width: 75%;
  object-fit: cover;
  border-radius: 10px;
  margin-left: 53px;
  max-height: 400px;
`;

export default PostUploadContainer;