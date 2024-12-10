import Budget from '../models/Budget.model.js';

// Get Budget
export const getBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({ user: req.user.id });
        if (!budget) {
            return res.status(404).json({ message: 'No budget set' });
        }
        res.status(200).json({ budget: budget.amount });
    } catch (error) {
        console.error('Error fetching budget:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Set Budget
export const setBudget = async (req, res) => {
    const { amount } = req.body;

    try {
        // Check if budget exists for the user
        let budget = await Budget.findOne({ user: req.user.id });

        if (budget) {
            // Update existing budget
            budget.amount = amount;
            await budget.save();
        } else {
            // Create new budget
            budget = new Budget({
                user: req.user.id,
                amount,
            });
            await budget.save();
        }

        res.status(200).json({ message: 'Budget saved successfully' });
    } catch (error) {
        console.error('Error saving budget:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
