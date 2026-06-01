import IncomeSchema from '../models/Income.model.js';

export const addIncome = async (req, res) => {
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
    const income = new IncomeSchema({
      title,
      amount: parsedAmount,
      category,
      description,
      date: new Date(date),
      user: userId,
    });
    await income.save();
    res.status(201).json({ message: 'Income Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findOneAndDelete({ _id: id, user: req.user._id });
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
