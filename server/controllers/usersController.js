const userModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/sendigEmailOtpServices");

// Function to register a new user
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const userByEmail = await userModel.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const userByMobile = await userModel.findOne({ mobile });
    if (userByMobile) {
      return res
        .status(400)
        .json({ message: "Mobile number already registered." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const newUser = await userModel.create({
      name,
      email,
      mobile,
      otp,
      isVerified: false,
    });
    newUser.otp = otp;
    await newUser.save();
    await sendOtpEmail(email, name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For verifying register the email OTP
module.exports.verifyRegisterEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({
      email: email,
      otp: otp,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error in verifyEmailOtp:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// User login controller
module.exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await sendOtpEmail(email, user.name, otp);
    await user.save();
    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For verifying the login OTP
module.exports.verifyLoginEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email: email });
    // console.log(user)
    if (!user) {
      return res.status(400).json({ message: "User does Not Exist" });
    }
    if (user.otp !== otp) {
      // console.log(otp);
      // console.log(user.otp);
      return res.status(400).json({ message: "Invalid OTP" });
    } else {
      user.otp = null;
      await user.save();
      const token = jwt.sign({ id: user._id , role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Login Successful",
        token: token,
        user,
      });
    }
  } catch (error) {
    console.error("Error in Verifying Login OTP : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For getting the user details
module.exports.usersProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("fetching users Id : ", userId);
    const user = await userModel
      .findById(userId)
      .select("-otp -isVerified -createdAt -updatedAt");
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in userProfile: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For updating the user profile
module.exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Handle text fields from either req.body or req.fields
    const textFields = req.body.fields ? JSON.parse(req.body.fields) : req.body;
    
    if (textFields.name) user.name = textFields.name;
    if (textFields.email) user.email = textFields.email;
    if (textFields.mobile) user.mobile = textFields.mobile;
    if (textFields.address) user.address = textFields.address;

    // Handle file uploads
    if (req.files?.profilePhoto) {
      user.profilePhoto = req.files.profilePhoto[0].path;
    }
    if (req.files?.bannerImage) {
      user.bannerImage = req.files.bannerImage[0].path;
    }

    const updatedUser = await user.save();
    
    return res.status(200).json({ 
      message: "Profile Updated Successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error in updateUserDetails: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For resending the OTP
module.exports.resendUserOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();
    await sendOtpEmail(email, user.name, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in resendUserOtp: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For user logout
module.exports.logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    // Invalidate the token or perform any other logout logic
    return res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    console.error("Error in logoutUser: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// For deleting the user account
module.exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    await userModel.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "User Account Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleteUserAccount: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
