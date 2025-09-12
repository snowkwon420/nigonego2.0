import React from 'react';
import ProfileUser from '../ProfileHeader/ProfileUser';

const dummyUserProfile = {
  image: '',
  username: 'dummy',
  accountname: 'dummy',
  intro: 'dummy intro',
  followerCount: 0,
  followingCount: 0
};

export default function YourProfileUser() {
  return (
    <div>
      <ProfileUser userProfile={dummyUserProfile} />
    </div>
  );
}
