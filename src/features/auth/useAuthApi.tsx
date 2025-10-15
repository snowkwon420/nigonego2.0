import { useRecoilValue } from 'recoil';
import { authTokenAtom } from './store';
import * as authAPI from './authApi';

export const useAuthAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
    // 로그인 (token 불필요)
    postLogin: authAPI.postLogin,

    // 이메일 유효성 검사 (token 불필요)
    postJoin: authAPI.postJoin,

    // 회원가입 (token 불필요)
    postJoinMember: authAPI.postJoinMember,

    // 내 정보 가져오기 (token 필요)
    getUserInfo: () => authAPI.getUserInfo(token),
  };
};
