import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../shared/components/Input/Input';
import { ButtonLong } from '../../../shared/components/button/Button';
import { FormWrapper } from '../../../pages/LoginPage/LoginPage';
import { useAuthAPI } from '../useAuthApi';
import {
  validateEmail,
  validatePassword,
  getEmailErrorMessage,
  getPasswordErrorMessage,
} from '../../../shared/utils/validation';

function JoinContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [errorMessageEM, setErrorMessageEM] = useState('');
  const [errorMessagePW, setErrorMessagePW] = useState('');

  const navigate = useNavigate();
  const { postJoin } = useAuthAPI();

  // 이메일 검증
  function emailCheck(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === '') {
      setIsEmailValid(null);
      setErrorMessageEM('');
    } else {
      const isValid = validateEmail(value);
      setIsEmailValid(isValid);
      setErrorMessageEM(isValid ? '' : getEmailErrorMessage(value));
    }
  }

  // 비밀번호 검증
  function passwordCheck(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === '') {
      setIsPasswordValid(null);
      setErrorMessagePW('');
    } else {
      const isValid = validatePassword(value);
      setIsPasswordValid(isValid);
      setErrorMessagePW(isValid ? '' : getPasswordErrorMessage(value));
    }
  }

  // 이메일 유효성 검사 및 다음 단계로 이동
  async function onhandlesubmit() {
    try {
      const res = await postJoin({ user: { email } });
      if (res?.message === '이미 가입된 이메일 주소 입니다.') {
        setIsEmailValid(false);
        setErrorMessageEM('*이미 가입된 이메일 주소입니다.');
      } else {
        navigate('/joinmember', {
          state: {
            email,
            password,
          },
        });
      }
    } catch (error) {
      setIsEmailValid(false);
      setErrorMessageEM('*이메일 확인 중 오류가 발생했습니다.');
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onhandlesubmit();
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        label="이메일"
        type="email"
        id="user-email"
        name="user-email"
        placeholder="이메일 주소를 입력해 주세요."
        value={email}
        onChange={event => {
          setEmail(event.target.value);
          emailCheck(event);
        }}
        isCorrect={isEmailValid ?? undefined}
        errorMessage={errorMessageEM}
      />
      <Input
        label="비밀번호"
        type="password"
        id="user-password"
        name="user-password"
        placeholder="비밀번호를 설정해 주세요."
        value={password}
        onChange={event => {
          setPassword(event.target.value);
          passwordCheck(event);
        }}
        isCorrect={isPasswordValid ?? undefined}
        errorMessage={errorMessagePW}
      />
      {isEmailValid && isPasswordValid ? (
        <ButtonLong type="submit" disabled={false}>
          다음
        </ButtonLong>
      ) : (
        <ButtonLong disabled={true}>
          다음
        </ButtonLong>
      )}
    </FormWrapper>
  );
}

export default JoinContainer;