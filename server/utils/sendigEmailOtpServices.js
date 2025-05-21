const transporter = require("../config/nodeMailer");

const sendOtpEmail = async (email, name, otp) => {
  try {
    const mailOptions = {
      from: `Aatura <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Verify Your Email with Aatura",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Hello ${name},</h2>
          <p>Your OTP for verification is:</p>
          <h1 style="background: #2563eb; color: white; padding: 10px 20px; 
              display: inline-block; border-radius: 5px;">
            ${otp}
          </h1>
          <p>This OTP is valid for 5 minutes.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    // console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendOtpEmail };


// const transporter = require("../config/nodeMailer");

// // Function for sending OTP to email
// const sendOtpEmail = async (email, name, otp) => {
//   const mailOptions = {
//     from: process.env.SENDER_EMAIL,
//     to: email,
//     subject: "Verify Your Email",
//     text: `Hello ${name},\n\nPlease verify your email using this OTP: ${otp}\n\nThank you!`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = {
//   sendOtpEmail
// };