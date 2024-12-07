import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Register new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Received registration request:', req.body);  // Add logging for request data

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = new User({
            username,
            email,
            password,
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',  // Set the token expiration time
        });

        // Return a success message along with the token
        res.status(201).json({
            message: 'User Registered',
            token,  // Send the token in the response
        });

    } catch (error) {
        console.error('Error registering user:', error);  // Log any errors
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login user and send JWT token
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '100d',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
