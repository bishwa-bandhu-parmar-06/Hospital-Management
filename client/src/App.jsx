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
import AllDoctors from "./components/Forms/Doctors/AllDoctors";
import RejectedApprovalPage from "./pages/RejectedApprovalpage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
// importing the profile or dashboard
import PatientProfile from "./components/Forms/Patients/PatientProfile";
import DoctorProfile from "./components/Forms/Doctors/DoctorsProfile";
import AdminProfile from "./components/Forms/Admin/AdminProfile";
import HospitalProfile from "./components/Forms/Hospitals/HospitalProfile";
import AllHospitals from "./components/Forms/Hospitals/AllHospitals";

// import AllPatientAppointment from "./components/Forms/Patients/AllPatientAppointment";
import BookAppointmentForm from "./components/Forms/Common/bookAppointmentForm";
const App = () => {
  return (
    <Router>
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
              <PatientProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute>
              <DoctorProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/hospital/dashboard"
          element={
            <PrivateRoute>
              <HospitalProfile />
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
      <Footer />
    </Router>
  );
};

export default App;
