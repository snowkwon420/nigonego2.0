import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import UserProfileCircle from '../../../shared/components/User/UserProfileCircle';
import { usePostApi } from '../usePostApi';

function PostUploadContainer() {
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const { postPostUpload } = usePostApi();

  // 폼 유효성 검사
  useEffect(() => {
    if (content && image) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [content, image]);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      // TODO: 이미지 업로드 API를 공통 기능으로 분리 필요
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app';
      const response = await fetch(`${API_BASE_URL}/image/uploadfile`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.filename) {
        setImage(`${API_BASE_URL}/${result.filename}`);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // 게시물 업로드 제출
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      await postPostUpload(content, image);
      navigate('/myprofile');
    } catch (error) {
      console.error('Post upload error:', error);
    }
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