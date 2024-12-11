import request from 'supertest';
import app from '../server'; // Adjust this path if necessary
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Income from '../models/Income.model'; // Adjust path if necessary

describe('Income Controller', () => {
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

  describe('POST /tran/add-income', () => {
    it('should add an income', async () => {
      const incomeData = {
        title: 'Salary',
        amount: 5000,
        category: 'Job',
        description: 'Monthly salary',
        date: '2024-12-11',
      };

      const response = await request(app)
        .post('/tran/add-income')
        .set('Authorization', `Bearer ${token}`)
        .send(incomeData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Income Added');
    });

    it('should return an error for invalid input', async () => {
      const invalidData = {
        title: '', // Missing title
        amount: -100, // Invalid amount
        category: 'Job',
        description: '',
        date: '2024-12-11',
      };

      const response = await request(app)
        .post('/tran/add-income')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('All fields are required!');
    });
  });

  describe('GET /tran/get-incomes', () => {
    it('should retrieve user incomes', async () => {
      const incomeData = {
        title: 'Freelance',
        amount: 200,
        category: 'Side Hustle',
        description: 'Freelance project',
        date: '2024-12-11',
      };

      // Add an income before retrieving
      await request(app)
        .post('/tran/add-income')
        .set('Authorization', `Bearer ${token}`)
        .send(incomeData);

      const response = await request(app)
        .get('/tran/get-incomes')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(incomeData)]));
    });
  });

  describe('DELETE /tran/delete-income/:id', () => {
    it('should delete an income', async () => {
      // Add an income before deleting it
      const incomeData = {
        title: 'Gift',
        amount: 100,
        category: 'Gift',
        description: 'Birthday gift',
        date: '2024-12-11',
      };

      const addResponse = await request(app)
        .post('/tran/add-income')
        .set('Authorization', `Bearer ${token}`)
        .send(incomeData);

      const incomeId = addResponse.body.income?._id;

      const response = await request(app)
        .delete(`/tran/delete-income/${incomeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Income Deleted');
    });

    it('should return an error when deleting an unauthorized or nonexistent income', async () => {
      const response = await request(app)
        .delete('/tran/delete-income/nonexistent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Income not found or unauthorized');
    });
  });
});
