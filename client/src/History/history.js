import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

function History() {
  const { transactionHistory } = useGlobalContext();
  const history = transactionHistory();

  return (
    <HistoryStyled>
      <h5 style={{ color: 'rgba(34,34,96,1)' }}>Recent History</h5>
      {history.length === 0 && <p className="text-muted small">No transactions yet.</p>}
      {history.map((item) => {
        const { _id, title, amount, type, date } = item;
        const isExpense = type === 'expense';
        return (
          <div key={_id} className="history-item">
            <div>
              <p className="title mb-0" style={{ color: isExpense ? 'red' : '#42AD00' }}>
                {title}
              </p>
              <small className="text-muted">{dateFormat(date)}</small>
            </div>
            <p className="amount mb-0" style={{ color: isExpense ? 'red' : '#42AD00' }}>
              {isExpense ? '-' : '+'}${amount.toLocaleString()}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(252, 246, 249, 0.9);
  border: 2px solid #fff;
  border-radius: 20px;
  .history-item {
    background: #fff;
    border: 1px solid #f0e8f0;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
    padding: 0.75rem 1rem;
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .amount {
    font-weight: 700;
  }
`;

export default History;
