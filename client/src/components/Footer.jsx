import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import FeedbackForm from './Forms/FeedbackForm';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = (data) => {
    console.log('Feedback submitted:', data);
    // Here you would typically send the data to your backend
    alert('Thank you for your feedback!');
  };

  return (
    <footer className="bg-[var(--color-secondary)] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {showFeedback && (
          <FeedbackForm 
            onClose={() => setShowFeedback(false)} 
            onSubmit={handleFeedbackSubmit}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-[var(--color-accent)] pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-[var(--color-accent)] transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-[var(--color-accent)] transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Doctors</a></li>
              <li><a href="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-[var(--color-accent)] pb-2">Departments</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Orthopedics</a></li>
              <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Pediatrics</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-[var(--color-accent)] pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[var(--color-accent)]" />
                <span>123 Medical St, Health City</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-[var(--color-accent)]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-[var(--color-accent)]" />
                <span>contact@autura.com</span>
              </li>
            </ul>
          </div>

          {/* Feedback & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-[var(--color-accent)] pb-2">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-2xl hover:text-[var(--color-accent)] transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-[var(--color-accent)] transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-[var(--color-accent)] transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-[var(--color-accent)] transition-colors">
                <FaInstagram />
              </a>
            </div>
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white py-2 px-4 rounded transition-colors duration-300"
            >
              Give Feedback
            </button>
          </div>
        </div>

        <div className="border-t border-[var(--color-accent)] pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Autura Medical. All rights reserved. | 
            Designed by <span className="text-[var(--color-accent)]">Bishwa Bandhu Parmar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;