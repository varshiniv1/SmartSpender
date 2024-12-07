import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext.js';
import Button from '../Button.js';
import { plus } from '../../utils/icons.js';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null, // Set initial date as null for DatePicker compatibility
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleDateChange = date => {
        setInputState({ ...inputState, date });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!title || !amount || !date || !category) {
            setError('Please fill in all required fields.');
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            setError('Amount must be a positive number.');
            return;
        }

        addExpense(inputState);
        setInputState({
            title: '',
            amount: '',
            date: null,
            category: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {error && <p className="text-danger">{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name="title" 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                    className="form-control"
                    required
                />
            </div>
            <div className="input-control">
                <input 
                    type="number" 
                    value={amount}  
                    name="amount" 
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')} 
                    className="form-control"
                    required
                    min="0.01"
                    step="0.01"
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="input-control">
                <select 
                    required 
                    value={category} 
                    name="category" 
                    id="category" 
                    onChange={handleInput('category')}
                    className="form-select"
                >
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Add A Reference" 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                    className="form-control"
                />
            </div>
            <div className="submit-btn d-flex justify-content-end">
                <Button 
                    name="Add Expense"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </form>
    );
}

export default ExpenseForm;