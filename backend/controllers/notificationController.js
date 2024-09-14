const notificationService = require('../services/notificationService');

exports.sendNotification = async (req, res) => {
    try {
        const notificationData = req.body;
        const newNotification = await notificationService.sendNotification(notificationData);
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Other notification-related methods...
