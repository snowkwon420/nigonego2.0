import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import YourProfileUser from './YourProfileUser';

const ProfileHeaderWrapper = styled.div``;

interface ProfileHeaderProps {
  accountname: string;
}

export default function ProfileHeader({ accountname }: ProfileHeaderProps) {
  return (
    <ProfileHeaderWrapper>
      <YourProfileUser></YourProfileUser>
      {/* {Object.keys(yourProfileData).length > 0 && (
        <YourProfileUser myProfileData={yourProfileData} />
      )}
      {Object.keys(yourProfileData).length > 0 && (
        <YourProfileBtn
          myProfileData={yourProfileData}
          accountname={accountname}
        />
      )} */}
    </ProfileHeaderWrapper>
  );
}
