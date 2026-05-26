"use client";

import { useEffect, useState } from "react";

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";
const AUTH_EVENT_NAME = "auth-changed";

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return "";

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1")}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : "";
};

const getAuthToken = () => {
  if (typeof window === "undefined") return "";

  return localStorage.getItem(AUTH_TOKEN_KEY) || getCookieValue(AUTH_TOKEN_KEY) || "";
};

const getAuthUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem(AUTH_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const saveWebsiteAuthSession = (token: string, user: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; samesite=lax`;
  dispatchWebsiteAuthChanged();
};

export const dispatchWebsiteAuthChanged = () => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
};

export const clearWebsiteAuthSession = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
  dispatchWebsiteAuthChanged();
};

export const useWebsiteAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(Boolean(getAuthToken()));
      setUser(getAuthUser());
    };

    syncAuthState();

    window.addEventListener(AUTH_EVENT_NAME, syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return {
    isAuthenticated,
    user,
    authToken: getAuthToken(),
    authTokenKey: AUTH_TOKEN_KEY,
  };
};