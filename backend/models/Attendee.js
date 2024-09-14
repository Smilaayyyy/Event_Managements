// models/Attendee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct
const User = require('./User');
const Event = require('./Event');

const Attendee = sequelize.define('Attendee', {
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Event', // Name of the Event model
            key: 'event_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User', // Name of the User model
            key: 'user_id'
        }
    }
});

module.exports = Attendee;
