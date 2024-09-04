import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  accountName: string;
  authToken: string;
  isLogin: boolean;

  // 상태를 변경하는 함수들에 대한 타입 정의
  setAccountName: (name: string) => void;
  setAuthToken: (token: string) => void;
  setIsLogin: (loginStatus: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      accountName: '',
      authToken: '',
      isLogin: false,

      setAccountName: (name: string) => set({ accountName: name }),
      setAuthToken: (token: string) => set({ authToken: token }),
      setIsLogin: (loginStatus: boolean) => set({ isLogin: loginStatus }),
    }),
    {
      name: 'app-store', // localStorage에 저장될 키 값
      getStorage: () => localStorage, // localStorage 사용
    },
  ),
);
