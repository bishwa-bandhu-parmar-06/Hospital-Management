const User = require('../models/usersModel');
const Doctor = require('../models/doctorModels');
const Hospital = require('../models/hospitalModels');
const transporter = require('../config/nodeMailer');
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);

// Email templates
const emailTemplates = {
  appointmentCreated: (appointment, patient, doctor, hospital) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50;">Appointment Confirmation</h2>
      <p>Dear ${patient.name},</p>
      <p>Your appointment has been successfully booked with:</p>
      ${doctor ? `<p><strong>Doctor:</strong> Dr. ${doctor.name}</p>` : ''}
      ${hospital ? `<p><strong>Hospital:</strong> ${hospital.name}</p>` : ''}
      <p><strong>Date:</strong> ${new Date(appointment.date).toDateString()}</p>
      <p><strong>Time:</strong> ${appointment.startTime} - ${appointment.endTime}</p>
      <p><strong>Type:</strong> ${appointment.type === 'online' ? 'Video Consultation' : 'In-Person Visit'}</p>
      ${appointment.type === 'online' ? `<p><strong>Meeting Link:</strong> Will be shared before your appointment</p>` : ''}
      <p>Thank you for choosing our services.</p>
      <p style="color: #7f8c8d; font-size: 0.9em;">This is an automated message, please do not reply.</p>
    </div>
  `,
  appointmentUpdated: (appointment, patient, action) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: ${action === 'confirmed' ? '#27ae60' : '#e74c3c'};">Appointment ${action}</h2>
      <p>Dear ${patient.name},</p>
      <p>Your appointment has been <strong>${action}</strong>.</p>
      ${action === 'cancelled' && appointment.cancellationReason ? 
        `<p><strong>Reason:</strong> ${appointment.cancellationReason}</p>` : ''}
      <p>If you have any questions, please contact our support team.</p>
      <p style="color: #7f8c8d; font-size: 0.9em;">This is an automated message, please do not reply.</p>
    </div>
  `,
  newAppointmentRequest: (appointment, patient) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3498db;">New Appointment Request</h2>
      <p>You have a new appointment request from:</p>
      <p><strong>Patient:</strong> ${patient.name}</p>
      <p><strong>Symptoms:</strong> ${appointment.symptoms || 'Not specified'}</p>
      <p><strong>Date:</strong> ${new Date(appointment.date).toDateString()}</p>
      <p><strong>Time:</strong> ${appointment.startTime} - ${appointment.endTime}</p>
      <p>Please log in to your dashboard to confirm or reject this appointment.</p>
    </div>
  `
};

// SMS templates
const smsTemplates = {
  appointmentCreated: (appointment, doctor, hospital) => 
    `Appt booked: ${doctor ? `Dr. ${doctor.name}` : hospital.name} on ${new Date(appointment.date).toDateString()} at ${appointment.startTime}.`,
  appointmentUpdated: (appointment, action) => 
    `Your appt is ${action}. ${action === 'cancelled' ? `Reason: ${appointment.cancellationReason}` : ''}`
};

// Send appointment notifications
module.exports.sendAppointmentNotification = async (appointment, action = 'created') => {
  try {
    const [patient, doctor, hospital] = await Promise.all([
      User.findById(appointment.patient),
      appointment.doctor ? Doctor.findById(appointment.doctor) : null,
      appointment.hospital ? Hospital.findById(appointment.hospital) : null
    ]);

    if (!patient) {
      console.error('Patient not found for appointment:', appointment._id);
      return;
    }

    // Email notification to patient
    const patientMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: patient.email,
      subject: `Appointment ${action === 'created' ? 'Confirmation' : action}`,
      html: action === 'created' 
        ? emailTemplates.appointmentCreated(appointment, patient, doctor, hospital)
        : emailTemplates.appointmentUpdated(appointment, patient, action)
    };
    await transporter.sendMail(patientMailOptions);

    // SMS notification to patient if mobile exists
    if (patient.mobile && process.env.TWILIO_PHONE_NUMBER) {
      await twilio.messages.create({
        body: action === 'created' 
          ? smsTemplates.appointmentCreated(appointment, doctor, hospital)
          : smsTemplates.appointmentUpdated(appointment, action),
        to: `+${patient.mobile}`,
        from: process.env.TWILIO_PHONE_NUMBER
      });
    }

    // Notify doctor/hospital if appointment is new
    if (action === 'created') {
      const recipient = doctor || hospital;
      if (recipient && recipient.email) {
        const providerMailOptions = {
          from: process.env.SENDER_EMAIL,
          to: recipient.email,
          subject: 'New Appointment Request',
          html: emailTemplates.newAppointmentRequest(appointment, patient)
        };
        await transporter.sendMail(providerMailOptions);
      }
    }

  } catch (error) {
    console.error('Error in sendAppointmentNotification:', error);
    // Implement retry logic or error reporting here if needed
  }
};