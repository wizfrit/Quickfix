//const User = require('../models/User');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

// Register User
/*
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role // 'client' or 'professional'
        });

        res.status(201).json({ message: 'User Registered Successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
*/
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Simulated success response (mocking DB save)
        const user = {
            id: "mock123",
            name,
            email,
            role
        };

        return res.status(201).json({
            message: "User registered successfully (mocked)",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login User
/*
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Simulated success login
        const token = "mocked.jwt.token";

        return res.json({
            token,
            user: { id: "mock123", name: "Mock User", email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get User Profile
/*
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/
const getProfile = async (req, res) => {
    return res.json({
        id: 'mock123',
        name: 'Mock User',
        email: 'mock@example.com',
        role: 'client'
    });
};

module.exports = { registerUser, loginUser, getProfile };
