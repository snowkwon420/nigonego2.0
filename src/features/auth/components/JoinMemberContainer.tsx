import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import Input from '../../../shared/components/Input/Input';
import { ButtonLong } from '../../../shared/components/button/Button';
import { LImage } from '../../../shared/components/UserImage/UserImage';
import { useAuthAPI } from '../useAuthApi';

function JoinMemberContainer() {
  const [userName, setUserName] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [userIntro, setUserIntro] = useState<string>('');
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);
  const [isUserIDValid, setIsUserIDValid] = useState<boolean>(false);
  const [errorMessageID, setErrorMessageID] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  const { postJoinMember } = useAuthAPI();

  const [userInfo, setUserInfo] = useState({
    user: {
      username: '',
      email: location.state?.email || '',
      password: location.state?.password || '',
      accountname: '',
      intro: '',
      image: '',
    },
  });

  // 이미지 업로드 (임시로 기존 방식 유지, 추후 개선 필요)
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    // TODO: 이미지 업로드 API를 features로 이동 필요
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app'}/image/uploadfile`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.filename) {
        const imageUrl = `${process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app'}/${data.filename}`;
        setUserImage(imageUrl);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // 사용자 이름 변경
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
  };

  // 사용자 이름 검증
  const handleNameValid = () => {
    if (userName.length >= 2 && userName.length <= 10) {
      setIsUserNameValid(true);
    } else {
      setIsUserNameValid(false);
    }
  };

  // 계정 ID 변경
  const handleUserIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserID = e.target.value;
    setUserID(newUserID);
    setIsUserIDValid(false);
    if (/^[a-zA-Z0-9]+$/.test(newUserID)) {
      setErrorMessageID('');
    }
  };

  // 계정 ID 검증 (임시로 기존 방식 유지, 추후 개선 필요)
  const handleIdValid = async () => {
    const testID = /^[a-zA-Z0-9]+$/.test(userID);

    if (testID) {
      try {
        // TODO: 계정 중복 확인 API를 features로 이동 필요
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app'}/user/accountnamevalid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              accountname: userID,
            },
          }),
        });
        const data = await response.json();

        if (data.message === '이미 가입된 계정ID 입니다.') {
          setIsUserIDValid(false);
          setErrorMessageID('이미 사용 중인 ID 입니다.');
        } else {
          setIsUserIDValid(true);
          setErrorMessageID('');
        }
      } catch (error) {
        setIsUserIDValid(false);
        setErrorMessageID('계정 확인 중 오류가 발생했습니다.');
        console.error('Account validation error:', error);
      }
    } else {
      setIsUserIDValid(false);
      setErrorMessageID('*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
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
    const updateUserInfo = {
      username: userName,
      email: userInfo.user.email,
      password: userInfo.user.password,
      accountname: userID,
      intro: userIntro,
      image: userImage,
    };

    if (isUserNameValid && isUserIDValid) {
      setIsFormValid(true);
      try {
        await postJoinMember(updateUserInfo);
        navigate('/login');
      } catch (error) {
        console.error('Join member error:', error);
        setIsFormValid(false);
      }
    } else {
      setIsFormValid(false);
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

        {isFormValid ? (
          <ButtonLong
            type="submit"
            disabled={false}
          >
            니고네고 시작하기
          </ButtonLong>
        ) : (
          <ButtonLong
            type="submit"
            disabled={true}
          >
            니고네고 시작하기
          </ButtonLong>
        )}
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