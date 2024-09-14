const activityLogService = require('../services/activityLogService');

exports.getLogs = async (req, res) => {
    try {
        const logs = await activityLogService.getActivityLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Other activity log-related methods...
