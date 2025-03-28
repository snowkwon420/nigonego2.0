import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '@/features/auth/store';
import * as authAPI from './authApi';

export const useAuthAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
    // 로그인 (token 불필요)
    postLogin: authAPI.postLogin,

    // 이메일 유효성 검사 (token 필요)
    postJoin: (data: { user: { email: string } }) =>
      authAPI.postJoin(data, token),

    // 회원가입
    postJoinMember: (userInfo: {
      username: string;
      email: string;
      password: string;
      accountname: string;
      intro: string;
      image: string;
    }) => authAPI.postJoinMember(userInfo, token),

    // 내 정보 가져오기
    getUserInfo: () => authAPI.getUserInfo(token),
  };
};
