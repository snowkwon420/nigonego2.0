import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LImage } from '../../../../shared/components/UserImage/UserImage';

const ProfileUserWrapper = styled.div`
  /* box-shadow: inset 0 0 10px blue; */
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
  align-items: center;

  a {
    margin-bottom: 100px;
  }

`;
const FollowNumberButton = styled.button`
  /* box-shadow: inset 0 0 10px purple; */
  padding: 20px 12px;
  border: 0;
  background: none;
  cursor: pointer;

  h3 {
    margin: 0;
  }

  small {
    color: var(--basic-grey);
  }
`;

interface UserProfile {
  image: string;
  username: string;
  accountname: string;
  intro: string;
  followerCount: number;
  followingCount: number;
  author?: {
    followerCount: number;
    followingCount: number;
    username: string;
    intro: string;
  };
}

interface ProfileUserProps {
  userProfile: UserProfile;
}

export default function ProfileUser({ userProfile }: ProfileUserProps) {
  const navigate = useNavigate();
  const myData = userProfile.hasOwnProperty('author') ? userProfile : null;
  const followerCount = myData
    ? userProfile.author?.followerCount || 0
    : userProfile.followerCount;
  const followingCount = myData
    ? userProfile.author?.followingCount || 0
    : userProfile.followingCount;
  const username = myData ? userProfile.author?.username || '' : userProfile.username;
  const intro = myData ? userProfile.author?.intro || '' : userProfile.intro;

  const handleClickFollow = (value: 'follower' | 'following') => {
    navigate('/myfollowers', {
      state: {
        value,
        yourData: userProfile,
      },
    });
  };

  return (
    <ProfileUserWrapper>
      <FollowNumberButton
        type="button"
        onClick={() => handleClickFollow('follower')}
      >
        <h3>{followerCount}</h3>
        <small>followers</small>
      </FollowNumberButton>
      <div>
        <LImage backgroundUrl={userProfile.image} />
        <h2>{username}</h2>
        <small>{userProfile.accountname}</small>
        <p>{intro}</p>
      </div>
      <FollowNumberButton
        type="button"
        onClick={() => handleClickFollow('following')}
      >
        <h3>{followingCount}</h3>
        <small>followings</small>
      </FollowNumberButton>
    </ProfileUserWrapper>
  );
}
