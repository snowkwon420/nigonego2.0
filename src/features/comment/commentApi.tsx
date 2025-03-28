import createAxiosInstance from '@/shared/lib/axios';

// 댓글 목록 가져오기
export const getCommentList = async (postId: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/post/${postId}/comments`);
  return response.data;
};
