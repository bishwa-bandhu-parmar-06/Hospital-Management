import React, { useState } from 'react';

const AdminProfileForm = ({ admin, onSubmit, loading, onClose }) => {
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    mobile: admin?.mobile || '',
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


  const handleSubmit = (e) => {
  e.preventDefault();

  const updatedData = {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
  };

  onSubmit(updatedData); // Send JSON object directly
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[500px] min-h-[80vh] bg-white p-6 rounded-lg shadow-xl overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-4xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">
          Edit Profile
        </h2>
        {/* Form */}
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
    </div>
  );
};

export default AdminProfileForm;
