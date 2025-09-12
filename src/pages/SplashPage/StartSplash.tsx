import React, { useState, useEffect } from 'react';
import SplashPage from './SplashPage';
import LoginMain from '../LoginMain/LoginMain';
import authAtom from '../../app/store/authToken';
import { useRecoilValue } from 'recoil';
import HomeFeed from '../HomeFeed/HomeFeed';
import accountNameAtom from '../../app/store/accountName';

function StartSplash() {
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authAtom);
  const accountname = useRecoilValue(accountNameAtom);

  useEffect(() => {
    if (window.location.pathname === '/') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, []);

  return loading ? (
    <SplashPage />
  ) : auth && accountname ? (
    <HomeFeed />
  ) : (
    <LoginMain />
  );
}

export default StartSplash;
