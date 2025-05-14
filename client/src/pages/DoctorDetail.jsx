// pages/DoctorDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctorsData } from '../data/doctorsData';

const DoctorDetail = () => {
  const { id } = useParams();
  const doctor = doctorsData.find(doc => doc.id === parseInt(id));

  if (!doctor) {
    return <div className="text-center py-12">Doctor not found</div>;
  }

  const handleBookAppointment = () => {
    // Logic to handle appointment booking
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Doctor Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border-4 border-accent overflow-hidden mb-6">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-secondary mb-2">{doctor.name}</h1>
              <p className="text-primary font-medium mb-4">{doctor.specialty}</p>
              
              <div className="w-full bg-accentlight rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-secondary mb-2">Availability</h3>
                <p className="text-gray-700">{doctor.availability}</p>
                <p className="text-gray-700">{doctor.hours}</p>
              </div>

              <button
                onClick={handleBookAppointment}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 mb-4"
              >
                Book Appointment
              </button>

              <Link 
                to="/doctors" 
                className="text-primary hover:text-secondary font-medium underline"
              >
                ← Back to Doctors
              </Link>
            </div>

            {/* Doctor Details */}
            <div className="md:w-2/3 p-8 border-l border-gray-200">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-secondary mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
                <p className="text-gray-700">{doctor.about}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Education</h3>
                  <p className="text-gray-700">{doctor.education}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Awards & Recognition</h3>
                  <p className="text-gray-700">{doctor.awards}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Location</h3>
                  <p className="text-gray-700">{doctor.location}</p>
                  <p className="text-gray-700">Room: {doctor.room}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-3">Languages Spoken</h3>
                  <p className="text-gray-700">{doctor.languages}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;