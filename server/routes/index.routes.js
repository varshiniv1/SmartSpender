import express from 'express';
import transactionRoutes from './transactions.routes.js'; // Import expense routes
import userRoutes from './user.routes.js';       // Import user routes
import budgetRoutes from './budget.routes.js'
const router = express.Router();

// Use the imported routes
router.use('/tran', transactionRoutes); // Mount expense routes at /api/v1/expense
router.use('/user', userRoutes);       // Mount user routes at /api/v1/user
router.use('/budget', budgetRoutes)

export default router;
