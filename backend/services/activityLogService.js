const ActivityLog = require('../models/ActivityLog');

exports.getActivityLogs = async () => {
    return ActivityLog.findAll();
};

// Other activity log-related methods...
