import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Input from '../../shared/components/Input/Input';
import { followingAtom } from '../../app/store/atoms';
import authAtom from '../../app/store/authToken';
import accountNameAtom from '../../app/store/accountName';
import MainWrapperF from '../../app/styles/MainGlobal';
import { ButtonLong } from '../../shared/components/button/Button';
import Layout from '../../app/styles/Layout';
import UseFetchToken from '../../shared/hooks/UseFetchToken';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [pwErrMsg, setPwErrMsg] = useState<string>('');
  const [loginErrMessage, setLoginErrMessage] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [auth, setAuth] = useRecoilState(authAtom);
  const [accountname, setAccountname] = useRecoilState(accountNameAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);
  const { postLogin, getUserInfo } = UseFetchToken();

  const navigate = useNavigate();

  //이메일 검증 시작
  function emailCheck(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    const testEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        event.target.value,
      );
    if (event.target.value == '') {
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
  //이메일 검증 끝

  //패스워드 validation 시작
  function passwordCheck(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    const testPassword = /^[A-Za-z0-9]{5,20}$/;
    if (event.target.value === '') {
      setPwErrMsg('');
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
  //패스워드 validataion 끝

  //여기서 then 과 await의 차이점이 뭔지 모르고 사용했음
  //submit 버튼 시작//
  async function onhandlesubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitHandler();
  }
  //submit 버튼 끝//

  //postLogin 요청 시작//
  const submitHandler = async () => {
    const res = await postLogin({ user: { email: email, password: password } });
    if (res?.data?.user) {
      const { token, accountname } = res.data.user;
      setAuth(token);
      setAccountname(accountname);
      navigate('/homefeed');
    } else if (res?.data?.status === 422) {
      setIsCorrect(false);
      setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };
  //postLogin 요청 끝//

  return (
    <Wrapper>
      <h1>로그인</h1>
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
      <LinkWrapper>
        <Link to="/join">이메일로 회원가입</Link>
      </LinkWrapper>
    </Wrapper>
  );
}

export default LoginPage;

export const Wrapper = styled.div`
  width: 80%;
  margin: 0px auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 18px;
  text-align: center;
  color: var(--basic-grey);
`;

export const LinkWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  color: var(--basic-grey);
`;
