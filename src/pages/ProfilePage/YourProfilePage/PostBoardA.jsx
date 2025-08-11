import React from 'react';
import HomePost from '../../../features/feed/components/HomePost/HomePost';
import UserSearch from '../../../shared/components/User/UserSearch';
import Navbar from '../../../shared/components/Navbar/Navbar';

export default function PostBoardA() {
  return (
    <div>
      <UserSearch />
      <HomePost />
      <Navbar />
    </div>
  );
}
