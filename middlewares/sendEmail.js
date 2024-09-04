import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use environment variable
                pass: process.env.EMAIL_PASS, 
                host: 'smtp.gmail.com',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const options = {
            from: process.env.EMAIL_USER, 
            to: email,
            subject: subject,
            text: text
        };

        // Send email and return the response or error
        const info = await transporter.sendMail(options);
        console.log("Email Sent: " + info.response);
        return "Email Sent: " + info.response;

    } catch (error) {
        console.log("Failed to send email: " + error);
        return error;
    }
};

export default sendEmail;
