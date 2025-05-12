const express = require("express");
const router = express.Router();
const {
    bookAppointment,
    confirmAppointment,
    cancelAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    getHospitalAppointments
} = require("../controllers/appointmentController");
const { authenticate } = require("../middlewares/authMiddleware");

// Book a new appointment
router.post("/", authenticate, bookAppointment);

// Confirm an appointment (by doctor/hospital)
router.put("/:appointmentId/confirm", authenticate, confirmAppointment);

// Cancel an appointment (by patient/doctor/hospital)
router.put("/:appointmentId/cancel", authenticate, cancelAppointment);

// Get patient's appointments
router.get("/patient", authenticate, getPatientAppointments);

// Get doctor's appointments
router.get("/doctor", authenticate, getDoctorAppointments);

// Get hospital's appointments
router.get("/hospital", authenticate, getHospitalAppointments);

module.exports = router;