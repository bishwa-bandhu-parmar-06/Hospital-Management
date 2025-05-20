# Aatura - Healthcare Appointment Management System

A comprehensive healthcare appointment management system that connects patients with doctors and hospitals, facilitating seamless appointment scheduling and management.

## Features

### For Patients
- Book appointments with doctors and hospitals
- View appointment history
- Track appointment status (pending, confirmed, cancelled)
- Add symptoms and notes for appointments
- Receive notifications for appointment updates

### For Doctors
- View and manage patient appointments
- Confirm or cancel appointments
- View patient details and symptoms
- Track appointment history
- Receive notifications for new appointments

### For Hospitals
- Manage appointments for hospital doctors
- View and manage patient appointments
- Confirm or cancel appointments
- Track appointment history
- Receive notifications for new appointments

## Technical Architecture

### Frontend (React + Vite)
- **Context API**: Uses `AppointmentContext` for state management
- **Components**:
  - `BookAppointmentForm`: Handles appointment booking
  - `AllPatientAppointment`: Displays patient's appointments
  - `PendingAppointments`: Shows pending appointments for doctors/hospitals
  - `MyAppointments`: Shows confirmed appointments
- **Authentication**: JWT-based authentication with role-specific tokens
- **Styling**: Tailwind CSS for responsive design

### Backend (Node.js + Express)
- **Models**:
  - `Appointment`: Stores appointment details
  - `Doctor`: Doctor information
  - `Hospital`: Hospital information
  - `User`: User/Patient information
- **Controllers**:
  - `appointmentController`: Handles appointment-related operations
  - `doctorController`: Manages doctor-related operations
  - `hospitalController`: Manages hospital-related operations
- **Routes**:
  - `/appointment`: Appointment management endpoints
  - `/doctor`: Doctor-related endpoints
  - `/hospital`: Hospital-related endpoints

## API Endpoints

### Appointment Routes
- `POST /appointment`: Book a new appointment
- `PUT /appointment/:id/confirm`: Confirm an appointment
- `PUT /appointment/:id/cancel`: Cancel an appointment
- `GET /appointment/patient`: Get patient's appointments
- `GET /appointment/doctor`: Get doctor's appointments
- `GET /appointment/hospital`: Get hospital's appointments

## Appointment Flow

1. **Booking Process**:
   - Patient selects doctor/hospital
   - Chooses date and time
   - Provides symptoms and notes
   - System checks availability
   - Appointment is created with 'pending' status

2. **Confirmation Process**:
   - Doctor/Hospital receives notification
   - Reviews appointment details
   - Confirms or cancels appointment
   - Patient receives status update

3. **Cancellation Process**:
   - Any party can cancel appointment
   - Must provide cancellation reason
   - System notifies all parties
   - Updates appointment status

## Data Models

### Appointment Schema
```javascript
{
  patient: ObjectId,      // Reference to User
  doctor: ObjectId,       // Reference to Doctor
  hospital: ObjectId,     // Reference to Hospital (optional)
  date: Date,            // Appointment date
  startTime: String,     // Start time
  endTime: String,       // End time
  status: String,        // pending/confirmed/cancelled/completed
  symptoms: String,      // Patient symptoms
  notes: String,         // Additional notes
  cancellationReason: String,  // Reason for cancellation
  createdBy: ObjectId    // Who created the appointment
}
```

## Security Features

- JWT-based authentication
- Role-based access control
- Protected routes
- Input validation
- Error handling
- Secure password hashing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Add necessary environment variables

4. Start the development servers:
   ```bash
   # Start server
   cd server
   npm run dev

   # Start client
   cd ../client
   npm run dev
   ```

## Environment Variables

### Server (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Client (.env)
```
VITE_BACKEND_URI=http://localhost:3000/api/v1
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
