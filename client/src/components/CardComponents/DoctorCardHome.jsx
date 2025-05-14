// components/DoctorCardSlider.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctorsData } from '../../data/doctorsData';

const DoctorCardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev + 1 > doctorsData.length - cardsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? doctorsData.length - cardsToShow : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="py-16 bg-accentlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Our Expert Doctors</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300 z-10"
            aria-label="Previous doctors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300 z-10"
            aria-label="Next doctors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full transition-transform duration-300">
            {doctorsData.slice(currentIndex, currentIndex + cardsToShow).map((doctor) => (
              <div 
                key={doctor.id}
                className="w-82 h-96 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="w-28 h-28 rounded-full border-2 border-secondary flex items-center justify-center">
                  <img src={doctor.image} alt={doctor.name} className="w-28 h-28 object-cover rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-textPrimary mt-4">{doctor.name}</h2>
                <div className="text-center flex items-center justify-center mt-2 space-x-3">
                  <span className="text-sm px-2 py-1 bg-accentlight text-secondary rounded-full">
                    {doctor.specialty}
                  </span>
                  <span className="text-sm text-gray-600">{doctor.experience} years</span>
                </div>
                <div className="mt-4 text-center space-y-1">
                  <p className="text-sm text-gray-600">Available: {doctor.availability}</p>
                  <p className="text-sm text-gray-600">{doctor.hours}</p>
                </div>
                <div className="mt-3 text-center space-y-1">
                  <p className="text-sm text-gray-600">Location: {doctor.location}</p>
                  <p className="text-sm text-gray-600">Room No: {doctor.room}</p>
                </div>
                <Link 
                  to={`/doctors/${doctor.id}`}
                  className="mt-4 px-6 py-2 bg-secondary text-white rounded-full font-medium hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: doctorsData.length - cardsToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-secondary' : 'bg-accent'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSlider;