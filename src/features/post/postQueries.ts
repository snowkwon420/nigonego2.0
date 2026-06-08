import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import { Post } from '../../shared/types';
import { pickArray, pickObject } from '../../shared/utils/apiResponse';
import * as postAPI from './postApi';
import { feedQueryKeys } from '../feed/feedQueries';

export const postQueryKeys = {
  all: ['posts'] as const,
  userList: (accountName: string) => [...postQueryKeys.all, 'user', accountName] as const,
  detail: (postId: string) => [...postQueryKeys.all, 'detail', postId] as const,
};

export const useUserPostsQuery = (accountName: string) => {
  const token = useRecoilValue(authTokenAtom);

  return useQuery({
    queryKey: postQueryKeys.userList(accountName),
    queryFn: async () => {
      const response = await postAPI.getPostListLimit(accountName, token);
      return pickArray<Post>(response, ['post', 'posts']);
    },
    enabled: Boolean(token && accountName),
  });
};

export const usePostDetailQuery = (postId: string) => {
  const token = useRecoilValue(authTokenAtom);

  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: async () => {
      const response = await postAPI.getUserData(postId, token);
      return pickObject<Post>(response, ['post']);
    },
    enabled: Boolean(token && postId),
  });
};

export const useTogglePostHeartMutation = (postId: string) => {
  const token = useRecoilValue(authTokenAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nextHearted: boolean) => {
      return nextHearted
        ? postAPI.postHeart(postId, token)
        : postAPI.deleteHeart(postId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.all });
    },
  });
};

export const useCreatePostMutation = () => {
  const token = useRecoilValue(authTokenAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, image }: { content: string; image: string }) =>
      postAPI.postPostUpload({ content, image }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.all });
    },
  });
};
