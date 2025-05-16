import React, { useState } from 'react';

const VerifyOtpForm = ({ onSubmit, onResend, email, isRegister = false, loading }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center text-secondary mb-6">
        Verify OTP
      </h2>
      
      <p className="text-center text-textPrimary mb-6">
        We've sent a 6-digit code to <span className="font-medium">{email}</span>
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-textPrimary mb-1">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
            className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className={`w-full mt-4 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-secondary transition-colors ${(loading || otp.length !== 6) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isRegister ? 'Complete Registration' : 'Login'}
        </button>

        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className={`text-sm text-center text-primary hover:underline ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          Didn't receive code? Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;