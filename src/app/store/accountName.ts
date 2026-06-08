import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const accountNameAtom = atom<string>({
  key: 'accountname',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default accountNameAtom;
