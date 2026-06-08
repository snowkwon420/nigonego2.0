import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { authTokenAtom } from '../auth/store';
import * as feedAPI from './feedApi';

export const useFeedAPI = () => {
  const token = useRecoilValue(authTokenAtom);

  return useMemo(() => ({
    getHomeFeed: (limit: number, skip: number) =>
      feedAPI.getHomeFeed(limit, skip, token),

    getFullFeed: () => feedAPI.getFullFeed(token),
  }), [token]);
};
