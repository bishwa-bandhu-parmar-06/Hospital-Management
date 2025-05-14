// components/admin/AdminOtpForm.jsx
import React, { useState } from 'react';

const AdminOtpForm = ({ onSubmit, loading, onResend, email, isRegister = false }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, otp });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-2 text-center">
        Verify OTP
      </h2>
      <p className="text-center text-[var(--color-text-primary)] mb-6">
        We've sent a 6-digit code to {email}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="otp">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-center text-xl"
            maxLength="6"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-70 mb-4"
        >
          {loading ? 'Verifying...' : isRegister ? 'Complete Registration' : 'Login'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onResend}
            className="text-[var(--color-primary)] hover:underline"
          >
            Didn't receive code? Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminOtpForm;