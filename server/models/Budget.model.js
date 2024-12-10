import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Budget', BudgetSchema);
