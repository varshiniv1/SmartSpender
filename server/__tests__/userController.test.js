import request from 'supertest';
import app from '../server'; // Adjust this path if necessary
import User from '../models/User.model'; // Adjust path if necessary
import mongoose from 'mongoose';

describe('User Controller', () => {
    beforeAll(async () => {
        // Connect to the database before running tests
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Disconnect from the database and clean up
        await mongoose.connection.db.dropDatabase(); // Drop the test database
        await mongoose.connection.close();
    });

    describe('POST /user/register', () => {
        it('should register a new user and return a JWT token', async () => {
            const userData = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/user/register')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User Registered');
            expect(response.body.token).toBeDefined(); // Check if the token is returned
        });

        it('should return an error if the user already exists', async () => {
            const userData = {
                username: 'duplicateuser',
                email: 'duplicateuser@example.com',
                password: 'password123',
            };

            // Register the user once
            await request(app).post('/user/register').send(userData);

            // Try to register the same user again
            const response = await request(app)
                .post('/user/register')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /user/login', () => {
        it('should log in an existing user and return a JWT token', async () => {
            const userData = {
                username: 'loginuser',
                email: 'loginuser@example.com',
                password: 'password123',
            };

            // Register the user first
            await request(app).post('/user/register').send(userData);

            const loginData = {
                email: userData.email,
                password: userData.password,
            };

            const response = await request(app)
                .post('/user/login')
                .send(loginData);

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined(); // Check if the token is returned
        });

        it('should return an error for invalid credentials', async () => {
            const loginData = {
                email: 'nonexistent@example.com',
                password: 'wrongpassword',
            };

            const response = await request(app)
                .post('/user/login')
                .send(loginData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should return an error if the password is incorrect', async () => {
            const userData = {
                username: 'wrongpassworduser',
                email: 'wrongpassworduser@example.com',
                password: 'password123',
            };

            // Register the user first
            await request(app).post('/user/register').send(userData);

            const loginData = {
                email: userData.email,
                password: 'incorrectpassword',
            };

            const response = await request(app)
                .post('/user/login')
                .send(loginData);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});
