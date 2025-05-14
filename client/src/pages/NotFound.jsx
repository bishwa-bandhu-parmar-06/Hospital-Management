import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowRight } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-accentlight)] p-8 text-center">
      <div className="max-w-2xl w-full p-12 rounded-2xl border-2 border-[var(--color-accentlight)]">
        <div className="text-[var(--color-primary)] mb-8 animate-pulse">
          <FaExclamationTriangle size={96} className="mx-auto" />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-8xl font-black text-[var(--color-primary)] mb-2">404</h1>
          <h2 className="text-4xl font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            Oops! Page Not Found
          </h2>
          
          <p className="text-2xl text-[var(--color-text-primary)] opacity-90 mb-8">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white text-xl font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaHome className="mr-3" size={20} />
              Return Home
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center justify-center border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accentlight)] text-xl font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
              <FaArrowRight className="ml-3" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;