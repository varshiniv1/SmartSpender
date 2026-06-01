import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext.js';
import IncomeItem from '../IncomeItem';
import ExpenseForm from './expenseForm.js';

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="container py-4">
      <h1 style={{ color: 'rgba(34,34,96,1)' }}>Expenses</h1>
      <h2
        className="text-center p-3 rounded-4 shadow-sm mb-4"
        style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff', color: 'rgba(34,34,96,1)' }}
      >
        Total Expenses:{' '}
        <span className="fw-bold" style={{ color: 'red' }}>
          ${totalExpenses().toLocaleString()}
        </span>
      </h2>
      <div className="d-flex gap-4">
        <div style={{ width: '320px', flexShrink: 0 }}>
          <ExpenseForm />
        </div>
        <div className="flex-grow-1">
          {expenses.length === 0 && (
            <p className="text-muted">No expense entries yet. Add one on the left!</p>
          )}
          {expenses.map((expense) => (
            <IncomeItem
              key={expense._id}
              id={expense._id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
              category={expense.category}
              description={expense.description}
              type={expense.type}
              indicatorColor="red"
              deleteItem={deleteExpense}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
