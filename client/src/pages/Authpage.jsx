import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/Forms/Patients/RegisterForm';
import LoginForm from '../components/Forms/Patients/LoginForm';
import OtpForm from '../components/Forms/Patients/OtpForm';
import hospitalImage from '../assets/cardiology.png'; // Replace with your image

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('patient');
  const [isLogin, setIsLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState('');

  // Form type can be 'patient', 'doctor', 'admin', 'hospital'
  const tabs = [
    { id: 'patient', label: 'Patient' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'admin', label: 'Admin' },
    { id: 'hospital', label: 'Hospital' }
  ];

  const handleRegisterSubmit = (formData) => {
    // Handle registration submission
    console.log('Register form submitted:', formData);
    setEmail(formData.email);
    setShowOtp(true);
  };

  const handleLoginSubmit = (formData) => {
    // Handle login submission
    console.log('Login form submitted:', formData);
    setEmail(formData.email);
    setShowOtp(true);
  };

  const handleOtpSubmit = (otpData) => {
    // Handle OTP verification
    console.log('OTP submitted:', otpData);
    // Redirect to dashboard on successful verification
    window.location.href = '/dashboard';
  };

  const handleResendOtp = () => {
    // Handle OTP resend
    console.log('Resending OTP to:', email);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-[var(--color-primary)]">
          <img 
            src={hospitalImage} 
            alt="Hospital" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Forms */}
        <div className="w-full md:w-1/2 p-8">
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-accent)] mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-medium text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-secondary)]'
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsLogin(false);
                  setShowOtp(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Auth Content */}
          <div className="mt-4">
            {showOtp ? (
              <OtpForm 
                onSubmit={handleOtpSubmit}
                onResend={handleResendOtp}
                email={email}
                isRegister={!isLogin}
              />
            ) : isLogin ? (
              <>
                <LoginForm 
                  onSubmit={handleLoginSubmit}
                  loading={false} // You can manage loading state as needed
                />
                <p className="text-center mt-4 text-[var(--color-text-primary)]">
                  Don't have an account?{' '}
                  <button 
                    onClick={toggleAuthMode}
                    className="text-[var(--color-primary)] hover:underline font-medium"
                  >
                    Register here
                  </button>
                </p>
              </>
            ) : (
              <>
                <RegisterForm 
                  onSubmit={handleRegisterSubmit}
                  loading={false} // You can manage loading state as needed
                />
                <p className="text-center mt-4 text-[var(--color-text-primary)]">
                  Already have an account?{' '}
                  <button 
                    onClick={toggleAuthMode}
                    className="text-[var(--color-primary)] hover:underline font-medium"
                  >
                    Login here
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;