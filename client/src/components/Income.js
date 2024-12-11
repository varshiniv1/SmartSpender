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
            <h1>Incomes</h1>
            <h2 className="text-center bg-light p-3 rounded-3 shadow-sm mb-4">
                Total Income: <span className="fw-bold text-success fs-3">${totalIncome()}</span>
            </h2>
            <div className="d-flex gap-4">
                <div className="flex-column" style={{ width: '300px' }}>
                    <Form />
                </div>
                <div className="flex-grow-1">
                    {incomes.map((income) => {
                        const { _id, title, amount, date, category, description, type } = income;
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
                                        onClick={() => deleteIncome(_id)}
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

export default Income;
