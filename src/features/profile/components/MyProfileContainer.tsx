import { useState, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';
import MyHomePost from '../../feed/components/HomePost/MyHomePost';
import Product from '../../product/components/Product/Product';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import BodyGlobal from '../../../app/styles/BodyGlobal';
import { ReactComponent as BtnVertical } from '../../../shared/assets/image/BtnVertical.svg';
import { ReactComponent as BtnGrid } from '../../../shared/assets/image/BtnGrid.svg';
import HomePostGrid from '../../feed/components/HomePost/HomePostGrid';
import { useProfileAPI } from '../useProfileApi';

function MyProfileContainer() {
  const [isClickedList, setIsClickedList] = useState(true);
  const [isClickedGrid, setIsClickedGrid] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { getProfileData } = useProfileAPI();

  // 프로필 데이터 로드
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await getProfileData();
      if (response?.user) {
        setUserData(response.user);
      } else if (response?.data?.user) {
        setUserData(response.data.user);
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  const accountName = userData?.accountname;

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

  // 로딩 중
  if (isLoading) {
    return (
      <BodyGlobal>
        <LoadingMessage>프로필을 불러오는 중...</LoadingMessage>
      </BodyGlobal>
    );
  }

  // 데이터가 없는 경우 에러 처리
  if (!userData || !accountName) {
    return (
      <BodyGlobal>
        <ErrorMessage>프로필 데이터를 불러올 수 없습니다.</ErrorMessage>
      </BodyGlobal>
    );
  }

  return (
    <BodyGlobal>
      <ProfileHeader myData={userData} userData={userData} />
      <Product accountName={accountName} />

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

      {isClickedList && <MyHomePost accountName={accountName} />}
      {isClickedGrid && <HomePostGrid accountname={accountName} />}
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: var(--basic-grey);
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: var(--basic-grey);
  font-size: 16px;
`;

export default MyProfileContainer;