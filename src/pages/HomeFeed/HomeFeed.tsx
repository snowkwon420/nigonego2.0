import styled from 'styled-components';
import Navbar from '../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import HomeFeedEmpty from '../../features/feed/components/HomeFeedEmpty';
import HomeFeedWithPosts from '../../features/feed/components/HomeFeedWithPosts';
import { useMyProfileQuery } from '../../features/profile/profileQueries';

/**
 * HomeFeed 페이지 - 팔로잉 상태에 따라 적절한 컴포넌트를 렌더링
 */
function HomeFeed() {
  const { data: user, isLoading } = useMyProfileQuery();
  const followingCount = user?.following?.length || 0;
  const hasFollowing = followingCount > 0;

  return (
    <>
      <HeaderBasicNav />
      {isLoading ? (
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
