const cron = require('node-cron');
const notificationService = require('../services/notificationService');

cron.schedule('0 9 * * *', async () => {
    // Schedule a job to send reminders every day at 9 AM
    try {
        const notifications = await notificationService.getPendingNotifications();
        notifications.forEach(async (notification) => {
            await notificationService.sendNotification(notification);
        });
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});
