import React, { useEffect } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import {QuickActions} from '../components/ui/QuickActions'; 
import { ExpenseChart } from '../components/charts/ExpenseChart'; 
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const { transactions, loadTransactions, user } = useExpenseStore(state => ({
    transactions: state.transactions,
    loadTransactions: state.loadTransactions,
    user: state.user
  }));

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const recentTransactions = transactions
  .slice(0,5)
  .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());


  if (!user) {
    return (
      <div className="welcome-screen">
        <div className="welcome-content">
          <h2 className="welcome-title">
            👋 Welcome 
          </h2>
          <p className="welcome-message">
            Log in to view your dashboard and manage expenses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">
          Dashboard
        </h1>
        <p className="dashboard__subtitle">
          Overview of your financial activities
        </p>
      </div>

      
      <div className="dashboard__stats">
        <div className="stat-card stat-card--income">
          <div className="stat-card__content">
            <div className="stat-card__info">
              <p className="stat-card__label">Income
              </p>
              <p className="stat-card__value income-color">
                +₴{totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="stat-card__icon">💰</div>
          </div>
        </div>

        <div className="stat-card stat-card--expense">
          <div className="stat-card__content">
            <div className="stat-card__info">
              <p className="stat-card__label">Expense</p>
              <p className="stat-card__value expense-color">
                -₴{totalExpense.toLocaleString()}
              </p>
            </div>
            <div className="stat-card__icon">💸</div>
          </div>
        </div>

        <div className="stat-card stat-card--balance">
          <div className="stat-card__content">
            <div className="stat-card__info">
              <p className="stat-card__label">Balance</p>
              <p className={`stat-card__value ${balance >= 0 ? 'income-color' : 'expense-color'}`}>
                {balance >= 0 ? '+' : ''}₴{balance.toLocaleString()}
              </p>
            </div>
            <div className="stat-card__icon">{balance >= 0 ? '📈' : '📉'}</div>
          </div>
        </div>
      </div>

    
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">
          Quick Actions
        </h2>
        <div className="dashboard__actions">
          <button className="btn btn--success">
            <span>➕</span>
            <span>Add Income</span>
          </button>
          <button className="btn btn--error">
            <span>➖</span>
            <span>Add Expense</span>
          </button>
          <button className="btn btn--primary">
            <span>📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>

    
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">
          Recent Transactions
        </h2>
        
        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📝</div>
            <p className="empty-state__message">
              No transactions yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-item__info">
                  <div className="transaction-item__icon">
                    {transaction.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div className="transaction-item__details">
                    <p className="transaction-item__description">
                      {transaction.description}
                    </p>
                    <p className="transaction-item__meta">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`transaction-item__amount ${transaction.type === 'income' ? 'income-color' : 'expense-color'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₴{transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};