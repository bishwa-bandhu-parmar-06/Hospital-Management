const doctorModel = require("../models/doctorModels");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require('../utils/sendigEmailOtpServices');
// const transporter = require("../config/nodeMailer");

// // making a function for sending otp to provided email
// const sendOtpEmail = async (email, name, otp) => {
//   const mailOptions = {
//     from: process.env.SENDER_EMAIL,
//     to: email,
//     subject: "Verify Your Email",
//     text: `Hello ${name},\n\nPlease verify your email using this OTP: ${otp}\n\nThank you!`,
//   };
//   return transporter.sendMail(mailOptions);
// };

// making doctor registration controller
module.exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const doctorByEmail = await doctorModel.findOne({ email });
    if (doctorByEmail) {
      return res
        .status(400)
        .json({ message: "Doctor With this Email Already exists." });
    }
    const doctorByMobile = await doctorModel.findOne({ mobile });
    if (doctorByMobile) {
      return res
        .status(400)
        .json({ msaage: "Doctor With This Mobile Number Already Exists." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newDoctor = await doctorModel.create({
      name,
      email,
      mobile,
      otp,
      isVerified: false,
    });
    newDoctor.otp = otp;
    await newDoctor.save();
    await sendOtpEmail(email, name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error While Registering Doctor", error);
    res
      .status(500)
      .json({ message: "Internal Server Error from doctor registration" });
  }
};

// For verifying register the email OTP
module.exports.verifyRegisterEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const doctor = await doctorModel.findOne({ email: email });
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor Not Found From Verify Register Email Otp" });
    } else {
      if (doctor.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      } else {
        doctor.isVerified = true;
        doctor.otp = null;
        await doctor.save();
        return res
          .status(200)
          .json({ message: "Email Verified Successfully." });
      }
    }
  } catch (error) {
    console.error("Error While Verifying Email Otp for Doctor", error);
    return res.status(500).json({
      message: "Internal Server Error from Doctor Verify Register Email Otp",
    });
  }
};

// For doctor login

module.exports.loginDoctor = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await doctorModel.findOne({ email: email });
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "The Provided Email for Doctor Does not Exists." });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      doctor.otp = otp;
      await doctor.save();
      await sendOtpEmail(email, doctor.name, otp);
      return res.status(200).json({ message: "OTP sent to your email" });
    }
  } catch (error) {
    console.error("Error While Logging In Doctor", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error from Doctor Login." });
  }
};

// For verifying login the email OTP
module.exports.verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const doctor = await doctorModel.findOne({ email: email });
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor Not Found From Verify Login Email OTP." });
    }
    if (doctor.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    } else {
      doctor.isVerified = true;
      doctor.otp = null;
      await doctor.save();
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res
        .status(200)
        .json({ message: "Login Successful", token: token, doctor });
    }
  } catch (error) {
    console.error("Error While verifying Login Otp For Doctor", error);
    return res.status(500).json({
      message: "Internal Server error from Verifying Doctor Email OTP",
    });
  }
};


// For updating doctor profile
module.exports.updateDoctorProfile = async(req, res) =>{
  try {
    const doctorId = req.user.id;
    const { name, email, mobile } = req.body;
    const doctor = await doctorModel.findById(doctorId).select("-otp -isverified -createdAt -updatedAt -__v");
    if(!doctor){
      return res.status(400).json({message: "Doctor Not Found"});
    }
    if(name) doctor.name = name;
    if(email) doctor.email = email;
    if(mobile) doctor.mobile = mobile;

    if(req.file && req.file.path){
      doctor.profilePhoto = req.file.path;
    }
    await doctor.save();
    return res.status(200).json({message: "Doctor Profile Updated Successfully", doctor});

  } catch (error) {
    console.error("Error While Updating Doctor Profile", error);
    return res.status(500).json({message: "Internal Server Error from Updating Doctor Profile."});
  }
}


// For getting doctor profile

module.exports.getDoctorProfile = async(req, res) =>{
  try {
    const doctorId = req.user.id;
    const doctor = await doctorModel.findById(doctorId);
    if(!doctor){
      return res.status(400).json({message: "Doctor Not Found"});
    }
    return res.status(200).json({doctor});
  } catch (error) {
    console.error("Error While getting Doctor Profile", error);
    return res.status(500).json({message: "Internal Server Error from getting Doctor Profile."})
  }
}

// for resend otp
module.exports.resendDoctorOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor Not Found From Resend Doctor Otp" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    doctor.otp = otp;
    await doctor.save();
    await sendOtpEmail(email, doctor.name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  }
  catch (error) {
    console.error("Error While Resending Doctor Otp", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error from Resending Doctor Otp" });
  }
}
// For doctor logout
module.exports.logoutDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const doctor = await doctorModel.findById(doctorId);  
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor Not Found From Logout Doctor" });
    }
    doctor.isVerified = false;
    await doctor.save();
    return res.status(200).json({ message: "Doctor Logged Out Successfully" });
  }
  catch (error) {
    console.error("Error While Logging Out Doctor", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error from Doctor Logout" });
  }
}

// For deleting doctor profile
module.exports.deleteDoctorProfile = async(req, res) =>{
  try {
    const doctorId = req.user.id;
    const doctor = await doctorModel.findById(doctorId);  
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Doctor Not Found From Delete Doctor Profile" });
    }
    await doctorModel.findByIdAndDelete(doctorId);
    return res.status(200).json({ message: "Doctor Profile Deleted Successfully" });
  }
  catch (error) {
    console.error("Error While Deleting Doctor Profile", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error from Deleting Doctor Profile" });
  }
};