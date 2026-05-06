import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TopNavbar from './TopNavbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <TopNavbar />
        <main className="main-content">
          <div className="page-container">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
