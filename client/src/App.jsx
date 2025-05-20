// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Authpage";
import DoctorDetail from "./components/Forms/Doctors/DoctorDetail";
import HospitalDetails from "./components/Forms/Hospitals/HospitalDetails";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/animations.css";
import AllDoctors from "./components/Forms/Doctors/AllDoctors";
import RejectedApprovalPage from "./pages/RejectedApprovalpage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
// importing the profile or dashboard
// import PatientProfile from "./components/Forms/Patients/PatientProfile";
// import DoctorProfile from "./components/Forms/Doctors/DoctorsProfile";
// import AdminProfile from "./components/Forms/Admin/AdminProfile";
// import HospitalProfile from "./components/Forms/Hospitals/HospitalProfile";
import AllHospitals from "./components/Forms/Hospitals/AllHospitals";

// import AllPatientAppointment from "./components/Forms/Patients/AllPatientAppointment";
import BookAppointmentForm from "./components/Forms/Common/bookAppointmentForm";
import { AppointmentProvider } from './context/AppointmentContext';
import PatientDashboard from './components/Forms/Patients/PatientProfile';
import DoctorDashboard from './components/Forms/Doctors/DoctorsProfile';
import HospitalDashboard from './components/Forms/Hospitals/HospitalProfile';
import AdminDashboard from './components/Forms/Admin/AdminProfile';
import AllPatientAppointment from './components/Forms/Patient/AllPatientAppointment';
import PendingAppointments from './components/Forms/Doctors/PendingAppointments';
import MyAppointments from './components/Forms/Doctors/MyAppointments';
import PendingHospitalsAppoinments from './components/Forms/Hospitals/PendingHospitalsAppoinments';
import HospitalsAppointment from './components/Forms/Hospitals/HospitalsAppointment';

const App = () => {
  return (
    <AppointmentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceName" element={<ServiceDetail />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/doctors" element={<AllDoctors />} />
            <Route
              path="/departments/:departmentName"
              element={<DepartmentDetail />}
            />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/patient/dashboard"
              element={
                <PrivateRoute>
                  <PatientDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient/appointments"
              element={
                <PrivateRoute>
                  <AllPatientAppointment />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/dashboard"
              element={
                <PrivateRoute>
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/pending-appointments"
              element={
                <PrivateRoute>
                  <PendingAppointments />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <PrivateRoute>
                  <MyAppointments />
                </PrivateRoute>
              }
            />
            <Route
              path="/hospital/dashboard"
              element={
                <PrivateRoute>
                  <HospitalDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/hospital/pending-appointments"
              element={
                <PrivateRoute>
                  <PendingHospitalsAppoinments />
                </PrivateRoute>
              }
            />
            <Route
              path="/hospital/appointments"
              element={
                <PrivateRoute>
                  <HospitalsAppointment />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/pending-approval" element={<PendingApprovalPage />} />
            <Route path="/rejectionpage" element={<RejectedApprovalPage />} />
            <Route path="/hospital/:hospitalId" element={<HospitalDetails />} />
            <Route path="/hospitals" element={<AllHospitals />} />
            <Route
              path="/book-appointment"
              element={
                <PrivateRoute>
                  <BookAppointmentForm />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AppointmentProvider>
  );
};

export default App;
