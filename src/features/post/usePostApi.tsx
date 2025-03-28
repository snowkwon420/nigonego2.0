import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '@/features/auth/store';
import * as postAPI from './postApi';

export const usePostApi = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
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
  };
};
