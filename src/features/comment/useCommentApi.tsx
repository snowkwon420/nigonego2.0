import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import * as commentAPI from './commentApi';

export const useCommentAPI = () => {
  const token = useRecoilValue(authTokenAtom);

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
