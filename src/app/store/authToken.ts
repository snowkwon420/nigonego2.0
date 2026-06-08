import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const authAtom = atom<string>({
  key: 'authToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
