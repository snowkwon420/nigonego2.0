import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ButtonMiddle } from '../../../shared/components/button/Button';
import { ReactComponent as LogoColorImg } from '../../../shared/assets/image/LogoColorImg.svg';

/**
 * 팔로잉한 유저가 없을 때 표시되는 컴포넌트
 */
function HomeFeedEmpty() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <EmptyWrapper>
      <LogoColorImg width="160px" height="160px" />
      <Message>유저를 검색해 팔로우 해보세요.</Message>
      <SubMessage>팔로우한 유저의 게시물이 여기에 표시됩니다.</SubMessage>
      <ButtonMiddle onClick={handleSearchClick}>검색하기</ButtonMiddle>
    </EmptyWrapper>
  );
}

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 70vh;
  padding: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: var(--basic-grey);
  margin: 0;
`;

const SubMessage = styled.p`
  font-size: 14px;
  color: var(--basic-grey);
  margin: 0;
  text-align: center;
`;

export default HomeFeedEmpty;
