import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FeedbackForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-primary)] hover:text-[var(--color-error)] transition-colors"
        >
          <FaTimes size={20} />
        </button>
        
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Give Us Feedback</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full p-2 border border-[var(--color-accent)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded hover:bg-[var(--color-secondary)] transition-colors duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;