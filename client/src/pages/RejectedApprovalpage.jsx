import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const RejectedApprovalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, name, email } = location.state || {
    userType: 'user',
    name: 'Guest',
    email: 'unknown@example.com',
  };

  const handleLogout = () => {
    localStorage.removeItem(`${userType}Token`);
    navigate('/auth');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <CancelIcon className="text-red-600" style={{ fontSize: '60px' }} />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
          Account Rejected
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Hello, <span className="font-semibold">{name}</span>!
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 text-left p-4 rounded-md mb-4">
          <p className="text-gray-800 mb-2">
            Unfortunately, your <strong>{userType}</strong> account has been rejected by our administration team.
          </p>
          <p className="text-sm text-gray-600 italic">
            If you believe this was a mistake or have any questions, please contact us at <strong>{email}</strong>.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md mt-4 transition duration-300"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default RejectedApprovalPage;
