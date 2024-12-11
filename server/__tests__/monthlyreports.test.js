import schedule from 'node-schedule';
import Expense from '../models/Expense.model.js';
import User from '../models/User.model.js';
import sendEmail from '../utils/email.js';
import sendMonthlyReports from '../utils/monthlyreports.js';

jest.mock('node-schedule');
jest.mock('../models/Expense.model.js');
jest.mock('../models/User.model.js');
jest.mock('../utils/email.js');

describe('sendMonthlyReports', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should schedule a job to send monthly reports on the first of every month', () => {
    sendMonthlyReports();

    expect(schedule.scheduleJob).toHaveBeenCalledWith('0 0 1 * *', expect.any(Function));
  });

  it('should fetch users and their expenses, then send emails with total expenses', async () => {
    const mockUsers = [
      { _id: 'user1', email: 'user1@example.com' },
      { _id: 'user2', email: 'user2@example.com' },
    ];
    const mockExpensesUser1 = [
      { amount: 100 },
      { amount: 200 },
    ];
    const mockExpensesUser2 = [
      { amount: 50 },
      { amount: 150 },
    ];

    User.find.mockResolvedValue(mockUsers);
    Expense.find
      .mockResolvedValueOnce(mockExpensesUser1) // First user's expenses
      .mockResolvedValueOnce(mockExpensesUser2); // Second user's expenses

    const mockSendEmail = jest.fn();
    sendEmail.mockImplementation(mockSendEmail);

    // Extract the scheduled function and execute it
    let scheduledFunction;
    schedule.scheduleJob.mockImplementation((_, func) => {
      scheduledFunction = func;
    });

    sendMonthlyReports();
    await scheduledFunction();

    // Validate that the correct emails were sent
    expect(User.find).toHaveBeenCalled();
    expect(Expense.find).toHaveBeenCalledTimes(2);
    expect(Expense.find).toHaveBeenCalledWith({ user: 'user1' });
    expect(Expense.find).toHaveBeenCalledWith({ user: 'user2' });

    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledWith({
      to: 'user1@example.com',
      subject: 'Monthly Expense Report',
      html: expect.stringContaining('Total Expenses: 300'),
    });
    expect(sendEmail).toHaveBeenCalledWith({
      to: 'user2@example.com',
      subject: 'Monthly Expense Report',
      html: expect.stringContaining('Total Expenses: 200'),
    });
  });

  it('should log an error if fetching users fails', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    User.find.mockRejectedValue(new Error('Database error'));

    let scheduledFunction;
    schedule.scheduleJob.mockImplementation((_, func) => {
      scheduledFunction = func;
    });

    sendMonthlyReports();
    await scheduledFunction();

    expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining('Error sending monthly reports'), expect.any(Error));
    consoleErrorMock.mockRestore();
  });
});