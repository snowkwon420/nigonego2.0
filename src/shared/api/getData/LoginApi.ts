import axios from 'axios';
import { URL } from '../URL';

// API 응답 타입을 정의합니다.
interface LoginSuccessResponse {
  user: {
    token: string;
    accountname: string;
    email: string;
  };
}

interface LoginFailResponse {
  status: number;
  message: string;
}

const LoginApi = async (
  email: string,
  password: string,
  setAuth: (token: string) => void,
  setAccountname: (name: string) => void,
  FollowingData: (token: string) => Promise<void>,
  setIsCorrect: (isCorrect: boolean) => void,
  setLoginErrMessage: (message: string) => void,
): Promise<void> => {
  try {
    const res = await axios.post<LoginSuccessResponse | LoginFailResponse>(
      `${URL}/user/login`,
      {
        user: {
          email,
          password,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = res.data;
    if ('user' in data) {
      const { token, accountname } = data.user;
      console.log(data.user.email);
      setAuth(token);
      setAccountname(accountname);
      await FollowingData(token);
    } else if ('status' in data && data.status === 422) {
      setIsCorrect(false);
      setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    // 422 에러에 대한 axios의 일반적인 에러 처리는 catch 블록에서 이루어집니다.
    // 원본 코드의 로직을 유지하되, 네트워크 오류 등 다른 예외 상황도 처리할 수 있도록 개선합니다.
    setIsCorrect(false);
    setLoginErrMessage('*이메일 또는 비밀번호가 일치하지 않습니다.');
    console.error('Login API error:', error);
  }
};

export default LoginApi;
