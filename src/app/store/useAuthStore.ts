import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string;
  accountName: string;
  yourAccount: string;
  following: string;
  isLogin: boolean;
  setAuth: (token: string, accountName: string) => void;
  setToken: (token: string) => void;
  setAccountName: (accountName: string) => void;
  setYourAccount: (yourAccount: string) => void;
  setFollowing: (following: string) => void;
  logout: () => void;
}

const getLegacyRecoilState = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const legacyState = window.localStorage.getItem('recoil-persist');
    if (!legacyState) {
      return {};
    }

    const parsed = JSON.parse(legacyState);
    const token = typeof parsed.authToken === 'string' ? parsed.authToken : '';
    const accountName =
      typeof parsed.accountname === 'string' ? parsed.accountname : '';
    const following = typeof parsed.following === 'string' ? parsed.following : '';

    return {
      token,
      accountName,
      following,
      isLogin: Boolean(token),
    };
  } catch (error) {
    return {};
  }
};

const clearLegacyRecoilState = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('recoil-persist');
  }
};

const initialState = {
  token: '',
  accountName: '',
  yourAccount: '',
  following: '',
  isLogin: false,
  ...getLegacyRecoilState(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (token, accountName) =>
        set({
          token,
          accountName,
          isLogin: Boolean(token),
        }),
      setToken: (token) =>
        set({
          token,
          isLogin: Boolean(token),
        }),
      setAccountName: (accountName) => set({ accountName }),
      setYourAccount: (yourAccount) => set({ yourAccount }),
      setFollowing: (following) => set({ following }),
      logout: () => {
        clearLegacyRecoilState();
        set({
          token: '',
          accountName: '',
          yourAccount: '',
          following: '',
          isLogin: false,
        });
      },
    }),
    {
      name: 'nigonego-auth',
    },
  ),
);
