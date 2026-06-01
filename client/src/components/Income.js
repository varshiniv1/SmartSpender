import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext.js';
import Form from './Form.js';
import IncomeItem from './IncomeItem';

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="container py-4">
      <h1 style={{ color: 'rgba(34,34,96,1)' }}>Incomes</h1>
      <h2
        className="text-center p-3 rounded-4 shadow-sm mb-4"
        style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff', color: 'rgba(34,34,96,1)' }}
      >
        Total Income:{' '}
        <span className="fw-bold" style={{ color: '#42AD00' }}>
          ${totalIncome().toLocaleString()}
        </span>
      </h2>
      <div className="d-flex gap-4">
        <div style={{ width: '320px', flexShrink: 0 }}>
          <Form />
        </div>
        <div className="flex-grow-1">
          {incomes.length === 0 && (
            <p className="text-muted">No income entries yet. Add one on the left!</p>
          )}
          {incomes.map((income) => (
            <IncomeItem
              key={income._id}
              id={income._id}
              title={income.title}
              amount={income.amount}
              date={income.date}
              category={income.category}
              description={income.description}
              type={income.type}
              indicatorColor="#42AD00"
              deleteItem={deleteIncome}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Income;
