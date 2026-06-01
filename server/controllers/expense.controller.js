import ExpenseSchema from '../models/Expense.model.js';

export const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user._id;

  if (!title || !category || !description || !date) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number!' });
  }

  try {
    const expense = new ExpenseSchema({
      title,
      amount: parsedAmount,
      category,
      description,
      date: new Date(date),
      user: userId,
    });
    await expense.save();
    res.status(201).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findOneAndDelete({ _id: id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
