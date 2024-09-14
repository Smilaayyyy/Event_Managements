const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Event = require('./Event');
const User = require('./User');

const RSVP = sequelize.define('RSVP', {
    rsvp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'event_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    status: {
        type: DataTypes.ENUM('Attending', 'Not Attending', 'Maybe'),
        defaultValue: 'Maybe'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'rsvps',
    timestamps: false
});

module.exports = RSVP;
