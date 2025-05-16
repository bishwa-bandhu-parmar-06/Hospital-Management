// DoctorRegisterForm.jsx
import React, { useState } from 'react';

const DoctorRegisterForm = ({ onSubmit, loading, onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center text-secondary mb-6">
        Doctor Registration
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-textPrimary mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textPrimary mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-textPrimary mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-secondary transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </div>
      </form>

      <p 
        className="text-sm text-center mt-4 text-primary cursor-pointer hover:underline"
        onClick={onToggleForm}
      >
        Already have an account? Login here
      </p>
    </div>
  );
};

export default DoctorRegisterForm;