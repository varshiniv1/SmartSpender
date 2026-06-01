import React, { useEffect } from 'react';
import { useGlobalContext } from './../context/globalContext.js';
import History from '../History/history.js';
import { dollar } from '../utils/icons.js';
import Chart from './Chart.js';

function Dashboard() {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const balance = totalBalance();
  const balanceColor = balance >= 0 ? '#42AD00' : 'red';

  return (
    <div className="container-fluid py-4">
      <h1 style={{ color: 'rgba(34,34,96,1)' }}>Dashboard</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div
            className="p-3 rounded-4 shadow-sm text-center"
            style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
          >
            <p className="mb-1 text-muted small">Total Income</p>
            <h3 style={{ color: '#42AD00' }}>
              {dollar} {totalIncome().toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-3 rounded-4 shadow-sm text-center"
            style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
          >
            <p className="mb-1 text-muted small">Total Expenses</p>
            <h3 style={{ color: 'red' }}>
              {dollar} {totalExpenses().toLocaleString()}
            </h3>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-3 rounded-4 shadow-sm text-center"
            style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
          >
            <p className="mb-1 text-muted small">Total Balance</p>
            <h3 style={{ color: balanceColor }}>
              {dollar} {balance.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div
            className="p-3 rounded-4 shadow-sm mb-3"
            style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
          >
            <Chart />
          </div>

          <div className="row g-3">
            <div className="col-6">
              <div
                className="p-3 rounded-4 shadow-sm"
                style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
              >
                <p className="text-muted small mb-2">Income Range</p>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#42AD00' }} className="fw-semibold">
                    Min: ${incomes.length ? Math.min(...incomes.map((i) => i.amount)).toLocaleString() : 0}
                  </span>
                  <span style={{ color: '#42AD00' }} className="fw-semibold">
                    Max: ${incomes.length ? Math.max(...incomes.map((i) => i.amount)).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="p-3 rounded-4 shadow-sm"
                style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
              >
                <p className="text-muted small mb-2">Expense Range</p>
                <div className="d-flex justify-content-between">
                  <span style={{ color: 'red' }} className="fw-semibold">
                    Min: ${expenses.length ? Math.min(...expenses.map((e) => e.amount)).toLocaleString() : 0}
                  </span>
                  <span style={{ color: 'red' }} className="fw-semibold">
                    Max: ${expenses.length ? Math.max(...expenses.map((e) => e.amount)).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <History />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
