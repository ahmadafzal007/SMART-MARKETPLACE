const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS,
  },
});

// A helper function to send emails
const sendVerificationEmail = async (toEmail, code) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
