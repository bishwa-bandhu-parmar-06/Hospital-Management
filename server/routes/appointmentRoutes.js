const express = require("express");
const router = express.Router();
const {
    bookAppointment,
    confirmAppointment,
    cancelAppointment,
    getAppointments
} = require("../controllers/appointmentController");
const { authenticate } = require("../middlewares/authMiddleware");

// Book a new appointment
router.post("/", authenticate, bookAppointment);

// Get appointments with filters
router.get("/get-appointments", authenticate, getAppointments);

// Confirm an appointment (by doctor/hospital)
router.put("/:appointmentId/confirm", authenticate, confirmAppointment);

// Cancel an appointment (by patient/doctor/hospital)
router.put("/:appointmentId/cancel", authenticate, cancelAppointment);

module.exports = router;