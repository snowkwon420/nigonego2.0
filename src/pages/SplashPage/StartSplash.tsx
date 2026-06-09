import React, { useState, useEffect } from 'react';
import SplashPage from './SplashPage';
import LoginMain from '../LoginMain/LoginMain';
import HomeFeed from '../HomeFeed/HomeFeed';
import { useAuthStore } from '../../app/store/useAuthStore';

function StartSplash() {
  const [loading, setLoading] = useState(false);
  const auth = useAuthStore((state) => state.token);
  const accountname = useAuthStore((state) => state.accountName);

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
