import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  HeadingWrapper,
  FormWrapper,
  ImageWrapper,
} from '../../../pages/ProfilePage/ProfileEditPage/ProfileEditStyle';
import Input from '../../../shared/components/Input/Input';
import { LImage } from '../../../shared/components/UserImage/UserImage';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import authAtom from '../../../app/store/authToken';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import { useProfileAPI } from '../useProfileApi';

function ProfileEditContainer() {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [userIntro, setUserIntro] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isUserIDValid, setIsUserIDValid] = useState(false);
  const [errorMessageID, setErrorMessageID] = useState('');
  const [userImage, setUserImage] = useState('');

  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const { postJoinMemberValid } = useProfileAPI();

  // 사용자 이름 변경
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
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

  // 소개 변경
  const handleUserIntro = (e: ChangeEvent<HTMLInputElement>) => {
    setUserIntro(e.target.value);
  };

  // 사용자 이름 검증
  const handleNameValid = () => {
    if (userName.length >= 2 && userName.length <= 10) {
      setIsUserNameValid(true);
    } else {
      setIsUserNameValid(false);
    }
  };

  // 계정 ID 검증
  const handleIdValid = async () => {
    const testID = /^[a-zA-Z0-9]+$/.test(userID);

    if (testID) {
      try {
        const res = await postJoinMemberValid({ user: { accountname: userID } });
        if (res?.message === '이미 가입된 계정ID 입니다.') {
          setIsUserIDValid(false);
          setErrorMessageID('이미 사용 중인 ID 입니다.');
        } else {
          setIsUserIDValid(true);
          setIsFormValid(true);
        }
      } catch (error) {
        console.error('Account validation error:', error);
        setIsUserIDValid(false);
        setErrorMessageID('계정 확인 중 오류가 발생했습니다.');
      }
    } else {
      setIsUserIDValid(false);
      setIsFormValid(false);
      setErrorMessageID('*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
    }
  };

  // 이미지 업로드 (임시로 기존 방식 유지, 추후 개선 필요)
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app';
      const response = await fetch(`${API_BASE_URL}/image/uploadfile`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.filename) {
        const imageUrl = `${API_BASE_URL}/${result.filename}`;
        setUserImage(imageUrl);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // 프로필 수정 제출
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUserNameValid && isUserIDValid) {
      setIsFormValid(true);
      try {
        // TODO: 프로필 수정 API를 features로 이동 필요
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://eager-emogene-nigonego-9b3dee94.koyeb.app';
        const response = await fetch(`${API_BASE_URL}/user`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              username: userName,
              accountname: userID,
              intro: userIntro,
              image: userImage,
            },
          }),
        });

        if (response.ok) {
          console.log('프로필 수정 성공');
          navigate('/homefeed');
        } else {
          throw new Error('프로필 수정 실패');
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
        setIsUserNameValid(true);
      }
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <BodyGlobal>
      <HeadingWrapper>
        <h1>프로필 설정</h1>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
      </HeadingWrapper>

      <ImageWrapper>
        <LImage backgroundUrl={userImage} />
        <FileUploadInput
          id="input"
          type="file"
          onChange={handleImageUpload}
        />
      </ImageWrapper>

      <form onSubmit={handleSubmit}>
        <FormWrapper>
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
            onBlur={handleIdValid}
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
        </FormWrapper>
      </form>
    </BodyGlobal>
  );
}

export default ProfileEditContainer;