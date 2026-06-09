import { useMemo } from 'react';
import * as postAPI from './postApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const usePostApi = () => {
  const token = useAuthStore((state) => state.token);

  return useMemo(() => ({
    // 게시글 업로드
    postPostUpload: (content: string, image: string) =>
      postAPI.postPostUpload({ content, image }, token),

    // 유저 게시글 리스트
    getPostListLimit: (accountName: string) =>
      postAPI.getPostListLimit(accountName, token),

    // 게시글 상세 조회
    getUserData: (postId: string) => postAPI.getUserData(postId, token),

    // 좋아요 & 좋아요 취소
    postHeart: (postId: string) => postAPI.postHeart(postId, token),
    deleteHeart: (postId: string) => postAPI.deleteHeart(postId, token),
  }), [token]);
};
