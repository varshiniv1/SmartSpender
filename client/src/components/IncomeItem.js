import React from 'react';
import { dateFormat } from '../utils/dateFormat.js';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../utils/icons.js';
import Button from './Button.js';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () => {
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return '';
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return '';
        }
    };

    return (
        <div className="d-flex align-items-center gap-3 p-3 mb-3 bg-light border rounded shadow-sm" style={{ color: '#222260' }}>
            <div className="icon d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', borderRadius: '20px', background: '#F5F5F5', border: '2px solid #FFFFFF' }}>
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content flex-grow-1 d-flex flex-column gap-1">
                <h5 className="position-relative ps-3">
                    {title}
                    <span className="position-absolute top-50 start-0 translate-middle-y" style={{ width: '8px', height: '8px', borderRadius: '50%', background: indicatorColor }}></span>
                </h5>
                <div className="inner-content d-flex justify-content-between align-items-center">
                    <div className="text d-flex align-items-center gap-4">
                        <p className="text-primary" style={{ opacity: 0.8 }}>
                            {dollar} {amount}
                        </p>
                        <p className="text-primary" style={{ opacity: 0.8 }}>
                            {calender} {dateFormat(date)}
                        </p>
                        <p className="text-primary" style={{ opacity: 0.8 }}>
                            {comment} {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomeItem;
