const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ username, email, password: hashedPassword });
};

exports.findUserByEmail = async (email) => {
    return User.findOne({ where: { email } });
};
