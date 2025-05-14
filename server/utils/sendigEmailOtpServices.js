const transporter = require("../config/nodeMailer");

// Function for sending OTP to email
const sendOtpEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Hello ${name},\n\nPlease verify your email using this OTP: ${otp}\n\nThank you!`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOtpEmail
};