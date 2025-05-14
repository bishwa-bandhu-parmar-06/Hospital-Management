import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '../components/Forms/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[var(--color-accentlight)] py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--color-secondary)] mb-4">Contact Us</h1>
          <div className="w-24 h-1.5 bg-[var(--color-primary)] mx-auto mb-6"></div>
          <p className="text-xl text-[var(--color-text-primary)] max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to our team - we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className=" p-8 rounded-xl  border border-[var(--color-accent)]">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-[var(--color-primary)] mr-4 mt-1">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Our Location</h3>
                  <p className="text-[var(--color-text-primary)] opacity-90">
                    123 Medical Drive, Health City, HC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[var(--color-primary)] mr-4 mt-1">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Phone</h3>
                  <p className="text-[var(--color-text-primary)] opacity-90">
                    +1 (555) 123-4567 (Main)<br />
                    +1 (555) 765-4321 (Emergency)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[var(--color-primary)] mr-4 mt-1">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Email</h3>
                  <p className="text-[var(--color-text-primary)] opacity-90">
                    info@autura.com<br />
                    support@autura.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-[var(--color-primary)] mr-4 mt-1">
                  <FaClock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Hours</h3>
                  <p className="text-[var(--color-text-primary)] opacity-90">
                    Monday-Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 3:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Component */}
          <ContactForm />
        </div>

        {/* Map Section */}
        <div className="mt-16  p-6 rounded-xl  border border-[var(--color-accent)]">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Find Us on Map</h2>
          <div className="aspect-w-16 aspect-h-9 bg-[var(--color-accentlight)] rounded-lg overflow-hidden">
            {/* Replace with your actual map embed */}
            {/* <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.9239265563183!2d85.04551667515337!3d24.90057637790309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2d6c727cc16a5%3A0x98f475f0a097fce!2sGaya%20College%20of%20Engineering%2C%20Gaya!5e0!3m2!1sen!2sin!4v1747157760784!5m2!1sen!2sin" width="800" height="600" loading="lazy" ></iframe>
            </div> */}
            <div className="w-full h-96 flex items-center justify-center text-[var(--color-primary)]">
              <FaMapMarkerAlt size={48} />
              <span className="ml-2 text-xl">Map Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;