// components/DepartmentCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="p-4 sm:p-6">
        <div className="flex justify-center mb-3 sm:mb-4">
          <img 
            src={department.image} 
            alt={department.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-secondary text-center mb-2">
          {department.name}
        </h3>
        <div className="flex justify-between text-xs sm:text-sm text-textPrimary mb-2 sm:mb-3">
          <span>{department.doctors} Doctors</span>
          <span>{department.hospitals} Hospitals</span>
        </div>
        <p className="text-textPrimary text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
          {department.description}
        </p>
        <Link
          to={`/departments/${department.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="block w-full text-center py-1.5 px-3 sm:py-2 sm:px-4 bg-secondary text-white rounded-md hover:bg-primary transition-colors text-xs sm:text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;