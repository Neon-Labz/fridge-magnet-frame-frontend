'use client';

import React from 'react';
import { useCustomers } from '@/hooks/useCustomers';

const TopCards = () => {
  const { stats } = useCustomers();
  const satisfactionRate = stats.satisfactionRate > 0 ? `${stats.satisfactionRate.toFixed(1)}%` : '-';

  return (
    <>
      <div className="cardsContainer">
        <div className="card statsCard">
          <div className="statGroup">
            <span className="statTitle">Total Active Customers</span>
            <span className="statValue">{stats.totalActiveCustomers > 0 ? stats.totalActiveCustomers.toLocaleString() : '-'}</span>
          </div>

          <div className="statDivider"></div>

          <div className="statGroup">
            <span className="statTitle">Satisfaction Rate</span>
            <span className="statValue">{satisfactionRate}</span>
          </div>

          <div className="chartPlaceholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
        </div>

        <div className="card priorityCard">
          <div style={{ zIndex: 1 }}>
            <div className="priorityTitle">Priority Support</div>
            <div className="priorityValue">Dedicated Desk</div>
            <button className="connectBtn">Connect Now</button>
          </div>

          <svg className="supportIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2z"></path>
            <path d="M12 12v10"></path>
            <path d="M12 12h10"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </div>
      <style jsx>{`
        .cardsContainer {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .card {
          background-color: var(--bg-panel);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          padding: 24px;
          flex: 1;
        }

        .statsCard {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .statGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .statTitle {
          color: var(--text-light);
          font-size: 14px;
          font-weight: 500;
        }

        .statValue {
          font-size: 24px;
          font-weight: 600;
          color: var(--color-primary-dark);
        }

        .statDivider {
          width: 1px;
          height: 40px;
          background-color: var(--border-color);
          margin: 0 24px;
        }

        .chartPlaceholder {
          width: 60px;
          height: 40px;
          background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chartPlaceholder svg {
          color: var(--color-primary);
          width: 32px;
          height: 32px;
        }

        .priorityCard {
          background: linear-gradient(135deg, #0f2c69 0%, #174092 100%);
          color: white;
          border: none;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .priorityTitle {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .priorityValue {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .connectBtn {
          background-color: white;
          color: var(--color-primary-dark);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          width: fit-content;
          transition: transform 0.2s;
        }

        .connectBtn:hover {
          transform: translateY(-1px);
        }

        .supportIcon {
          position: absolute;
          right: -10px;
          bottom: -20px;
          width: 120px;
          height: 120px;
          opacity: 0.1;
          color: white;
        }
      `}</style>
    </>
  );
};

export default TopCards;
