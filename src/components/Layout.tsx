import React from 'react';
import { Header } from './ui/Header';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <div className="layout__content">
          {children}
        </div>
      </main>
    </div>
  );
};