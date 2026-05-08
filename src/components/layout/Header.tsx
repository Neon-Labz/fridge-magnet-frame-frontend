'use client';

import React, { useState } from 'react';
import AddCustomerModal from '../dashboard/Customer/AddCustomerModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="titleContainer">
          <h1 className="title">Customer Management</h1>
          <p className="subtitle">Oversee and track all customer interactions and delivery status.</p>
        </div>
        
        <div className="actions">
          <button className="addButton" onClick={() => setIsModalOpen(true)}>
            <svg className="addIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Add Customer
          </button>
        </div>
      </header>

      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          margin-bottom: 8px;
        }

        .titleContainer {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .title {
          font-size: 28px;
          font-weight: 600;
          color: var(--color-primary-dark);
        }

        .subtitle {
          font-size: 14px;
          color: var(--text-muted);
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .addButton {
          background-color: var(--color-accent);
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          transition: background-color 0.2s;
          border: none;
          cursor: pointer;
        }

        .addButton:hover {
          background-color: var(--color-accent-hover);
        }

        .addIcon {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </>
  );
};

export default Header;
