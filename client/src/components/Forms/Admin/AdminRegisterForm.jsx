// components/admin/AdminRegisterForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminRegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">
        Admin Registration
      </h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div className="mb-4">
          <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-70"
        >
          {loading ? 'Sending OTP...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-[var(--color-text-primary)]">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-[var(--color-primary)] hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegisterForm;