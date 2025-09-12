import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import { SImage } from '../../../shared/components/UserImage/UserImage';
import buttonImg from '../../../shared/assets/images/upload-file.svg';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import authAtom from '../../../app/store/authToken';
import Layout from '../../../app/styles/Layout';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import useFetchToken from '../../../shared/hooks/UseFetchToken';
import UserProfileCircle from '../../../shared/components/User/UserProfileCircle';

export default function PostUpload() {
  const navigate = useNavigate();
  const user = 'nigonego';

  const [isFormValid, setIsFormValid] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // user 데이터 저장
  const [userImage, setUserImage] = useState('');
  const [userContent, setUserContent] = useState('');

  const auth = useRecoilValue(authAtom);
  const { postPostUpload, postJoinImage } = useFetchToken();

  useEffect(() => {
    if (content && image) {
      setIsFormValid(true);
    }
  }, [content, image]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    postJoinImage(formData).then(response => {
      if (response?.data?.filename) {
        setImage(`https://api.mandarin.weniv.co.kr/${response.data.filename}`);
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postPostUpload(content, image).then(response => {
      navigate('/myprofile');
    });
  };

  return (
    <>
      <HeaderBasicNav disabled={!isFormValid}>업로드</HeaderBasicNav>
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
          {image.length > 0 && <UploadImg src={image} alt="" />}
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
  /* box-shadow: inset 0 0 10px red; */
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
  }
`;

const UploadImg = styled.img`
  margin-top: 10px;
  display: block;
  overflow: hidden;
  width: 75%;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 53px;
`;

// const UploadButtonStyle = styled.div`
//   position: fixed;
//   bottom: 16px;
//   right: 16px;
//   label {
//     width: 50px;
//     height: 50px;
//     display: inline-block;
//     background-image: url(${buttonImg});
//     background-size: cover;
//   }
//
//   input {
//     display: none;
//   }
//
//   input::file-selector-button {
//     display: none;
//   }
// `;
