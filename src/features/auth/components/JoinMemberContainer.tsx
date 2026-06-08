import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import Input from '../../../shared/components/Input/Input';
import { ButtonLong } from '../../../shared/components/button/Button';
import { LImage } from '../../../shared/components/UserImage/UserImage';
import { useAuthAPI } from '../useAuthApi';
import { useImageUpload } from '../../../shared/hooks/useImageUpload';
import { useProfileAPI } from '../../profile/useProfileApi';
import {
  validateUsername,
  validateAccountId,
  getUsernameErrorMessage,
  getAccountIdErrorMessage,
} from '../../../shared/utils/validation';

function JoinMemberContainer() {
  const [userName, setUserName] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [userIntro, setUserIntro] = useState<string>('');
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isUserIDValid, setIsUserIDValid] = useState<boolean>(false);
  const [errorMessageID, setErrorMessageID] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  const { postJoinMember } = useAuthAPI();
  const { uploadImage } = useImageUpload();
  const { postJoinMemberValid } = useProfileAPI();

  // 이미지 업로드
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setUserImage(imageUrl);
    }
  };

  // 사용자 이름 변경
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
  };

  // 사용자 이름 검증
  const handleNameValid = () => {
    setIsUserNameValid(validateUsername(userName));
  };

  // 계정 ID 변경
  const handleUserIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserID = e.target.value;
    setUserID(newUserID);
    setIsUserIDValid(false);
    setErrorMessageID('');
  };

  // 계정 ID 검증
  const handleIdValid = async () => {
    if (!validateAccountId(userID)) {
      setIsUserIDValid(false);
      setErrorMessageID(getAccountIdErrorMessage(userID));
      return;
    }

    try {
      const res = await postJoinMemberValid({ user: { accountname: userID } });
      if (res?.message === '이미 가입된 계정ID 입니다.') {
        setIsUserIDValid(false);
        setErrorMessageID('이미 사용 중인 ID 입니다.');
      } else {
        setIsUserIDValid(true);
        setErrorMessageID('');
      }
    } catch (error) {
      setIsUserIDValid(false);
      setErrorMessageID('계정 확인 중 오류가 발생했습니다.');
    }
  };

  const idValidHandler = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleIdValid();
  };

  // 소개 변경
  const handleUserIntro = (e: ChangeEvent<HTMLInputElement>) => {
    const newIntro = e.target.value;
    setUserIntro(newIntro);
  };

  // 회원가입 제출
  const handleSubmit = async () => {
    if (!isUserNameValid || !isUserIDValid) {
      return;
    }

    const updateUserInfo = {
      username: userName,
      email: location.state?.email || '',
      password: location.state?.password || '',
      accountname: userID,
      intro: userIntro,
      image: userImage,
    };

    try {
      await postJoinMember(updateUserInfo);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <HeadingWrapper>
        <h1>프로필 설정</h1>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
      </HeadingWrapper>

      <FileUploadWrapper>
        <LImage backgroundUrl={userImage} />
        <FileUploadInput
          id="input"
          type="file"
          onChange={handleImageUpload}
        />
      </FileUploadWrapper>

      <FormWrapper onSubmit={submitHandler}>
        <Input
          label="사용자이름"
          type="text"
          id="user-name"
          name="user-name"
          placeholder="2~10자 이내"
          value={userName}
          onChange={handleUserNameChange}
          onBlur={handleNameValid}
          errorMessage={!isUserNameValid && userName ? getUsernameErrorMessage(userName) : ''}
        />
        <Input
          label="계정ID"
          type="text"
          id="user-ID"
          name="user-ID"
          placeholder="영문, 숫자 특수문자만 사용가능"
          value={userID}
          onChange={handleUserIDChange}
          onBlur={idValidHandler}
          errorMessage={errorMessageID}
        />
        <Input
          label="소개"
          type="text"
          id="user-intro"
          name="user-intro"
          value={userIntro}
          onChange={handleUserIntro}
          placeholder="자신과 판매할 상품에 대해 소개"
        />

        <ButtonLong
          type="submit"
          disabled={!isUserNameValid || !isUserIDValid}
        >
          니고네고 시작하기
        </ButtonLong>
      </FormWrapper>
    </>
  );
}

const HeadingWrapper = styled.div`
  text-align: center;
`;

const FileUploadWrapper = styled.div`
  margin-top: 1.875rem;
  width: 112px;
  margin: auto;
  position: relative;

  .input-s {
    position: absolute;
    bottom: -3px;
    right: 3px;
  }
`;

const FormWrapper = styled.form`
  margin-top: 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 18px;

  label {
    color: var(--basic-grey);
    font-weight: bold;
  }
`;

export default JoinMemberContainer;