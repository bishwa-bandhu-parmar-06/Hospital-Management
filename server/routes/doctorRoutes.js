const express = require("express");
const router = express.Router();
const {registerDoctor, verifyRegisterEmailOtp, loginDoctor, verifyLoginOtp, updateDoctorProfile, getDoctorProfile} = require("../controllers/doctorController");
const {authenticate} = require("../middlewares/authMiddleware")
const {upload} = require("../config/multer")
// Route for doctor registration
router.post("/register", registerDoctor);

// Route for verifying doctor registration email OTP
router.post("/verify-register-otp", verifyRegisterEmailOtp);

// Route for doctor login
router.post("/login", loginDoctor);
// Route for verifying doctor login OTP
router.post("/verify-login-otp", verifyLoginOtp);
// Route for updating doctor profile
router.put("/update-profile", authenticate, upload.single("profilePhoto"),updateDoctorProfile);
// Route for getting doctor profile
router.get("/profile", authenticate, getDoctorProfile);

module.exports = router;