import ExpenseSchema from "../models/Expense.model.js";
import sendEmail from '../utils/email.js';
import User from '../models/User.model.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';


// Add Expense with User ID
export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;  // Assuming the JWT token is decoded and user info is added to `req.user`

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const amountValue = parseFloat(amount);
        if (amountValue <= 0 || isNaN(amountValue)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Create and save the expense
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
            user: userId, // Assign the user ID
        });
        await expense.save();

        // Aggregate total expenses for the user
        const totalExpenses = await ExpenseSchema.aggregate([
            { $match: { user: new ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ])
        console.log('Total Expenses Aggregation Result:', totalExpenses);

        // Get the user's budget
        const user = await User.findById(userId);
        const userBudget = user.budget || 10000; // Default to 10,000 if no budget is set
        const currentExpenses = totalExpenses[0]?.total || 0;

        // Send a budget alert email if expenses exceed 90% of the budget
        if (currentExpenses >= userBudget * 0.9) {
            await sendEmail({
                to: user.email,
                subject: 'Budget Alert!',
                text: `You are approaching your budget limit. Your total expenses have reached ${currentExpenses}.`,
                html: `<p>You are approaching your budget limit. Your total expenses have reached <strong>${currentExpenses}</strong>.</p>`,
            });
        }

        // Send the success response
        res.status(200).json({ message: 'Expense Added', currentExpenses, userBudget });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



// Get Expenses
export const getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user.id }) // Filter by user ID
            .sort({ createdAt: -1 }); // Sort by creation date
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findOneAndDelete({ 
            _id: id, 
            user: req.user.id // Ensure the expense belongs to the user 
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//end of code
