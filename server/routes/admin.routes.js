const express = require('express');
const router = express.Router();
const { registerAdmin, verifyRegisterEmailOtp, loginAdmin, verifyAdminLoginEmailotp, updateAdminProfile, getAdminProfile , resendAdminOtp, deleteAdminProfile, logoutAdmin} = require('../controllers/adminController');

// Middleware for verifying admin token
const {authenticate} = require('../middlewares/authMiddleware');
const {upload} = require("../config/multer");

// Route for registering a new admin
router.post('/register', registerAdmin);
// Route for verifying admin registration email OTP
router.post('/verify-register-email-otp', verifyRegisterEmailOtp);
// Route for admin login
router.post('/login', loginAdmin);
// Route for verifying admin login email OTP
router.post('/verify-login-email-otp', verifyAdminLoginEmailotp);
// Route for updating admin profile
router.put('/update-profile', authenticate, upload.single('profilePhoto'), updateAdminProfile);
// Route for getting admin profile
router.get('/profile', authenticate, getAdminProfile);

// Route for resend otp to email admins
router.post('/resend-otp', authenticate, resendAdminOtp);

// routes for admin logout
router.post('/logout', authenticate, logoutAdmin);

// routes for deleting admin
router.delete('/delete-admin', authenticate, deleteAdminProfile);
// Export the router
module.exports = router;
