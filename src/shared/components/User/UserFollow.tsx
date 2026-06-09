import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MImage } from '../UserImage/UserImage';
import { UserSection, UserName, UserId } from './UserSearch';
import { ButtonShort } from '../button/Button';
import { useLocation } from 'react-router-dom';
import { useProfileAPI } from '../../../features/profile/useProfileApi';
import { useAuthStore } from '../../../app/store/useAuthStore';

interface UserData {
  image: string;
  accountname: string;
  intro: string;
}

type FollowType = 'follower' | 'following';

const StyledFollower = styled.section`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  align-items: center;
`;

export default function UserFollow() {
  const { getFollowData } = useProfileAPI();
  const myAccount = useAuthStore((state) => state.accountName);
  const yourAccount = useAuthStore((state) => state.yourAccount);

  const location = useLocation();
  const follower: FollowType = location.state?.value || 'follower';
  const userName = location.state?.yourData?.accountname || myAccount;
  const [userData, setUserData] = useState<UserData[]>([]);
  const postListRef = useRef(null);
  const accountName = userName || yourAccount || myAccount;

  const fetchData = useCallback(async () => {
    if (!accountName) return;

    await getFollowData(accountName, follower)
      .then(response => {
        if (response?.data) {
          setUserData(response.data);
        }
      })
      .catch(error => console.error(error));
  }, [accountName, follower, getFollowData]);

  useEffect(() => {
    fetchData(); // 초기 데이터 로드
  }, [fetchData]);

  return (
    <>
      <UserFollowWrapper ref={postListRef}>
        {userData.length > 0 &&
          userData.map((data, index) => {
            return (
              <StyledFollower key={index}>
                <MImage backgroundUrl={data.image} />
                <UserSection>
                  <UserName>
                    <strong>{data.accountname}</strong>
                  </UserName>
                  <UserId>{data.intro}</UserId>
                </UserSection>
                <ButtonShort disabled={false}>팔로우</ButtonShort>
              </StyledFollower>
            );
          })}
      </UserFollowWrapper>
    </>
  );
}

const UserFollowWrapper = styled.div`
  height: 83vh;
  overflow: scroll;
`;
