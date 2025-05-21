import React from 'react';
import { FaHeartbeat, FaUserMd, FaHospital, FaAward, FaClinicMedical } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Aatura Medical</h1>
          <div className="w-32 h-1.5 bg-white mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Delivering exceptional healthcare with compassion and innovation since 2010.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[var(--color-accentlight)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-[var(--color-primary)] mb-6"></div>
              <p className="text-lg text-[var(--color-text-primary)] mb-4">
                Founded in 2010, Autura Medical began as a small clinic with a big vision - to make 
                quality healthcare accessible to everyone. Today, we've grown into a leading 
                healthcare provider with multiple specialties under one roof.
              </p>
              <p className="text-lg text-[var(--color-text-primary)]">
                Our journey has been guided by our core values of compassion, excellence, 
                and innovation. We believe in treating the whole person, not just the symptoms.
              </p>
            </div>
            <div className="bg-[var(--color-accentlight)] rounded-xl p-8 h-full flex items-center justify-center">
              <FaClinicMedical className="text-[var(--color-primary)]" size={200} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[var(--color-accentlight)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-background)] p-8 rounded-xl text-center">
              <div className="text-[var(--color-primary)] mb-4 flex justify-center">
                <FaHeartbeat size={48} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Compassionate Care</h3>
              <p className="text-[var(--color-text-primary)]">
                We treat every patient with the same care and respect we would want for our own family.
              </p>
            </div>
            
            <div className="bg-[var(--color-background)] p-8 rounded-xl text-center">
              <div className="text-[var(--color-primary)] mb-4 flex justify-center">
                <FaUserMd size={48} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Clinical Excellence</h3>
              <p className="text-[var(--color-text-primary)]">
                Our team of board-certified specialists delivers the highest standard of medical care.
              </p>
            </div>
            
            <div className="bg-[var(--color-background)] p-8 rounded-xl text-center">
              <div className="text-[var(--color-primary)] mb-4 flex justify-center">
                <FaHospital size={48} />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Innovative Solutions</h3>
              <p className="text-[var(--color-text-primary)]">
                We continuously adopt new technologies to improve patient outcomes and experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Specialized Doctors</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-xl">Medical Departments</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-xl">Patients Treated</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-xl">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-[var(--color-accentlight)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-4">Meet Our Leadership</h2>
            <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto"></div>
            <p className="text-xl text-[var(--color-text-primary)] mt-4 max-w-2xl mx-auto">
              Our experienced leadership team guides Autura Medical's vision for the future of healthcare.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-[var(--color-background)] rounded-xl overflow-hidden shadow-md">
                <div className="h-64 bg-[var(--color-accentlight)] flex items-center justify-center">
                  <FaUserMd className="text-[var(--color-primary)]" size={80} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Dr. Sarah Johnson</h3>
                  <p className="text-[var(--color-primary)] mb-3">Chief Medical Officer</p>
                  <p className="text-sm text-[var(--color-text-primary)]">
                    Board-certified cardiologist with 20 years of experience in patient care and healthcare administration.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--color-accentlight)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">Ready to Experience Exceptional Care?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/doctors")} className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Book an Appointment
            </button>
            <button onClick={() => window.location.href = "/contact"} className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;