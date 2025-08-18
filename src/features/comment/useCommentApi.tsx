import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import * as commentAPI from './commentApi';

export const useCommentAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
    getCommentList: (postId: string) =>
      commentAPI.getCommentList(postId, token),
  };
};
