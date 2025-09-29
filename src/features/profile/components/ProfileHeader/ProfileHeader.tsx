import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileUser from './ProfileUser';
import MyProfileBtn from './MyProfileBtn';
import { useProfileAPI } from '../../useProfileApi';

interface UserData {
  // Add properties for userData here
}

interface MyData {
  // Add properties for myData here
}

interface ProfileHeaderProps {
  userData: UserData;
  myData: MyData;
}

export default function ProfileHeader({ userData, myData }: ProfileHeaderProps) {
  const { getProfileData } = useProfileAPI();
  const [myProfileData, setMyProfileData] = useState({});

  const userProfile = myData ? myData : userData;

  useEffect(() => {
    getProfileData().then(response => {
      if (response) {
        setMyProfileData(response);
      }
    });
  }, []);

  const ProfileHeaderWrapper = styled.div``;

  return (
    <ProfileHeaderWrapper>
      {Object.keys(myProfileData).length > 0 && (
        <ProfileUser userProfile={userProfile as any} />
      )}
      <MyProfileBtn />
    </ProfileHeaderWrapper>
  );
}
