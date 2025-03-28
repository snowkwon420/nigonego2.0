import createAxiosInstance from '../../shared/lib/axios';

// 1. 로그인 요청
export const postLogin = async (data: {
  user: { email: string; password: string };
}) => {
  const { instance } = createAxiosInstance();
  const response = await instance.post('/user/login', data);
  return response.data;
};

// 2. 이메일 유효성 검사
export const postJoin = async (
  data: { user: { email: string } },
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post('/user/emailvalid', data);
  return response.data;
};

// 3. 회원가입 요청
export const postJoinMember = async (
  userInfo: {
    username: string;
    email: string;
    password: string;
    accountname: string;
    intro: string;
    image: string;
  },
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post('/user', userInfo);
  return response.data;
};

// 4. 로그인 후 내 정보 가져오기
export const getUserInfo = async (token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get('/user/myinfo');
  return response.data;
};
