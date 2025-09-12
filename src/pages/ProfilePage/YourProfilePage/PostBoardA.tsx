import React from 'react';
import HomePost from '../../../features/feed/components/HomePost/HomePost';
import UserSearch from '../../../shared/components/User/UserSearch';
import Navbar from '../../../shared/components/Navbar/Navbar';

// 임시 더미 데이터
const dummyData = {
  author: {
    accountname: 'dummy',
    image: '',
    username: 'dummy'
  }
};

const dummyPostData = {
  id: 'dummy',
  content: 'dummy content',
  image: '',
  commentCount: 0,
  author: {
    _id: 'dummy',
    accountname: 'dummy',
    image: '',
    username: 'dummy',
    intro: '',
    following: [],
    follower: [],
    followingCount: 0,
    followerCount: 0
  },
  hearted: false
};

export default function PostBoardA() {
  return (
    <div>
      <UserSearch data={dummyData} />
      <HomePost data={dummyPostData} />
      <Navbar homeV={true} chatV={true} postV={true} profileV={true} />
    </div>
  );
}
