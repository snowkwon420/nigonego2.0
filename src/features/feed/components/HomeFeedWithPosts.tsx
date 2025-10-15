import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import HomePost from './HomePost/HomePost';
import { useFeedAPI } from '../useFeedApi';
import { Post } from '../../../shared/types';
import { POSTS_PER_PAGE, SCROLL_THRESHOLD } from '../../../shared/constants/pagination';

/**
 * 팔로잉한 유저가 있을 때 게시물을 표시하는 컴포넌트
 */
function HomeFeedWithPosts() {
  const [userData, setUserData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const postListRef = useRef<HTMLDivElement>(null);

  const { getHomeFeed } = useFeedAPI();

  // 초기 데이터 로드
  useEffect(() => {
    fetchData(0);
  }, []);

  // 데이터 fetching 함수
  const fetchData = async (skip: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await getHomeFeed(POSTS_PER_PAGE, skip);

      if (response?.posts) {
        setUserData(prevData => [...prevData, ...response.posts]);
      } else if (Array.isArray(response)) {
        setUserData(prevData => [...prevData, ...response]);
      }
    } catch (error) {
      // 에러 발생 시 빈 상태 유지
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      const container = postListRef.current;
      if (container && !isLoading) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD) {
          const skip = userData.length;
          fetchData(skip);
        }
      }
    };

    const postList = postListRef.current;
    if (postList) {
      postList.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (postList) {
        postList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [userData, isLoading]);

  return (
    <PostListWrapper ref={postListRef}>
      {isLoading && userData.length === 0 ? (
        <LoadingWrapper>
          <p>피드를 불러오는 중...</p>
        </LoadingWrapper>
      ) : userData.length > 0 ? (
        <>
          {userData.map((data, index) => (
            <HomePost data={data} key={data.id || index} />
          ))}
          {isLoading && (
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
