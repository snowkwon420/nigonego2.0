import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarWrapper } from './NavbarStyle';
import { ReactComponent as HomeIcon } from '../../assets/icons/icon-home-fill.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/icon-message-circle.svg';
import { ReactComponent as PostIcon } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/icon-user.svg';
import { ReactComponent as HomeIconF } from '../../assets/icons/icon-home-f.svg';
import { ReactComponent as ChatIconF } from '../../assets/icons/icon-message-circle-f.svg';
import { ReactComponent as PostIconF } from '../../assets/icons/icon-edit-f.svg';
import { ReactComponent as ProfileIconF } from '../../assets/icons/icon-user-fill-f.svg';
import { useProfileAPI } from '../../../features/profile/useProfileApi';

interface NavbarProps {
  homeV: boolean;
  chatV: boolean;
  postV: boolean;
  profileV: boolean;
}

export default function Navbar({ homeV, chatV, postV, profileV }: NavbarProps) {
  const navigate = useNavigate();
  const { getProfileData } = useProfileAPI();
  const [userData, setUserData] = useState<any>();

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const value = target.value;

    if (value === '/homefeed') {
      navigate('/homefeed');
    } else if (value === '/chat') {
      navigate('/chat');
    } else if (value === '/postupload') {
      navigate('/postupload');
    } else if (value === '/myprofile') {
      const res = await getProfileData();
      if (res?.data) {
        setUserData(res.data);
        navigate('/myprofile', {
          state: { userData: res.data },
        });
      }
    }
  }

  return (
    <NavbarWrapper>
      <ul>
        <li>
          <button value={'/homefeed'} type="button" onClick={handleClick}>
            {homeV ? <HomeIcon /> : <HomeIconF />}
          </button>
        </li>

        <li>
          <button value={'/chat'} type="button" onClick={handleClick}>
            {chatV ? <ChatIcon /> : <ChatIconF />}
          </button>
        </li>

        <li>
          <button value={'/postupload'} type="button" onClick={handleClick}>
            {postV ? <PostIcon /> : <PostIconF />}
          </button>
        </li>

        <li>
          <button value={'/myprofile'} type="button" onClick={handleClick}>
            {profileV ? <ProfileIcon /> : <ProfileIconF />}
          </button>
        </li>
      </ul>
    </NavbarWrapper>
  );
}
