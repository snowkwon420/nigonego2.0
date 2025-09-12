import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const followingAtom = atom<string>({
  key: 'following',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
