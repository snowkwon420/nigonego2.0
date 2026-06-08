import styled from 'styled-components';
import ProfileUser from './ProfileUser';
import MyProfileBtn from './MyProfileBtn';
import { User } from '../../../../shared/types';

interface ProfileHeaderProps {
  userData: User;
  myData?: User;
}

const ProfileHeaderWrapper = styled.div``;

export default function ProfileHeader({ userData, myData }: ProfileHeaderProps) {
  const userProfile = myData || userData;
  return (
    <ProfileHeaderWrapper>
      <ProfileUser userProfile={userProfile} />
      <MyProfileBtn />
    </ProfileHeaderWrapper>
  );
}
