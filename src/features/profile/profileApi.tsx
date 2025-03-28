// features/profile/api.ts
import createAxiosInstance from '@/shared/lib/axios';

// 계정명 중복 검사
export const postJoinMemberValid = async (
  data: { user: { accountname: string } },
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post('/user/accountnamevalid', data);
  return response.data;
};

// 프로필 이미지 업로드
export const postJoinImage = async (formData: FormData, token: string) => {
  const { imageInstance } = createAxiosInstance(token);
  const response = await imageInstance.post('/image/uploadfile', formData);
  return response.data;
};

// 내 프로필 정보 가져오기
export const getProfileData = async (token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get('/user/myinfo');
  return response.data;
};

// 팔로잉 or 팔로워 리스트
export const getFollowData = async (
  accountname: string,
  type: 'follower' | 'following',
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/profile/${accountname}/${type}`);
  return response.data;
};

// 특정 유저 프로필 가져오기
export const getUserFeed = async (accountname: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/profile/${accountname}`);
  return response.data;
};
