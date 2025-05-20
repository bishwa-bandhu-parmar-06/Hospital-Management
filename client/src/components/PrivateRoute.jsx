import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Check for all possible tokens
  const doctorToken = localStorage.getItem('doctorToken');
  const patientToken = localStorage.getItem('patientToken');
  const adminToken = localStorage.getItem('adminToken');
  const hospitalToken = localStorage.getItem('hospitalToken');

  // Function to verify token and role
  const verifyTokenAndRole = (token, expectedRole) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.role === expectedRole;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  // Check specific routes
  if (path.includes('/doctor/dashboard')) {
    return verifyTokenAndRole(doctorToken, 'doctor') ? children : <Navigate to="/auth" replace />;
  }
  if (path.includes('/patient/dashboard')) {
    return verifyTokenAndRole(patientToken, 'patient') ? children : <Navigate to="/auth" replace />;
  }
  if (path.includes('/admin/dashboard')) {
    return verifyTokenAndRole(adminToken, 'admin') ? children : <Navigate to="/auth" replace />;
  }
  if (path.includes('/hospital/dashboard')) {
    return verifyTokenAndRole(hospitalToken, 'hospital') ? children : <Navigate to="/auth" replace />;
  }

  // For book-appointment route, only allow patients
  if (path === '/book-appointment') {
    return verifyTokenAndRole(patientToken, 'patient') ? children : <Navigate to="/auth" replace />;
  }

  // No valid token found for the requested route
  return <Navigate to="/auth" replace />;
};

export default PrivateRoute;