const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Event = require('./Event');

const ActivityLog = sequelize.define('ActivityLog', {
    activity_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'event_id'
        }
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'activity_logs',
    timestamps: false
});

module.exports = ActivityLog;
