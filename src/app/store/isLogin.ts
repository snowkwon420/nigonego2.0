import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isLogin = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default isLogin;
