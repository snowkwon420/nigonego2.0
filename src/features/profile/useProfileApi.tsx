import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '@/features/auth/store';
import * as profileAPI from './profileApi';

export const useProfileAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
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
  };
};
