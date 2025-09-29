import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import HomePost from './HomePost/HomePost';
import HomePage from '../../../pages/HomePage/HomePage';
import { useFeedAPI } from '../useFeedApi';

interface PostData {
  id: string;
  author: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  };
  content: string;
  image: string;
  heartCount: number;
  hearted: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt?: string;
  index?: number;
}

function HomeFeedContainer() {
  const [userData, setUserData] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const postListRef = useRef<HTMLDivElement>(null);

  const { getHomeFeed } = useFeedAPI();

  // 초기 데이터 로드
  useEffect(() => {
    fetchData(0);
  }, []);

  // 데이터 fetching 함수
  const fetchData = async (skip: number) => {
    if (isLoading) return; // 중복 요청 방지

    setIsLoading(true);
    try {
      const response = await getHomeFeed(5, skip);
      if (response?.posts) {
        setUserData(prevData => [...prevData, ...response.posts]);
      }
    } catch (error) {
      console.error('Feed data fetch error:', error);
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
        // 스크롤이 거의 끝에 도달했을 때 (100px 여유)
        if (scrollTop + clientHeight >= scrollHeight - 100) {
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
    <MyHomePostWrapper ref={postListRef} className="myHomePost">
      {userData.length > 0 ? (
        userData.map((data, index) => (
          <HomePost data={data} key={data.id || index} />
        ))
      ) : (
        <HomePage />
      )}
      {isLoading && (
        <LoadingWrapper>
          <p>로딩 중...</p>
        </LoadingWrapper>
      )}
    </MyHomePostWrapper>
  );
}

const MyHomePostWrapper = styled.div`
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

export default HomeFeedContainer;