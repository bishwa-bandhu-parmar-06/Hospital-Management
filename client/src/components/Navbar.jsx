import { NavLink, useNavigate } from 'react-router-dom';
import logoImage from '../assets/mainLogo.png';
import { FaUser, FaUserMd, FaHospital, FaUserShield, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-secondary text-background px-3 py-2 rounded-md"
      : "text-secondary px-3 py-2 hover:bg-secondary hover:text-background rounded-md";

  useEffect(() => {
    // Check if any user is logged in
    const token = localStorage.getItem('adminToken') || 
                  localStorage.getItem('doctorToken') || 
                  localStorage.getItem('hospitalToken') || 
                  localStorage.getItem('patientToken');
    
    if (token) {
      // Determine user type based on which token exists
      if (localStorage.getItem('adminToken')) {
        setUserType('admin');
        // Fetch admin data if needed
      } else if (localStorage.getItem('doctorToken')) {
        setUserType('doctor');
        // Fetch doctor data if needed
      } else if (localStorage.getItem('hospitalToken')) {
        setUserType('hospital');
        // Fetch hospital data if needed
      } else if (localStorage.getItem('patientToken')) {
        setUserType('patient');
        // Fetch patient data if needed
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear the appropriate token based on user type
    switch(userType) {
      case 'admin':
        localStorage.removeItem('adminToken');
        break;
      case 'doctor':
        localStorage.removeItem('doctorToken');
        break;
      case 'hospital':
        localStorage.removeItem('hospitalToken');
        break;
      case 'patient':
        localStorage.removeItem('patientToken');
        break;
      default:
        break;
    }
    
    setUserType(null);
    setUserData(null);
    setIsDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const renderUserIcon = () => {
    switch(userType) {
      case 'admin':
        return <FaUserShield className="text-xl" />;
      case 'doctor':
        return <FaUserMd className="text-xl" />;
      case 'hospital':
        return <FaHospital className="text-xl" />;
      case 'patient':
        return <FaUser className="text-xl" />;
      default:
        return <FaSignInAlt className="text-xl" />;
    }
  };

  const renderDropdown = () => {
    if (!userType) return null;
    
    return (
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-secondary hover:text-primary transition"
        >
          {renderUserIcon()}
          <span className="hidden md:inline">
            {userData?.name || 'My Account'}
          </span>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <NavLink 
              to={`/${userType}/dashboard`} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profile
            </NavLink>
            {/* <NavLink 
              to={`/${userType}/edit-profile`} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Edit Profile
            </NavLink> */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-accentlight shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={logoImage} alt="Logo" className="h-36" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/departments" className={navLinkClass}>Departments</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            
            {/* User Icon or Sign In */}
            {userType ? (
              renderDropdown()
            ) : (
              <NavLink to="/auth" className="flex items-center gap-2 text-secondary hover:text-primary transition">
                <FaSignInAlt className="text-xl" />
                <span>Sign In</span>
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {userType ? (
              <div className="mr-4">
                {renderDropdown()}
              </div>
            ) : (
              <NavLink to="/auth" className="mr-4 text-secondary">
                <FaSignInAlt className="text-xl" />
              </NavLink>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary focus:outline-none"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <NavLink 
              to="/" 
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              to="/departments" 
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Departments
            </NavLink>
            <NavLink 
              to="/about" 
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;