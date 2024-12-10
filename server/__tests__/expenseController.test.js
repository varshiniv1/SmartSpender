import request from 'supertest';
import app from '../server';  // Adjust this path if necessary
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Expense from '../models/Expense.model';  // Adjust path if necessary

describe('Expense Controller', () => {
  let token;
  let user;

  beforeAll(async () => {
    // Setup: Create a mock user and generate a JWT token
    user = { _id: new mongoose.Types.ObjectId() }; // Mock user ID
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
  });

  afterAll(async () => {
    // Cleanup: Remove any test data (if necessary)
    await mongoose.connection.close();
  });

  describe('POST /tran/add-expense', () => {
    it('should add an expense', async () => {
      const expenseData = {
        name: 'Coffee',
        amount: 5,
        date: '2024-12-11',
      };

      const response = await request(app)
        .post('/tran/add-expense')  // Correct route with '/tran' prefix
        .set('Authorization', `Bearer ${token}`)
        .send(expenseData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Expense Added');
      expect(response.body.currentExpenses).toBe(0);
      expect(response.body.userBudget).toBe(1000);
    });
  });

  describe('GET /tran/get-expenses', () => {
    it('should retrieve user expenses', async () => {
      const expenseData = {
        name: 'Coffee',
        amount: 5,
        date: '2024-12-11',
      };

      // Add an expense before retrieving
      await request(app)
        .post('/tran/add-expense')
        .set('Authorization', `Bearer ${token}`)
        .send(expenseData);

      const response = await request(app)
        .get('/tran/get-expenses')  // Correct route with '/tran' prefix
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(expenseData)]));
    });
  });

  describe('DELETE /tran/delete-expense/:id', () => {
    it('should delete an expense', async () => {
      // Add an expense before deleting it
      const expenseData = {
        name: 'Coffee',
        amount: 5,
        date: '2024-12-11',
      };

      const addResponse = await request(app)
        .post('/tran/add-expense')
        .set('Authorization', `Bearer ${token}`)
        .send(expenseData);

      const expenseId = addResponse.body.expense._id;

      const response = await request(app)
        .delete(`/tran/delete-expense/${expenseId}`)  // Correct route with '/tran' prefix
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Expense Deleted');
    });

    it('should return an error when deleting an unauthorized or nonexistent expense', async () => {
      // Try deleting an expense with a non-existent ID
      const response = await request(app)
        .delete('/tran/delete-expense/nonexistent-id')  // Correct route with '/tran' prefix
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Expense not found or unauthorized');
    });
  });
});
