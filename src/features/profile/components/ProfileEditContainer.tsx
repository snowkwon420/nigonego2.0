import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeadingWrapper,
  FormWrapper,
  ImageWrapper,
} from '../../../pages/ProfilePage/ProfileEditPage/ProfileEditStyle';
import Input from '../../../shared/components/Input/Input';
import { LImage } from '../../../shared/components/UserImage/UserImage';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import FileUploadInput from '../../../shared/components/Input/FileUploadInput';
import { useProfileAPI } from '../useProfileApi';
import { useImageUpload } from '../../../shared/hooks/useImageUpload';
import {
  validateUsername,
  validateAccountId,
  getUsernameErrorMessage,
  getAccountIdErrorMessage,
} from '../../../shared/utils/validation';

interface ProfileEditContainerProps {
  onValidityChange: (isValid: boolean) => void;
  onSubmitRef: (fn: () => void) => void;
}

function ProfileEditContainer({ onValidityChange, onSubmitRef }: ProfileEditContainerProps) {
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [userIntro, setUserIntro] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isUserIDValid, setIsUserIDValid] = useState(true);
  const [errorMessageID, setErrorMessageID] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [originalAccountname, setOriginalAccountname] = useState('');

  const navigate = useNavigate();
  const { postJoinMemberValid, getProfileData, updateProfile } = useProfileAPI();
  const { uploadImage } = useImageUpload();

  // 기존 프로필 데이터 로드
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await getProfileData();
      const user = response?.user || response?.data?.user;

      if (user) {
        setUserName(user.username || '');
        setUserID(user.accountname || '');
        setOriginalAccountname(user.accountname || '');
        setUserIntro(user.intro || '');
        setUserImage(user.image || '');
      }
    } catch (error) {
      console.error('프로필 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    setIsUserNameValid(validateUsername(userName));
  };

  // 계정 ID 검증
  const handleIdValid = async () => {
    // 기존 계정명과 동일하면 검증 통과
    if (userID === originalAccountname) {
      setIsUserIDValid(true);
      setErrorMessageID('');
      return;
    }

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

  // 이미지 업로드
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setUserImage(imageUrl);
    }
  };

  // 폼 유효성 체크 및 부모 컴포넌트에 전달
  useEffect(() => {
    const isValid = isUserNameValid && isUserIDValid && userName.length >= 2;
    onValidityChange(isValid);
  }, [isUserNameValid, isUserIDValid, userName, onValidityChange]);

  // 프로필 수정 제출
  const handleSubmit = useCallback(async () => {
    if (!isUserNameValid || !isUserIDValid) {
      return;
    }

    try {
      await updateProfile({
        user: {
          username: userName,
          accountname: userID,
          intro: userIntro,
          image: userImage,
        },
      });
      navigate('/homefeed');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  }, [userName, userID, userIntro, userImage, isUserNameValid, isUserIDValid, updateProfile, navigate]);

  // 부모 컴포넌트에 제출 함수 전달
  useEffect(() => {
    onSubmitRef(handleSubmit);
  }, [handleSubmit, onSubmitRef]);

  if (isLoading) {
    return (
      <BodyGlobal>
        <div style={{ textAlign: 'center', padding: '50px', color: '#767676' }}>
          프로필을 불러오는 중...
        </div>
      </BodyGlobal>
    );
  }

  return (
    <BodyGlobal>
      <HeadingWrapper>
        <h1>프로필 수정</h1>
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
          errorMessage={!isUserNameValid && userName ? getUsernameErrorMessage(userName) : ''}
        />
        <Input
          label="계정ID"
          type="text"
          id="user-ID"
          name="user-ID"
          placeholder="영문, 숫자, 밑줄, 마침표만 사용가능"
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
    </BodyGlobal>
  );
}

export default ProfileEditContainer;