import React, { useState, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import YourProduct from '../../../features/product/components/Product/YourProduct';
import YourHomePost from '../../../features/feed/components/HomePost/YourHomePost';
import YourProfileHeader from '../../../features/profile/components/YourProfileHeader/YourProfileHeader';
import Navbar from '../../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import HomePostGrid from '../../../features/feed/components/HomePost/HomePostGrid';
import styled from 'styled-components';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import { ReactComponent as BtnVertical } from '../../../shared/assets/image/BtnVertical.svg';
import { ReactComponent as BtnGrid } from '../../../shared/assets/image/BtnGrid.svg';
import Layout from '../../../app/styles/Layout';
import ProfileHeader from '../../../features/profile/components/ProfileHeader/ProfileHeader';

export default function YourProfilePage() {
  const [isClickedList, setIsClickedList] = useState(true);
  const [isClickedGrid, setIsClickedGrid] = useState(false);
  // UserSearch에 navigate
  const location = useLocation();
  const userAccount = location.state.data.author.accountname;
  const userData = location.state.data;

  const handleClickList = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isClickedList) {
      setIsClickedList(true);
      setIsClickedGrid(false);
    }
  };

  const handleClickGrid = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isClickedGrid) {
      setIsClickedGrid(true);
      setIsClickedList(false);
    }
  };

  return (
    <Layout>
      <HeaderBasicNav />
      <BodyGlobal>
        <ProfileHeader userData={userData} myData={userData} />
        <YourProduct accountName={userAccount} />
        <ImgAlignNav>
          <button onClick={e => handleClickList(e)}>
            <BtnGrid
              width="26px"
              height="26px"
              fill={isClickedList ? '#767676' : '#dbdbdb'}
              stroke={isClickedList ? '#767676' : '#dbdbdb'}
            />
          </button>
          <button onClick={e => handleClickGrid(e)}>
            <BtnVertical
              width="26px"
              height="26px"
              fill={isClickedGrid ? '#767676' : '#dbdbdb'}
              stroke={isClickedGrid ? '#767676' : '#dbdbdb'}
            />
          </button>
        </ImgAlignNav>
        {isClickedList && <YourHomePost accountName={userAccount} />}
        {isClickedGrid && <HomePostGrid accountname={userAccount} />}
      </BodyGlobal>
      <Navbar homeV={false} chatV={true} postV={true} profileV={true} />
    </Layout>
  );
}

const ImgAlignNav = styled.div`
  height: 4.8rem;
  margin: 6px 0 16px 0;
  border-top: 1px solid var(--basic-border-color);
  border-bottom: 1px solid var(--basic-border-color);
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 0 10px;
  background-color: #fff;
  button {
    border: 0;
  }
`;
