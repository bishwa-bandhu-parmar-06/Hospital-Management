const adminModel = require("../models/adminModels");
const Doctor = require("../models/doctorModels");
const Hospital = require("../models/hospitalModels")
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodeMailer");

const sendEmailOtp = async(email, name, otp) =>{
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Verify Your Email",
        text: `Hello ${name},\n\nPlease verify your email using this OTP: ${otp}\n\nThank you!`,
    };
    await transporter.sendMail(mailOptions);
}

// Admin Registration
module.exports.registerAdmin = async(req, res) =>{
    try {
        const {name, email, mobile} = req.body;
        const adminByEmail = await adminModel.findOne({ email});
        if(adminByEmail){
            return res.status(400).json({message: "Email already registered."});
        }
        const adminByMobile = await adminModel.findOne({mobile});
        if(adminByMobile){
            return res.status(400).json({message: "Mobile Number already registered."})
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const newAdmin = await adminModel.create({name, email, mobile, otp, isVerified: false});
        newAdmin.otp = otp;
        await newAdmin.save();
        await sendEmailOtp(email, name, otp);
        return res.status(200).json({message: "OTP sent to your email"});
    } catch (error) {
        console.error("Error in registerAdmin: ", error);
        return res.status(500).json({message: "Inetrnal server error"});
    }
}

// admin verify register email otp
module.exports.verifyRegisterEmailOtp = async(req, res) =>{
    try {
        const {email, otp} = req.body;
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        if(admin.otp !== otp){
            return res.status(400).json({message: "Invalid OTP"});
        }
        admin.isVerified = true;
        admin.otp = null;
        await admin.save();
        return res.status(200).json({message: "Email verified successfully"});
    } catch (error) {
        console.error("Error in verify registerEmailOtp from admin: ", error);
        return res.status(500).json({message: "Internal Server Error From Verify Register Email Otp of Admin"});
    }
}

// admin login
module.exports.loginAdmin = async(req, res) =>{
    try {
        const {email} = req.body;
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        admin.otp = otp;
        await admin.save();
        await sendEmailOtp(email, admin.name, otp);
        return res.status(200).json({message: "OTP sent to your email"});
    } catch (error) {
        console.error("Error in Login Admin: ", error);
        return res.status(500).json({message: "Internal Server Error from Login Admin."})
    }
}


// admin verify login email otp
module.exports.verifyAdminLoginEmailotp = async(req, res) =>{
    try {
        const {email, otp} = req.body;
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        if(admin.otp !== otp){
            return res.status(400).json({message: "Invalid OTP"});
        }
        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
        admin.otp = null;
        await admin.save();
        return res.status(200).json({message: "Login successful", token, admin});
    } catch (error) {
        console.error("Error in verifyAdmin Login Email otp: ", error);
        return res.status(500).json({message: "Internal Server error from verifyAdmin Login Email otp."});
    }
}

// admin update profile
// Update your route to handle single file uploads separately


// Updated controller
module.exports.updateAdminProfile = async(req, res) => {
    try {
        const adminId = req.user.id;
        const admin = await adminModel.findById(adminId);
        
        if(!admin) {
            return res.status(400).json({message: "Admin Not Found"});
        }

        // Handle text fields from form-data
        if (req.body.name) admin.name = req.body.name;
        if (req.body.email) admin.email = req.body.email;
        if (req.body.mobile) admin.mobile = req.body.mobile;

        // Handle profile photo
        if(req.files?.profilePhoto) {
            admin.profilePhoto = req.files.profilePhoto[0].path;
        }

        // Handle banner image
        if(req.files?.bannerImage) {
            admin.bannerImage = req.files.bannerImage[0].path;
        }

        await admin.save();
        return res.status(200).json({
            message: "Profile updated successfully", 
            admin: {
                ...admin._doc,
                profilePhoto: admin.profilePhoto,
                bannerImage: admin.bannerImage
            }
        });
    } catch (error) {
        console.error("Error in updateAdminProfile: ", error);
        return res.status(500).json({message: "Internal Server Error from updateAdminProfile"});
    }
}

// admin get profile
module.exports.getAdminProfile = async(req, res) =>{
    try {
        const adminId = req.user.id;
        const admin = await adminModel.findById(adminId);
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        return res.status(200).json({message: "Admin Profile", admin});
    } catch (error) {
        console.error("Error in getAdminProfile: ", error);
        return res.status(500).json({message: "Internal Server Error from getAdminProfile"});
    }
}


// admin resend otp
module.exports.resendAdminOtp = async(req, res) =>{
    try {
        const {email} = req.body;
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        admin.otp = otp;
        await admin.save();
        await sendEmailOtp(email, admin.name, otp);
        return res.status(200).json({message: "OTP sent to your email"});
    }
    catch (error) {
        console.error("Error in resendAdminOtp: ", error);
        return res.status(500).json({message: "Internal Server Error from resendAdminOtp"});
    }
}

// admin logout
module.exports.logoutAdmin = async(req, res) =>{
    try {
        const adminId = req.user.id;
        const admin = await adminModel.findById(adminId);
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        admin.otp = null;
        await admin.save();
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.error("Error in logoutAdmin: ", error);
        return res.status(500).json({message: "Internal Server Error from logoutAdmin"});
    }
}

// admin delete profile
module.exports.deleteAdminProfile = async(req, res) =>{
    try {
        const adminId = req.user.id;
        const admin = await adminModel.findById(adminId);
        if(!admin){
            return res.status(400).json({message: "Admin Not Found"});
        }
        await adminModel.findByIdAndDelete(adminId);
        return res.status(200).json({message: "Admin Profile Deleted Successfully"});
    } catch (error) {
        console.error("Error in deleteAdminProfile: ", error);
        return res.status(500).json({message: "Internal Server Error from deleteAdminProfile"});
    }
}


// Admin approval for doctors
module.exports.approveDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { action, reason } = req.body;
        
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor Not Found" });
        }

        if (action === "approve") {
            doctor.status = "approved";
            await doctor.save(); // Save the document first
            await sendApprovalEmail(doctor.email, doctor.name, "doctor", reason);
            return res.status(200).json({ 
                message: "Doctor approved successfully",
                doctor 
            });
        } 
        else if (action === "reject") {
            doctor.status = 'rejected';
            await doctor.save(); // Save the document first
            await sendRejectionEmail(doctor.email, doctor.name, 'doctor', reason);
            return res.status(200).json({ 
                message: "Doctor rejected successfully",
                doctor 
            });
        } 
        else {
            return res.status(400).json({ 
                message: "Invalid action. Use 'approve' or 'reject'" 
            });
        }
    } catch (error) {
        console.error("Error in approveDoctor: ", error);
        return res.status(500).json({ 
            message: "Internal Server Error from approveDoctor",
            error: error.message 
        });
    }
}

