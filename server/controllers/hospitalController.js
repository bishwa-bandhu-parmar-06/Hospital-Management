const hospitalModel = require("../models/hospitalModels");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodeMailer");

// Function to send OTP email
const sendEmailOtp = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Hello ${name},\n\nPlease verify your email using this OTP: ${otp}\n\nThank you!`,
  };
  await transporter.sendMail(mailOptions);
};

// Hospital Registration
module.exports.registerHospital = async (req, res) => {
  try {
    const { name, email, mobile, address, website } = req.body;
    const hospitalByEmail = await hospitalModel.findOne({ email });
    if (hospitalByEmail) {
      return res
        .status(400)
        .json({ message: "Hospital with this email already exists." });
    }
    const hospitalByMobile = await hospitalModel.findOne({ mobile });
    if (hospitalByMobile) {
      return res
        .status(400)
        .json({ message: "Hospital with this phone number already exists." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newHospital = await hospitalModel.create({
      name,
      email,
      mobile,
      address,
      website,
      otp,
      isVerified: false,
    });
    newHospital.otp = otp;
    await newHospital.save();
    await sendEmailOtp(email, name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error while registering hospital", error);
    res
      .status(500)
      .json({ message: "Internal server error from hospital registration" });
  }
};
// Hospital Registration OTP Verification
module.exports.verifyHospitalOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const hospital = await hospitalModel.findOne({ email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    if (hospital.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    hospital.isVerified = true;
    hospital.otp = null;
    await hospital.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error while verifying hospital OTP", error);
    res.status(500).json({
      message: "Internal server error from hospital OTP verification",
    });
  }
};

// Hospital Login
module.exports.loginHospital = async (req, res) => {
  try {
    const { email } = req.body;
    const hospital = await hospitalModel.findOne({ email });
    if (!hospital) {
      return res
        .status(400)
        .json({ message: "The provided email does not exist." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    hospital.otp = otp;
    await hospital.save();
    await sendEmailOtp(email, hospital.name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error while logging in hospital", error);
    res
      .status(500)
      .json({ message: "Internal server error from hospital login" });
  }
};
// Hospital Login OTP Verification
module.exports.verifyHospitalLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const hospital = await hospitalModel.findOne({ email: email });
    if (!hospital) {
      return res.status(400).json({ message: "Hospital not found" });
    }
    if (hospital.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    hospital.otp = null;
    await hospital.save();
    return res
      .status(200)
      .json({ message: "Login successful", token, hospital });
  } catch (error) {
    console.error("Error while verifying hospital login OTP", error);
    res.status(500).json({
      message: "Internal server error from hospital login OTP verification",
    });
  }
};

// Hospital Profile Update
module.exports.updateHospitalProfile = async (req, res) => {
  try {
    const { name, email, mobile, address, website } = req.body;
    const hospitalId = req.user.id;
    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (name) hospital.name = name;
    if (email) hospital.email = email;
    if (mobile) hospital.mobile = mobile;
    if (address) hospital.address = address;
    if (website) hospital.website = website;

    if (req.file && req.file.path) {
      hospital.logo = req.file.path;
    }
    await hospital.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", hospital });
  } catch (error) {
    console.error("Error while updating hospital profile", error);
    res
      .status(500)
      .json({ message: "Internal server error from hospital profile update" });
  }
};

// Hospital Profile Retrieval
module.exports.getHospitalProfile = async (req, res) => {
  try {
    const hospitalId = req.user.id;
    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    return res
      .status(200)
      .json({ message: "Hospital profile retrieved successfully", hospital });
  } catch (error) {
    console.error("Error while retrieving hospital profile", error);
    res.status(500).json({
      message: "Internal server error from hospital profile retrieval",
    });
  }
};

// Hospital OTP Resend
module.exports.resendHospitalOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const hospital = await hospitalModel.findOne({ email: email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    hospital.otp = otp;
    await hospital.save();
    await sendEmailOtp(email, hospital.name, otp);
    return res.status(200).json({ message: "OTP resent to your email" });
  } catch (error) {
    console.error("Error while resending hospital OTP", error);
    res
      .status(500)
      .json({ message: "Internal server error from hospital OTP resend" });
  }
};

// Hospital Logout
module.exports.logoutHospital = async (req, res) => {
  try {
    const hospitalId = req.user.id;
    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    // Invalidate the token or perform any other logout logic here
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error while logging out hospital", error);
    res
      .status(500)
      .json({ message: "Internal server error from hospital logout" });
  }
};

// Hospital Profile Deletion
module.exports.deleteHospitalProfile = async (req, res) => {
  try {
    const hospitalId = req.user.id;
    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    await hospitalModel.findByIdAndDelete(hospitalId);
    return res
      .status(200)
      .json({ message: "Hospital profile deleted successfully" });
  } catch (error) {
    console.error("Error while deleting hospital profile", error);
    res.status(500).json({
      message: "Internal server error from hospital profile deletion",
    });
  }
};
