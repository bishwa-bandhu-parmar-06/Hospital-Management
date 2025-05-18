import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import FeedbackForm from './Forms/FeedbackForm';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = (data) => {
    console.log('Feedback submitted:', data);
    alert('Thank you for your feedback!');
  };

  return (
    <footer className="bg-[var(--color-secondary)] text-white pt-8 pb-6 md:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showFeedback && (
          <FeedbackForm 
            onClose={() => setShowFeedback(false)} 
            onSubmit={handleFeedbackSubmit}
          />
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 border-b border-[var(--color-accent)] pb-2 inline-block sm:block w-full">
              Quick Links
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {['Home', 'About Us', 'Services', 'Doctors', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="hover:text-[var(--color-accent)] transition-colors text-sm md:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 border-b border-[var(--color-accent)] pb-2 inline-block sm:block w-full">
              Departments
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'].map((dept) => (
                <li key={dept}>
                  <a 
                    href="#" 
                    className="hover:text-[var(--color-accent)] transition-colors text-sm md:text-base"
                  >
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 border-b border-[var(--color-accent)] pb-2 inline-block sm:block w-full">
              Contact Us
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center justify-center sm:justify-start">
                <FaMapMarkerAlt className="mr-2 text-[var(--color-accent)] text-sm md:text-base" />
                <span className="text-sm md:text-base">123 Medical St, Health City</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaPhone className="mr-2 text-[var(--color-accent)] text-sm md:text-base" />
                <span className="text-sm md:text-base">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-2 text-[var(--color-accent)] text-sm md:text-base" />
                <span className="text-sm md:text-base">contact@autura.com</span>
              </li>
            </ul>
          </div>

          {/* Feedback & Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 border-b border-[var(--color-accent)] pb-2 inline-block sm:block w-full">
              Connect With Us
            </h3>
            <div className="flex justify-center sm:justify-start space-x-4 mb-4 md:mb-6">
              {[
                { icon: <FaFacebook />, name: 'Facebook' },
                { icon: <FaTwitter />, name: 'Twitter' },
                { icon: <FaLinkedin />, name: 'LinkedIn' },
                { icon: <FaInstagram />, name: 'Instagram' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="text-xl md:text-2xl hover:text-[var(--color-accent)] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={() => setShowFeedback(true)}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white py-2 px-4 rounded transition-colors duration-300 text-sm md:text-base"
              >
                Give Feedback
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-accent)] pt-4 md:pt-6 text-center">
          <p className="text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Autura Medical. All rights reserved. | 
            Designed by <span className="text-[var(--color-accent)]">Bishwa Bandhu Parmar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;