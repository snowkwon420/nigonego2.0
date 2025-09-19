import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLong } from '../../shared/components/button/Button';
import Input from '../../shared/components/Input/Input';
import { FormWrapper, Wrapper } from '../LoginPage/LoginPage';
import UseFetchToken from '../../shared/hooks/UseFetchToken';

function JoinPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [errorMessageEM, setErrorMessageEM] = useState('');
  const [errorMessagePW, setErrorMessagePW] = useState('');
  const navigate = useNavigate();
  const { postJoin } = UseFetchToken();

  function emailCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const testEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        event.target.value,
      );
    if (event.target.value === '') {
      setIsEmailValid(null);
      setErrorMessageEM('');
    } else if (testEmail) {
      setIsEmailValid(true);
      setErrorMessageEM('');
    } else {
      setIsEmailValid(false);
      setErrorMessageEM('*이메일 형식이 유효하지 않습니다.');
    }
  }

  function passwordCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const testPassword = /^[A-Za-z0-9]{6,20}$/;
    if (event.target.value === '') {
      setIsPasswordValid(null);
      setErrorMessagePW('');
    } else if (event.target.value.match(testPassword)) {
      setIsPasswordValid(true);
      setErrorMessagePW('');
    } else {
      setIsPasswordValid(false);
      setErrorMessagePW('*비밀번호는 6자 이상이어야 합니다.');
    }
  }

  async function onhandlesubmit() {
    try {
      const res = await postJoin({ user: { email } });
      if (res?.data?.message === '이미 가입된 이메일 주소 입니다.') {
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
      console.log(error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onhandlesubmit();
  }

  return (
    <Wrapper>
      <h1>회원가입 페이지</h1>
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
    </Wrapper>
  );
}

export default JoinPage;