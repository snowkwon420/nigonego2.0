import { useRef } from 'react';
import styled from 'styled-components';
import HomePost from './HomePost/HomePost';
import { SCROLL_THRESHOLD } from '../../../shared/constants/pagination';
import { useHomeFeedQuery } from '../feedQueries';

/**
 * 팔로잉한 유저가 있을 때 게시물을 표시하는 컴포넌트
 */
function HomeFeedWithPosts() {
  const postListRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useHomeFeedQuery();

  const userData = data?.pages.flat() || [];

  const handleScroll = () => {
    const container = postListRef.current;
    if (container && hasNextPage && !isFetchingNextPage) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
        fetchNextPage();
      }
    }
  };

  return (
    <PostListWrapper ref={postListRef} onScroll={handleScroll}>
      {isLoading && userData.length === 0 ? (
        <LoadingWrapper>
          <p>피드를 불러오는 중...</p>
        </LoadingWrapper>
      ) : userData.length > 0 ? (
        <>
          {userData.map((data, index) => (
            <HomePost data={data} key={data.id || index} />
          ))}
          {isFetchingNextPage && (
            <LoadingWrapper>
              <p>더 불러오는 중...</p>
            </LoadingWrapper>
          )}
        </>
      ) : (
        <EmptyPostsWrapper>
          <p>팔로우한 유저가 아직 게시물을 작성하지 않았습니다.</p>
          <p>조금만 기다려주세요! 😊</p>
        </EmptyPostsWrapper>
      )}
    </PostListWrapper>
  );
}

const PostListWrapper = styled.div`
  height: 86vh;
  padding-bottom: 20px;
  overflow: scroll;

  .icon-wrapper {
    margin: 10px 0;
  }

  .container {
    margin: 0 20px 0 70px;
    max-width: 700px;

    p {
      margin: 0 0 10px 0;
    }
  }
  
  button {
    border: none;
  }

  .post-item-wrapper {
    padding: 10px 0;

    button {
      padding: 0 10px 0 0;
    }
  }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--basic-grey);
`;

const EmptyPostsWrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--basic-grey);
  
  p {
    margin: 10px 0;
    font-size: 14px;
  }
`;

export default HomeFeedWithPosts;
