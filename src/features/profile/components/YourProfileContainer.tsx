import { useState, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import YourProduct from '../../product/components/Product/YourProduct';
import YourHomePost from '../../feed/components/HomePost/YourHomePost';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import { ReactComponent as BtnVertical } from '../../../shared/assets/image/BtnVertical.svg';
import { ReactComponent as BtnGrid } from '../../../shared/assets/image/BtnGrid.svg';
import HomePostGrid from '../../feed/components/HomePost/HomePostGrid';

function YourProfileContainer() {
  const [isClickedList, setIsClickedList] = useState(true);
  const [isClickedGrid, setIsClickedGrid] = useState(false);

  // UserSearch에서 전달받은 사용자 데이터
  const location = useLocation();
  const userAccount = location.state?.data?.author?.accountname;
  const userData = location.state?.data;

  // 리스트 뷰 클릭 핸들러
  const handleClickList = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isClickedList) {
      setIsClickedList(true);
      setIsClickedGrid(false);
    }
  };

  // 그리드 뷰 클릭 핸들러
  const handleClickGrid = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isClickedGrid) {
      setIsClickedGrid(true);
      setIsClickedList(false);
    }
  };

  // 데이터가 없는 경우 에러 처리
  if (!userData || !userAccount) {
    return (
      <BodyGlobal>
        <ErrorMessage>사용자 프로필 데이터를 불러올 수 없습니다.</ErrorMessage>
      </BodyGlobal>
    );
  }

  return (
    <BodyGlobal>
      <ProfileHeader userData={userData} myData={userData} />
      <YourProduct accountName={userAccount} />

      <ImgAlignNav>
        <button onClick={handleClickList}>
          <BtnGrid
            width="26px"
            height="26px"
            fill={isClickedList ? '#767676' : '#dbdbdb'}
            stroke={isClickedList ? '#767676' : '#dbdbdb'}
          />
        </button>
        <button onClick={handleClickGrid}>
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
    background: none;
    cursor: pointer;
    padding: 5px;
    
    &:hover {
      opacity: 0.7;
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: var(--basic-grey);
  font-size: 16px;
`;

export default YourProfileContainer;