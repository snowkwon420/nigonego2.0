import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { usePostApi } from '../../../post/usePostApi';
import UserSearch from '../../../../shared/components/User/UserSearch';
import BtnComment from '../../../../shared/assets/image/BtnComment.svg';
import Heart from '../../../../shared/components/Heart/Heart';
import { isValidImageUrl, resolveImageUrl } from '../../../../shared/utils/image';

interface MyHomePostProps {
  accountName: string;
}

interface Author {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}

interface UserData {
  id: string;
  content: string;
  image: string;
  commentCount: number;
  heartCount?: number;
  author: Author;
  hearted: boolean;
}

export default function MyHomePost({ accountName }: MyHomePostProps) {
  const { getPostListLimit } = usePostApi();
  const [userData, setUserData] = useState<UserData[]>([]);
  const postListRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await getPostListLimit(accountName);
      if (res?.data?.post) {
        setUserData(prevData => [...prevData, ...res.data.post]);
      } else if (res?.post) {
        setUserData(prevData => [...prevData, ...res.post]);
      }
    } catch (error) {
      // 에러 처리
    }
  }, [accountName, getPostListLimit]);

  useEffect(() => {
    fetchData(); // 초기 데이터 로드
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const container = postListRef.current;
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight) {
          fetchData();
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
  }, [fetchData, userData]);

  return (
    <MyHomePostwarpper ref={postListRef} className="myHomePost">
      {userData.length > 0 &&
        userData.map((data, index) => {
          const postImage = resolveImageUrl(data.image);

          return (
            <div className="post-item-wrapper" key={index}>
              <UserSearch data={{ author: data.author }} />
              <div className="container">
                <p>{data.content}</p>
                <div className="img-W">
                  {isValidImageUrl(postImage) && (
                    <HomePostImg
                      src={postImage}
                      alt=""
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className="icon-wrapper">
                  <button type="button" className="btn">
                    <img src={BtnComment} alt="comment button" />
                    <span>{data.commentCount}</span>
                  </button>
                  <Heart userData={data} />
                </div>
              </div>
            </div>
          );
        })}
    </MyHomePostwarpper>
  );
}

const HomePostImg = styled.img`
  width: 90%;
  aspect-ratio: 5 / 3;
  border-radius: 10px;
  object-fit: cover;
`;

const MyHomePostwarpper = styled.div`
  height: 640px;
  overflow: scroll;
  /* box-shadow: inset 0px 0px 3px 5px rgb(0, 38, 255); */

  .icon-wrapper {
    margin: 10px 0;
    display: flex;
    gap: 14px;
  }

  .container {
    margin-left: 70px;
    max-width: 700px;

    .post-item-wrapper {
      padding: 10px 0;

      button {
        padding: 0 10px 0 0;
      }
    }

    p {
      margin: 0 0 10px 0;
    }
  }
  button {
    border: none;
  }

  .btn {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    color: var(--basic-grey);
    font-size: 12px;

    img,
    svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }
  }
`;
