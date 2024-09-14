const Notification = require('../models/Notification');
const { sendEmail } = require('../utils/emailUtils');

exports.sendNotification = async (notificationData) => {
    const notification = await Notification.create(notificationData);
    await sendEmail(notificationData); // Assuming sendEmail handles sending notification emails
    return notification;
};

// Other notification-related methods...
