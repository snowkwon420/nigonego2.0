import React from 'react';
import Navbar from '../../../shared/components/Navbar/Navbar';
import UserFollow from '../../../shared/components/User/UserFollow';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../../app/store/accountName';
import Layout from '../../../app/styles/Layout';

export default function MyFollowersPage() {
  return (
    <>
      <HeaderBasicNav />
      <UserFollow />
      <Navbar homeV={true} chatV={true} postV={true} profileV={false} />
    </>
  );
}
