const express = require('express');
const router = express.Router();

const { registerHospital, verifyHospitalOtp, loginHospital, verifyHospitalLoginOtp, updateHospitalProfile, getHospitalProfile, resendHospitalOtp, logoutHospital, deleteHospitalProfile } = require('../controllers/hospitalController');

const { authenticate } = require('../middlewares/authMiddleware');
const { upload } = require('../config/multer');

router.post('/register', registerHospital);
router.post('/verify-register-email-otp', verifyHospitalOtp);
router.post('/login', loginHospital);
router.post('/verify-login-otp', verifyHospitalLoginOtp);
router.put('/update', authenticate, upload.single('logo'), updateHospitalProfile);
router.get('/profile', authenticate, getHospitalProfile);
router.post('/resend-otp', resendHospitalOtp);
router.post('/logout', authenticate, logoutHospital);
router.delete('/delete', authenticate, deleteHospitalProfile);

module.exports = router;