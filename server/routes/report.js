import express from 'express';
import PDFDocument from 'pdfkit';
import protect from '../middleware/auth.middleware.js';
import Income from '../models/Income.model.js';
import Expense from '../models/Expense.model.js';

const router = express.Router();

router.post('/download-report', protect, async (req, res) => {
    try {
        const userId = req.user._id; // User ID from the middleware

        // Fetch income and expense data for the user
        const incomes = await Income.find({ user: userId }).sort({ date: -1 });
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

        // Calculate total income and expense
        const totalIncome = incomes.reduce((acc, item) => acc + item.amount, 0);
        const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
        const totalBalance = totalIncome - totalExpenses;

        // Prepare the PDF document
        const doc = new PDFDocument();

        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=IncomeExpenseReport.pdf');

        // Pipe the PDF to the response
        doc.pipe(res);

        // Add report title
        doc.fontSize(18).text('Income and Expense Report', { align: 'center' });
        doc.moveDown();

        // Add summary section
        doc.fontSize(14).text('Summary:', { underline: true });
        doc.fontSize(12).text(`Total Income: $${totalIncome.toFixed(2)}`);
        doc.text(`Total Expenses: $${totalExpenses.toFixed(2)}`);
        doc.text(`Total Balance: $${totalBalance.toFixed(2)}`);
        doc.moveDown();

        // Add income details
        doc.fontSize(14).text('Income Details:', { underline: true });
        if (incomes.length > 0) {
            incomes.forEach((income) => {
                doc.fontSize(12).text(`${income.title}: $${income.amount.toFixed(2)} (Category: ${income.category}, Date: ${new Date(income.date).toLocaleDateString()})`);
            });
        } else {
            doc.fontSize(12).text('No income data available.');
        }
        doc.moveDown();

        // Add expense details
        doc.fontSize(14).text('Expense Details:', { underline: true });
        if (expenses.length > 0) {
            expenses.forEach((expense) => {
                doc.fontSize(12).text(`${expense.title}: $${expense.amount.toFixed(2)} (Category: ${expense.category}, Date: ${new Date(expense.date).toLocaleDateString()})`);
            });
        } else {
            doc.fontSize(12).text('No expense data available.');
        }

        // Finalize the PDF and end the stream
        doc.end();
    } catch (error) {
        console.error('Error generating the report:', error);
        res.status(500).json({ message: 'Failed to generate the report' });
    }
});

export default router;
