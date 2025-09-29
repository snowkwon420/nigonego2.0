import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Input from '../../../shared/components/Input/Input';
import { followingAtom } from '../../../app/store/atoms';
import authAtom from '../../../app/store/authToken';
import accountNameAtom from '../../../app/store/accountName';
import { ButtonLong } from '../../../shared/components/button/Button';
import { useAuthAPI } from '../useAuthApi';
import { FormWrapper } from '../../../pages/LoginPage/LoginPage';

function LoginContainer() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [loginErrMessage, setLoginErrMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [auth, setAuth] = useRecoilState(authAtom);
  const [accountname, setAccountname] = useRecoilState(accountNameAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);

  const { postLogin } = useAuthAPI();
  const navigate = useNavigate();

  // 이메일 검증
  function emailCheck(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    const testEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        event.target.value,
      );
    if (event.target.value === '') {
      setEmailErrMsg('');
    } else {
      if (testEmail) {
        setIsEmailValid(true);
        setEmailErrMsg('');
      } else {
        setIsEmailValid(false);
        setEmailErrMsg('올바르지 않은 이메일 형식입니다.');
      }
    }
  }

  // 패스워드 검증
  function passwordCheck(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    const testPassword = /^[A-Za-z0-9]{5,20}$/;
    if (event.target.value === '') {
      setLoginErrMessage('');
    } else {
      if (!event.target.value.match(testPassword)) {
        setIsPasswordValid(false);
        setLoginErrMessage('비밀번호 5자 이상 입력하세요');
      } else {
        setIsPasswordValid(true);
        setLoginErrMessage('');
      }
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
      const res = await postLogin({ user: { email, password } });
      if (res?.user) {
        const { token, accountname } = res.user;
        setAuth(token);
        setAccountname(accountname);
        navigate('/homefeed');
      } else {
        setIsCorrect(false);
        setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setIsCorrect(false);
      setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
      console.error('Login error:', error);
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