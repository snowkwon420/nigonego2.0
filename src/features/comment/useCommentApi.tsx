import { useMemo } from 'react';
import * as commentAPI from './commentApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const useCommentAPI = () => {
  const token = useAuthStore((state) => state.token);

  return useMemo(() => ({
    // 댓글 목록 조회
    getCommentList: (postId: string) =>
      commentAPI.getCommentList(postId, token),

    // 댓글 작성
    postComment: (postId: string, content: string) =>
      commentAPI.postComment(postId, content, token),

    // 댓글 삭제
    deleteComment: (postId: string, commentId: string) =>
      commentAPI.deleteComment(postId, commentId, token),
  }), [token]);
};
