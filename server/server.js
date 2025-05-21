require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./database/db');

// Import routes
const usersRoutes = require("./routes/usersRoutes");
const getAllRoutes = require("./routes/getAllRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/admin.routes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require('./routes/contactRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');
// Initialize app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Attach io to app for use in routes
app.set('io', io);

// Database connection
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hospital Management System API");
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/getAll", getAllRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Setup Socket.io
require('../server/services/socket')(io);

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});