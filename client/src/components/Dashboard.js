import React, { useEffect } from 'react';
import { useGlobalContext } from './../context/globalContext.js';
import History from '../History/history.js';
import { dollar } from '../utils/icons.js';
import Chart from './Chart.js';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div className="container-fluid">
            <h1>All Transactions</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12">
                            <Chart />
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-3">
                            <div className="bg-light p-3 rounded shadow-sm w-48">
                                <h2>Total Income</h2>
                                <p>{dollar} {totalIncome()}</p>
                            </div>
                            <div className="bg-light p-3 rounded shadow-sm w-48">
                                <h2>Total Expense</h2>
                                <p>{dollar} {totalExpenses()}</p>
                            </div>
                            <div className="bg-light p-3 rounded shadow-sm w-48">
                                <h2>Total Balance</h2>
                                <p>{dollar} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <History />
                    <div className="mt-3">
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item bg-light p-3 rounded shadow-sm d-flex justify-content-between">
                            <p>${Math.min(...incomes.map(item => item.amount))}</p>
                            <p>${Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item bg-light p-3 rounded shadow-sm d-flex justify-content-between">
                            <p>${Math.min(...expenses.map(item => item.amount))}</p>
                            <p>${Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
