import React, { useRef } from 'react';
import styled from 'styled-components';
import { MImage } from '../UserImage/UserImage';
import { UserSection, UserName, UserId } from './UserSearch';
import { ButtonShort } from '../button/Button';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import atomYourAccount from '../../../app/store/atomYourAccount';
import accountNameAtom from '../../../app/store/accountName';
import { useFollowListQuery } from '../../../features/profile/profileQueries';

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
  const myAccount = useRecoilValue(accountNameAtom);
  const yourAccount = useRecoilValue(atomYourAccount);

  const location = useLocation();
  const follower: FollowType = location.state?.value || 'follower';
  const userName = location.state?.yourData?.accountname || myAccount;
  const postListRef = useRef(null);
  const accountName = userName === myAccount ? myAccount : yourAccount;
  const { data: userData = [] } = useFollowListQuery(accountName, follower);

  return (
    <>
      <UserFollowWrapper ref={postListRef}>
        {userData.length > 0 &&
          userData.map((data: UserData, index: number) => {
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
