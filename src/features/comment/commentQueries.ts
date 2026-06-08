import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import { Comment } from '../../shared/types';
import { pickArray } from '../../shared/utils/apiResponse';
import * as commentAPI from './commentApi';

export const commentQueryKeys = {
  all: ['comments'] as const,
  list: (postId: string) => [...commentQueryKeys.all, postId] as const,
};

export const useCommentListQuery = (postId: string) => {
  const token = useRecoilValue(authTokenAtom);

  return useQuery({
    queryKey: commentQueryKeys.list(postId),
    queryFn: async () => {
      const response = await commentAPI.getCommentList(postId, token);
      return pickArray<Comment>(response, ['comments', 'comment']);
    },
    enabled: Boolean(token && postId),
  });
};

export const useCreateCommentMutation = (postId: string) => {
  const token = useRecoilValue(authTokenAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentAPI.postComment(postId, content, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryKeys.list(postId) });
    },
  });
};
