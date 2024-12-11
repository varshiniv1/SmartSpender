import React, { useState } from 'react';
import axios from 'axios';

const BudgetSetter = () => {
    const [budget, setBudget] = useState('');
    const [loading, setLoading] = useState(false); // For handling loading state
    const [errorMessage, setErrorMessage] = useState(''); // For error handling
    const [successMessage, setSuccessMessage] = useState(''); // For success feedback

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                setErrorMessage('You are not authenticated. Please log in.');
                setLoading(false);
                return;
            }

            // Include token in Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Send the request with headers and budget amount
            const response = await axios.post(
                'http://localhost:3001/api/v1/budget/set',
                { amount: budget },
                config
            );

            setSuccessMessage(response.data.message || 'Budget set successfully!');
            setBudget(''); // Clear the input field
        } catch (error) {
            console.error('Error saving budget:', error);
            const message = error.response?.data?.message || 'Failed to save budget. Ensure you are logged in.';
            setErrorMessage(message);
        } finally {
            setLoading(false); // Set loading to false
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

            {errorMessage && (
                <p style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</p>
            )}

            {successMessage && (
                <p style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</p>
            )}

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
                    disabled={loading} // Disable the button while loading
                    style={{
                        padding: '10px 20px',
                        backgroundColor: loading ? '#6c757d' : '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {loading ? 'Setting Budget...' : 'Set Budget'}
                </button>
            </form>
        </div>
    );
};

export default BudgetSetter;