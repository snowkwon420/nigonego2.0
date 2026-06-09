import * as authAPI from './authApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const useAuthAPI = () => {
  const token = useAuthStore((state) => state.token);

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
