import createAxiosInstance from '@/shared/lib/axios';

// 게시글 업로드
export const postPostUpload = async (
  {
    content,
    image,
  }: {
    content: string;
    image: string;
  },
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post('/post', {
    post: {
      content,
      image,
    },
  });
  return response.data;
};

// 유저 게시글 리스트 (limit 없이 전부 가져옴)
export const getPostListLimit = async (accountName: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/post/${accountName}/userpost`);
  return response.data;
};

// 게시글 상세 조회
export const getUserData = async (postId: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/post/${postId}`);
  return response.data;
};

// 게시글 좋아요
export const postHeart = async (postId: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post(`/post/${postId}/heart`);
  return response.data;
};

// 게시글 좋아요 취소
export const deleteHeart = async (postId: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.delete(`/post/${postId}/unheart`);
  return response.data;
};
