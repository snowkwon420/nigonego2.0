import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { usePostApi } from '../../../post/usePostApi';
import UserSearch from '../../../../shared/components/User/UserSearch';
import BtnComment from '../../../../shared/assets/image/BtnComment.svg';
import Heart from '../../../../shared/components/Heart/Heart';

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
  author: Author;
  hearted: boolean;
}

export default function MyHomePost({ accountName }: MyHomePostProps) {
  const { getPostListLimit } = usePostApi();
  const [userData, setUserData] = useState<UserData[]>([]);
  const postListRef = useRef<HTMLDivElement>(null);

  const [clickedHeart, setClickedHeart] = useState(Boolean(true));

  function handleClickedHeart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setClickedHeart(!clickedHeart);
  }

  useEffect(() => {
    fetchData(); // 초기 데이터 로드
  }, []);

  const fetchData = async () => {
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
  };

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
  }, [userData]);

  return (
    <MyHomePostwarpper ref={postListRef} className="myHomePost">
      {userData.length > 0 &&
        userData.map((data, index) => {
          return (
            <div className="post-item-wrapper" key={index}>
              <UserSearch data={{ author: data.author }} />
              <div className="container">
                <p>{data.content}</p>
                <div className="img-W">
                  <HomePostImg src={data.image} />
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
    padding: 0 10px 0 0;
    display: flex;
    align-items_center;

    svg {
      margin-right: 5px;
    }
  }
`;
