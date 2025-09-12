import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserSearch from '../../../../shared/components/User/UserSearch';
import BtnComment from '../../../../shared/assets/image/BtnComment.svg';
import Heart from '../../../../shared/components/Heart/Heart';
import { useRecoilState } from 'recoil';
import accountNameAtom from '../../../../app/store/accountName';

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

interface HomePostProps {
  data: {
    id: string;
    content: string;
    image: string;
    commentCount: number;
    author: Author;
    hearted: boolean;
  };
}

export default function HomePost({ data }: HomePostProps) {
  const navigate = useNavigate();
  const postListRef = useRef(null);
  const [userId, setUserId] = useRecoilState(accountNameAtom);

  const postMainHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    navigate('/postmain', {
      state: {
        id: data.id,
      },
    });
  };

  const postMainHandlerBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate('/postmain', {
      state: {
        id: data.id,
      },
    });
  };

  useEffect(() => {
    setUserId(data.author.accountname);
  }, []);

  return (
    <HomePostwarpper ref={postListRef} className="HomePost">
      <UserSearch data={data} />
      {data && data.content && (
        <section className="container">
          <div onClick={postMainHandler}>
            <p>{data.content}</p>
            <HomePostImg src={data.image} />
          </div>
          <div className="post-item-wrapper">
            <button type="button" className="btn" onClick={postMainHandlerBtn}>
              <img src={BtnComment} alt="comment button" />
              <span>{data.commentCount}</span>
            </button>
            <Heart userData={data} />
          </div>
          {/* <time>{data.updatedAt}</time> */}
        </section>
      )}
    </HomePostwarpper>
  );
}

const HomePostImg = styled.img`
  width: 100%;
  aspect-ratio: 5 / 3;
  border-radius: 10px;
  object-fit: cover;
`;

const HomePostwarpper = styled.div`
  margin-top: 20px;
  /* box-shadow: inset 0px 0px 3px 5px rgb(0, 38, 255); */

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

  .post-item-wrapper {
    padding: 10px 0;
    display: flex;
  }

  .btn {
    border: none;
    padding: 0 10px 0 0;
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;