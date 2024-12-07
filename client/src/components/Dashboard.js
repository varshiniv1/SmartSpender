import React, { useEffect } from 'react';
import { useGlobalContext } from './../context/globalContext.js';
import History from '../History/history.js';
import { dollar } from '../utils/icons.js';
import Chart from './Chart.js';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    // Fetch incomes and expenses on component mount
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

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
                        <h2 className="salary-title">Salary</h2>
                        <div className="salary-item bg-light p-3 rounded shadow-sm">
                            <div className="d-flex justify-content-between">
                                <div className="text-center">
                                    <p>Min Salary</p>
                                    <p>${incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)).toFixed(2) : 0}</p>
                                </div>
                                <div className="text-center">
                                    <p>Max Salary</p>
                                    <p>${incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)).toFixed(2) : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="salary-title">Expense</h2>
                        <div className="salary-item bg-light p-3 rounded shadow-sm">
                            <div className="d-flex justify-content-between">
                                <div className="text-center">
                                    <p>Min Expense</p>
                                    <p>${expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)).toFixed(2) : 0}</p>
                                </div>
                                <div className="text-center">
                                    <p>Max Expense</p>
                                    <p>${expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)).toFixed(2) : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

//end of code