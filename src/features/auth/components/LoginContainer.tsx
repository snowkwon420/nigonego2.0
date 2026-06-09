import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../shared/components/Input/Input';
import { ButtonLong } from '../../../shared/components/button/Button';
import * as authAPI from '../authApi';
import { FormWrapper } from '../../../pages/LoginPage/LoginPage';
import { useAuthStore } from '../../../app/store/useAuthStore';
import {
  validateEmail,
  validatePassword,
  getEmailErrorMessage,
} from '../../../shared/utils/validation';

function LoginContainer() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [loginErrMessage, setLoginErrMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  // 이메일 검증
  function emailCheck(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);

    if (value === '') {
      setEmailErrMsg('');
      setIsEmailValid(false);
    } else {
      const isValid = validateEmail(value);
      setIsEmailValid(isValid);
      setEmailErrMsg(isValid ? '' : getEmailErrorMessage(value));
    }
  }

  // 패스워드 검증
  function passwordCheck(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword(value);

    if (value === '') {
      setLoginErrMessage('');
      setIsPasswordValid(false);
    } else {
      const isValid = validatePassword(value);
      setIsPasswordValid(isValid);
      setLoginErrMessage(isValid ? '' : '비밀번호는 6~20자 이내로 입력해주세요.');
    }
  }

  // 폼 제출 핸들러
  async function onhandlesubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitHandler();
  }

  // 로그인 요청
  const submitHandler = async () => {
    try {
      const res = await authAPI.postLogin({ user: { email, password } });
      if (res?.user) {
        const { token, accountname } = res.user;
        setAuth(token, accountname);
        navigate('/homefeed');
      } else {
        setIsCorrect(false);
        setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setIsCorrect(false);
      setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <FormWrapper onSubmit={onhandlesubmit}>
      <Input
        label="이메일"
        type="email"
        id="user-email"
        name="user-email"
        placeholder=""
        value={email}
        onChange={event => emailCheck(event)}
        isCorrect={isEmailValid}
        errorMessage={emailErrMsg}
      />
      <Input
        label="비밀번호"
        type="password"
        id="user-password"
        name="user-password"
        placeholder=""
        value={password}
        onChange={event => passwordCheck(event)}
        isCorrect={isPasswordValid && (isCorrect ?? false)}
        errorMessage={loginErrMessage}
      />
      {isEmailValid && isPasswordValid ? (
        <ButtonLong type="submit" disabled={false}>
          로그인
        </ButtonLong>
      ) : (
        <ButtonLong disabled={true}>
          로그인
        </ButtonLong>
      )}
    </FormWrapper>
  );
}

export default LoginContainer;
