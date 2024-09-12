require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const dbConfig = require('./database/config');
const cookieParser = require("cookie-parser");
const path = require('path');

const Patient = require('./models/patientModel');
const Doctor = require('./models/doctorModel');
const Hospitals = require('./models/hospitalModel');
const Admin = require('./models/adminModel');
const Visitors = require('./models/homeModel');
const doctorDetails = require('./routes/doctorDetails');
const patientAppointmentRoute = require('./routes/appointmentForm');

const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use your database configuration to connect
dbConfig.connect();

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine (using EJS as an example)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with your secret key
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport.js and use session
app.use(passport.initialize());
app.use(passport.session());

// Use cookie-parser middleware
app.use(cookieParser());

// Set up flash messages middleware
app.use(flash());

// Middleware for handling flash messages
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});


// Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Use the route defined in index.js
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Define routes
const patientRoutes = require('./routes/patient');
const adminRoutes = require('./routes/admin');
const doctorRoutes = require('./routes/doctor');
const hospitalRoutes = require('./routes/hospital');
const homeroutes = require("./routes/homeForm");
const deepartmentRoutes = require("./routes/deepartmentRoutes");
const ServicesRoutes = require("./routes/serviceRoutes");

// Use the defined routes
app.use('/patient', patientRoutes);
app.use('/admin', adminRoutes);
app.use('/doctor', doctorRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/visitors', homeroutes);
app.use("/deepartments", deepartmentRoutes);
app.use("/services", ServicesRoutes);
app.use('/patientAppointment', patientAppointmentRoute);

app.use(doctorRoutes);
app.use(adminRoutes);
app.use(patientRoutes);
app.use(hospitalRoutes);
app.use(homeroutes);

app.use('/uploads', express.static(path.join(__dirname, 'public', 'images', 'uploads')));

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.set('socketio', io);

// Search route
app.get('/search', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL

    if (!query || query.trim() === '') {
        return res.render('error', { error: 'Please enter a valid search query.'});
    }

    try {
        const patients = await Patient.find({$text: { $search: query } });
        const doctors = await Doctor.find({$text: { $search: query } });
        const hospitals = await Hospitals.find({ $text: { $search: query } }).select('name');
        const admin = await Admin.find({$text: { $search: query } });

        res.render('searchResults', {patients, doctors, hospitals, admin, query, suggestions: { hospitals } });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).render('error', { error: 'Internal Server Error'});
    }
});

app.get('/suggest', async (req, res) => {
    const query = req.query.q; // Get the search query from the URL

    if (!query || query.trim() === '') {
        return res.json([]);
    }

    try {
        const doctors = await Doctor.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const patients = await Patient.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const hospitals = await Hospitals.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);
        const admin = await Admin.find({ name: { $regex: `^${query}`, $options: 'i' } }).limit(5);

        const suggestions = [...doctors, ...patients, ...hospitals, ...admin];
        res.json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware for handling flash messages
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

// Handle invalid routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

