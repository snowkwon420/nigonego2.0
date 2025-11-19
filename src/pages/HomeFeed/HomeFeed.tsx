import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import HomeFeedEmpty from '../../features/feed/components/HomeFeedEmpty';
import HomeFeedWithPosts from '../../features/feed/components/HomeFeedWithPosts';
import { useAuthAPI } from '../../features/auth/useAuthApi';

/**
 * HomeFeed 페이지 - 팔로잉 상태에 따라 적절한 컴포넌트를 렌더링
 */
function HomeFeed() {
  const [hasFollowing, setHasFollowing] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const { getUserInfo } = useAuthAPI();

  useEffect(() => {
    checkFollowingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 팔로잉 상태 확인
  const checkFollowingStatus = async () => {
    try {
      const response = await getUserInfo();
      const user = response?.user || response?.data?.user;
      const followingCount = user?.following?.length || 0;

      setHasFollowing(followingCount > 0);
    } catch (error) {
      console.error('팔로잉 상태 확인 실패:', error);
      setHasFollowing(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <HeaderBasicNav />
      {isChecking ? (
        <LoadingWrapper>
          <p>로딩 중...</p>
        </LoadingWrapper>
      ) : hasFollowing ? (
        <HomeFeedWithPosts />
      ) : (
        <HomeFeedEmpty />
      )}
      <Navbar homeV={false} chatV={true} postV={true} profileV={true} />
    </>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: var(--basic-grey);
`;

export default HomeFeed;
