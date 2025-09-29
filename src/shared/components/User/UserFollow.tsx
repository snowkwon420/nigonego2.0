import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MImage } from '../UserImage/UserImage';
import { UserSection, UserName, UserId } from './UserSearch';
import { ButtonShort } from '../button/Button';
import { useLocation } from 'react-router-dom';
import { useProfileAPI } from '../../../features/profile/useProfileApi';
import { useRecoilValue } from 'recoil';
import atomYourAccount from '../../../app/store/atomYourAccount';
import accountNameAtom from '../../../app/store/accountName';

interface UserData {
  image: string;
  accountname: string;
  intro: string;
}

const StyledFollower = styled.section`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  align-items: center;
`;

export default function UserFollow() {
  const { getFollowData } = useProfileAPI();
  const myAccount = useRecoilValue(accountNameAtom);
  const yourAccount = useRecoilValue(atomYourAccount);

  const location = useLocation();
  const follower = location.state.value;
  const userName = location.state.yourData.accountname;
  const [userData, setUserData] = useState<UserData[]>([]);
  const postListRef = useRef(null);
  const accountName = userName === myAccount ? myAccount : yourAccount;
  useEffect(() => {
    fetchData(); // 초기 데이터 로드
  }, []);

  const fetchData = async () => {
    await getFollowData(accountName, follower)
      .then(response => {
        if (response?.data) {
          setUserData(response.data);
        }
      })
      .catch(error => console.error(error));
  };

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
