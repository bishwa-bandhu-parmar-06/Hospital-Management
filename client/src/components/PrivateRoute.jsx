import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check for all possible tokens
  const doctorToken = localStorage.getItem('doctorToken');
  const patientToken = localStorage.getItem('patientToken');
  const adminToken = localStorage.getItem('adminToken');
  const hospitalToken = localStorage.getItem('hospitalToken');
  const userType = localStorage.getItem('userType');

  // Determine which dashboard we're trying to access
  const path = window.location.pathname;
  
  if (path.includes('/doctor/dashboard') && doctorToken) {
    return children;
  }
  if (path.includes('/patient/dashboard') && patientToken) {
    return children;
  }
  if (path.includes('/admin/dashboard') && adminToken) {
    return children;
  }
  if (path.includes('/hospital/dashboard') && hospitalToken) {
    return children;
  }

  // No valid token found for the requested route
  return <Navigate to="/auth" />;
};

export default PrivateRoute;