import express from 'express';
import PDFDocument from 'pdfkit';

const router = express.Router();

router.get('/download-report', async (req, res) => {
    try {
        const doc = new PDFDocument();

        // Set headers for file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=IncomeExpenseReport.pdf');

        // Stream the PDF to the response
        doc.pipe(res);
        doc.fontSize(16).text('Income and Expense Report', { align: 'center' });
        doc.moveDown();

        // Example data (replace with actual data)
        doc.text('Incomes:', { underline: true });
        doc.list(['Salary: $3000', 'Freelance: $1200']);
        doc.moveDown();
        doc.text('Expenses:', { underline: true });
        doc.list(['Rent: $1000', 'Groceries: $300', 'Utilities: $200']);

        doc.end();
    } catch (error) {
        console.error('Error generating the report:', error);
        res.status(500).send('Failed to generate the report');
    }
});

export default router;