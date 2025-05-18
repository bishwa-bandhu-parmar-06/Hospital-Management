const express = require("express");
const {getAllUsers, getAllAdmin, getAllDoctor, getAllHospitals} = require("../controllers/getAllController");
const router = express.Router();

// Route to get all users
router.get("/all-users", getAllUsers);
// Route to get all admins
router.get("/all-admins", getAllAdmin);
// Route to get all doctors
router.get("/all-doctors", getAllDoctor);
router.get("/all-doctors/:id", getAllDoctor);
// Route to get all hospitals
router.get("/all-hospitals", getAllHospitals);
// Exporting the router
module.exports = router;