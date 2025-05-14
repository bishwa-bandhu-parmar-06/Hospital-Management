import React from "react";
import { FaSearch, FaUserMd, FaCalendarAlt, FaStethoscope } from "react-icons/fa";

const HowAuturaWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={32} />,
      title: "Search Doctor",
      description: "Find a doctor by specialty, location, or name"
    },
    {
      icon: <FaUserMd size={32} />,
      title: "View Profile",
      description: "Check the doctor's profile, ratings, and reviews"
    },
    {
      icon: <FaCalendarAlt size={32} />,
      title: "Book Appointment",
      description: "Choose your preferred date and time for the appointment"
    },
    {
      icon: <FaStethoscope size={32} />,
      title: "Get Treatment",
      description: "Attend your appointment and receive care"
    }
  ];

  return (
    <section className="py-12 bg-[var(--color-accentlight)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">How Aatura Works</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-[var(--color-primary)] mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                {step.title}
              </h3>
              <p className="text-[var(--color-text-primary)] opacity-80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAuturaWorks;