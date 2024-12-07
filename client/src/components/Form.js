import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/globalContext.js';
import { plus } from '../utils/icons.js';
import Button from 'react-bootstrap/Button';  // Use Bootstrap's Button component
import Form from 'react-bootstrap/Form';  // Use Bootstrap's Form component
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is included

function IncomeForm() {
    const { addIncome, error, setError } = useGlobalContext();
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
        addIncome(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
            {error && <p className="text-danger">{error}</p>}

            <Form.Group controlId="formTitle">
                <Form.Label>Salary Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Enter Salary Title"
                    onChange={handleInput('title')}
                />
            </Form.Group>

            <Form.Group controlId="formAmount">
                <Form.Label>Salary Amount</Form.Label>
                <Form.Control
                    type="text"
                    value={amount}
                    name="amount"
                    placeholder="Enter Salary Amount"
                    onChange={handleInput('amount')}
                />
            </Form.Group>

            <Form.Group controlId="formDate">
                <Form.Label>Salary Date</Form.Label>
                <DatePicker
                    className="form-control"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date })}
                    placeholderText="Enter A Date"
                />
            </Form.Group>

            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    as="select"
                    value={category}
                    onChange={handleInput('category')}
                    required
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">Other</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    value={description}
                    name="description"
                    placeholder="Add A Reference"
                    rows={4}
                    onChange={handleInput('description')}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" style={{ padding: '.8rem 1.6rem' }}>
                {plus} Add Income
            </Button>
        </Form>
    );
}

export default IncomeForm;
