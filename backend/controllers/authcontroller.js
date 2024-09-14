
const bcrypt = require('bcrypt');
const authService = require('../services/authService');

// Register function
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await authService.registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user: result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login function (without JWT)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.findUserByEmail(email);

        // Check if user exists and password matches
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return user details upon successful login, or success message
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
