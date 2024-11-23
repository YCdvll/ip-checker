const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

async function getPublicIP() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
}

async function sendEmail(ip) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"IP Notifier" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: 'Server IP Address',
        text: `The server's public IP is: ${ip}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function main() {
    const ip = await getPublicIP();
    if (ip) {
        await sendEmail(ip);
    }
}

main();
