import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//사용자 토큰
export const authTokenAtom = atom<string>({
  key: 'authToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

//사용자 accountName
export const accountNameAtom = atom<string>({
  key: 'accountName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

//로그인 여부
export const isLoginAtom = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
