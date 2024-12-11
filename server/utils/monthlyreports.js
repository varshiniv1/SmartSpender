import schedule from 'node-schedule';
import Expense from '../models/Expense.model.js';
import sendEmail from '../utils/email.js';
import User from '../models/User.model.js';

const now = new Date();
const fiveMinutesLater = new Date(now.getTime() + 1 * 60 * 1000);
//'0 0 1 * *'
const sendMonthlyReports = () => {
  schedule.scheduleJob('0 0 1 * *', async () => { // Run on the first of every month
    try {
      const users = await User.find();

      for (const user of users) {
        const expenses = await Expense.find({ user: user._id });

        const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        await sendEmail({
          to: user.email,
          subject: 'Monthly Expense Report',
          html: `
            <h1>Your Monthly Expense Report</h1>
            <p>Total Expenses: ${totalExpenses}</p>
          `,
        });
      }

      console.log('Monthly reports sent successfully');
    } catch (error) {
      console.error('Error sending monthly reports:', error);
    }
  });
};

export default sendMonthlyReports;
