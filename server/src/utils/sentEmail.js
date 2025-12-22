const nodemailer = require("nodemailer");
const { SMTP_APP_USER, SMTP_APP_PASSWORD } = require("../secret");

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SMTP_APP_USER,
        pass: SMTP_APP_PASSWORD,
    },
});

/**
 * Send email utility
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 */
const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Nazmul Alam Diptu" <${SMTP_APP_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Failed to send email:", error);
        throw error;
    }
};

module.exports = sendEmail;
