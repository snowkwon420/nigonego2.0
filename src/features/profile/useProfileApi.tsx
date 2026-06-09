import { useMemo } from 'react';
import * as profileAPI from './profileApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const useProfileAPI = () => {
  const token = useAuthStore((state) => state.token);

  return useMemo(() => ({
    // 계정명 유효성 검사
    postJoinMemberValid: (data: { user: { accountname: string } }) =>
      profileAPI.postJoinMemberValid(data, token),

    // 프로필 이미지 업로드
    postJoinImage: (formData: FormData) =>
      profileAPI.postJoinImage(formData, token),

    // 내 프로필 정보 조회
    getProfileData: () => profileAPI.getProfileData(token),

    // 팔로잉 / 팔로워 리스트
    getFollowData: (accountname: string, type: 'follower' | 'following') =>
      profileAPI.getFollowData(accountname, type, token),

    // 특정 유저 프로필 정보
    getUserFeed: (accountname: string) =>
      profileAPI.getUserFeed(accountname, token),

    // 프로필 수정
    updateProfile: (data: {
      user: {
        username: string;
        accountname: string;
        intro: string;
        image: string;
      };
    }) => profileAPI.updateProfile(data, token),
  }), [token]);
};
