import styled from "styled-components";
import basicImg from '../../assets/images/basic-profile-img.png';

interface UserProfileCircleProps {
  isWidth?: string;
}

const UserProfileCircle: React.FC<UserProfileCircleProps> = ({ isWidth }) => {
    return (
        <UserProfileCircleStyle $isWidth={isWidth} style={{ backgroundImage: `url(${basicImg})`}}>
        </UserProfileCircleStyle>
    )
}

export default UserProfileCircle;

const UserProfileCircleStyle = styled.div<{ $isWidth?: string }>`
  width: ${({ $isWidth }) => ($isWidth ? $isWidth : '100%')};
  height: ${({ $isWidth }) => $isWidth};

  border-radius: 50%;
  background-size: cover;
`