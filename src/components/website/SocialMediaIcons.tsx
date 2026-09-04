'use client';

import React from 'react';
import Link from 'next/link';

interface SocialIcon {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

interface SocialMediaIconsProps {
  icons: SocialIcon[];
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const layoutClasses = {
  horizontal: 'flex gap-6',
  vertical: 'flex flex-col gap-6',
};

export default function SocialMediaIcons({
  icons,
  layout = 'horizontal',
  size = 'md',
}: SocialMediaIconsProps) {
  return (
    <div className={layoutClasses[layout]}>
      {icons.map((icon) => (
        <Link
          key={icon.name}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.ariaLabel}
          className="flex flex-row justify-center items-center p-0 w-10 h-10 bg-[#EDEDF2] rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          style={{
            flex: 'none',
            order: 2,
            flexGrow: 0,
          }}
        >
          <div
            className="flex flex-col items-start p-0 flex-none"
            style={{
              width: '24px',
              height: '24px',
              order: 0,
              flexGrow: 0,
            }}
          >
            {icon.icon}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Facebook Icon Component with your CSS styling
export const FacebookIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="100" height="100" fill="#000000" />
    <path
      d="M56 96v-37h12.4l1.9-14.4H56V38c0-4.2 1.2-7 7.1-7h7.6V19c-1.3-.2-5.8-.6-11-.6-10.9 0-18.4 6.6-18.4 18.8V44.6H23v14.4h12.3V96H56Z"
      fill="white"
    />
  </svg>
);

// Twitter/X Icon Component
export const TwitterIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="100" height="100" fill="#000000" />
    <path
      d="M75.5 32.1c-2.1.9-4.4 1.6-6.8 1.9 2.4-1.5 4.3-3.8 5.2-6.6-2.3 1.3-4.8 2.3-7.4 2.8-2.1-2.3-5.2-3.7-8.6-3.7-6.5 0-11.8 5.3-11.8 11.8 0 .9.1 1.8.3 2.7-9.8-.5-18.5-5.2-24.3-12.3-1 1.7-1.6 3.8-1.6 5.9 0 4.1 2.1 7.7 5.2 9.8-1.9-.1-3.8-.6-5.4-1.5v.1c0 5.7 4.1 10.5 9.5 11.6-1 .3-2 .4-3.1.4-.8 0-1.5-.1-2.2-.2 1.5 4.6 5.7 8 10.7 8.1-4.1 3.2-9.2 5.1-14.8 5.1-1 0-1.9-.1-2.8-.2 5.1 3.3 11.3 5.2 17.9 5.2 21.5 0 33.3-17.8 33.3-33.3 0-.5 0-1-.1-1.5 2.3-1.7 4.3-3.8 5.8-6.2Z"
      fill="white"
    />
  </svg>
);

// Instagram Icon Component
export const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="2" y="2" width="20" height="20" rx="4.5" stroke="#000000" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3.5" stroke="#000000" strokeWidth="1.5" fill="none"/>
    <circle cx="17" cy="7" r="1" fill="#000000"/>
  </svg>
);

// LinkedIn Icon Component
export const LinkedInIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="100" height="100" fill="#000000" />
    <path
      d="M20 28.3c0-2.4 2-4.4 4.4-4.4s4.4 2 4.4 4.4c0 2.4-2 4.4-4.4 4.4S20 30.7 20 28.3ZM21 39h7.7v24.6H21V39ZM60.8 39c-6.3 0-10.1 3.5-11.7 6.8h-.2V39h-7.4v24.6h7.7v-12.2c0-3.2.6-6.3 4.6-6.3 3.9 0 4 3.7 4 6.5v12h7.7V52.3c0-5.8-.9-10.3-5.7-10.3Z"
      fill="white"
    />
  </svg>
);

// YouTube Icon Component
export const YouTubeIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="100" height="100" fill="#000000" />
    <path
      d="M88.2 28.2c-1.8-6.3-7-11-13.2-12 C65 14 50 14 50 14s-15 0-25 2.2c-6.2 1-11.4 5.7-13.2 12-2.1 8-2.1 25.8-2.1 25.8s0 17.8 2.1 25.8c1.8 6.3 7 11 13.2 12 10 2.2 25 2.2 25 2.2s15 0 25-2.2c6.2-1 11.4-5.7 13.2-12 2.1-8 2.1-25.8 2.1-25.8s0-17.8-2.1-25.8ZM40.5 62.3V37.7L62 50l-21.5 12.3Z"
      fill="white"
    />
  </svg>
);

// TikTok Icon Component
export const TikTokIcon = () => (
  <div className="relative w-full h-full">
    <div
      className="absolute bg-black"
      style={{
        left: '17.33%',
        right: '17.33%',
        top: '12.5%',
        bottom: '12.5%',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.68v12.7a2.85 2.85 0 11-5.66-2.06 2.84 2.84 0 011.946.728l0 4.6a6.59 6.59 0 10-6.53-6.59v3.96a10.23 10.23 0 003.825-1.678v4.978a6 6 0 1010.488-5.73z" fill="white"/>
      </svg>
    </div>
  </div>
);
