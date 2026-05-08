'use client';

import React from 'react';

const TopNavbar = () => {
  return (
    <div className="navbar">
      <div className="actions">
        <button className="bellBtn" aria-label="Notifications">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        
        <div className="userInfo">
          <div className="avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="userDetails">
            <span className="userName">Admin</span>
            <span className="userRole">System Manager</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 16px 40px;
          background-color: var(--bg-panel);
          border-bottom: 1px solid var(--border-color);
          height: var(--header-height);
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .bellBtn {
          color: var(--text-muted);
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
        }

        .bellBtn:hover {
          color: var(--text-main);
        }

        .userInfo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e0e7ff;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
        }

        .userDetails {
          display: flex;
          flex-direction: column;
        }

        .userName {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-primary-dark);
        }

        .userRole {
          font-size: 12px;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
};

export default TopNavbar;
