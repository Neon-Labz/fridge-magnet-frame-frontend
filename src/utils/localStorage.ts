'use client';

export const getStorage = (key: string): unknown => {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) return null;
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Failed to get localStorage key: ${key}`, error);
    return null;
  }
};

export const setStorage = (key: string, value: unknown): boolean => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set localStorage key: ${key}`, error);
    return false;
  }
};

export const removeStorage = (key: string): boolean => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove localStorage key: ${key}`, error);
    return false;
  }
};
