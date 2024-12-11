import express from 'express';
import { addExpense, getExpense, deleteExpense } from '../controllers/expense.controller.js';
import { addIncome, getIncomes, deleteIncome } from '../controllers/income.controller.js';
import protect from '../middleware/auth.middleware.js';  // Import the protect middleware

const router = express.Router();

// Protect the routes that require authentication
router
    .post('/add-income', protect, addIncome)  // Protect this route
    .get('/get-incomes', protect, getIncomes)  // Protect this route
    .delete('/delete-income/:id', protect, deleteIncome)  // Protect this route
    .post('/add-expense', protect, addExpense)  // Protect this route
    .get('/get-expenses', protect, getExpense)  // Protect this route
    .delete('/delete-expense/:id', protect, deleteExpense);  // Protect this route

export default router;
