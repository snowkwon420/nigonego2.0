import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import { POSTS_PER_PAGE } from '../../shared/constants/pagination';
import { Post } from '../../shared/types';
import { pickArray } from '../../shared/utils/apiResponse';
import * as feedAPI from './feedApi';

export const feedQueryKeys = {
  all: ['feed'] as const,
  home: ['feed', 'home'] as const,
};

export const useHomeFeedQuery = () => {
  const token = useRecoilValue(authTokenAtom);

  return useInfiniteQuery({
    queryKey: feedQueryKeys.home,
    queryFn: async ({ pageParam }) => {
      const response = await feedAPI.getHomeFeed(
        POSTS_PER_PAGE,
        Number(pageParam),
        token,
      );
      return pickArray<Post>(response, ['posts', 'post']);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined;
      }

      return allPages.length * POSTS_PER_PAGE;
    },
    enabled: Boolean(token),
  });
};
