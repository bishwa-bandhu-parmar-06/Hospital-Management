import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowRight } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-accentlight)] p-4 sm:p-8 text-center">
      <div className="max-w-2xl w-full p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border-2 border-[var(--color-accentlight)]">
        <div className="text-[var(--color-primary)] mb-6 sm:mb-8 animate-pulse">
          <FaExclamationTriangle className="mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-[var(--color-primary)] mb-1 sm:mb-2">404</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4 sm:mb-6 leading-tight">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-primary)] opacity-90 mb-6 sm:mb-8">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link 
              to="/" 
              className="flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white text-base sm:text-lg md:text-xl font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaHome className="mr-2 sm:mr-3" size={16} />
              Return Home
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center justify-center border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accentlight)] text-base sm:text-lg md:text-xl font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
              <FaArrowRight className="ml-2 sm:ml-3" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;