import createAxiosInstance from '../../shared/lib/axios';

// 댓글 목록 가져오기
export const getCommentList = async (postId: string, token: string) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.get(`/post/${postId}/comments`);
  return response.data;
};

// 댓글 작성
export const postComment = async (
  postId: string,
  content: string,
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.post(`/post/${postId}/comments`, {
    comment: {
      content,
    },
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (
  postId: string,
  commentId: string,
  token: string,
) => {
  const { instance } = createAxiosInstance(token);
  const response = await instance.delete(`/post/${postId}/comments/${commentId}`);
  return response.data;
};
