// components/profile/ProfileForm.jsx
import React, { useState } from 'react';

const ProfileForm = ({ patient, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    mobile: patient?.mobile || '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    if (formData.name) formPayload.append('name', formData.name);
    if (formData.email) formPayload.append('email', formData.email);
    if (formData.mobile) formPayload.append('mobile', formData.mobile);
    
    
    onSubmit(formPayload);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">
        Update Profile
      </h2>
      
      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <div className="mb-4">
          <label className="block text-[var(--color-text-primary)] mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            disabled
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="mb-4">
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
          />
        </div>

        

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-70"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;