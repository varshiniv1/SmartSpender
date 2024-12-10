import React, { useState } from 'react';
import axios from 'axios';

const Budget = () => {
    const [budget, setBudget] = useState('');

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
        </div>
    );
};

export default Budget;
