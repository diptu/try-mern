const nodemailer = require("nodemailer");
const {SMTP_USER,SMTP_PASS} = require("../secret.js");
const transporter = nodemailer.createTransport({
// using gmail to send emails
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendEmail = async(emailData) => {
    try {
        const mailOptions = {
            from : SMTP_USER, // user email address
            to : emailData.email, // recipient email address
            subject: emailData.subject, // subject
            html: emailData.html, // html
        };
        const info =  await transporter.sendMail(mailOptions) // send email
        console.log("Message sent: %s", info.response);
    } catch (error) {
    throw new Error(`Couldn't send email: ${error.message}`)
    }
}


module.exports = sendEmail
