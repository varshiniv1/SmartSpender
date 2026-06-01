import React from 'react';
import { dateFormat } from '../utils/dateFormat.js';
import {
  bitcoin, book, calender, card, circle, clothing, comment, dollar,
  food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt,
} from '../utils/icons.js';
import Button from './Button.js';

function IncomeItem({ id, title, amount, date, category, description, deleteItem, indicatorColor, type }) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary': return money;
      case 'freelancing': return freelance;
      case 'investments': return stocks;
      case 'stocks': return users;
      case 'bitcoin': return bitcoin;
      case 'bank': return card;
      case 'youtube': return yt;
      default: return piggy;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education': return book;
      case 'groceries': return food;
      case 'health': return medical;
      case 'subscriptions': return tv;
      case 'takeaways': return takeaway;
      case 'clothing': return clothing;
      case 'travelling': return freelance;
      default: return circle;
    }
  };

  return (
    <div
      className="d-flex align-items-center gap-3 p-3 mb-3 rounded-4 shadow-sm"
      style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff', color: '#222260' }}
    >
      <div
        className="d-flex align-items-center justify-content-center flex-shrink-0"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: '#F5F5F5',
          border: '2px solid #fff',
          fontSize: '1.25rem',
        }}
      >
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="mb-1 d-flex align-items-center gap-2">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: indicatorColor,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {title}
            </h6>
            <div className="d-flex flex-wrap gap-3 text-muted small">
              <span>
                {dollar} {amount.toLocaleString()}
              </span>
              <span>
                {calender} {dateFormat(date)}
              </span>
              {description && (
                <span>
                  {comment} {description}
                </span>
              )}
            </div>
          </div>
          <Button
            icon={trash}
            bPad="0.6rem"
            bRad="50%"
            bg="rgba(255,255,255,0.8)"
            color="#ff5a5a"
            onClick={() => deleteItem(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;
