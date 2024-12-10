import express from 'express';
import { getBudget, setBudget } from '../controllers/budget.controller.js';
import  protect  from '../middleware/auth.middleware.js'; // Middleware to protect routes


const router = express.Router();

router.get('/get', protect, getBudget); // Fetch budget
router.post('/set', protect, setBudget); // Set or update budget

export default router;
