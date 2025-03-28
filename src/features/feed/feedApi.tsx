import createAxiosInstance from '@/shared/lib/axios';

// 홈 피드: limit/skip 적용해서 가져오기
export const getHomeFeed = async (
  limit: number,
  skip: number,
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(
    `/post/feed/?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};

// 전체 홈 피드 (limit 없이)
export const getFullFeed = async (token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get('/post/feed');
  return response.data;
};
