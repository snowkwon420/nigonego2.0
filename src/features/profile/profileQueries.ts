import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import * as profileAPI from './profileApi';
import { User } from '../../shared/types';
import { pickArray, pickObject } from '../../shared/utils/apiResponse';

export const profileQueryKeys = {
  all: ['profile'] as const,
  my: (token: string) => [...profileQueryKeys.all, 'my', token] as const,
  followList: (accountName: string, type: 'follower' | 'following') =>
    [...profileQueryKeys.all, 'follow', accountName, type] as const,
};

export const useMyProfileQuery = () => {
  const token = useRecoilValue(authTokenAtom);

  return useQuery({
    queryKey: profileQueryKeys.my(token),
    queryFn: async () => {
      const response = await profileAPI.getProfileData(token);
      return pickObject<User>(response, ['user']);
    },
    enabled: Boolean(token),
  });
};

export const useUpdateProfileMutation = () => {
  const token = useRecoilValue(authTokenAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      user: {
        username: string;
        accountname: string;
        intro: string;
        image: string;
      };
    }) => profileAPI.updateProfile(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });
};

export const useFollowListQuery = (
  accountName: string,
  type: 'follower' | 'following',
) => {
  const token = useRecoilValue(authTokenAtom);

  return useQuery({
    queryKey: profileQueryKeys.followList(accountName, type),
    queryFn: async () => {
      const response = await profileAPI.getFollowData(accountName, type, token);
      return pickArray<User>(response, [type, 'users']);
    },
    enabled: Boolean(token && accountName),
  });
};
