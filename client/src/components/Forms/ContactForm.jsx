import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { sendContactMessage } from '../../utils/contactApi'; // Adjust the import based on your project structure
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendContactMessage(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" p-8 rounded-xl  border border-[var(--color-accent)]">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Send Us a Message</h2>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-[var(--color-accentlight)] text-[var(--color-success)] rounded-lg">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-[var(--color-accentlight)] text-[var(--color-error)] rounded-lg">
          Something went wrong. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border bg-accentlight border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border bg-accentlight border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              placeholder="Your email"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border bg-accentlight border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            placeholder="Subject"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border bg-accentlight border-[var(--color-secondary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Your message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]'} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;