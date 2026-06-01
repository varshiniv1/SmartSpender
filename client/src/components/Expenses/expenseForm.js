import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext.js';
import { plus } from '../../utils/icons.js';
import Button from '../Button.js';

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({ title: '', amount: '', date: '', category: '', description: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column gap-3 p-4 rounded-4 shadow-sm"
      style={{ background: 'rgba(252,246,249,0.9)', border: '2px solid #fff' }}
    >
      <h5 style={{ color: 'rgba(34,34,96,1)' }}>Add Expense</h5>
      {error && <p className="text-danger small mb-0">{error}</p>}

      <input
        type="text"
        value={title}
        name="title"
        placeholder="Expense Title"
        onChange={handleInput('title')}
        className="form-control"
        required
      />
      <input
        type="number"
        value={amount}
        name="amount"
        placeholder="Amount"
        onChange={handleInput('amount')}
        className="form-control"
        min="0.01"
        step="0.01"
        required
      />
      <DatePicker
        placeholderText="Select a Date"
        selected={date}
        dateFormat="dd/MM/yyyy"
        onChange={(d) => setInputState({ ...inputState, date: d })}
        className="form-control"
      />
      <select
        value={category}
        name="category"
        onChange={handleInput('category')}
        className="form-select"
        required
      >
        <option value="" disabled>Select Category</option>
        <option value="education">Education</option>
        <option value="groceries">Groceries</option>
        <option value="health">Health</option>
        <option value="subscriptions">Subscriptions</option>
        <option value="takeaways">Takeaways</option>
        <option value="clothing">Clothing</option>
        <option value="travelling">Travelling</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="description"
        value={description}
        placeholder="Add a note"
        rows="3"
        onChange={handleInput('description')}
        className="form-control"
        required
      />
      <div className="d-flex justify-content-end">
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".75rem 1.5rem"
          bRad="30px"
          bg="rgba(220,53,69,1)"
          color="#fff"
        />
      </div>
    </form>
  );
}

export default ExpenseForm;
