import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = () => {
    const [budget, setBudget] = useState('');
    const [expenses, setExpenses] = useState(0);
    const [alert, setAlert] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/budget', { userId: 'user123', amount: budget });
            alert('Budget set successfully!');
        } catch (error) {
            console.error('Error saving budget:', error);
            alert('Failed to save budget');
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/api/expenses/total', { params: { userId: 'user123' } });
            setExpenses(response.data.totalExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        if (budget && expenses > 0) {
            const budgetValue = parseFloat(budget);
            if (expenses >= budgetValue) {
                setAlert('You have exceeded your budget!');
            } else if (expenses >= budgetValue * 0.8) {
                setAlert('You are near your budget limit!');
            } else {
                setAlert('');
            }
        }
    }, [budget, expenses]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: '#f9f9f9',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <h1 style={{ marginBottom: '20px', color: '#333', fontSize: '28px', fontWeight: 'bold' }}>
                Set Your Monthly Budget
            </h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', textAlign: 'center' }}>
                <label
                    htmlFor="budget"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#555',
                    }}
                >
                    Monthly Budget (USD):
                </label>
                <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    style={{
                        padding: '10px',
                        width: '200px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginBottom: '20px',
                    }}
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Set Budget
                </button>
            </form>
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '500px', // Wider box
                    margin: '20px auto', // Center the box and add spacing
                    textAlign: 'center',
                }}
            >
                <h2 style={{ color: '#555', fontSize: '24px', fontWeight: 'bold' }}>
                    Current Expenses: ${expenses}
                </h2>
                {alert && (
                    <p
                        style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: expenses >= budget ? '#F8D7DA' : '#FFF3CD',
                            color: expenses >= budget ? '#721C24' : '#856404',
                            border: `1px solid ${expenses >= budget ? '#F5C6CB' : '#FFEEBA'}`,
                            borderRadius: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        {alert}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Budget;
