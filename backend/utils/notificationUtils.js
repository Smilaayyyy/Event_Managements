const { sendEmail } = require('./emailUtils');

exports.notifyUser = async (notification) => {
    // Validate notification object
    if (!notification || !notification.email || !notification.subject || !notification.message) {
        throw new Error('Invalid notification object');
    }

    // Format notification
    const formattedNotification = {
        to: notification.email,
        subject: notification.subject,
        message: notification.message,
    };

    try {
        // Send email using the sendEmail utility
        await sendEmail(formattedNotification);
        return { status: 'success', message: 'Notification sent' };
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Error sending notification');
    }
};
