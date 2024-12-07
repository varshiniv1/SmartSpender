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
            <h1>Expenses</h1>
            <h2 className="text-center bg-light p-3 rounded-3 shadow-sm mb-4">
                Total Expense: <span className="fw-bold text-success fs-3">${totalExpenses()}</span>
            </h2>
            <div className="d-flex gap-4">
                <div className="flex-column" style={{ width: '300px' }}>
                    <ExpenseForm />
                </div>
                <div className="flex-grow-1">
                    {expenses.map((expense) => {
                        const { _id, title, amount, date, category, description, type } = expense;
                        return (
                            <div className="card mb-3" key={_id}>
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">Date: {date}</small>
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold">Amount: </span>
                                        ${amount}
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold">Category: </span>
                                        {category}
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold">Type: </span>
                                        {type}
                                    </p>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteExpense(_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Expenses;
