const express = require("express");
const router = express.Router();
const {registerUser, verifyRegisterEmailOtp, loginUser, verifyLoginEmailOtp, usersProfile, updateUserDetails,  deleteUserAccount, resendUserOtp, logoutUser} = require("../controllers/usersController");
const {upload} = require("../config/multer")
const {authenticate} = require("../middlewares/authMiddleware");


router.post("/register", registerUser);
router.post("/verify-register-otp", verifyRegisterEmailOtp);
router.post("/login", loginUser);
router.post("/verify-login-otp", verifyLoginEmailOtp);
router.get("/profile",authenticate, usersProfile);
router.put("/update", authenticate, upload.single("profilePhoto"), updateUserDetails);

router.post("/resend-otp", authenticate, resendUserOtp);

router.post("/logout", authenticate, logoutUser);
router.delete("/delete-user", authenticate, deleteUserAccount);
module.exports = router;