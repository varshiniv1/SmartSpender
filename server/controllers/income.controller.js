import IncomeSchema from "../models/Income.model.js";

// Add Income with User ID
export const addIncome = async (req, res) => {
    let { title, amount, category, description, date } = req.body;
    const userId = req.user.id;  // Assuming the JWT token is decoded and user info is added to `req.user`

    amount = parseFloat(amount);
    date = new Date(date);

    const income = new IncomeSchema({
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
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(income);
};



// Get Incomes
export const getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Income
export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};