const transporter = require("../config/nodeMailer"); 

// Function for sending thank you email for contact form
const sendContactThankYouEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Thank You for Contacting Us",
    text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you soon.\n\nBest regards,\nThe Team`,
    html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p><p>Best regards,<br>The Team</p>`
  };

  return transporter.sendMail(mailOptions);
};

// Function for sending thank you email for feedback form
const sendFeedbackThankYouEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Thank You for Your Feedback",
    text: `Hello ${name},\n\nWe truly appreciate you taking the time to share your feedback with us. Your input helps us improve our services.\n\nBest regards,\nThe Team`,
    html: `<p>Hello ${name},</p><p>We truly appreciate you taking the time to share your feedback with us. Your input helps us improve our services.</p><p>Best regards,<br>The Team</p>`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactThankYouEmail,
  sendFeedbackThankYouEmail
};