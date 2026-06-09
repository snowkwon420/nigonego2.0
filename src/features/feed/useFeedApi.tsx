import { useMemo } from 'react';
import * as feedAPI from './feedApi';
import { useAuthStore } from '../../app/store/useAuthStore';

export const useFeedAPI = () => {
  const token = useAuthStore((state) => state.token);

  return useMemo(() => ({
    getHomeFeed: (limit: number, skip: number) =>
      feedAPI.getHomeFeed(limit, skip, token),

    getFullFeed: () => feedAPI.getFullFeed(token),
  }), [token]);
};
