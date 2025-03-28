import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '@/features/auth/store';
import * as feedAPI from './feedApi';

export const useFeedAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return {
    getHomeFeed: (limit: number, skip: number) =>
      feedAPI.getHomeFeed(limit, skip, token),

    getFullFeed: () => feedAPI.getFullFeed(token),
  };
};
