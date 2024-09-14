require('dotenv').config();
const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const sendEmail = async (to, subject, text) => {
    const data = {
        from: 'your-email@your-domain.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        await mg.messages().send(data);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
