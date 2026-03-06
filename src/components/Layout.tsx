import React from 'react';
import { Header } from './layout/Header';
import Game from '../pages/TicTac/Game';
import { Dashboard } from '../pages/Dashboard';
import CurrencyRatesWidget from './widgets/CurrencyRatesWidget';
import { Routes, Route } from 'react-router-dom';
import './Layout.scss';

export const Layout: React.FC = () => {
  return (
    <div className="layout"> 
      <CurrencyRatesWidget />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tic-tac" element={<Game />} />
      </Routes>
      <main className="layout__main">
        <div className="layout__content"></div>
      </main>
    </div>
  );
};


