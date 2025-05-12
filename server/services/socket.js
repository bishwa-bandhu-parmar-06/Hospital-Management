const Appointment = require('../models/appointmentModel');

module.exports = (io) => {
  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join user to their private room
    socket.on('joinRoom', (userId) => {
      socket.join(userId.toString());
      console.log(`User ${userId} joined room`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Appointment status change emitter
  const emitAppointmentUpdate = (appointment) => {
    io.to(appointment.patient.toString()).emit('appointmentUpdate', appointment);
    if (appointment.doctor) {
      io.to(appointment.doctor.toString()).emit('appointmentUpdate', appointment);
    }
    if (appointment.hospital) {
      io.to(appointment.hospital.toString()).emit('appointmentUpdate', appointment);
    }
  };

  // Watch for appointment changes in database
  const changeStream = Appointment.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'update') {
      Appointment.findById(change.documentKey._id)
        .then(appointment => {
          if (appointment) emitAppointmentUpdate(appointment);
        })
        .catch(err => console.error('Error emitting appointment update:', err));
    } else if (change.operationType === 'insert') {
      emitAppointmentUpdate(change.fullDocument);
    }
  });

  // Error handling for change stream
  changeStream.on('error', (error) => {
    console.error('Change stream error:', error);
  });
};