import ExpenseSchema from "../models/Expense.model.js";

// Add Expense with User ID
export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;  // Assuming the JWT token is decoded and user info is added to `req.user`

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: userId,  // Assign the user ID
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const amountValue= parseFloat(amount);
        if (amountValue <= 0 || isNaN(amountValue)) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        console.error(error);  // Log the error to the console
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
