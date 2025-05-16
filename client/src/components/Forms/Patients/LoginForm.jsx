// PatientLoginForm.jsx
import React, { useState } from 'react';

const PatientLoginForm = ({ onSubmit, loading, onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    onSubmit(email);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center text-secondary mb-6">
        Patient Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textPrimary mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${error ? 'border-error' : 'border-accent'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-secondary transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending OTP...' : 'Login with OTP'}
          </button>
        </div>
      </form>

      <p 
        className="text-sm text-center mt-4 text-primary cursor-pointer hover:underline"
        onClick={onToggleForm}
      >
        Don't have an account? Register here
      </p>
    </div>
  );
};

export default PatientLoginForm;