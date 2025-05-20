const Appointment = require("../models/appointmentModel");
// const User = require("../models/usersModel");
const Doctor = require("../models/doctorModels");
const Hospital = require("../models/hospitalModels");
// const { authenticate } = require("../middlewares/authMiddleware");
const Razorpay = require("razorpay");
const { sendAppointmentNotification } = require("../services/notificationService");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Book appointment
module.exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, hospitalId, date, startTime, endTime, symptoms, notes } = req.body;
        const patientId = req.user.id;

        // Validate required fields
        if (!doctorId) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        // Check if doctor exists and is approved
        const doctor = await Doctor.findById(doctorId);
        if (!doctor || doctor.status !== 'approved') {
            return res.status(400).json({ message: "Invalid or unapproved doctor" });
        }

        // Check if hospital exists and is approved (if provided)
        if (hospitalId) {
            const hospital = await Hospital.findById(hospitalId);
            if (!hospital || hospital.status !== 'approved') {
                return res.status(400).json({ message: "Invalid or unapproved hospital" });
            }
        }

        // Check availability
        const isAvailable = await checkAvailability(doctorId, hospitalId, date, startTime, endTime);
        if (!isAvailable) {
            return res.status(400).json({ message: "The selected slot is not available" });
        }

        // Create appointment
        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            hospital: hospitalId || undefined,
            date,
            startTime,
            endTime,
            symptoms,
            notes,
            createdBy: patientId
        });

        await newAppointment.save();

        // Notify doctor/hospital
        await sendAppointmentNotification(newAppointment);

        return res.status(201).json({
            message: "Appointment created successfully",
            appointment: newAppointment
        });
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Check availability
const checkAvailability = async (doctorId, hospitalId, date, startTime, endTime) => {
    // Check for conflicting appointments
    const query = {
        date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
            { startTime: { $gte: startTime, $lt: endTime } }
        ],
        status: { $in: ['pending', 'confirmed'] }
    };

    if (doctorId) query.doctor = doctorId;
    if (hospitalId) query.hospital = hospitalId;

    const conflictingAppointments = await Appointment.find(query);
    return conflictingAppointments.length === 0;
};

// Confirm appointment (by doctor/hospital)
module.exports.confirmAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.user.id;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        // Check if user is the doctor/hospital for this appointment
        if (appointment.doctor && appointment.doctor.toString() !== userId.toString() &&
            appointment.hospital && appointment.hospital.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to confirm this appointment" });
        }

        appointment.status = 'confirmed';
        await appointment.save();

        // Send notification to patient
        await sendAppointmentNotification(appointment, 'confirmed');

        return res.status(200).json({
            message: "Appointment confirmed successfully",
            appointment
        });
    } catch (error) {
        console.error("Error in confirmAppointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Cancel appointment
module.exports.cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { reason } = req.body;
        const userId = req.user.id;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Check if user has permission to cancel
        const isAuthorized = 
            appointment.patient.toString() === userId.toString() ||
            (appointment.doctor && appointment.doctor.toString() === userId.toString()) ||
            (appointment.hospital && appointment.hospital.toString() === userId.toString());

        if (!isAuthorized) {
            return res.status(403).json({ message: "Not authorized to cancel this appointment" });
        }

        appointment.status = 'cancelled';
        appointment.cancellationReason = reason || "No reason provided";
        await appointment.save();

        // Process refund if payment was made
        if (appointment.payment && appointment.payment.status === 'completed') {
            // Implement refund logic here
            // For Razorpay: await razorpay.payments.refund(...)
        }

        // Send notification
        await sendAppointmentNotification(appointment, 'cancelled');

        return res.status(200).json({
            message: "Appointment cancelled successfully",
            appointment
        });
    } catch (error) {
        console.error("Error in cancelAppointment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get patient appointments
module.exports.getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.user.id;
        const appointments = await Appointment.find({ patient: patientId })
            .populate('doctor', 'name specialization')
            .populate('hospital', 'name address')
            .sort({ date: -1, startTime: -1 });

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error in getPatientAppointments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get doctor appointments
module.exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient', 'name email mobile')
            .populate('hospital', 'name address')
            .sort({ date: -1, startTime: -1 });

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error in getDoctorAppointments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get hospital appointments
module.exports.getHospitalAppointments = async (req, res) => {
    try {
        const hospitalId = req.user.id;
        const appointments = await Appointment.find({ hospital: hospitalId })
            .populate('patient', 'name email mobile')
            .populate('doctor', 'name specialization')
            .sort({ date: -1, startTime: -1 });

        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error in getHospitalAppointments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};