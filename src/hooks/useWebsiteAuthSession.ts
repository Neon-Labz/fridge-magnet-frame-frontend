'use client';

import { useEffect, useState } from 'react';

const AUTH_TOKEN_KEY = 'token';
const AUTH_EVENT_NAME = 'auth-changed';

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') {
    return '';
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
};

const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem(AUTH_TOKEN_KEY) || getCookieValue(AUTH_TOKEN_KEY) || '';
};

export const dispatchWebsiteAuthChanged = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
};

export const clearWebsiteAuthSession = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
  dispatchWebsiteAuthChanged();
};

export const useWebsiteAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(Boolean(getAuthToken()));
    };

    syncAuthState();

    window.addEventListener(AUTH_EVENT_NAME, syncAuthState);
    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  return {
    isAuthenticated,
    authToken: getAuthToken(),
    authTokenKey: AUTH_TOKEN_KEY,
  };
};