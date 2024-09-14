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
exports.sendReminders = async (req, res) => {
    try {
        // Assume you have a function to send emails
        await EmailService.sendReminderToAll(req.params.eventId);
        res.status(200).json({ message: 'Reminders sent' });
    } catch (error) {
        console.error('Error sending reminders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};