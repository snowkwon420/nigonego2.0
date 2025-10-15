import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 사용자 토큰 (통합)
export const authTokenAtom = atom<string>({
  key: 'authToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 사용자 accountName (통합)
export const accountNameAtom = atom<string>({
  key: 'accountname',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 로그인 여부
export const isLoginAtom = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 하위 호환성을 위한 기본 export
export default authTokenAtom;
