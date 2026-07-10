"use client";

import { useEffect, useState } from "react";

const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";
const AUTH_SOURCE_KEY = "websiteAuthSource";
const AUTH_EVENT_NAME = "auth-changed";

type AuthUser = {
  role?: string;
} & Record<string, unknown>;

const isAuthUser = (value: unknown): value is AuthUser =>
  Boolean(value) && typeof value === "object";

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

const getAuthUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem(AUTH_USER_KEY);
    const parsed = userData ? JSON.parse(userData) : null;
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const hasWebsiteAuthSession = () => {
  const token = getAuthToken();
  const user = getAuthUser();
  const source = localStorage.getItem(AUTH_SOURCE_KEY);

  return Boolean(token && source === "website" && user?.role === "user");
};

const clearWebsiteToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_SOURCE_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
};

export const saveWebsiteAuthSession = (token: string, user: AuthUser) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_SOURCE_KEY, "website");
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
  localStorage.removeItem(AUTH_SOURCE_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
  dispatchWebsiteAuthChanged();
};

export const useWebsiteAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      const nextUser = getAuthUser();
      const nextIsAuthenticated = hasWebsiteAuthSession();

      if (getAuthToken() && !nextIsAuthenticated) {
        clearWebsiteToken();
      }

      setIsAuthenticated(nextIsAuthenticated);
      setUser(nextIsAuthenticated ? nextUser : null);
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
    authToken: isAuthenticated ? getAuthToken() : "",
    authTokenKey: AUTH_TOKEN_KEY,
  };
};