// Admin approval for hospitals
module.exports.approveHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { action, reason } = req.body;
        
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });
        
        if (action === 'approve') {
            hospital.status = 'approved';
            await sendApprovalEmail(hospital.email, hospital.name, 'hospital');
        } else if (action === 'reject') {
            hospital.status = 'rejected';
            await sendRejectionEmail(hospital.email, hospital.name, 'hospital', reason);
        }
        
        await hospital.save();
        return res.status(200).json({ message: `Hospital ${action}ed successfully` });
    } catch (error) {
        console.error("Error in approveHospital:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get pending approvals
module.exports.getPendingApprovals = async (req, res) => {
    try {
        const pendingDoctors = await Doctor.find({ status: 'pending' });
        const pendingHospitals = await Hospital.find({ status: 'pending' });
        
        return res.status(200).json({
            pendingDoctors,
            pendingHospitals
        });
    } catch (error) {
        console.error("Error in getPendingApprovals:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Helper functions for sending emails
const sendApprovalEmail = async (email, name, userType) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Your ${userType} account has been approved`,
        html: `<p>Hello ${name},</p>
               <p>Your ${userType} account has been approved by the admin.</p>
               <p>You can now login and start using our platform.</p>`
    };
    await transporter.sendMail(mailOptions);
};

const sendRejectionEmail = async (email, name, userType, reason) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Your ${userType} account approval status`,
        html: `<p>Hello ${name},</p>
               <p>Your ${userType} account registration has been rejected.</p>
               <p>Reason: ${reason}</p>
               <p>Please contact support if you have any questions.</p>`
    };
    await transporter.sendMail(mailOptions);
};